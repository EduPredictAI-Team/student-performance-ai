def generate_recommendations(
    predicted_score,
    attendance,
    internal_test_1,
    internal_test_2,
    assignment_score,
    study_hours
):
    """
    Generate academic recommendations using the same
    inputs used by the ML model and risk engine.
    """

    recommendations = []

    if attendance < 75:
        recommendations.append(
            "Improve class attendance."
        )

    if internal_test_1 < 20:
        recommendations.append(
            "Focus more on Internal Test 1 topics."
        )

    if internal_test_2 < 20:
        recommendations.append(
            "Focus more on Internal Test 2 topics."
        )

    if assignment_score < 5:
        recommendations.append(
            "Complete assignments regularly."
        )

    if study_hours < 2:
        recommendations.append(
            "Increase daily study consistency."
        )

    if predicted_score < 50:
        recommendations.append(
            "Consider speaking with the faculty advisor for academic support."
        )

    if not recommendations:
        recommendations.append(
            "Maintain your current study habits and performance."
        )

    return recommendations