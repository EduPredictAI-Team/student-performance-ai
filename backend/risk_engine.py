def calculate_risk(
    predicted_score,
    attendance,
    internal_marks,
    assignment_marks,
    previous_marks
):
    """
    Calculate student's academic risk.

    Returns:
        {
            "risk_level": "HIGH/MEDIUM/LOW",
            "risk_score": int,
            "reasons": list
        }
    """

    # Validate inputs
    values = {
        "predicted_score": predicted_score,
        "attendance": attendance,
        "internal_marks": internal_marks,
        "assignment_marks": assignment_marks,
        "previous_marks": previous_marks
    }

    for name, value in values.items():
        if value is None:
            raise ValueError(f"{name} cannot be None")

        if not isinstance(value, (int, float)):
            raise ValueError(f"{name} must be a number")

    if not 0 <= predicted_score <= 100:
        raise ValueError("predicted_score must be between 0 and 100")

    if not 0 <= attendance <= 100:
        raise ValueError("attendance must be between 0 and 100")

    if not 0 <= internal_marks <= 100:
        raise ValueError("internal_marks must be between 0 and 100")

    if not 0 <= assignment_marks <= 100:
        raise ValueError("assignment_marks must be between 0 and 100")

    if not 0 <= previous_marks <= 100:
        raise ValueError("previous_marks must be between 0 and 100")

    risk_score = 0
    reasons = []

    # Predicted score
    if predicted_score < 50:
        risk_score += 3
        reasons.append("Predicted score is below 50")

    elif predicted_score < 65:
        risk_score += 2
        reasons.append("Predicted score is below 65")

    # Attendance
    if attendance < 60:
        risk_score += 3
        reasons.append("Attendance is critically low")

    elif attendance < 75:
        risk_score += 2
        reasons.append("Attendance is below 75%")

    # Internal marks
    if internal_marks < 40:
        risk_score += 2
        reasons.append("Internal marks are low")

    # Assignment marks
    if assignment_marks < 40:
        risk_score += 1
        reasons.append("Assignment performance is low")

    # Previous performance
    if previous_marks < 50:
        risk_score += 2
        reasons.append("Previous academic performance is weak")

    # Final risk
    if risk_score >= 6:
        risk_level = "HIGH"

    elif risk_score >= 3:
        risk_level = "MEDIUM"

    else:
        risk_level = "LOW"

    return {
        "risk_level": risk_level,
        "risk_score": risk_score,
        "reasons": reasons
    }
    
    from backend.risk_engine import calculate_risk

result = calculate_risk(
    predicted_score=45,
    attendance=55,
    internal_marks=35,
    assignment_marks=50,
    previous_marks=42
)

print(result)