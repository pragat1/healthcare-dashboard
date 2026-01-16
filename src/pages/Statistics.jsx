import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from "recharts";

function Statistics() {
  const [timeRange, setTimeRange] = useState("monthly");
  const [reportType, setReportType] = useState("overview");

  // Patient statistics
  const patientStats = [
    { month: "Jan", patients: 420, visits: 520, revenue: 42500 },
    { month: "Feb", patients: 380, visits: 480, revenue: 39800 },
    { month: "Mar", patients: 450, visits: 550, revenue: 45200 },
    { month: "Apr", patients: 520, visits: 620, revenue: 51800 },
    { month: "May", patients: 480, visits: 580, revenue: 48500 },
    { month: "Jun", patients: 550, visits: 650, revenue: 55200 }
  ];

  // Condition distribution
  const conditionData = [
    { name: "Hypertension", value: 28, color: "#3b82f6" },
    { name: "Diabetes", value: 18, color: "#10b981" },
    { name: "Respiratory", value: 15, color: "#0ea5e9" },
    { name: "Cardiac", value: 12, color: "#ef4444" },
    { name: "Orthopedic", value: 10, color: "#f59e0b" },
    { name: "Other", value: 17, color: "#8b5cf6" }
  ];

  // Age distribution
  const ageData = [
    { age: "0-18", count: 45, percentage: 8 },
    { age: "19-35", count: 125, percentage: 22 },
    { age: "36-50", count: 180, percentage: 32 },
    { age: "51-65", count: 140, percentage: 25 },
    { age: "65+", count: 70, percentage: 13 }
  ];

  // Visit types
  const visitData = [
    { type: "Emergency", count: 85, revenue: 42500 },
    { type: "Routine", count: 320, revenue: 96000 },
    { type: "Follow-up", count: 180, revenue: 54000 },
    { type: "Consultation", count: 75, revenue: 37500 }
  ];

  // Key metrics
  const keyMetrics = [
    { label: "Total Patients", value: "1,245", change: "+12%", icon: "👥" },
    { label: "Avg Visit Time", value: "24 min", change: "-3%", icon: "⏱️" },
    { label: "Revenue", value: "$245.8K", change: "+18%", icon: "💰" },
    { label: "Patient Satisfaction", value: "94.2%", change: "+2%", icon: "⭐" },
    { label: "Appointment Rate", value: "88.5%", change: "+5%", icon: "📅" },
    { label: "Readmission Rate", value: "3.2%", change: "-1%", icon: "🔄" }
  ];

  // Top doctors
  const topDoctors = [
    { name: "Dr. Olivia", patients: 245, satisfaction: 96.5, revenue: 85600 },
    { name: "Dr. Smith", patients: 198, satisfaction: 94.2, revenue: 72400 },
    { name: "Dr. Johnson", patients: 176, satisfaction: 92.8, revenue: 65800 },
    { name: "Dr. Miller", patients: 154, satisfaction: 93.5, revenue: 59800 },
    { name: "Dr. Wilson", patients: 132, satisfaction: 91.2, revenue: 51200 }
  ];

  return (
    <div className="statistics-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Statistics & Reports</h1>
          <p className="subtitle">Comprehensive analytics and insights for your medical practice</p>
        </div>
        <div className="report-controls">
          <div className="time-selector">
            <button className={timeRange === "weekly" ? "active" : ""} onClick={() => setTimeRange("weekly")}>Weekly</button>
            <button className={timeRange === "monthly" ? "active" : ""} onClick={() => setTimeRange("monthly")}>Monthly</button>
            <button className={timeRange === "yearly" ? "active" : ""} onClick={() => setTimeRange("yearly")}>Yearly</button>
          </div>
          <button className="primary-button">📊 Generate Report</button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        {keyMetrics.map((metric, index) => (
          <div className="metric-card" key={index}>
            <div className="metric-header">
              <span className="metric-icon">{metric.icon}</span>
              <h3>{metric.label}</h3>
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-change ${metric.change.includes('+') ? 'positive' : 'negative'}`}>
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="charts-grid">
        {/* Patient Growth */}
        <div className="chart-card large">
          <div className="card-header">
            <h3>Patient Growth & Revenue</h3>
            <div className="chart-legend">
              <span className="legend-item patients">● Patients</span>
              <span className="legend-item revenue">● Revenue</span>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={patientStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="patients" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Patients" />
                <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Revenue ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Condition Distribution */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Condition Distribution</h3>
          </div>
          <div className="pie-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={conditionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {conditionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="condition-legend">
            {conditionData.map((condition, index) => (
              <div key={index} className="legend-item">
                <span className="color-dot" style={{ background: condition.color }}></span>
                <span className="legend-label">{condition.name}</span>
                <span className="legend-percentage">{condition.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Age Distribution */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Age Distribution</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Patients" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visit Types */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Visit Types Analysis</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Visits" />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="reports-section">
        <h2>Detailed Reports</h2>
        <div className="report-tabs">
          <button className={reportType === "overview" ? "active" : ""} onClick={() => setReportType("overview")}>Overview</button>
          <button className={reportType === "financial" ? "active" : ""} onClick={() => setReportType("financial")}>Financial</button>
          <button className={reportType === "clinical" ? "active" : ""} onClick={() => setReportType("clinical")}>Clinical</button>
          <button className={reportType === "operations" ? "active" : ""} onClick={() => setReportType("operations")}>Operations</button>
        </div>

        {/* Report Content */}
        <div className="report-content">
          {reportType === "overview" && (
            <div className="overview-report">
              <div className="report-card">
                <h3>Performance Summary</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <div className="summary-label">Total Revenue</div>
                    <div className="summary-value">$245,800</div>
                    <div className="summary-change positive">+18% from last month</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-label">Patient Visits</div>
                    <div className="summary-value">1,245</div>
                    <div className="summary-change positive">+12% from last month</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-label">Avg. Wait Time</div>
                    <div className="summary-value">12.4 min</div>
                    <div className="summary-change negative">-8% from last month</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-label">Patient Satisfaction</div>
                    <div className="summary-value">94.2%</div>
                    <div className="summary-change positive">+2.1% from last month</div>
                  </div>
                </div>
              </div>

              <div className="report-card">
                <h3>Top Performing Doctors</h3>
                <div className="doctors-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Doctor</th>
                        <th>Patients</th>
                        <th>Satisfaction</th>
                        <th>Revenue</th>
                        <th>Efficiency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topDoctors.map((doctor, index) => (
                        <tr key={index}>
                          <td>
                            <div className="doctor-info">
                              <div className="doctor-avatar">{doctor.name.split(" ")[1][0]}</div>
                              <div className="doctor-name">{doctor.name}</div>
                            </div>
                          </td>
                          <td>{doctor.patients}</td>
                          <td>
                            <div className="satisfaction-meter">
                              <div className="meter-bar" style={{ width: `${doctor.satisfaction}%` }}></div>
                              <span>{doctor.satisfaction}%</span>
                            </div>
                          </td>
                          <td>${doctor.revenue.toLocaleString()}</td>
                          <td>
                            <span className={`efficiency ${doctor.satisfaction > 94 ? 'high' : doctor.satisfaction > 90 ? 'medium' : 'low'}`}>
                              {doctor.satisfaction > 94 ? 'High' : doctor.satisfaction > 90 ? 'Medium' : 'Low'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {reportType === "financial" && (
            <div className="financial-report">
              <div className="report-card">
                <h3>Revenue Breakdown</h3>
                <div className="revenue-breakdown">
                  <div className="revenue-item">
                    <div className="revenue-source">Insurance Claims</div>
                    <div className="revenue-amount">$156,400</div>
                    <div className="revenue-percentage">63.6%</div>
                  </div>
                  <div className="revenue-item">
                    <div className="revenue-source">Out-of-pocket</div>
                    <div className="revenue-amount">$64,200</div>
                    <div className="revenue-percentage">26.1%</div>
                  </div>
                  <div className="revenue-item">
                    <div className="revenue-source">Government Programs</div>
                    <div className="revenue-amount">$25,200</div>
                    <div className="revenue-percentage">10.3%</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Options */}
      <div className="export-section">
        <h3>Export Reports</h3>
        <div className="export-options">
          <button className="export-button pdf">📄 Export as PDF</button>
          <button className="export-button excel">📊 Export as Excel</button>
          <button className="export-button csv">📋 Export as CSV</button>
          <button className="export-button print">🖨️ Print Report</button>
        </div>
      </div>
    </div>
  );
}

export default Statistics;