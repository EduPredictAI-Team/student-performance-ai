
import { useNavigate, useParams } from "react-router-dom";
import"./StudentDetails.css";

function StudentDetails() {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const students = {
    101: {
      name: "Somnath Atta",
      department: "CSE",
      semester: "4th Semester",
      attendance: 82,
      internal: 78,
      assignment: 80,
      quiz: 75,
      previous: 74,
      study: 4,
      score: 78,
      risk: "Low",
    },

    102: {
      name: "Ayan Das Adhikari",
      department: "CSE",
      semester: "4th Semester",
      attendance: 68,
      internal: 61,
      assignment: 65,
      quiz: 58,
      previous: 62,
      study: 3,
      score: 61,
      risk: "Medium",
    },

    103: {
      name: "Jeet Goray",
      department: "IT",
      semester: "4th Semester",
      attendance: 45,
      internal: 39,
      assignment: 42,
      quiz: 40,
      previous: 44,
      study: 2,
      score: 39,
      risk: "High",
    },

    104: {
      name: "Sukesh Chakraborty",
      department: "CSE",
      semester: "4th Semester",
      attendance: 91,
      internal: 88,
      assignment: 90,
      quiz: 86,
      previous: 87,
      study: 5,
      score: 88,
      risk: "Low",
    },

    105: {
      name: "Subhamoy Roy",
      department: "IT",
      semester: "4th Semester",
      attendance: 76,
      internal: 72,
      assignment: 74,
      quiz: 70,
      previous: 71,
      study: 3,
      score: 72,
      risk: "Medium",
    },

    106: {
      name: "Subhamoy Roy",
      department: "IT",
      semester: "4th Semester",
      attendance: 88,
      internal: 84,
      assignment: 86,
      quiz: 83,
      previous: 82,
      study: 4,
      score: 84,
      risk: "Low",
    },
  };

  const student = students[studentId] || students[101];

  const getRiskClass = (risk) => {
    if (risk === "High") return "risk-high";
    if (risk === "Medium") return "risk-medium";
    return "risk-low";
  };

  return (
    <div className="student-details-page">

      {/* ================= HEADER ================= */}

      <section className="student-details-header">

        <div>
          <span className="page-eyebrow">
            STUDENT INTELLIGENCE
          </span>

          <h1>Student Details</h1>

          <p>
            AI-powered academic performance and risk analysis.
          </p>
        </div>

        <button
          className="student-details-back"
          onClick={() => navigate("/students")}
        >
          ← Back to Students
        </button>

      </section>


      {/* ================= STUDENT HERO ================= */}

      <section className="student-profile-hero glass-3d">

        <div className="student-large-avatar">
          {student.name.charAt(0).toUpperCase()}
        </div>

        <div className="student-profile-main">

          <div className="student-online-badge">
            <i></i>
            ACTIVE STUDENT
          </div>

          <h2>{student.name}</h2>

          <p>
            Student ID #{studentId}
          </p>

          <div className="student-profile-tags">

            <span>
              🎓 {student.department}
            </span>

            <span>
              📚 {student.semester}
            </span>

            <span>
              ◷ {student.study} hrs/day
            </span>

          </div>

        </div>

        <div className="student-risk-summary">

          <span>AI RISK LEVEL</span>

          <strong className={getRiskClass(student.risk)}>
            {student.risk}
          </strong>

          <small>
            Prediction Score {student.score}%
          </small>

        </div>

      </section>


      {/* ================= STATISTICS ================= */}

      <section className="student-detail-stat-grid">

        <div className="student-detail-stat purple">
          <span>AI Prediction</span>
          <strong>{student.score}%</strong>
          <small>Predicted performance</small>
        </div>

        <div className="student-detail-stat green">
          <span>Attendance</span>
          <strong>{student.attendance}%</strong>
          <small>Class attendance</small>
        </div>

        <div className="student-detail-stat orange">
          <span>Internal Marks</span>
          <strong>{student.internal}%</strong>
          <small>Internal assessment</small>
        </div>

        <div className="student-detail-stat cyan">
          <span>Previous Marks</span>
          <strong>{student.previous}%</strong>
          <small>Previous academic score</small>
        </div>

      </section>


      {/* ================= MAIN GRID ================= */}

      <section className="student-detail-grid">

        {/* PERFORMANCE */}

        <div className="student-detail-card glass-3d">

          <div className="student-detail-card-title">

            <div className="student-title-icon">
              ◈
            </div>

            <div>
              <span>ACADEMIC ANALYSIS</span>
              <h2>Academic Performance</h2>
              <p>
                Current performance indicators
              </p>
            </div>

          </div>


          <div className="student-metrics">

            <Metric
              label="Attendance"
              value={student.attendance}
            />

            <Metric
              label="Internal Marks"
              value={student.internal}
            />

            <Metric
              label="Assignment Marks"
              value={student.assignment}
            />

            <Metric
              label="Quiz Performance"
              value={student.quiz}
            />

            <Metric
              label="Previous Marks"
              value={student.previous}
            />

          </div>

        </div>


        {/* AI RISK */}

        <div className="student-detail-card glass-3d">

          <div className="student-detail-card-title">

            <div className="student-title-icon ai">
              AI
            </div>

            <div>
              <span>AI INTELLIGENCE</span>
              <h2>Risk Assessment</h2>
              <p>
                Machine-learning based prediction
              </p>
            </div>

          </div>


          <div className={`student-risk-result ${getRiskClass(student.risk)}`}>

            <span>
              CURRENT RISK
            </span>

            <strong>
              {student.risk}
            </strong>

            <small>
              Prediction score: {student.score}%
            </small>

          </div>


          <div className="student-risk-factors">

            <h3>
              ✦ Risk Factors
            </h3>

            {student.risk === "High" && (
              <>
                <p>⚠ Low attendance</p>
                <p>⚠ Low internal marks</p>
                <p>⚠ Previous performance needs attention</p>
              </>
            )}

            {student.risk === "Medium" && (
              <>
                <p>• Attendance needs improvement</p>
                <p>• Moderate academic performance</p>
                <p>• Regular monitoring recommended</p>
              </>
            )}

            {student.risk === "Low" && (
              <>
                <p>✓ Good attendance</p>
                <p>✓ Strong academic performance</p>
                <p>✓ Stable learning pattern</p>
              </>
            )}

          </div>

        </div>

      </section>


      {/* ================= AI RECOMMENDATION ================= */}

      <section className="student-ai-recommendation">

        <div className="recommendation-ai-icon">
          ✦
        </div>

        <div>

          <span>
            AI RECOMMENDATION
          </span>

          <h2>
            {student.risk === "High"
              ? "Immediate academic intervention recommended"
              : student.risk === "Medium"
              ? "Regular monitoring is recommended"
              : "Student performance is currently stable"
            }
          </h2>

          <p>
            {student.risk === "High"
              ? "Focus on improving attendance, internal assessments, assignments and regular study habits."
              : student.risk === "Medium"
              ? "Encourage consistent attendance, additional practice and regular academic monitoring."
              : "Continue the current study routine and maintain consistent attendance and academic performance."
            }
          </p>

        </div>

      </section>


      {/* ================= ACTIONS ================= */}

      <div className="student-detail-actions">

        <button
          className="student-action-secondary"
          onClick={() => navigate("/students")}
        >
          ← All Students
        </button>

        <button
          className="student-action-primary"
          onClick={() => navigate("/analytics")}
        >
          View AI Analytics →
        </button>

      </div>

    </div>
  );
}


/* =========================================================
   PERFORMANCE METRIC
   ========================================================= */

function Metric({ label, value }) {
  return (
    <div className="student-metric">

      <div className="student-metric-top">

        <span>{label}</span>

        <strong>
          {value}%
        </strong>

      </div>

      <div className="student-metric-bar">

        <span
          style={{
            width: `${value}%`,
          }}
        ></span>

      </div>

    </div>
  );
}

export default StudentDetails;