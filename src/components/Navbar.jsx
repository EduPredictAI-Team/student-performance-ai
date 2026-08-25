import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageInfo = () => {
    switch (location.pathname) {
      case "/dashboard":
        return {
          eyebrow: "AI STUDENT ANALYTICS",
          title: "Student Performance",
        };

      case "/students":
        return {
          eyebrow: "STUDENT MANAGEMENT",
          title: "Students",
        };

      case "/analytics":
        return {
          eyebrow: "AI STUDENT ANALYTICS",
          title: "Analytics & Insights",
        };

      case "/settings":
        return {
          eyebrow: "SYSTEM MANAGEMENT",
          title: "Settings",
        };

      case "/profile":
        return {
          eyebrow: "ADMINISTRATION",
          title: "Profile",
        };

      default:
        return {
          eyebrow: "AI STUDENT ANALYTICS",
          title: "EduPredictAI",
        };
    }
  };

  const page = getPageInfo();

  return (
    <header className="navbar">

      {/* LEFT */}
      <div className="navbar-page-info">

        <div className="navbar-icon">
          ✦
        </div>

        <div className="navbar-title-area">
          <span className="navbar-eyebrow">
            {page.eyebrow}
          </span>

          <h1>{page.title}</h1>
        </div>

      </div>


      {/* RIGHT */}
      <div className="navbar-actions">

        {/* Search */}
        <button
          className="navbar-icon-button"
          type="button"
          aria-label="Search"
          onClick={() => navigate("/students")}
        >
          ⌕
        </button>


        {/* Notification */}
        <button
          className="navbar-icon-button"
          type="button"
          aria-label="Notifications"
          onClick={() => alert("No new notifications")}
        >
          ♢
          <span className="notification-dot"></span>
        </button>


        {/* Admin */}
        <button
          className="navbar-admin"
          type="button"
          onClick={() => navigate("/profile")}
          aria-label="Open Admin Profile"
        >
          <div className="navbar-admin-avatar">
            A
            <span></span>
          </div>

          <div className="navbar-admin-info">
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>

          <span className="navbar-admin-arrow">
            ▼
          </span>
        </button>

      </div>

    </header>
  );
}

export default Navbar;