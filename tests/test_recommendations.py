from backend.recommendations import generate_recommendations


def test_high_risk_recommendations():
    reasons = [
        "Predicted score is below 50",
        "Attendance is critically low",
        "Internal marks are low"
    ]

    result = generate_recommendations("HIGH", reasons)

    assert len(result) > 0
    assert any("mentor" in item.lower() for item in result)


def test_medium_risk_recommendations():
    result = generate_recommendations(
        "MEDIUM",
        ["Predicted score is below 65"]
    )

    assert len(result) > 0


def test_low_risk_recommendations():
    result = generate_recommendations(
        "LOW",
        []
    )

    assert len(result) > 0


def test_invalid_risk_level():
    try:
        generate_recommendations("INVALID", [])
        assert False
    except ValueError:
        assert True