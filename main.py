from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
import joblib
import pandas as pd
import os
from dotenv import load_dotenv

# Load .env
load_dotenv()

from ml.real_risk_engine import calculate_risk
from ml.real_recommendations import generate_recommendations


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="Student Performance Prediction API",
    description="API for predicting student performance and identifying academic risk.",
    version="1.0.0"
)


# ============================================================
# DATABASE CONNECTION
# ============================================================

def get_db():
    return mysql.connector.connect(
        host=os.getenv("MYSQLHOST", "localhost"),
        port=int(os.getenv("MYSQLPORT", "3306")),
        user=os.getenv("MYSQLUSER", "root"),
        password=os.getenv("MYSQLPASSWORD"),
        database=os.getenv("MYSQLDATABASE", "student_performance")
    )


# ============================================================
# LOAD ML MODEL
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "real_student_model.pkl"
)

try:
    model = joblib.load(MODEL_PATH)

    print("Real ML model loaded successfully!")

    # Show the features expected by the trained model
    if hasattr(model, "feature_names_in_"):
        print("Model expects features:")
        print(model.feature_names_in_)

except Exception as e:
    model = None
    print(f"Error loading ML model: {e}")


# ============================================================
# REQUEST MODEL
# ============================================================

class PredictionRequest(BaseModel):
    student_id: int
    attendance: float
    internal_test_1: float
    internal_test_2: float
    assignment_score: float
    study_hours: float


# ============================================================
# ROOT ENDPOINT
# ============================================================

@app.get("/")
def home():
    return {
        "message": "Student Performance API is working!",
        "docs": "/docs",
        "students_endpoint": "/students",
        "prediction_endpoint": "/predict"
    }


# ============================================================
# GET STUDENTS
# ============================================================

@app.get("/students")
def get_students():

    db = None
    cursor = None

    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM students"
        )

        students = cursor.fetchall()

        return students

    except mysql.connector.Error as e:

        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )

    finally:

        if cursor:
            cursor.close()

        if db:
            db.close()


# ============================================================
# PREDICT STUDENT PERFORMANCE
# ============================================================

@app.post("/predict")
def predict_performance(data: PredictionRequest):

    db = None
    cursor = None

    try:

        # --------------------------------------------------------
        # 1. CHECK ML MODEL
        # --------------------------------------------------------

        if model is None:
            raise HTTPException(
                status_code=500,
                detail="ML model could not be loaded."
            )

        # --------------------------------------------------------
        # 2. CONNECT TO DATABASE
        # --------------------------------------------------------

        db = get_db()
        cursor = db.cursor(dictionary=True)

        # --------------------------------------------------------
        # 3. GET STUDENT
        # --------------------------------------------------------

        cursor.execute(
            "SELECT id, name FROM students WHERE id = %s",
            (data.student_id,)
        )

        student = cursor.fetchone()

        if not student:
            raise HTTPException(
                status_code=404,
                detail=f"Student with ID {data.student_id} not found."
            )

        # --------------------------------------------------------
        # 4. CREATE ML INPUT
        # IMPORTANT:
        # These column names MUST match the trained model.
        # --------------------------------------------------------

        input_data = pd.DataFrame(
            [[
                data.attendance,
                data.internal_test_1,
                data.internal_test_2,
                data.assignment_score,
                data.study_hours
            ]],
            columns=[
                "Attendance (%)",
                "Internal Test 1 (out of 40)",
                "Internal Test 2 (out of 40)",
                "Assignment Score (out of 10)",
                "Daily Study Hours"
            ]
        )

        # --------------------------------------------------------
        # 5. ML PREDICTION
        # --------------------------------------------------------

        prediction = model.predict(input_data)

        predicted_score = float(prediction[0])

        # Keep score inside normal academic range
        predicted_score = max(
            0.0,
            min(100.0, predicted_score)
        )

        predicted_score = round(
            predicted_score,
            2
        )

        # --------------------------------------------------------
        # 6. CALCULATE RISK
        # IMPORTANT:
        # predicted_score is required by calculate_risk()
        # --------------------------------------------------------

        risk_result = calculate_risk(
            attendance=data.attendance,
            internal_test_1=data.internal_test_1,
            internal_test_2=data.internal_test_2,
            assignment_score=data.assignment_score,
            study_hours=data.study_hours,
            predicted_score=predicted_score
        )

        # --------------------------------------------------------
        # 7. EXTRACT RISK INFORMATION
        # --------------------------------------------------------

        if isinstance(risk_result, dict):

            risk_level = risk_result.get(
                "risk_level",
                "LOW"
            )

            risk_reasons = risk_result.get(
                "risk_reasons",
                []
            )

        else:

            risk_level = str(
                risk_result
            )

            risk_reasons = []

        # --------------------------------------------------------
        # 8. GENERATE RECOMMENDATIONS
        # --------------------------------------------------------

        recommendations = generate_recommendations(
            attendance=data.attendance,
            internal_test_1=data.internal_test_1,
            internal_test_2=data.internal_test_2,
            assignment_score=data.assignment_score,
            study_hours=data.study_hours,
            predicted_score=predicted_score
        )

        # --------------------------------------------------------
        # 9. SAVE PERFORMANCE TO MYSQL
        # --------------------------------------------------------

        insert_query = """
            INSERT INTO performance
            (
                student_id,
                attendance,
                internal_test_1,
                internal_test_2,
                assignment_score,
                study_hours,
                predicted_score,
                risk_level
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                %s
            )
        """

        cursor.execute(
            insert_query,
            (
                data.student_id,
                data.attendance,
                data.internal_test_1,
                data.internal_test_2,
                data.assignment_score,
                data.study_hours,
                predicted_score,
                risk_level
            )
        )

        db.commit()

        # --------------------------------------------------------
        # 10. GET INSERTED RECORD ID
        # --------------------------------------------------------

        performance_id = cursor.lastrowid

        # --------------------------------------------------------
        # 11. RETURN RESPONSE
        # --------------------------------------------------------

        return {
            "success": True,
            "student_id": data.student_id,
            "student_name": student["name"],
            "performance_id": performance_id,
            "predicted_score": predicted_score,
            "risk_level": risk_level,
            "risk_reasons": risk_reasons,
            "recommendations": recommendations,
            "message": "Prediction saved successfully to MySQL"
        }

    except HTTPException:
        raise

    except mysql.connector.Error as e:

        if db:
            db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"MySQL error: {str(e)}"
        )

    except Exception as e:

        if db:
            db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Prediction error: {str(e)}"
        )

    finally:

        if cursor:
            cursor.close()

        if db:
            db.close()