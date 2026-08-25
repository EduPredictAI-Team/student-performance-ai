from ml.real_predictor import predict_student
from backend.risk_engine import calculate_risk
from backend.recommendations import generate_recommendations


# ==========================================
# TEST STUDENT
# ==========================================

attendance = 55
internal_test_1 = 15
internal_test_2 = 18
assignment_score = 3
study_hours = 1


# ==========================================
# ML PREDICTION
# ==========================================

predicted_score = predict_student(
    attendance=attendance,
    internal_test_1=internal_test_1,
    internal_test_2=internal_test_2,
    assignment_score=assignment_score,
    study_hours=study_hours
)


# ==========================================
# RISK ANALYSIS
# ==========================================

risk = calculate_risk(
    predicted_score=predicted_score,
    attendance=attendance,
    internal_test_1=internal_test_1,
    internal_test_2=internal_test_2,
    assignment_score=assignment_score,
    study_hours=study_hours
)


# ==========================================
# RECOMMENDATIONS
# ==========================================

recommendations = generate_recommendations(
    predicted_score=predicted_score,
    attendance=attendance,
    internal_test_1=internal_test_1,
    internal_test_2=internal_test_2,
    assignment_score=assignment_score,
    study_hours=study_hours
)


# ==========================================
# DISPLAY RESULT
# ==========================================

print("================================")
print("STUDENT PERFORMANCE RESULT")
print("================================")

print("Attendance:", attendance)
print("Internal Test 1:", internal_test_1)
print("Internal Test 2:", internal_test_2)
print("Assignment Score:", assignment_score)
print("Study Hours:", study_hours)

print("\nPredicted Final Exam Score:", predicted_score)

print("\nRisk Level:", risk["risk_level"])

print("\nRisk Reasons:")

for reason in risk["risk_reasons"]:
    print("-", reason)

print("\nRecommendations:")

for recommendation in recommendations:
    print("-", recommendation)