from backend.recommendations import generate_recommendations


def test_high_risk_recommendations():
    result = generate_recommendations(
        predicted_score=40,
        attendance=50,
        internal_test_1=15,
        internal_test_2=18,
        assignment_score=3,
        study_hours=1
    )

    assert len(result) > 0
    assert "Improve class attendance." in result
    assert "Focus more on Internal Test 1 topics." in result
    assert "Focus more on Internal Test 2 topics." in result


def test_medium_risk_recommendations():
    result = generate_recommendations(
        predicted_score=60,
        attendance=80,
        internal_test_1=25,
        internal_test_2=25,
        assignment_score=7,
        study_hours=3
    )

    assert len(result) > 0


def test_low_risk_recommendations():
    result = generate_recommendations(
        predicted_score=80,
        attendance=90,
        internal_test_1=30,
        internal_test_2=30,
        assignment_score=8,
        study_hours=4
    )

    assert result == [
        "Maintain your current study habits and performance."
    ]


def test_low_attendance_recommendation():
    result = generate_recommendations(
        predicted_score=80,
        attendance=60,
        internal_test_1=30,
        internal_test_2=30,
        assignment_score=8,
        study_hours=3
    )

    assert "Improve class attendance." in result


def test_internal_test_recommendations():
    result = generate_recommendations(
        predicted_score=80,
        attendance=90,
        internal_test_1=15,
        internal_test_2=18,
        assignment_score=8,
        study_hours=3
    )

    assert "Focus more on Internal Test 1 topics." in result
    assert "Focus more on Internal Test 2 topics." in result


def test_assignment_recommendation():
    result = generate_recommendations(
        predicted_score=80,
        attendance=90,
        internal_test_1=30,
        internal_test_2=30,
        assignment_score=3,
        study_hours=3
    )

    assert "Complete assignments regularly." in result


def test_study_hours_recommendation():
    result = generate_recommendations(
        predicted_score=80,
        attendance=90,
        internal_test_1=30,
        internal_test_2=30,
        assignment_score=8,
        study_hours=1
    )

    assert "Increase daily study consistency." in result


def test_low_predicted_score_recommendation():
    result = generate_recommendations(
        predicted_score=40,
        attendance=90,
        internal_test_1=30,
        internal_test_2=30,
        assignment_score=8,
        study_hours=3
    )

    assert any(
        "faculty advisor" in recommendation
        for recommendation in result
    )