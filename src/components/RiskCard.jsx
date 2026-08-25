import"./RiskCard.css";

function RiskCard({ prediction }) {
  const risk = prediction?.risk || "Medium";
  const score = prediction?.score ?? 62;

  const riskClass = risk.toLowerCase();

  return (
    <div className={`risk-result-card ${riskClass}`}>
      <div className="risk-result-header">
        <div>
          <span className="risk-label">AI RISK ASSESSMENT</span>
          <h2>Prediction Result</h2>
        </div>

        <div className="risk-ai-badge">AI</div>
      </div>

      <div className="risk-result-body">
        <div
  className={`risk-score-circle ${riskClass}`}
  style={{
    "--score": `${Math.min(Math.max(score, 0), 100) * 3.6}deg`,
  }}
>
  <strong>{score}%</strong>
  <span>Score</span>
</div>

        <div className="risk-result-info">
          <span>Risk Level</span>

          <strong className={`risk-level ${riskClass}`}>
            {risk}
          </strong>

          <p>
            {risk === "High"
              ? "Student requires immediate academic attention."
              : risk === "Medium"
              ? "Student should be monitored regularly."
              : "Student is currently performing well."}
          </p>
        </div>
      </div>

      <div className="risk-recommendation">
        <span>✦</span>

        <div>
          <strong>AI Recommendation</strong>
          <p>
            {risk === "High"
              ? "Consider additional academic support and regular monitoring."
              : risk === "Medium"
              ? "Monitor attendance, assignments and upcoming assessments."
              : "Continue the current study routine and performance level."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RiskCard;