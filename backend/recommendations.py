def generate_recommendations(risk_level, reasons):
    """
    Generate recommendations based on student's risk level
    and identified risk reasons.
    """

    recommendations = []

    if risk_level == "HIGH":
        recommendations.append(
            "Meet the faculty or academic mentor as soon as possible."
        )
        recommendations.append(
            "Create a daily study plan and prioritize weak subjects."
        )

    elif risk_level == "MEDIUM":
        recommendations.append(
            "Increase weekly study time and monitor academic progress."
        )
        recommendations.append(
            "Focus on subjects where performance is below average."
        )

    elif risk_level == "LOW":
        recommendations.append(
            "Maintain your current study routine and academic performance."
        )

    else:
        raise ValueError("Invalid risk level")

    for reason in reasons:

        if "Attendance" in reason:
            recommendations.append(
                "Improve class attendance and avoid unnecessary absences."
            )

        elif "Internal marks" in reason:
            recommendations.append(
                "Practice more for internal examinations and class tests."
            )

        elif "Assignment" in reason:
            recommendations.append(
                "Complete assignments on time and improve assignment quality."
            )

        elif "Previous academic performance" in reason:
            recommendations.append(
                "Review previous weak topics and revise them regularly."
            )

        elif "Predicted score" in reason:
            recommendations.append(
                "Increase revision and practice previous examination questions."
            )

    return list(dict.fromkeys(recommendations))

from backend.recommendations import generate_recommendations

result = generate_recommendations(
    "HIGH",
    [
        "Predicted score is below 50",
        "Attendance is critically low",
        "Internal marks are low"
    ]
)

print(result)