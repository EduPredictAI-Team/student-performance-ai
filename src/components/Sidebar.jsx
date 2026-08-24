
import { NavLink, useNavigate } from "react-router-dom";
import"./Sidebar.css";
function Sidebar() {
  const navigate = useNavigate();

  const mainMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "⌂",
    },
    {
      name: "Students",
      path: "/students",
      icon: "♙",
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: "◈",
    },
  ];

  const managementMenu = [
    {
      name: "Settings",
      path: "/settings",
      icon: "⚙",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "●",
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  const renderMenu = (items) =>
    items.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `premium-sidebar-link ${
            isActive ? "premium-sidebar-active" : ""
          }`
        }
      >
        <span className="premium-link-icon">
          {item.icon}
        </span>

        <span className="premium-link-text">
          {item.name}
        </span>

        <span className="premium-link-arrow">
          →
        </span>
      </NavLink>
    ));

  return (
    <aside className="premium-sidebar">

      {/* Decorative 3D glow */}
      <div className="sidebar-glow sidebar-glow-one"></div>
      <div className="sidebar-glow sidebar-glow-two"></div>

      {/* ================= BRAND ================= */}

      <div className="premium-sidebar-brand">

        <div className="premium-sidebar-logo">
          <span>EP</span>
        </div>

        <div className="premium-brand-text">
          <h2>EduPredictAI</h2>
          <span>AI Student System</span>
        </div>

      </div>

      {/* ================= STATUS ================= */}

      <div className="sidebar-system-status">
        <span className="system-live-dot"></span>
        <span>System Online</span>
        <strong>AI</strong>
      </div>

      {/* ================= MAIN MENU ================= */}

      <div className="premium-menu-label">
        <span>MAIN MENU</span>
        <i></i>
      </div>

      <nav className="premium-sidebar-nav">
        {renderMenu(mainMenu)}
      </nav>

      {/* ================= MANAGEMENT ================= */}

      <div className="premium-menu-label management-label">
        <span>MANAGEMENT</span>
        <i></i>
      </div>

      <nav className="premium-sidebar-nav">
        {renderMenu(managementMenu)}
      </nav>

      {/* ================= BOTTOM ================= */}

      <div className="premium-sidebar-bottom">

        {/* ADMIN CARD */}

        <button
          className="premium-admin-card"
          onClick={() => navigate("/profile")}
        >

          <div className="premium-admin-avatar">
            A
            <span></span>
          </div>

          <div className="premium-admin-info">
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>

          <span className="admin-arrow">
            →
          </span>

        </button>

        {/* LOGOUT */}

        <button
          className="premium-logout"
          onClick={handleLogout}
        >
          <span className="logout-icon">
            ↪
          </span>

          <span>
            Logout
          </span>

          <strong>
            →
          </strong>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;