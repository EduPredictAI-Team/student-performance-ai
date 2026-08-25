import { useState } from "react";
import { useNavigate } from "react-router-dom";
import"./Students.css";

const students = [
  {
    id: "101",
    name: "Somnath Atta",
    department: "Computer Science",
    attendance: 82,
    performance: 78,
    risk: "Low",
  },
  {
    id: "102",
    name: "Ayan Das Adhikari",
    department: "Computer Science",
    attendance: 68,
    performance: 61,
    risk: "Medium",
  },
  {
    id: "103",
    name: "Jeet Goray",
    department: "Information Technology",
    attendance: 45,
    performance: 39,
    risk: "High",
  },
  {
    id: "104",
    name: "Sukesh Chakraborty",
    department: "Computer Science",
    attendance: 91,
    performance: 88,
    risk: "Low",
  },
  {
    id: "105",
    name: "Subhamoy Roy",
    department: "Information Technology",
    attendance: 76,
    performance: 72,
    risk: "Medium",
  },
];

function Students() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.id.includes(search);

    const matchesRisk =
      riskFilter === "All" || student.risk === riskFilter;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="students-page">

      {/* HERO */}

      <section className="students-hero">

        <div>
          <span className="page-eyebrow">
            STUDENT MANAGEMENT
          </span>

          <h1>Students</h1>

          <p>
            Monitor student performance, attendance and
            academic risk.
          </p>
        </div>

        <button className="add-student-button">
          <span>+</span>
          Add Student
        </button>

      </section>


      {/* STAT CARDS */}

      <section className="student-stat-grid">

        <div className="student-stat-card blue">
          <div className="student-stat-icon">♙</div>

          <div>
            <span>Total Students</span>
            <strong>250</strong>
            <small>Registered students</small>
          </div>
        </div>

        <div className="student-stat-card green">
          <div className="student-stat-icon">✓</div>

          <div>
            <span>Low Risk</span>
            <strong>167</strong>
            <small>Performing well</small>
          </div>
        </div>

        <div className="student-stat-card orange">
          <div className="student-stat-icon">!</div>

          <div>
            <span>Medium Risk</span>
            <strong>51</strong>
            <small>Need monitoring</small>
          </div>
        </div>

        <div className="student-stat-card red">
          <div className="student-stat-icon">⚠</div>

          <div>
            <span>High Risk</span>
            <strong>32</strong>
            <small>Need attention</small>
          </div>
        </div>

      </section>


      {/* TABLE PANEL */}

      <section className="students-table-panel">

        <div className="students-toolbar">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="All">All Risk Levels</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>

        </div>


        {/* TABLE */}

        <div className="students-table">

          <div className="students-table-head">
            <span>Student</span>
            <span>Department</span>
            <span>Attendance</span>
            <span>Performance</span>
            <span>Risk</span>
            <span>Action</span>
          </div>

          {filteredStudents.map((student) => (

            <div
              className="students-table-row"
              key={student.id}
            >

              <div className="student-profile">

                <div className="student-avatar-large">
                  {student.name.charAt(0)}
                </div>

                <div>
                  <strong>{student.name}</strong>
                  <small>ID #{student.id}</small>
                </div>

              </div>


              <span className="student-department">
                {student.department}
              </span>


              <div className="attendance-cell">

                <strong>
                  {student.attendance}%
                </strong>

                <div className="attendance-bar">
                  <span
                    style={{
                      width: `${student.attendance}%`,
                    }}
                  />
                </div>

              </div>


              <div className="performance-cell">

                <strong>
                  {student.performance}%
                </strong>

                <div className="performance-bar">
                  <span
                    style={{
                      width: `${student.performance}%`,
                    }}
                  />
                </div>

              </div>


              <span
                className={`student-risk ${student.risk.toLowerCase()}`}
              >
                <i></i>
                {student.risk}
              </span>


              <button
                className="student-view-button"
                onClick={() =>
                  navigate(`/students/${student.id}`)
                }
              >
                View
                <span>→</span>
              </button>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Students;