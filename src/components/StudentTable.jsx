import { Link } from "react-router-dom";
import"./StudentTable.css";

function StudentTable({ students = [] }) {
  return (
    <div className="student-table-container">
      <h2>Students</h2>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Attendance</th>
            <th>Marks</th>
            <th>Risk</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>

              <td>
                <strong>{student.name}</strong>
              </td>

              <td>{student.attendance}%</td>

              <td>{student.marks}%</td>

              <td>
                <span
                  className={"risk-badge " + student.risk.toLowerCase()}
                >
                  {student.risk}
                </span>
              </td>

              <td>
                <Link
                  className="view-btn"
                  to={"/students/" + student.id}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {students.length === 0 && (
        <p className="no-students">No students found.</p>
      )}
    </div>
  );
}

export default StudentTable;