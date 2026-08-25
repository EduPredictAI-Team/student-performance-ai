import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const defaultData = [
  { name: "Jan", performance: 55 },
  { name: "Feb", performance: 62 },
  { name: "Mar", performance: 68 },
  { name: "Apr", performance: 72 },
  { name: "May", performance: 78 },
  { name: "Jun", performance: 84 },
];

function Chart({ data = defaultData }) {
  return (
    <div className="premium-chart">

      <div className="chart-top-info">
        <div>
          <span>PERFORMANCE ANALYTICS</span>
          <strong>Academic Growth</strong>
        </div>

        <div className="chart-current">
          <small>Current Average</small>
          <strong>
            {data[data.length - 1]?.performance || 0}%
          </strong>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 15,
              right: 15,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              stroke="#e8edf7"
              strokeDasharray="4 5"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#7b879d",
                fontSize: 11,
                fontWeight: 600,
              }}
            />

            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#7b879d",
                fontSize: 10,
              }}
            />

            <Tooltip
              cursor={{
                stroke: "#c7d2fe",
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                border: "none",
                borderRadius: "14px",
                background: "rgba(255,255,255,.96)",
                boxShadow:
                  "0 15px 40px rgba(15,23,42,.15)",
              }}
              labelStyle={{
                color: "#6366f1",
                fontWeight: 800,
                marginBottom: "5px",
              }}
            />

            <Line
              type="monotone"
              dataKey="performance"
              stroke="#6366f1"
              strokeWidth={4}
              dot={{
                r: 4,
                fill: "#ffffff",
                stroke: "#6366f1",
                strokeWidth: 3,
              }}
              activeDot={{
                r: 7,
                fill: "#6366f1",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-bottom-status">
        <span>
          <i></i>
          Performance trend
        </span>

        <span>
          ✦ AI monitored
        </span>
      </div>

    </div>
  );
}

export default Chart;