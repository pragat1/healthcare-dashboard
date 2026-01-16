import { useState } from "react";

function Schedule() {
  const [view, setView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Sample appointments
  const appointments = [
    {
      id: 1,
      title: "Emergency Visit - Taigo Wilkinson",
      start: new Date(2024, 4, 15, 7, 0),
      end: new Date(2024, 4, 15, 8, 0),
      type: "emergency",
      patient: "Taigo Wilkinson",
      room: "Room 312",
      doctor: "Dr. Olivia",
      status: "in-progress",
      description: "Emergency visit for hypertension crisis"
    },
    {
      id: 2,
      title: "Diagnostic Test - Samantha Williams",
      start: new Date(2024, 4, 15, 8, 30),
      end: new Date(2024, 4, 15, 9, 0),
      type: "test",
      patient: "Samantha Williams",
      room: "Lab Floor 5",
      doctor: "Dr. Smith",
      status: "scheduled",
      description: "Routine blood work and diabetes screening"
    },
    {
      id: 3,
      title: "Team Planning Meeting",
      start: new Date(2024, 4, 15, 9, 30),
      end: new Date(2024, 4, 15, 10, 0),
      type: "meeting",
      patient: null,
      room: "Room 290",
      doctor: "All Staff",
      status: "scheduled",
      description: "Weekly team planning and case reviews"
    },
    {
      id: 4,
      title: "Follow-up - Tyler Young",
      start: new Date(2024, 4, 15, 10, 30),
      end: new Date(2024, 4, 15, 11, 30),
      type: "follow-up",
      patient: "Tyler Young",
      room: "Room 302",
      doctor: "Dr. Olivia",
      status: "scheduled",
      description: "Cardiac follow-up after medication adjustment"
    },
    {
      id: 5,
      title: "Video Consultation - Amy White",
      start: new Date(2024, 4, 15, 13, 0),
      end: new Date(2024, 4, 15, 13, 30),
      type: "consultation",
      patient: "Amy White",
      room: "Online",
      doctor: "Dr. Olivia",
      status: "scheduled",
      description: "Migraine management follow-up"
    }
  ];

  // Get today's appointments
  const today = new Date();
  const todayAppointments = appointments.filter(apt => 
    apt.start.getDate() === today.getDate() &&
    apt.start.getMonth() === today.getMonth() &&
    apt.start.getFullYear() === today.getFullYear()
  );

  // Get upcoming appointments (next 7 days)
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const upcomingAppointments = appointments
    .filter(apt => apt.start > new Date() && apt.start < nextWeek)
    .slice(0, 5);

  // Days of week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Generate calendar days
  const getCalendarDays = () => {
    const days = [];
    const date = new Date(currentDate);
    
    // Set to first day of month
    date.setDate(1);
    
    // Get starting day (0 = Sunday, 1 = Monday, etc.)
    const startDay = date.getDay();
    
    // Move back to beginning of week
    date.setDate(date.getDate() - startDay);
    
    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const day = new Date(date);
      const dayAppointments = appointments.filter(apt => 
        apt.start.getDate() === day.getDate() &&
        apt.start.getMonth() === day.getMonth() &&
        apt.start.getFullYear() === day.getFullYear()
      );
      
      days.push({
        date: new Date(day),
        isCurrentMonth: day.getMonth() === currentDate.getMonth(),
        isToday: day.toDateString() === new Date().toDateString(),
        appointments: dayAppointments
      });
      
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  };

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Navigation
  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const calendarDays = getCalendarDays();

  return (
    <div className="schedule-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Schedule</h1>
          <p className="subtitle">Manage appointments, view calendar, and track daily schedule</p>
        </div>
        <div className="schedule-actions">
          <button className="primary-button" onClick={() => setSelectedAppointment({})}>+ New Appointment</button>
          <div className="view-selector">
            <button className={view === "day" ? "active" : ""} onClick={() => setView("day")}>Day</button>
            <button className={view === "week" ? "active" : ""} onClick={() => setView("week")}>Week</button>
            <button className={view === "month" ? "active" : ""} onClick={() => setView("month")}>Month</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="schedule-main">
        {/* Calendar View */}
        <div className="calendar-section">
          <div className="calendar-header">
            <h2>Calendar</h2>
            <div className="calendar-navigation">
              <button onClick={prevMonth}>‹</button>
              <span className="current-month">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button onClick={nextMonth}>›</button>
              <button className="today-button" onClick={goToToday}>Today</button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="calendar-days-header">
            {daysOfWeek.map(day => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid">
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`calendar-day ${day.isToday ? "today" : ""} ${!day.isCurrentMonth ? "other-month" : ""}`}
                onClick={() => console.log("Selected day:", day.date)}
              >
                <div className="day-number">{day.date.getDate()}</div>
                <div className="day-appointments">
                  {day.appointments.slice(0, 2).map(apt => (
                    <div 
                      key={apt.id} 
                      className={`appointment-dot ${apt.type}`}
                      title={`${apt.title} - ${formatTime(apt.start)}`}
                    />
                  ))}
                  {day.appointments.length > 2 && (
                    <div className="more-appointments">+{day.appointments.length - 2}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="schedule-sidebar">
          {/* Today's Timeline */}
          <div className="today-schedule-card">
            <div className="card-header">
              <h3>Today's Timeline</h3>
              <span className="date-badge">
                {months[today.getMonth()]} {today.getDate()}
              </span>
            </div>
            
            <div className="timeline">
              {todayAppointments.length > 0 ? (
                todayAppointments.map(apt => (
                  <div 
                    key={apt.id} 
                    className={`timeline-item ${apt.status}`}
                    onClick={() => setSelectedAppointment(apt)}
                  >
                    <div className="timeline-time">
                      {formatTime(apt.start)} - {formatTime(apt.end)}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-title">{apt.title}</div>
                      <div className="timeline-details">
                        <span className="detail-room">📍 {apt.room}</span>
                        <span className="detail-doctor">👨‍⚕️ {apt.doctor}</span>
                      </div>
                    </div>
                    <button className={`timeline-button ${apt.type}`}>
                      {apt.status === 'in-progress' ? 'In Progress' : 'Join'}
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-appointments">
                  <p>No appointments scheduled for today</p>
                  <button className="secondary-button" onClick={() => setSelectedAppointment({})}>
                    + Schedule Appointment
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="upcoming-card">
            <div className="card-header">
              <h3>Upcoming This Week</h3>
              <button className="view-all">View all →</button>
            </div>
            
            <div className="upcoming-list">
              {upcomingAppointments.map(apt => (
                <div 
                  key={apt.id} 
                  className="upcoming-item"
                  onClick={() => setSelectedAppointment(apt)}
                >
                  <div className="upcoming-date">
                    <div className="date-day">{apt.start.getDate()}</div>
                    <div className="date-month">{months[apt.start.getMonth()].substring(0, 3)}</div>
                  </div>
                  <div className="upcoming-info">
                    <div className="upcoming-patient">{apt.patient || apt.title}</div>
                    <div className="upcoming-time">
                      {formatTime(apt.start)} • {apt.room}
                    </div>
                  </div>
                  <span className={`upcoming-type ${apt.type}`}>{apt.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="schedule-stats">
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <div className="stat-value">{todayAppointments.length}</div>
                <div className="stat-label">Today's Appointments</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-info">
                <div className="stat-value">24 min</div>
                <div className="stat-label">Avg Duration</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <div className="stat-value">5</div>
                <div className="stat-label">Doctors Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="modal-overlay" onClick={() => setSelectedAppointment(null)}>
          <div className="appointment-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {selectedAppointment.id ? "Appointment Details" : "New Appointment"}
              </h3>
              <button className="close-button" onClick={() => setSelectedAppointment(null)}>×</button>
            </div>
            
            <div className="modal-content">
              {selectedAppointment.id ? (
                // View existing appointment
                <div className="appointment-details">
                  <div className="detail-group">
                    <label>Patient</label>
                    <div className="detail-value">{selectedAppointment.patient || "Team Meeting"}</div>
                  </div>
                  <div className="detail-group">
                    <label>Appointment Type</label>
                    <div className="detail-value">
                      <span className={`type-badge ${selectedAppointment.type}`}>
                        {selectedAppointment.type}
                      </span>
                    </div>
                  </div>
                  <div className="detail-group">
                    <label>Date & Time</label>
                    <div className="detail-value">
                      {selectedAppointment.start.toLocaleDateString()} • 
                      {formatTime(selectedAppointment.start)} - {formatTime(selectedAppointment.end)}
                    </div>
                  </div>
                  <div className="detail-group">
                    <label>Location</label>
                    <div className="detail-value">{selectedAppointment.room}</div>
                  </div>
                  <div className="detail-group">
                    <label>Doctor</label>
                    <div className="detail-value">{selectedAppointment.doctor}</div>
                  </div>
                  <div className="detail-group">
                    <label>Description</label>
                    <div className="detail-value">{selectedAppointment.description}</div>
                  </div>
                  <div className="modal-actions">
                    <button className="secondary-button">Reschedule</button>
                    <button className="secondary-button">Cancel Appointment</button>
                    <button className="primary-button">Start Consultation</button>
                  </div>
                </div>
              ) : (
                // Create new appointment form
                <form className="appointment-form">
                  <div className="form-group">
                    <label>Patient Name *</label>
                    <input type="text" placeholder="Enter patient name" required />
                  </div>
                  <div className="form-group">
                    <label>Appointment Type *</label>
                    <select required>
                      <option value="">Select type</option>
                      <option value="emergency">Emergency</option>
                      <option value="routine">Routine Check-up</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="consultation">Consultation</option>
                      <option value="test">Diagnostic Test</option>
                      <option value="meeting">Meeting</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date *</label>
                      <input type="date" required />
                    </div>
                    <div className="form-group">
                      <label>Start Time *</label>
                      <input type="time" required />
                    </div>
                    <div className="form-group">
                      <label>Duration *</label>
                      <select defaultValue="30">
                        <option value="15">15 min</option>
                        <option value="30">30 min</option>
                        <option value="45">45 min</option>
                        <option value="60">60 min</option>
                        <option value="90">90 min</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Room/Location</label>
                    <input type="text" placeholder="Enter room number" />
                  </div>
                  <div className="form-group">
                    <label>Doctor *</label>
                    <select required>
                      <option value="dr-olivia">Dr. Olivia</option>
                      <option value="dr-smith">Dr. Smith</option>
                      <option value="dr-johnson">Dr. Johnson</option>
                      <option value="dr-miller">Dr. Miller</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Notes</label>
                    <textarea placeholder="Add appointment notes..." rows="3"></textarea>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="secondary-button" onClick={() => setSelectedAppointment(null)}>
                      Cancel
                    </button>
                    <button type="submit" className="primary-button">
                      Save Appointment
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Schedule;