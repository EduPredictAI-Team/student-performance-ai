import pytest

from backend.risk_engine import calculate_risk


def test_high_risk():
    result = calculate_risk(
        predicted_score=40,
        attendance=50,
        internal_test_1=15,
        internal_test_2=18,
        assignment_score=3,
        study_hours=1
    )

    assert result["risk_level"] == "HIGH"
    assert len(result["risk_reasons"]) > 0


def test_medium_risk():
    result = calculate_risk(
        predicted_score=60,
        attendance=80,
        internal_test_1=25,
        internal_test_2=25,
        assignment_score=7,
        study_hours=3
    )

    assert result["risk_level"] == "MEDIUM"


def test_low_risk():
    result = calculate_risk(
        predicted_score=80,
        attendance=90,
        internal_test_1=30,
        internal_test_2=32,
        assignment_score=8,
        study_hours=4
    )

    assert result["risk_level"] == "LOW"


def test_invalid_predicted_score():
    with pytest.raises(ValueError):
        calculate_risk(
            predicted_score=120,
            attendance=80,
            internal_test_1=30,
            internal_test_2=30,
            assignment_score=8,
            study_hours=3
        )


def test_invalid_attendance():
    with pytest.raises(ValueError):
        calculate_risk(
            predicted_score=70,
            attendance=120,
            internal_test_1=30,
            internal_test_2=30,
            assignment_score=8,
            study_hours=3
        )


def test_predicted_score_boundary_50():
    result = calculate_risk(
        predicted_score=50,
        attendance=80,
        internal_test_1=30,
        internal_test_2=30,
        assignment_score=8,
        study_hours=3
    )

    assert result["risk_level"] == "MEDIUM"


def test_predicted_score_boundary_65():
    result = calculate_risk(
        predicted_score=65,
        attendance=80,
        internal_test_1=30,
        internal_test_2=30,
        assignment_score=8,
        study_hours=3
    )

    assert result["risk_level"] == "LOW"


def test_attendance_boundary_75():
    result = calculate_risk(
        predicted_score=80,
        attendance=75,
        internal_test_1=30,
        internal_test_2=30,
        assignment_score=8,
        study_hours=3
    )

    assert "Low attendance" not in result["risk_reasons"]


def test_low_attendance():
    result = calculate_risk(
        predicted_score=80,
        attendance=70,
        internal_test_1=30,
        internal_test_2=30,
        assignment_score=8,
        study_hours=3
    )

    assert "Low attendance" in result["risk_reasons"]


def test_low_internal_test_1():
    result = calculate_risk(
        predicted_score=80,
        attendance=90,
        internal_test_1=15,
        internal_test_2=30,
        assignment_score=8,
        study_hours=3
    )

    assert "Low Internal Test 1 performance" in result["risk_reasons"]


def test_low_internal_test_2():
    result = calculate_risk(
        predicted_score=80,
        attendance=90,
        internal_test_1=30,
        internal_test_2=15,
        assignment_score=8,
        study_hours=3
    )

    assert "Low Internal Test 2 performance" in result["risk_reasons"]


def test_low_assignment():
    result = calculate_risk(
        predicted_score=80,
        attendance=90,
        internal_test_1=30,
        internal_test_2=30,
        assignment_score=3,
        study_hours=3
    )

    assert "Low assignment performance" in result["risk_reasons"]


def test_low_study_hours():
    result = calculate_risk(
        predicted_score=80,
        attendance=90,
        internal_test_1=30,
        internal_test_2=30,
        assignment_score=8,
        study_hours=1
    )

    assert "Low daily study hours" in result["risk_reasons"]


def test_negative_predicted_score():
    with pytest.raises(ValueError):
        calculate_risk(
            predicted_score=-10,
            attendance=80,
            internal_test_1=30,
            internal_test_2=30,
            assignment_score=8,
            study_hours=3
        )


def test_negative_attendance():
    with pytest.raises(ValueError):
        calculate_risk(
            predicted_score=70,
            attendance=-10,
            internal_test_1=30,
            internal_test_2=30,
            assignment_score=8,
            study_hours=3
        )


def test_invalid_input_type():
    with pytest.raises(ValueError):
        calculate_risk(
            predicted_score="seventy",
            attendance=80,
            internal_test_1=30,
            internal_test_2=30,
            assignment_score=8,
            study_hours=3
        )