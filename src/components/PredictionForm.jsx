import { useState } from "react";
import "./PredictionForm.css";

function PredictionForm({ onPredict }) {
  const [formData, setFormData] = useState({
    student_id: "",
    attendance: "",
    internal_test_1: "",
    internal_test_2: "",
    assignment_score: "",
    study_hours: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.student_id === "" ||
      formData.attendance === "" ||
      formData.internal_test_1 === "" ||
      formData.internal_test_2 === "" ||
      formData.assignment_score === "" ||
      formData.study_hours === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    const data = {
      student_id: Number(formData.student_id),
      attendance: Number(formData.attendance),
      internal_test_1: Number(formData.internal_test_1),
      internal_test_2: Number(formData.internal_test_2),
      assignment_score: Number(formData.assignment_score),
      study_hours: Number(formData.study_hours),
    };

    console.log("Prediction Payload:", data);

    if (onPredict) {
      onPredict(data);
    }
  };

  const fields = [
    {
      name: "student_id",
      title: "Student ID",
      subtitle: "Unique student identification",
      icon: "◎",
      suffix: "ID",
      max: 999999,
      placeholder: "101",
    },
    {
      name: "attendance",
      title: "Attendance",
      subtitle: "Class attendance",
      icon: "◉",
      suffix: "%",
      max: 100,
      placeholder: "82",
    },
    {
      name: "internal_test_1",
      title: "Internal Test 1",
      subtitle: "First internal assessment",
      icon: "✦",
      suffix: "%",
      max: 100,
      placeholder: "75",
    },
    {
      name: "internal_test_2",
      title: "Internal Test 2",
      subtitle: "Second internal assessment",
      icon: "✧",
      suffix: "%",
      max: 100,
      placeholder: "78",
    },
    {
      name: "assignment_score",
      title: "Assignment Score",
      subtitle: "Assignment performance",
      icon: "◆",
      suffix: "%",
      max: 100,
      placeholder: "80",
    },
    {
      name: "study_hours",
      title: "Study Hours",
      subtitle: "Average study per day",
      icon: "◷",
      suffix: "hrs",
      max: 24,
      step: 0.5,
      placeholder: "4",
    },
  ];

  return (
    <div className="prediction-form-card">

      <div className="prediction-glow prediction-glow-one"></div>
      <div className="prediction-glow prediction-glow-two"></div>

      {/* ACADEMIC INDICATORS */}

      <div className="prediction-section-title">

        <span className="section-number">
          01
        </span>

        <div>
          <strong>
            Academic Indicators
          </strong>

          <small>
            Provide the student's latest performance data
          </small>
        </div>

      </div>

      {/* FORM */}

      <form onSubmit={handleSubmit}>

        <div className="prediction-fields">

          {fields.map((field, index) => (

            <div
              className="prediction-field-card"
              key={field.name}
            >

              <div className="field-number">
                0{index + 1}
              </div>

              <div className="field-icon">
                {field.icon}
              </div>

              <div className="field-content">

                <label htmlFor={field.name}>
                  {field.title}
                </label>

                <small>
                  {field.subtitle}
                </small>

                <div className="prediction-input-box">

                  <input
                    id={field.name}
                    type="number"
                    name={field.name}
                    min="0"
                    max={field.max}
                    step={field.step || 1}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />

                  <span>
                    {field.suffix}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* AI ANALYSIS INFO */}

        <div className="prediction-engine-box">

          <div className="engine-icon">
            ✦
          </div>

          <div className="engine-content">

            <strong>
              AI Early Warning Analysis
            </strong>

            <p>
              The prediction engine evaluates attendance,
              internal assessments, assignment performance
              and study patterns to estimate performance risk.
            </p>

          </div>

          <div className="engine-status">
            <span></span>
            Ready
          </div>

        </div>

        {/* PREDICT BUTTON */}

        <button
          type="submit"
          className="prediction-submit-button"
        >

          <span className="submit-left">

            <span className="submit-ai-icon">
              AI
            </span>

            <span>
              Predict Student Performance
            </span>

          </span>

          <span className="submit-arrow">
            →
          </span>

        </button>

      </form>

      {/* SECURITY FOOTER */}

      <div className="prediction-security">

        <span className="security-check">
          ✓
        </span>

        <span>
          Secure academic analysis
        </span>

        <i></i>

        <span>
          AI-powered prediction
        </span>

        <i></i>

        <span>
          Early warning system
        </span>

      </div>

    </div>
  );
}

export default PredictionForm;