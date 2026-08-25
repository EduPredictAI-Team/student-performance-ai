import { useState } from "react";
import { useNavigate } from "react-router-dom";
import"./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@edupredictai.xyz");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // Demo admin login
    if (
      email === "admin@edupredictai.xyz" &&
      password === "admin123"
    ) {
      navigate("/dashboard");
      return;
    }

    setError("Invalid email or password");
  };

  return (
    <div className="login-page">

      <div className="login-orb login-orb-1"></div>
      <div className="login-orb login-orb-2"></div>
      <div className="login-grid"></div>

      <div className="login-wrapper">

        {/* LEFT SIDE */}

        <section className="login-brand">

          <div className="brand-header">
            <div className="brand-logo">
              EP
            </div>

            <div>
              <h1>EduPredictAI</h1>
              <p>AI Student Early Warning System</p>
            </div>
          </div>

          <div className="brand-main">

            <span className="brand-badge">
              AI-POWERED EDUCATION
            </span>

            <h2>
              Prevent.
              <br />
              Empower.
              <br />
              <span>Monitor.</span>
            </h2>

            <p className="brand-text">
              Monitor student performance, identify academic
              risks, and take action before it is too late.
            </p>

            <div className="feature-list">

              <div className="feature-card">
                <div className="feature-symbol">◈</div>

                <div>
                  <strong>Smart Analytics</strong>
                  <small>Track student performance</small>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-symbol">✦</div>

                <div>
                  <strong>AI Prediction</strong>
                  <small>Predict academic performance</small>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-symbol">◆</div>

                <div>
                  <strong>Early Warning</strong>
                  <small>Identify at-risk students</small>
                </div>
              </div>

            </div>

          </div>

          <div className="system-status">

            <span>
              <i></i>
              System Online
            </span>

            <span>✦ AI Prediction Engine</span>

            <span>◆ Secure Platform</span>

          </div>

        </section>


        {/* RIGHT SIDE */}

        <section className="login-section">

          <form
            className="login-card"
            onSubmit={handleLogin}
          >

            <div className="login-icon">
              ↗
            </div>

            <span className="login-label">
              WELCOME BACK
            </span>

            <h2>
              Sign in to your account
            </h2>

            <p className="login-subtitle">
              Access your student performance dashboard.
            </p>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <div className="input-box">

                <span>@</span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email"
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label>
                Password
              </label>

              <div className="input-box">

                <span>●</span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="show-btn"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>


            {/* ERROR */}

            {error && (
              <div
                style={{
                  marginBottom: "16px",
                  padding: "11px 14px",
                  borderRadius: "12px",
                  background: "rgba(239,68,68,0.10)",
                  border: "1px solid rgba(239,68,68,0.20)",
                  color: "#f87171",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                {error}
              </div>
            )}


            {/* OPTIONS */}

            <div className="login-options">

              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <button
                type="button"
                onClick={() =>
                  alert("Please contact the administrator.")
                }
              >
                Forgot password?
              </button>

            </div>


            {/* LOGIN */}

            <button
              type="submit"
              className="login-button"
            >
              <span>
                Login to Dashboard
              </span>

              <b>
                →
              </b>
            </button>


            {/* SECURITY */}

            <div className="secure-box">

              <div className="secure-icon">
                🔒
              </div>

              <div>
                <strong>
                  Secure Access
                </strong>

                <p>
                  Your dashboard is protected
                  with secure authentication.
                </p>
              </div>

            </div>


            {/* FOOTER */}

            <div className="login-footer">

              <strong>
                EDUPREDICTAI
              </strong>

              <div>
                <span>✓ Secure Access</span>
                <span>✓ AI Powered</span>
                <span>✓ 24/7 Monitoring</span>
              </div>

              <p>
                © 2026 EduPredictAI.xyz • Student Early Warning System
              </p>

            </div>

          </form>

        </section>

      </div>

    </div>
  );
}

export default Login;