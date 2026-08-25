def calculate_risk(
    predicted_score,
    attendance,
    internal_test_1,
    internal_test_2,
    assignment_score,
    study_hours
):
    """
    Calculate student's academic risk using the ML prediction
    and the same academic factors used by the ML model.

    Returns:
        {
            "risk_level": "HIGH/MEDIUM/LOW",
            "risk_reasons": list
        }
    """

    values = {
        "predicted_score": predicted_score,
        "attendance": attendance,
        "internal_test_1": internal_test_1,
        "internal_test_2": internal_test_2,
        "assignment_score": assignment_score,
        "study_hours": study_hours
    }

    # Validate input types
    for name, value in values.items():
        if value is None:
            raise ValueError(f"{name} cannot be None")

        if not isinstance(value, (int, float)):
            raise ValueError(f"{name} must be a number")

    # Validate ranges
    if not 0 <= predicted_score <= 100:
        raise ValueError("predicted_score must be between 0 and 100")

    if not 0 <= attendance <= 100:
        raise ValueError("attendance must be between 0 and 100")

    if not 0 <= internal_test_1 <= 40:
        raise ValueError("internal_test_1 must be between 0 and 40")

    if not 0 <= internal_test_2 <= 40:
        raise ValueError("internal_test_2 must be between 0 and 40")

    if not 0 <= assignment_score <= 10:
        raise ValueError("assignment_score must be between 0 and 10")

    if study_hours < 0:
        raise ValueError("study_hours cannot be negative")

    reasons = []

    # Attendance
    if attendance < 75:
        reasons.append("Low attendance")

    # Internal tests
    if internal_test_1 < 20:
        reasons.append("Low Internal Test 1 performance")

    if internal_test_2 < 20:
        reasons.append("Low Internal Test 2 performance")

    # Assignment
    if assignment_score < 5:
        reasons.append("Low assignment performance")

    # Study hours
    if study_hours < 2:
        reasons.append("Low daily study hours")

    # Predicted final score determines risk level
    if predicted_score < 50:
        risk_level = "HIGH"
    elif predicted_score < 65:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    # No reasons
    if not reasons:
        reasons.append("No major risk factors detected")

    return {
        "risk_level": risk_level,
        "risk_reasons": reasons
    }