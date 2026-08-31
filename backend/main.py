from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
import joblib
import pandas as pd

from ml.real_risk_engine import calculate_risk
from ml.real_recommendations import generate_recommendations


# =========================================================
# FASTAPI
# =========================================================

app = FastAPI(
    title="Student Performance Prediction API"
)


# =========================================================
# LOAD REAL-DATA ML MODEL
# =========================================================

model = joblib.load("ml/real_student_model.pkl")

print("Jeet's real ML model loaded successfully!")


# =========================================================
# MYSQL CONNECTION
# =========================================================

def get_db():

    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="YOUR_MYSQL_PASSWORD_HERE",
        database="student_performance"
    )


# =========================================================
# STUDENT INPUT
# =========================================================

class StudentData(BaseModel):

    student_id: int

    attendance: float

    internal_test_1: float

    internal_test_2: float

    assignment_score: float

    study_hours: float


# =========================================================
# HOME API
# =========================================================

@app.get("/")
def home():

    return {
        "message": "Student Performance API is working!"
    }


# =========================================================
# GET STUDENTS
# =========================================================

@app.get("/students")
def get_students():

    db = get_db()

    cursor = db.cursor(dictionary=True)

    try:

        cursor.execute(
            "SELECT * FROM students"
        )

        students = cursor.fetchall()

        return students

    finally:

        cursor.close()
        db.close()


# =========================================================
# PREDICTION API
# =========================================================

@app.post("/predict")
def predict(student: StudentData):

    db = None
    cursor = None

    try:

        # =====================================================
        # 1. CONNECT TO MYSQL
        # =====================================================

        db = get_db()

        cursor = db.cursor(dictionary=True)


        # =====================================================
        # 2. CHECK STUDENT EXISTS
        # =====================================================

        cursor.execute(
            "SELECT id, name FROM students WHERE id = %s",
            (student.student_id,)
        )

        existing_student = cursor.fetchone()

        if existing_student is None:

            raise HTTPException(
                status_code=404,
                detail=f"Student ID {student.student_id} not found"
            )


        # =====================================================
        # 3. CREATE ML INPUT
        # =====================================================

        input_data = pd.DataFrame([{

            "Attendance (%)":
                student.attendance,

            "Internal Test 1 (out of 40)":
                student.internal_test_1,

            "Internal Test 2 (out of 40)":
                student.internal_test_2,

            "Assignment Score (out of 10)":
                student.assignment_score,

            "Daily Study Hours":
                student.study_hours

        }])


        # =====================================================
        # 4. ML PREDICTION
        # =====================================================

        prediction = model.predict(input_data)[0]

        prediction = round(float(prediction), 2)


        # =====================================================
        # 5. RISK CALCULATION
        # =====================================================

        risk_data = calculate_risk(

            predicted_score=prediction,

            attendance=student.attendance,

            internal_test_1=student.internal_test_1,

            internal_test_2=student.internal_test_2,

            assignment_score=student.assignment_score,

            study_hours=student.study_hours

        )

        risk_level = risk_data["risk_level"]

        risk_reasons = risk_data["risk_reasons"]


        # =====================================================
        # 6. RECOMMENDATIONS
        # =====================================================

        recommendations = generate_recommendations(

            predicted_score=prediction,

            attendance=student.attendance,

            internal_test_1=student.internal_test_1,

            internal_test_2=student.internal_test_2,

            assignment_score=student.assignment_score,

            study_hours=student.study_hours

        )


        # =====================================================
        # 7. CONVERT LISTS TO TEXT FOR MYSQL
        # =====================================================

        risk_reasons_text = ", ".join(
            risk_reasons
        )

        recommendations_text = " ".join(
            recommendations
        )


        # =====================================================
        # 8. SAVE PREDICTION TO MYSQL
        # =====================================================

        insert_query = """

            INSERT INTO performance
            (
                student_id,
                attendance,
                assignment_marks,
                study_hours,
                internal_test_1,
                internal_test_2,
                predicted_score,
                risk_level,
                risk_reasons,
                recommendations
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
                %s,
                %s,
                %s
            )

        """


        values = (

            student.student_id,

            student.attendance,

            student.assignment_score,

            student.study_hours,

            student.internal_test_1,

            student.internal_test_2,

            prediction,

            risk_level,

            risk_reasons_text,

            recommendations_text

        )


        cursor.execute(
            insert_query,
            values
        )

        db.commit()


        # =====================================================
        # 9. GET INSERTED RECORD ID
        # =====================================================

        performance_id = cursor.lastrowid


        # =====================================================
        # 10. RETURN RESULT
        # =====================================================

        return {

            "success": True,

            "student_id":
                student.student_id,

            "student_name":
                existing_student["name"],

            "performance_id":
                performance_id,

            "predicted_score":
                prediction,

            "risk_level":
                risk_level,

            "risk_reasons":
                risk_reasons,

            "recommendations":
                recommendations,

            "message":
                "Prediction saved successfully to MySQL"

        }


    # =========================================================
    # HTTP ERROR
    # =========================================================

    except HTTPException:

        raise


    # =========================================================
    # OTHER ERROR
    # =========================================================

    except Exception as e:

        if db is not None:

            db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


    # =========================================================
    # CLOSE MYSQL
    # =========================================================

    finally:

        if cursor is not None:

            cursor.close()

        if db is not None:

            db.close()
