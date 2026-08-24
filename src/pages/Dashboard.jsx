import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PredictionForm from "../components/PredictionForm";
import Chart from "../components/Chart";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  /* =========================================================
     THEME
     ========================================================= */

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("edupredictai-theme") !== "light";
  });

  useEffect(() => {
  const theme =
    localStorage.getItem("edupredictai-theme");

  setIsDarkMode(theme === "dark");
}, []);

  /* =========================================================
     PREDICTION STATE
     ========================================================= */

  const [prediction, setPrediction] = useState({
    score: 62,
    risk: "Medium",
    reason:
      "Student performance requires regular monitoring.",
    confidence: 78,
  });

  /* =========================================================
     STUDENTS
     ========================================================= */

  const students = [
    {
      id: 101,
      name: "Somnath Atta",
      department: "Computer Science",
      attendance: 82,
      performance: 78,
      risk: "Low",
    },
    {
      id: 102,
      name: "Ayan Das Adhikari",
      department: "Computer Science",
      attendance: 68,
      performance: 61,
      risk: "Medium",
    },
    {
      id: 103,
      name: "Jeet Goray",
      department: "Information Technology",
      attendance: 45,
      performance: 39,
      risk: "High",
    },
    {
      id: 104,
      name: "Sukesh Chakraborty",
      department: "Computer Science",
      attendance: 91,
      performance: 88,
      risk: "Low",
    },
    {
      id: 105,
      name: "Subhamoy Roy",
      department: "Information Technology",
      attendance: 76,
      performance: 72,
      risk: "Medium",
    },
  ];

  /* =========================================================
     CHART DATA
     ========================================================= */

  const chartData = [
    { name: "Jan", performance: 62 },
    { name: "Feb", performance: 66 },
    { name: "Mar", performance: 69 },
    { name: "Apr", performance: 73 },
    { name: "May", performance: 76 },
    { name: "Jun", performance: 81 },
  ];

  /* =========================================================
     AI PREDICTION
     ========================================================= */

  const handlePrediction = (data) => {
  const average =
    data.attendance * 0.25 +
    data.internal_test_1 * 0.2 +
    data.internal_test_2 * 0.2 +
    data.assignment_score * 0.25 +
    Math.min(data.study_hours * 5, 50) * 0.1;

  const score = Math.round(
    Math.min(Math.max(average, 0), 100)
  );

  let risk = "Low";
  let reason =
    "Student performance is currently stable.";
  let confidence = 92;

  if (score < 50) {
    risk = "High";
    confidence = 65;

    reason =
      "Low performance indicators detected. Immediate academic attention is recommended.";
  } else if (score < 70) {
    risk = "Medium";
    confidence = 78;

    reason =
      "Some performance indicators need monitoring. Regular academic support is recommended.";
  }

  setPrediction({
    score,
    risk,
    reason,
    confidence,
  });
};

  /* =========================================================
     STUDENT INITIAL
     ========================================================= */

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  /* =========================================================
     DASHBOARD
     ========================================================= */

  return (
    <div
      className={`premium-dashboard ${
        isDarkMode
          ? "dashboard-dark"
          : "dashboard-light"
      }`}
    >

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="dashboard-hero">

        <div className="hero-content">

          <div className="hero-badge">
            <span className="live-dot"></span>
            AI STUDENT ANALYTICS
          </div>

          <h1>
            Student
            <span> Performance</span>
          </h1>

          <p>
            Monitor academic performance, detect risks and
            support students with intelligent AI-powered insights.
          </p>

        </div>

        <div className="hero-admin-card">

          <div className="hero-admin-avatar">
            A
          </div>

          <div>
            <small>WELCOME BACK</small>
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/profile")}
          >
            →
          </button>

        </div>

      </section>


      {/* =====================================================
          STATISTICS
          ===================================================== */}

      <section className="premium-stat-grid">

        <div className="premium-dashboard-stat stat-blue">

          <div className="dashboard-stat-top">

            <div className="dashboard-stat-icon">
              👥
            </div>

            <span className="stat-trend positive">
              +12%
            </span>

          </div>

          <span className="dashboard-stat-label">
            Total Students
          </span>

          <strong>250</strong>

          <small>
            Registered students
          </small>

        </div>


        <div className="premium-dashboard-stat stat-purple">

          <div className="dashboard-stat-top">

            <div className="dashboard-stat-icon">
              ◈
            </div>

            <span className="stat-trend positive">
              +8%
            </span>

          </div>

          <span className="dashboard-stat-label">
            Average Marks
          </span>

          <strong>72%</strong>

          <small>
            Overall performance
          </small>

        </div>


        <div className="premium-dashboard-stat stat-cyan">

          <div className="dashboard-stat-top">

            <div className="dashboard-stat-icon">
              ✓
            </div>

            <span className="stat-trend positive">
              +5%
            </span>

          </div>

          <span className="dashboard-stat-label">
            Average Attendance
          </span>

          <strong>78%</strong>

          <small>
            This semester
          </small>

        </div>


        <div className="premium-dashboard-stat stat-red">

          <div className="dashboard-stat-top">

            <div className="dashboard-stat-icon">
              !
            </div>

            <span className="stat-trend negative">
              -12%
            </span>

          </div>

          <span className="dashboard-stat-label">
            Students At Risk
          </span>

          <strong>32</strong>

          <small>
            Need attention
          </small>

        </div>

      </section>


      {/* =====================================================
          CHART + RISK
          ===================================================== */}

      <section className="dashboard-analysis-grid">

        {/* PERFORMANCE */}

        <div className="premium-dashboard-card performance-card">

          <div className="dashboard-card-header">

            <div>

              <span className="card-kicker">
                PERFORMANCE TREND
              </span>

              <h2>
                Student Performance
              </h2>

              <p>
                Average marks throughout the semester
              </p>

            </div>

            <div className="year-pill">
              2026
            </div>

          </div>

          <div className="dashboard-chart-area">
            <Chart data={chartData} />
          </div>

        </div>


        {/* RISK OVERVIEW */}

        <div className="premium-dashboard-card risk-overview-card">

          <div className="dashboard-card-header">

            <div>

              <span className="card-kicker">
                AI INSIGHT
              </span>

              <h2>
                Risk Overview
              </h2>

              <p>
                Current student risk distribution
              </p>

            </div>

            <div className="ai-mini-badge">
              AI
            </div>

          </div>


          <div className="risk-big-number">

            <div className="risk-ring">

              <div>

                <strong>
                  32
                </strong>

                <span>
                  At Risk
                </span>

              </div>

            </div>

          </div>


          <div className="risk-distribution">

            <div className="risk-item">

              <span>
                <i className="risk-dot high"></i>
                High Risk
              </span>

              <strong>
                32
              </strong>

            </div>


            <div className="risk-item">

              <span>
                <i className="risk-dot medium"></i>
                Medium Risk
              </span>

              <strong>
                51
              </strong>

            </div>


            <div className="risk-item">

              <span>
                <i className="risk-dot low"></i>
                Low Risk
              </span>

              <strong>
                167
              </strong>

            </div>

          </div>


          <button
            className="ai-analysis-button"
            onClick={() => navigate("/analytics")}
          >

            <span>
              View AI Analysis
            </span>

            <b>
              →
            </b>

          </button>

        </div>

      </section>


      {/* =====================================================
          AI PERFORMANCE ENGINE
          ===================================================== */}

      <section className="ai-engine-section">

        <div className="ai-engine-heading">

          <div className="ai-engine-icon">
            AI
          </div>

          <div>

            <span>
              AI PERFORMANCE ENGINE
            </span>

            <h2>
              Student Performance Prediction
            </h2>

            <p>
              Enter academic indicators to generate an
              AI-powered performance prediction and
              early-risk assessment.
            </p>

          </div>

          <div className="engine-status">

            <i></i>

            AI ENGINE ONLINE

          </div>

        </div>


        <div className="prediction-layout">

          {/* FORM */}

          <div className="prediction-form-wrapper">

            <PredictionForm
              onPredict={handlePrediction}
            />

          </div>


          {/* RESULT */}

          <div className="prediction-result-wrapper">

            <div className="prediction-result-top">

              <span>
                AI RISK ASSESSMENT
              </span>

              <div className="result-ai">
                AI
              </div>

            </div>


            <h3>
              Prediction Result
            </h3>


            {/* SCORE */}

            <div className="prediction-score-ring">

              <div>

                <strong>
                  {prediction.score}%
                </strong>

                <span>
                  Score
                </span>

              </div>

            </div>


            {/* RISK */}

            <div
              className={`prediction-risk ${prediction.risk.toLowerCase()}`}
            >

              <span>
                Risk Level:
              </span>

              <strong>
                {prediction.risk}
              </strong>

            </div>


            {/* CONFIDENCE */}

            <div className="prediction-confidence">

              <span>
                AI Confidence
              </span>

              <strong>
                {prediction.confidence}%
              </strong>

            </div>


            {/* REASON */}

            <p className="prediction-message">
              {prediction.reason}
            </p>


            {/* RECOMMENDATION */}

            <div className="recommendation-box">

              <span>
                ✦
              </span>

              <div>

                <strong>
                  AI Recommendation
                </strong>

                <p>
                  {prediction.risk === "High"
                    ? "Immediate academic support is recommended. Focus on attendance, assignments and upcoming assessments."
                    : prediction.risk === "Medium"
                    ? "Regular monitoring is recommended. Improve attendance and maintain consistent academic performance."
                    : "Student performance is stable. Continue the current academic routine and maintain consistency."}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STUDENT MONITORING
          ===================================================== */}

      <section className="premium-dashboard-card student-monitoring-card">

        <div className="dashboard-card-header">

          <div>

            <span className="card-kicker">
              STUDENT MONITORING
            </span>

            <h2>
              Recent Students
            </h2>

            <p>
              Latest student performance overview
            </p>

          </div>


          <button
            className="view-all-students"
            onClick={() => navigate("/students")}
          >

            View All

            <span>
              →
            </span>

          </button>

        </div>


        <div className="premium-student-table">

          {/* TABLE HEADER */}

          <div className="student-table-head">

            <span>
              Student
            </span>

            <span>
              Department
            </span>

            <span>
              Attendance
            </span>

            <span>
              Performance
            </span>

            <span>
              Risk
            </span>

            <span>
              Action
            </span>

          </div>


          {/* STUDENTS */}

          {students.map((student) => (

            <div
              className="premium-student-row"
              key={student.id}
            >

              <div className="student-profile">

                <div className="premium-student-avatar">
                  {getInitial(student.name)}
                </div>

                <div>

                  <strong>
                    {student.name}
                  </strong>

                  <small>
                    ID #{student.id}
                  </small>

                </div>

              </div>


              <span className="student-department">
                {student.department}
              </span>


              <strong className="student-percentage">
                {student.attendance}%
              </strong>


              <div className="student-performance">

                <strong>
                  {student.performance}%
                </strong>

                <div>

                  <span
                    style={{
                      width: `${student.performance}%`,
                    }}
                  ></span>

                </div>

              </div>


              <span
                className={`premium-risk-badge ${student.risk.toLowerCase()}`}
              >
                {student.risk}
              </span>


              <button
                className="student-view-button"
                onClick={() =>
                  navigate(`/students/${student.id}`)
                }
              >
                View
              </button>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;