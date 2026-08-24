# Student Performance API Contract

## Base URL

Local development:

http://127.0.0.1:8000

---

# POST /predict

Predict a student's final performance, calculate risk, generate recommendations, and save the prediction to MySQL.

## Request

Content-Type:

application/json

Example:

{
  "student_id": 1,
  "attendance": 85,
  "internal_test_1": 32,
  "internal_test_2": 34,
  "assignment_score": 8,
  "study_hours": 3
}

## Request Fields

| Field | Type | Description |
|---|---|---|
| student_id | integer | ID of an existing student in MySQL |
| attendance | float | Student attendance percentage |
| internal_test_1 | float | Internal Test 1 marks out of 40 |
| internal_test_2 | float | Internal Test 2 marks out of 40 |
| assignment_score | float | Assignment score out of 10 |
| study_hours | float | Daily study hours |

---

## Successful Response

HTTP 200

Example:

{
  "success": true,
  "student_id": 1,
  "student_name": "Student Name",
  "performance_id": 1,
  "predicted_score": 72.5,
  "risk_level": "LOW",
  "risk_reasons": [
    "Risk reason"
  ],
  "recommendations": [
    "Recommendation"
  ],
  "message": "Prediction saved successfully to MySQL"
}

---

# GET /students

Returns students stored in the MySQL database.

## Successful Response

HTTP 200

Example:

[
  {
    "id": 1,
    "name": "Student Name"
  }
]

---

# ML Model Features

The backend sends these exact feature names to Jeet's trained model:

- Attendance (%)
- Internal Test 1 (out of 40)
- Internal Test 2 (out of 40)
- Assignment Score (out of 10)
- Daily Study Hours

The frontend should use the API field names from the `/predict` request and should not directly interact with the `.pkl` model.

---

# Risk Levels

The backend determines the risk level from the predicted final score:

| Predicted Score | Risk Level |
|---|---|
| Less than 50 | HIGH |
| 50 to less than 65 | MEDIUM |
| 65 or higher | LOW |

The backend also generates risk reasons from the student's input:

| Condition | Risk Reason |
|---|---|
| Attendance < 75 | Low attendance |
| Internal Test 1 < 20 | Low Internal Test 1 performance |
| Internal Test 2 < 20 | Low Internal Test 2 performance |
| Assignment score < 5 | Low assignment performance |
| Study hours < 2 | Low daily study hours |

If none of these conditions apply, the backend returns:

`No major risk factors detected`

---

# Integration Flow

Frontend
    ↓
POST /predict
    ↓
FastAPI Backend
    ↓
Check student in MySQL
    ↓
Jeet's ML Model
    ↓
Risk Engine
    ↓
Recommendation Engine
    ↓
Save prediction to MySQL
    ↓
Return JSON response
    ↓
Frontend displays result
