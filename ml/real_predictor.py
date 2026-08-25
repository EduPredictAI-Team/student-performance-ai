import joblib
import pandas as pd

# ==========================================
# LOAD REAL DATA MODEL
# ==========================================

model = joblib.load("ml/real_student_model.pkl")


# ==========================================
# PREDICTION FUNCTION
# ==========================================

def predict_student(
    attendance,
    internal_test_1,
    internal_test_2,
    assignment_score,
    study_hours
):

    # Create input data
    student_data = pd.DataFrame([{
        "Attendance (%)": attendance,
        "Internal Test 1 (out of 40)": internal_test_1,
        "Internal Test 2 (out of 40)": internal_test_2,
        "Assignment Score (out of 10)": assignment_score,
        "Daily Study Hours": study_hours
    }])

    # Make prediction
    prediction = model.predict(student_data)[0]

    return round(float(prediction), 2)


# ==========================================
# TEST THE PREDICTOR
# ==========================================

if __name__ == "__main__":

    predicted_score = predict_student(
        attendance=85,
        internal_test_1=32,
        internal_test_2=34,
        assignment_score=8,
        study_hours=3
    )

    print("================================")
    print("REAL DATA STUDENT PREDICTION")
    print("================================")

    print("Attendance:", 85)
    print("Internal Test 1:", 32)
    print("Internal Test 2:", 34)
    print("Assignment Score:", 8)
    print("Study Hours:", 3)

    print("\nPredicted Final Exam Score:", predicted_score)