import pytest

from backend.risk_engine import calculate_risk


def test_high_risk():
    result = calculate_risk(
        predicted_score=40,
        attendance=50,
        internal_marks=30,
        assignment_marks=30,
        previous_marks=40
    )

    assert result["risk_level"] == "HIGH"


def test_medium_risk():
    result = calculate_risk(
        predicted_score=60,
        attendance=70,
        internal_marks=50,
        assignment_marks=50,
        previous_marks=55
    )

    assert result["risk_level"] == "MEDIUM"


def test_low_risk():
    result = calculate_risk(
        predicted_score=80,
        attendance=90,
        internal_marks=80,
        assignment_marks=85,
        previous_marks=80
    )

    assert result["risk_level"] == "LOW"


def test_invalid_predicted_score():
    with pytest.raises(ValueError):
        calculate_risk(
            predicted_score=120,
            attendance=80,
            internal_marks=70,
            assignment_marks=70,
            previous_marks=70
        )


def test_invalid_attendance():
    with pytest.raises(ValueError):
        calculate_risk(
            predicted_score=70,
            attendance=120,
            internal_marks=70,
            assignment_marks=70,
            previous_marks=70
        )


def test_predicted_score_boundary_50():
    result = calculate_risk(
        predicted_score=50,
        attendance=80,
        internal_marks=70,
        assignment_marks=70,
        previous_marks=70
    )

    assert result["risk_level"] == "LOW"


def test_predicted_score_boundary_65():
    result = calculate_risk(
        predicted_score=65,
        attendance=80,
        internal_marks=70,
        assignment_marks=70,
        previous_marks=70
    )

    assert result["risk_level"] == "LOW"


def test_attendance_boundary_60():
    result = calculate_risk(
        predicted_score=80,
        attendance=60,
        internal_marks=70,
        assignment_marks=70,
        previous_marks=70
    )

    assert result["risk_level"] == "LOW"


def test_attendance_boundary_75():
    result = calculate_risk(
        predicted_score=80,
        attendance=75,
        internal_marks=70,
        assignment_marks=70,
        previous_marks=70
    )

    assert result["risk_level"] == "LOW"


def test_negative_predicted_score():
    with pytest.raises(ValueError):
        calculate_risk(
            predicted_score=-10,
            attendance=80,
            internal_marks=70,
            assignment_marks=70,
            previous_marks=70
        )


def test_negative_attendance():
    with pytest.raises(ValueError):
        calculate_risk(
            predicted_score=70,
            attendance=-10,
            internal_marks=70,
            assignment_marks=70,
            previous_marks=70
        )


def test_invalid_input_type():
    with pytest.raises(ValueError):
        calculate_risk(
            predicted_score="seventy",
            attendance=80,
            internal_marks=70,
            assignment_marks=70,
            previous_marks=70
        )