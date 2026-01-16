import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

function Patients() {
  const { patientId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Sample patients data
  const patients = [
    {
      id: "57685-LX",
      name: "Taigo Wilkinson",
      age: 38,
      gender: "Male",
      phone: "546-466-4646",
      email: "taigo.wilkinson@gmail.com",
      address: "7 James St, New York, NY 10034",
      registration: "12/7/2004",
      dob: "09/07/1985",
      status: "active",
      condition: "Hypertension",
      lastVisit: "Today, 09:15",
      nextAppointment: "May 20, 10:30",
      bloodPressure: "145/92",
      heartRate: "88",
      temperature: "37.2°C",
      allergies: [
        { type: "BLUEBERRIES", status: "OK" },
        { type: "DUST", status: "ATTENTION" },
        { type: "NUTS", status: "ATTENTION" }
      ],
      medications: ["Losartan 50mg", "Hydrochlorothiazide 25mg"],
      visitHistory: [
        { date: "12/10/2023", type: "Ophthalmological", diagnosis: "Regular check-up" },
        { date: "12/10/2022", type: "Ophthalmological", diagnosis: "Eye infection" },
        { date: "15/08/2022", type: "Emergency", diagnosis: "Hypertension crisis" }
      ],
      testResults: [
        { test: "RBC Count", result: "5.9 x 10^4", normal: "4.2-5.2 cells/mcL", status: "high" },
        { test: "Glucose", result: "98 mg/dL", normal: "70-99 mg/dL", status: "normal" },
        { test: "Hemoglobin A1C", result: "5.8%", normal: "4.5-5.6%", status: "high" }
      ]
    },
    {
      id: "57686-LX",
      name: "Samantha Williams",
      age: 42,
      gender: "Female",
      phone: "555-123-4567",
      email: "s.williams@email.com",
      status: "active",
      condition: "Diabetes Type 2",
      lastVisit: "Today, 09:30",
      bloodPressure: "128/82",
      heartRate: "75",
      temperature: "36.8°C"
    },
    {
      id: "57687-LX",
      name: "Amy White",
      age: 29,
      gender: "Female",
      phone: "555-987-6543",
      email: "amy.white@email.com",
      status: "active",
      condition: "Migraine",
      lastVisit: "Today, 10:00",
      bloodPressure: "118/76",
      heartRate: "68",
      temperature: "36.5°C"
    },
    {
      id: "57688-LX",
      name: "Tyler Young",
      age: 55,
      gender: "Male",
      phone: "555-456-7890",
      email: "tyoung@email.com",
      status: "follow-up",
      condition: "Cardiac",
      lastVisit: "Yesterday, 14:30",
      bloodPressure: "135/85",
      heartRate: "78",
      temperature: "37.0°C"
    },
    {
      id: "57689-LX",
      name: "Robert Brown",
      age: 65,
      gender: "Male",
      phone: "555-321-6547",
      email: "rbrown@email.com",
      status: "emergency",
      condition: "Respiratory",
      lastVisit: "Today, 11:45",
      bloodPressure: "155/95",
      heartRate: "95",
      temperature: "38.5°C"
    }
  ];

  const selectedPatient = patientId 
    ? patients.find(p => p.id === patientId) 
    : patients[0];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const vitalHistory = [
    { date: "May 10", bp: 142, hr: 86, temp: 37.1 },
    { date: "May 11", bp: 140, hr: 85, temp: 37.0 },
    { date: "May 12", bp: 138, hr: 83, temp: 36.9 },
    { date: "May 13", bp: 145, hr: 88, temp: 37.2 },
    { date: "May 14", bp: 143, hr: 87, temp: 37.1 },
    { date: "May 15", bp: 141, hr: 85, temp: 37.0 }
  ];

  return (
    <div className="patients-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Patients</h1>
          <p className="subtitle">Manage patient records, view medical history, and track treatment progress</p>
        </div>
        <button className="primary-button">+ New Patient</button>
      </div>

      {/* Main Content - Two Columns */}
      <div className="patients-main">
        {/* Left Column - Patient List */}
        <div className="patients-list-column">
          {/* Search and Filters */}
          <div className="list-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search patients by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            <div className="filter-tabs">
              <button className={filterStatus === "all" ? "active" : ""} onClick={() => setFilterStatus("all")}>All</button>
              <button className={filterStatus === "active" ? "active" : ""} onClick={() => setFilterStatus("active")}>Active</button>
              <button className={filterStatus === "emergency" ? "active" : ""} onClick={() => setFilterStatus("emergency")}>Emergency</button>
              <button className={filterStatus === "follow-up" ? "active" : ""} onClick={() => setFilterStatus("follow-up")}>Follow-up</button>
            </div>
          </div>

          {/* Patients List */}
          <div className="patients-list-container">
            {filteredPatients.map(patient => (
              <Link to={`/patients/${patient.id}`} key={patient.id} className={`patient-card ${selectedPatient?.id === patient.id ? "selected" : ""}`}>
                <div className="patient-card-header">
                  <div className="patient-avatar">{patient.name.split(" ").map(n => n[0]).join("")}</div>
                  <div className="patient-card-info">
                    <h3>{patient.name}</h3>
                    <p>ID: {patient.id} • {patient.age} years, {patient.gender}</p>
                  </div>
                  <span className={`status-badge ${patient.status}`}>{patient.status}</span>
                </div>
                <div className="patient-card-details">
                  <div className="detail-item">
                    <span className="detail-label">Condition</span>
                    <span className="detail-value">{patient.condition}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Last Visit</span>
                    <span className="detail-value">{patient.lastVisit}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Vitals</span>
                    <span className="detail-value">{patient.bloodPressure} | {patient.heartRate} BPM</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column - Patient Details */}
        <div className="patient-details-column">
          {selectedPatient && (
            <>
              {/* Patient Header */}
              <div className="patient-header">
                <div className="patient-main-info">
                  <div className="patient-large-avatar">
                    {selectedPatient.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h2>{selectedPatient.name}</h2>
                    <p className="patient-id">{selectedPatient.id} • {selectedPatient.age} years, {selectedPatient.gender}</p>
                    <p className="patient-contact">
                      📞 {selectedPatient.phone} • 📧 {selectedPatient.email}
                    </p>
                  </div>
                </div>
                <div className="patient-actions">
                  <button className="action-button">📝 New Note</button>
                  <button className="action-button">💊 Prescribe</button>
                  <button className="action-button">📅 Schedule</button>
                </div>
              </div>

              {/* Patient Tabs */}
              <div className="patient-tabs">
                <button className="active">Overview</button>
                <button>Medical History</button>
                <button>Test Results</button>
                <button>Prescriptions</button>
                <button>Billing</button>
              </div>

              {/* Patient Content */}
              <div className="patient-content">
                {/* Current Vitals */}
                <div className="section-card">
                  <h3>Current Vitals</h3>
                  <div className="vitals-grid">
                    <div className="vital-box">
                      <div className="vital-label">Blood Pressure</div>
                      <div className="vital-value">{selectedPatient.bloodPressure}</div>
                      <div className="vital-trend">↘️ Trending down</div>
                    </div>
                    <div className="vital-box">
                      <div className="vital-label">Heart Rate</div>
                      <div className="vital-value">{selectedPatient.heartRate} BPM</div>
                      <div className="vital-trend">→ Stable</div>
                    </div>
                    <div className="vital-box">
                      <div className="vital-label">Temperature</div>
                      <div className="vital-value">{selectedPatient.temperature}</div>
                      <div className="vital-trend">↗️ Slight increase</div>
                    </div>
                  </div>
                </div>

                {/* Vitals Chart */}
                <div className="section-card">
                  <h3>Vitals History (Last 7 Days)</h3>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={vitalHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="bp" stroke="#3b82f6" name="Blood Pressure" />
                        <Line type="monotone" dataKey="hr" stroke="#ef4444" name="Heart Rate" />
                        <Line type="monotone" dataKey="temp" stroke="#10b981" name="Temperature" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Allergies & Medications */}
                <div className="two-column-grid">
                  <div className="section-card">
                    <h3>Allergies</h3>
                    <div className="allergies-list">
                      {selectedPatient.allergies?.map((allergy, index) => (
                        <div key={index} className="allergy-item">
                          <div className="allergy-type">{allergy.type}</div>
                          <span className={`allergy-status ${allergy.status.toLowerCase()}`}>
                            {allergy.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="section-card">
                    <h3>Current Medications</h3>
                    <div className="medications-list">
                      {selectedPatient.medications?.map((med, index) => (
                        <div key={index} className="medication-item">
                          <div className="medication-name">{med}</div>
                          <div className="medication-status">Active</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visit History */}
                <div className="section-card">
                  <h3>Recent Visits</h3>
                  <div className="visits-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Visit Type</th>
                          <th>Diagnosis</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPatient.visitHistory?.map((visit, index) => (
                          <tr key={index}>
                            <td>{visit.date}</td>
                            <td>{visit.type}</td>
                            <td>{visit.diagnosis}</td>
                            <td><span className="status-completed">Completed</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Test Results */}
                <div className="section-card">
                  <h3>Latest Test Results</h3>
                  <div className="test-results">
                    {selectedPatient.testResults?.map((test, index) => (
                      <div key={index} className="test-item">
                        <div className="test-info">
                          <div className="test-name">{test.test}</div>
                          <div className="test-result">{test.result}</div>
                        </div>
                        <div className="test-details">
                          <div className="test-normal">Normal: {test.normal}</div>
                          <span className={`test-status ${test.status}`}>{test.status.toUpperCase()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Patients;