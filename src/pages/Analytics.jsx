import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import"./Analytics.css";

const monthlyData = [
  { month: "Jan", performance: 61, attendance: 72 },
  { month: "Feb", performance: 66, attendance: 74 },
  { month: "Mar", performance: 64, attendance: 76 },
  { month: "Apr", performance: 72, attendance: 78 },
  { month: "May", performance: 78, attendance: 81 },
  { month: "Jun", performance: 82, attendance: 84 },
];

const departmentData = [
  { name: "CSE", score: 78 },
  { name: "IT", score: 71 },
  { name: "ECE", score: 68 },
  { name: "ME", score: 64 },
];

const riskData = [
  { name: "Low Risk", value: 167 },
  { name: "Medium Risk", value: 51 },
  { name: "High Risk", value: 32 },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

function Analytics() {
  return (
    <div className="analytics-page">

      {/* HEADER */}
      <section className="analytics-hero">

        <div>
          <span className="analytics-eyebrow">
            ✦ AI PERFORMANCE INTELLIGENCE
          </span>

          <h1>Analytics & Insights</h1>

          <p>
            Understand student performance, attendance and
            academic risk using AI-powered analytics.
          </p>
        </div>

        <div className="analytics-year-card">
          <span>ACADEMIC YEAR</span>
          <strong>2026</strong>
          <small>Current Session</small>
        </div>

      </section>


      {/* KPI CARDS */}
      <section className="analytics-stat-grid">

        <div className="analytics-stat-card blue">
          <div className="analytics-stat-icon">↗</div>
          <span>Average Performance</span>
          <strong>72%</strong>
          <small>↑ 8.4% from previous month</small>
        </div>

        <div className="analytics-stat-card cyan">
          <div className="analytics-stat-icon">◉</div>
          <span>Average Attendance</span>
          <strong>78%</strong>
          <small>↑ 5.2% improvement</small>
        </div>

        <div className="analytics-stat-card purple">
          <div className="analytics-stat-icon">AI</div>
          <span>Prediction Accuracy</span>
          <strong>86%</strong>
          <small>AI model confidence</small>
        </div>

        <div className="analytics-stat-card orange">
          <div className="analytics-stat-icon">!</div>
          <span>Students At Risk</span>
          <strong>32</strong>
          <small>12.8% of total students</small>
        </div>

      </section>


      {/* MAIN CHART */}
      <section className="analytics-grid">

        <div className="analytics-panel large-panel">

          <div className="analytics-panel-header">
            <div>
              <span>PERFORMANCE OVERVIEW</span>
              <h2>Performance & Attendance</h2>
              <p>Semester-wise academic trend</p>
            </div>

            <div className="analytics-live">
              <i></i>
              Live Data
            </div>
          </div>

          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height={330}>
              <AreaChart data={monthlyData}>

                <defs>
                  <linearGradient
                    id="performanceFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#6366f1"
                      stopOpacity={0.35}
                    />

                    <stop
                      offset="100%"
                      stopColor="#6366f1"
                      stopOpacity={0.02}
                    />
                  </linearGradient>

                  <linearGradient
                    id="attendanceFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#06b6d4"
                      stopOpacity={0.25}
                    />

                    <stop
                      offset="100%"
                      stopColor="#06b6d4"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e8edf7"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#7b879d", fontSize: 12 }}
                />

                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#7b879d", fontSize: 12 }}
                />

                <Tooltip
                  contentStyle={{
                    border: "none",
                    borderRadius: "14px",
                    boxShadow: "0 15px 40px rgba(15,23,42,.15)",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="performance"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#performanceFill)"
                  name="Performance"
                />

                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fill="url(#attendanceFill)"
                  name="Attendance"
                />

              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-legend">
            <span>
              <i className="legend-performance"></i>
              Performance
            </span>

            <span>
              <i className="legend-attendance"></i>
              Attendance
            </span>
          </div>

        </div>


        {/* RISK DISTRIBUTION */}
        <div className="analytics-panel risk-panel">

          <div className="analytics-panel-header">
            <div>
              <span>RISK INTELLIGENCE</span>
              <h2>Risk Distribution</h2>
            </div>
          </div>

          <div className="risk-chart">

            <ResponsiveContainer width="100%" height={220}>
              <PieChart>

                <Pie
                  data={riskData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={92}
                  paddingAngle={5}
                >
                  {riskData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

            <div className="risk-center">
              <strong>250</strong>
              <span>Students</span>
            </div>

          </div>

          <div className="risk-list">

            <div>
              <span>
                <i className="risk-dot low"></i>
                Low Risk
              </span>
              <strong>167</strong>
            </div>

            <div>
              <span>
                <i className="risk-dot medium"></i>
                Medium Risk
              </span>
              <strong>51</strong>
            </div>

            <div>
              <span>
                <i className="risk-dot high"></i>
                High Risk
              </span>
              <strong>32</strong>
            </div>

          </div>

        </div>

      </section>


      {/* DEPARTMENT PERFORMANCE */}
      <section className="analytics-panel department-panel">

        <div className="analytics-panel-header">

          <div>
            <span>ACADEMIC DEPARTMENTS</span>
            <h2>Department Performance</h2>
            <p>Average performance by department</p>
          </div>

          <div className="department-badge">
            4 Departments
          </div>

        </div>

        <div className="department-chart">

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={departmentData}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e8edf7"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7b879d" }}
              />

              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7b879d" }}
              />

              <Tooltip />

              <Bar
                dataKey="score"
                radius={[10, 10, 0, 0]}
                fill="#6366f1"
                name="Average Score"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </section>


      {/* AI INSIGHTS */}
      <section className="ai-insights-grid">

        <div className="ai-insight-card purple-insight">

          <div className="insight-icon">✦</div>

          <div>
            <span>AI INSIGHT</span>

            <h3>
              Performance is improving
            </h3>

            <p>
              Overall student performance increased
              consistently from January to June.
            </p>
          </div>

        </div>


        <div className="ai-insight-card green-insight">

          <div className="insight-icon">✓</div>

          <div>
            <span>POSITIVE SIGNAL</span>

            <h3>
              Attendance is trending upward
            </h3>

            <p>
              Average attendance reached 84% in June,
              showing strong improvement.
            </p>
          </div>

        </div>


        <div className="ai-insight-card red-insight">

          <div className="insight-icon">!</div>

          <div>
            <span>EARLY WARNING</span>

            <h3>
              32 students need attention
            </h3>

            <p>
              AI has identified students who may require
              academic support.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Analytics;