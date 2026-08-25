import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  /* =========================================================
     NOTIFICATION SETTINGS
     ========================================================= */

  const [notifications, setNotifications] = useState(true);
  const [aiAlerts, setAiAlerts] = useState(true);

  /* =========================================================
     DARK MODE
     ========================================================= */

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("edupredictai-theme") === "dark";
  });

  /* =========================================================
     APPLY THEME
     ========================================================= */

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";

    // Save theme permanently
    localStorage.setItem("edupredictai-theme", theme);

    // Apply theme globally
    document.documentElement.classList.toggle(
      "dark-mode",
      darkMode
    );

    document.body.classList.toggle(
      "dark-mode",
      darkMode
    );
  }, [darkMode]);

  /* =========================================================
     SETTINGS PAGE
     ========================================================= */

  return (
    <div className="settings-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="settings-header">

        <div>
          <span className="page-eyebrow">
            SYSTEM CONFIGURATION
          </span>

          <h1>Settings</h1>

          <p>
            Configure your EduPredictAI administrator
            preferences and system controls.
          </p>
        </div>

        <button
          type="button"
          className="settings-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>

      </div>


      {/* =====================================================
          SETTINGS GRID
          ===================================================== */}

      <div className="settings-grid">


        {/* ===================================================
            GENERAL SETTINGS
            =================================================== */}

        <section className="settings-card glass-3d">

          <div className="settings-card-title">

            <div className="settings-icon blue">
              ⚙
            </div>

            <div>
              <span>SYSTEM</span>
              <h2>General Settings</h2>
            </div>

          </div>


          <div className="setting-row">

            <div>
              <strong>System Name</strong>

              <small>
                Application display name
              </small>
            </div>

            <span className="setting-value">
              EduPredictAI
            </span>

          </div>


          <div className="setting-row">

            <div>
              <strong>Platform Status</strong>

              <small>
                Current system availability
              </small>
            </div>

            <span className="status-active">
              ● Online
            </span>

          </div>


          <div className="setting-row">

            <div>
              <strong>AI Prediction Engine</strong>

              <small>
                Student risk prediction service
              </small>
            </div>

            <span className="status-active">
              ● Active
            </span>

          </div>

        </section>


        {/* ===================================================
            NOTIFICATIONS
            =================================================== */}

        <section className="settings-card glass-3d">

          <div className="settings-card-title">

            <div className="settings-icon purple">
              🔔
            </div>

            <div>
              <span>ALERTS</span>
              <h2>Notifications</h2>
            </div>

          </div>


          {/* SYSTEM NOTIFICATIONS */}

          <div className="setting-toggle-row">

            <div>
              <strong>
                System Notifications
              </strong>

              <small>
                Receive important system updates
              </small>
            </div>

            <button
              type="button"
              className={`toggle ${
                notifications ? "active" : ""
              }`}
              onClick={() =>
                setNotifications((prev) => !prev)
              }
              aria-label="Toggle System Notifications"
            >
              <span></span>
            </button>

          </div>


          {/* AI RISK ALERTS */}

          <div className="setting-toggle-row">

            <div>
              <strong>
                AI Risk Alerts
              </strong>

              <small>
                Notify when students become high risk
              </small>
            </div>

            <button
              type="button"
              className={`toggle ${
                aiAlerts ? "active" : ""
              }`}
              onClick={() =>
                setAiAlerts((prev) => !prev)
              }
              aria-label="Toggle AI Risk Alerts"
            >
              <span></span>
            </button>

          </div>

        </section>


        {/* ===================================================
            APPEARANCE
            =================================================== */}

        <section className="settings-card glass-3d">

          <div className="settings-card-title">

            <div className="settings-icon cyan">
              ◉
            </div>

            <div>
              <span>INTERFACE</span>
              <h2>Appearance</h2>
            </div>

          </div>


          {/* DARK MODE */}

          <div className="setting-toggle-row">

            <div>
              <strong>
                Dark Mode
              </strong>

              <small>
                Change dashboard appearance
              </small>
            </div>

            <button
              type="button"
              className={`toggle ${
                darkMode ? "active" : ""
              }`}
              onClick={() =>
                setDarkMode((prev) => !prev)
              }
              aria-label="Toggle Dark Mode"
            >
              <span></span>
            </button>

          </div>


          {/* THEME PREVIEW */}

          <div className="theme-preview">

            <div className="theme-preview-top">

              <span></span>
              <span></span>
              <span></span>

            </div>


            <div className="theme-preview-body">

              <div className="preview-sidebar"></div>

              <div className="preview-content">

                <div></div>
                <div></div>
                <div></div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            SECURITY
            =================================================== */}

        <section className="settings-card glass-3d">

          <div className="settings-card-title">

            <div className="settings-icon red">
              🔒
            </div>

            <div>
              <span>SECURITY</span>
              <h2>Security Controls</h2>
            </div>

          </div>


          {/* ADMIN AUTHENTICATION */}

          <div className="security-setting">

            <div className="security-setting-icon">
              ✓
            </div>

            <div>
              <strong>
                Administrator Authentication
              </strong>

              <small>
                Secure administrator access is enabled.
              </small>
            </div>

            <span className="secure-badge">
              Protected
            </span>

          </div>


          {/* AI DATA PROTECTION */}

          <div className="security-setting">

            <div className="security-setting-icon">
              AI
            </div>

            <div>
              <strong>
                AI Data Protection
              </strong>

              <small>
                Academic prediction data is protected.
              </small>
            </div>

            <span className="secure-badge">
              Secure
            </span>

          </div>

        </section>

      </div>


      {/* =====================================================
          SYSTEM INFORMATION
          ===================================================== */}

      <section className="settings-card glass-3d system-info-card">

        <div className="settings-card-title">

          <div className="settings-icon green">
            ✦
          </div>

          <div>
            <span>
              PLATFORM INFORMATION
            </span>

            <h2>
              EduPredictAI System
            </h2>
          </div>

        </div>


        <div className="system-info-grid">

          <div>
            <span>Version</span>
            <strong>1.0.0</strong>
          </div>


          <div>
            <span>AI Engine</span>
            <strong>Online</strong>
          </div>


          <div>
            <span>Security</span>
            <strong>Protected</strong>
          </div>


          <div>
            <span>Environment</span>
            <strong>Production</strong>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Settings;