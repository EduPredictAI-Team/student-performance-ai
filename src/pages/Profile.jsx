import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        <div>
          <span className="page-eyebrow">ACCOUNT MANAGEMENT</span>
          <h1>My Profile</h1>
          <p>Manage your EduPredictAI administrator profile.</p>
        </div>

        <button
          className="profile-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      {/* PROFILE HERO */}
      <section className="profile-hero glass-3d">

        <div className="profile-avatar-large">
          A
        </div>

        <div className="profile-main-info">
          <span className="online-badge">
            <i></i> ONLINE
          </span>

          <h2>Admin</h2>
          <p>Administrator</p>

          <div className="profile-tags">
            <span>✦ AI Access</span>
            <span>◆ Secure Account</span>
            <span>✓ Verified</span>
          </div>
        </div>

        <div className="profile-id-card">
          <span>ACCOUNT ID</span>
          <strong>ADMIN-001</strong>
          <small>EduPredictAI</small>
        </div>

      </section>

      {/* CONTENT */}
      <div className="profile-grid">

        {/* PERSONAL INFORMATION */}
        <section className="profile-card glass-3d">

          <div className="card-title">
            <div className="title-icon">◈</div>

            <div>
              <span>PERSONAL INFORMATION</span>
              <h3>Account Details</h3>
            </div>
          </div>

          <div className="info-grid">

            <div className="info-item">
              <label>Full Name</label>
              <strong>Admin</strong>
            </div>

            <div className="info-item">
              <label>Role</label>
              <strong>Administrator</strong>
            </div>

            <div className="info-item">
              <label>Email Address</label>
              <strong>admin@edupredictai.xyz</strong>
            </div>

            <div className="info-item">
              <label>Account Status</label>
              <strong className="active-text">
                ● Active
              </strong>
            </div>

          </div>

        </section>

        {/* SECURITY */}
        <section className="profile-card glass-3d">

          <div className="card-title">
            <div className="title-icon security-title">
              🔒
            </div>

            <div>
              <span>SECURITY</span>
              <h3>Account Protection</h3>
            </div>
          </div>

          <div className="security-status">

            <div className="security-row">
              <div>
                <strong>Password</strong>
                <small>Protected account password</small>
              </div>

              <span className="secure-badge">
                Protected
              </span>
            </div>

            <div className="security-row">
              <div>
                <strong>Authentication</strong>
                <small>Secure administrator access</small>
              </div>

              <span className="secure-badge">
                Enabled
              </span>
            </div>

            <div className="security-row">
              <div>
                <strong>System Access</strong>
                <small>Dashboard & analytics</small>
              </div>

              <span className="secure-badge">
                Full Access
              </span>
            </div>

          </div>

        </section>

      </div>

      {/* ACCOUNT ACCESS */}
      <section className="profile-card glass-3d access-card">

        <div className="card-title">
          <div className="title-icon ai-title">
            AI
          </div>

          <div>
            <span>ADMINISTRATOR ACCESS</span>
            <h3>EduPredictAI Permissions</h3>
          </div>
        </div>

        <div className="permission-grid">

          <div className="permission-box">
            <div>📊</div>
            <strong>Dashboard</strong>
            <small>Full access</small>
          </div>

          <div className="permission-box">
            <div>👨‍🎓</div>
            <strong>Students</strong>
            <small>Manage students</small>
          </div>

          <div className="permission-box">
            <div>✦</div>
            <strong>AI Analytics</strong>
            <small>View predictions</small>
          </div>

          <div className="permission-box">
            <div>⚙</div>
            <strong>Settings</strong>
            <small>System control</small>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Profile;