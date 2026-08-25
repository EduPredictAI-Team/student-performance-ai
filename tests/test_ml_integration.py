from ml.real_predictor import predict_student
from backend.risk_engine import calculate_risk
from backend.recommendations import generate_recommendations


def test_real_ml_to_warning_system():

    attendance = 55
    internal_test_1 = 15
    internal_test_2 = 18
    assignment_score = 3
    study_hours = 1

    # 1. ML prediction
    predicted_score = predict_student(
        attendance,
        internal_test_1,
        internal_test_2,
        assignment_score,
        study_hours
    )

    # 2. Risk calculation
    risk = calculate_risk(
        predicted_score=predicted_score,
        attendance=attendance,
        internal_test_1=internal_test_1,
        internal_test_2=internal_test_2,
        assignment_score=assignment_score,
        study_hours=study_hours
    )

    # 3. Recommendations
    recommendations = generate_recommendations(
        predicted_score=predicted_score,
        attendance=attendance,
        internal_test_1=internal_test_1,
        internal_test_2=internal_test_2,
        assignment_score=assignment_score,
        study_hours=study_hours
    )

    # Basic integration checks
    assert isinstance(predicted_score, float)
    assert 0 <= predicted_score <= 100

    assert risk["risk_level"] in ["HIGH", "MEDIUM", "LOW"]
    assert isinstance(risk["risk_reasons"], list)

    assert isinstance(recommendations, list)
    assert len(recommendations) > 0