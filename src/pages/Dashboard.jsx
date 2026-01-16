import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

function Dashboard() {
  const [timeRange, setTimeRange] = useState("weekly");

  // Stats data
  const stats = [
    { label: "Total Patients", value: "45", change: "+12%", icon: "👥" },
    { label: "Avg Visit Time", value: "24 min", change: "-3%", icon: "⏱️" },
    { label: "Video Sessions", value: "03:45 h", change: "+8%", icon: "🎥" },
    { label: "Today's Appointments", value: "14", change: "+2", icon: "📅" },
  ];

  // Patient age distribution
  const ageData = [
    { age: "0-18", patients: 8, color: "#3b82f6" },
    { age: "19-35", patients: 12, color: "#0ea5e9" },
    { age: "36-50", patients: 15, color: "#10b981" },
    { age: "51-65", patients: 7, color: "#f59e0b" },
    { age: "65+", patients: 3, color: "#8b5cf6" },
  ];

  // Visit types
  const visitData = [
    { type: "Emergency", count: 5, color: "#ef4444" },
    { type: "Routine", count: 8, color: "#10b981" },
    { type: "Follow-up", count: 6, color: "#3b82f6" },
    { type: "Consultation", count: 4, color: "#f59e0b" },
  ];

  // Recent patients
  const recentPatients = [
    { id: "57685-LX", name: "Taigo Wilkinson", time: "09:15 AM", type: "Emergency", status: "In Progress" },
    { id: "57686-LX", name: "Samantha Williams", time: "09:30 AM", type: "Routine", status: "Waiting" },
    { id: "57687-LX", name: "Amy White", time: "10:00 AM", type: "Video Consult", status: "Completed" },
    { id: "57688-LX", name: "Tyler Young", time: "10:45 AM", type: "Follow-up", status: "Scheduled" },
  ];

  // Today's timeline
  const timeline = [
    { time: "07:00 - 08:00", event: "Emergency visit", location: "West camp, Room 312", type: "emergency" },
    { time: "08:30 - 09:00", event: "Diagnostic test", location: "East camp, Lab floor 5", type: "test" },
    { time: "09:30 - 10:00", event: "Team planning", location: "East camp, Room 290", type: "meeting" },
    { time: "10:30 - 11:30", event: "Follow-up", location: "West camp, Room 302", type: "followup" },
  ];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Good morning, Dr. Olivia</h1>
          <p className="subtitle">Intelly wishes you a good and productive day. 45 patients waiting for your treatment today.</p>
        </div>
        <div className="time-selector">
          <button className={timeRange === "weekly" ? "active" : ""} onClick={() => setTimeRange("weekly")}>Weekly</button>
          <button className={timeRange === "monthly" ? "active" : ""} onClick={() => setTimeRange("monthly")}>Monthly</button>
          <button className={timeRange === "yearly" ? "active" : ""} onClick={() => setTimeRange("yearly")}>Yearly</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-header">
              <span className="stat-icon">{stat.icon}</span>
              <h3>{stat.label}</h3>
            </div>
            <div className="stat-main">
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.change.includes('+') ? 'positive' : 'negative'}`}>
                {stat.change}
              </div>
            </div>
            <div className="stat-footer">Today</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Left Column - Charts */}
        <div className="grid-column">
          {/* Patient Distribution */}
          <div className="chart-card">
            <div className="card-header">
              <h3>Patients by Age</h3>
              <button className="view-button">View details →</button>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={ageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="patients" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Visit Types */}
          <div className="chart-card">
            <div className="card-header">
              <h3>Visit Types</h3>
            </div>
            <div className="pie-container">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={visitData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="count"
                  >
                    {visitData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="visit-legend">
              {visitData.map((visit, index) => (
                <div key={index} className="legend-item">
                  <span className="color-dot" style={{ background: visit.color }}></span>
                  <span className="legend-label">{visit.type}</span>
                  <span className="legend-count">{visit.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Timeline & Patients */}
        <div className="grid-column">
          {/* Today's Timeline */}
          <div className="timeline-card">
            <div className="card-header">
              <h3>Today's timeline</h3>
              <span className="date-badge">May 15</span>
            </div>
            <div className="timeline-list">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-time">{item.time}</div>
                  <div className="timeline-content">
                    <div className="timeline-event">{item.event}</div>
                    <div className="timeline-location">{item.location}</div>
                  </div>
                  <button className={`timeline-button ${item.type}`}>
                    {item.type === 'emergency' ? '🚨' : 
                     item.type === 'test' ? '🧪' : 
                     item.type === 'meeting' ? '👥' : '📋'}
                  </button>
                </div>
              ))}
            </div>
            <button className="add-event-button">+ Add event</button>
          </div>

          {/* Recent Patients */}
          <div className="patients-card">
            <div className="card-header">
              <h3>Recent patients</h3>
              <button className="view-all-button">View all →</button>
            </div>
            <div className="patients-list">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="patient-row">
                  <div className="patient-info">
                    <div className="patient-id">{patient.id}</div>
                    <div className="patient-name">{patient.name}</div>
                  </div>
                  <div className="patient-details">
                    <span className="patient-time">{patient.time}</span>
                    <span className={`patient-status ${patient.status.toLowerCase()}`}>
                      {patient.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Stats & Education */}
        <div className="grid-column">
          {/* Visits Summary */}
          <div className="summary-card">
            <div className="card-header">
              <h3>Visits summary</h3>
            </div>
            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-value">24 min</div>
                <div className="summary-label">AVERAGE</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">15 min</div>
                <div className="summary-label">MINIMUM</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">01:30 h</div>
                <div className="summary-label">MAXIMUM</div>
              </div>
            </div>
          </div>

          {/* By Condition */}
          <div className="condition-card">
            <div className="card-header">
              <h3>By condition</h3>
            </div>
            <div className="condition-list">
              <div className="condition-item">
                <div className="condition-count">14 pers</div>
                <div className="condition-label">Hypertension</div>
              </div>
              <div className="condition-item">
                <div className="condition-count">5 pers</div>
                <div className="condition-label">Diabetes</div>
              </div>
              <div className="condition-item">
                <div className="condition-count">2 pers</div>
                <div className="condition-label">Respiratory</div>
              </div>
            </div>
          </div>

          {/* Quick Education */}
          <div className="education-card">
            <div className="card-header">
              <h3>Keep learning, Dr. Olivia</h3>
            </div>
            <div className="education-item">
              <div className="education-title">Clinical Immunology</div>
              <div className="education-desc">Health systems science in medical education</div>
              <div className="education-meta">60 min • Live now</div>
            </div>
            <button className="view-articles-button">View all articles →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;