import { useState } from "react";

function Education() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Education categories
  const categories = [
    { id: "all", name: "All", count: 24 },
    { id: "clinical", name: "Clinical", count: 8 },
    { id: "neurology", name: "Neurology", count: 5 },
    { id: "immunology", name: "Immunology", count: 4 },
    { id: "cardiology", name: "Cardiology", count: 3 },
    { id: "practice", name: "Practice Management", count: 4 }
  ];

  // Live events
  const liveEvents = [
    {
      id: 1,
      title: "Clinical Immunology",
      description: "Health systems science in medical education. Do you know how to optimally manage moderate to severe asthma in your patients?",
      date: "Monday, 15 May",
      time: "60 min",
      category: "immunology",
      live: true,
      speakers: ["Dr. Sarah Johnson", "Dr. Michael Chen"]
    },
    {
      id: 2,
      title: "Neurology Best Practices",
      description: "Best Practices in Spinal Muscular Atrophy. Get expert insight on how to develop a treatment of rare disease",
      date: "Tuesday, 16 May",
      time: "30 min",
      category: "neurology",
      live: false,
      speakers: ["Dr. Robert Kim"]
    },
    {
      id: 3,
      title: "Developmental Encephalopathies",
      description: "Unravelling Complex Cases in Developmental and Epileptic Encephalopathies. Clear information and case studies.",
      date: "Wednesday, 17 May",
      time: "45 min",
      category: "neurology",
      live: false,
      speakers: ["Dr. Emily White", "Dr. James Wilson"]
    }
  ];

  // Field updates
  const fieldUpdates = [
    {
      id: 1,
      title: "Long-Term Use of ADHD Meds and CVD Risk: New Data",
      date: "22 April 2024",
      description: "In 2020, 25% of US adults with chronic pain managed their symptoms with medication alone versus nonpharmacological treatments.",
      category: "clinical",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Chronic Pain in the US: New Data",
      date: "22 April 2024",
      description: "In 2020, 28% of US adults with chronic pain managed their symptoms with medication alone versus nonpharmacological treatments.",
      category: "clinical",
      readTime: "4 min"
    },
    {
      id: 3,
      title: "New Guidelines for Hypertension Management",
      date: "18 April 2024",
      description: "Updated guidelines for blood pressure management in adults with hypertension.",
      category: "cardiology",
      readTime: "8 min"
    }
  ];

  // Top articles
  const topArticles = [
    { title: "Setting Up a Telemedicine in Your Practice", category: "practice", views: "2.4K" },
    { title: "Using EHRs to Improve Your Practice", category: "practice", views: "1.8K" },
    { title: "Why do I need a headache diary?", category: "neurology", views: "1.5K" },
    { title: "Medical Prescription Rules Q3 2024", category: "clinical", views: "1.2K" },
    { title: "X-Ray Bones Broken - Example Cases", category: "clinical", views: "980" }
  ];

  // My saved articles
  const savedArticles = [
    { title: "Advanced Diabetes Management", savedDate: "May 10, 2024", progress: "75%" },
    { title: "Pediatric Emergency Protocols", savedDate: "May 8, 2024", progress: "30%" },
    { title: "Mental Health First Aid", savedDate: "May 5, 2024", progress: "100%" }
  ];

  const filteredEvents = liveEvents.filter(event => {
    if (activeCategory === "all") return true;
    return event.category === activeCategory;
  });

  return (
    <div className="education-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Education & Knowledge Base</h1>
          <p className="subtitle">Keep learning, Dr. Olivia. This is your knowledge base with live events, field updates, and articles.</p>
        </div>
        <div className="education-search">
          <input
            type="text"
            placeholder="Search articles, events, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? "active" : ""}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
            <span className="category-count">{category.count}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="education-grid">
        {/* Left Column - Live Events */}
        <div className="education-column">
          {/* Live Events */}
          <div className="live-events-card">
            <div className="card-header">
              <h2>Live Now</h2>
              <div className="live-badge">🔴 LIVE</div>
            </div>
            
            <div className="events-list">
              {filteredEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-header">
                    <span className={`event-category ${event.category}`}>{event.category}</span>
                    {event.live && <span className="live-indicator">● Live</span>}
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  <div className="event-details">
                    <div className="event-date">
                      <span className="detail-icon">📅</span>
                      {event.date}
                    </div>
                    <div className="event-time">
                      <span className="detail-icon">⏱️</span>
                      {event.time}
                    </div>
                  </div>
                  <div className="event-speakers">
                    <span className="detail-icon">👨‍⚕️</span>
                    {event.speakers.join(", ")}
                  </div>
                  <div className="event-actions">
                    <button className="primary-button">{event.live ? "Join Now" : "Schedule"}</button>
                    <button className="secondary-button">Save for later</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Field Updates */}
          <div className="updates-card">
            <div className="card-header">
              <h2>Recent Field Updates</h2>
              <button className="view-all">Show all →</button>
            </div>
            
            <div className="updates-list">
              {fieldUpdates.map(update => (
                <div key={update.id} className="update-card">
                  <div className="update-header">
                    <span className="update-category">{update.category}</span>
                    <span className="update-date">{update.date}</span>
                  </div>
                  <h3 className="update-title">{update.title}</h3>
                  <p className="update-description">{update.description}</p>
                  <div className="update-footer">
                    <span className="read-time">📖 {update.readTime} read</span>
                    <button className="update-action">[Open resource] ✨</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Resources */}
        <div className="education-column">
          {/* Top Articles */}
          <div className="articles-card">
            <div className="card-header">
              <h2>Top Articles for You</h2>
              <button className="view-all">View all →</button>
            </div>
            
            <div className="articles-list">
              {topArticles.map((article, index) => (
                <div key={index} className="article-item">
                  <div className="article-info">
                    <h3 className="article-title">{article.title}</h3>
                    <span className="article-category">{article.category}</span>
                  </div>
                  <div className="article-stats">
                    <span className="article-views">👁️ {article.views}</span>
                    <button className="read-button">Read →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Articles */}
          <div className="saved-articles-card">
            <h2>My Saved Articles</h2>
            <div className="saved-list">
              {savedArticles.map((article, index) => (
                <div key={index} className="saved-item">
                  <div className="saved-info">
                    <h3 className="saved-title">{article.title}</h3>
                    <span className="saved-date">Saved: {article.savedDate}</span>
                  </div>
                  <div className="saved-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: article.progress }}
                      ></div>
                    </div>
                    <span className="progress-text">{article.progress}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Stats */}
          <div className="learning-stats-card">
            <h2>Your Learning Stats</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">📚</div>
                <div className="stat-info">
                  <div className="stat-value">24</div>
                  <div className="stat-label">Articles Read</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">🎓</div>
                <div className="stat-info">
                  <div className="stat-value">8</div>
                  <div className="stat-label">Courses Completed</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">⏱️</div>
                <div className="stat-info">
                  <div className="stat-value">42h</div>
                  <div className="stat-label">Learning Time</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">📈</div>
                <div className="stat-info">
                  <div className="stat-value">94%</div>
                  <div className="stat-label">Retention Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="quick-links-card">
            <h2>Quick Links</h2>
            <div className="links-grid">
              <button className="link-button">
                <span className="link-icon">📋</span>
                <span className="link-text">Clinical Guidelines</span>
              </button>
              <button className="link-button">
                <span className="link-icon">💊</span>
                <span className="link-text">Drug Database</span>
              </button>
              <button className="link-button">
                <span className="link-icon">🧪</span>
                <span className="link-text">Lab Protocols</span>
              </button>
              <button className="link-button">
                <span className="link-icon">🏥</span>
                <span className="link-text">Hospital Protocols</span>
              </button>
              <button className="link-button">
                <span className="link-icon">📄</span>
                <span className="link-text">Document Templates</span>
              </button>
              <button className="link-button">
                <span className="link-icon">🎥</span>
                <span className="link-text">Video Library</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="certifications-section">
        <h2>Available Certifications</h2>
        <div className="certifications-grid">
          <div className="certification-card">
            <div className="cert-header">
              <span className="cert-icon">🏥</span>
              <span className="cert-category">Clinical</span>
            </div>
            <h3>Advanced Cardiac Life Support</h3>
            <p>Renew your ACLS certification with latest guidelines</p>
            <div className="cert-details">
              <span className="detail">🕒 8 hours</span>
              <span className="detail">📝 Online Exam</span>
              <span className="detail">📜 CME Credits: 8</span>
            </div>
            <button className="primary-button">Enroll Now</button>
          </div>

          <div className="certification-card">
            <div className="cert-header">
              <span className="cert-icon">🧠</span>
              <span className="cert-category">Neurology</span>
            </div>
            <h3>Epilepsy Management</h3>
            <p>Advanced course on epileptic disorders and treatments</p>
            <div className="cert-details">
              <span className="detail">🕒 6 hours</span>
              <span className="detail">📝 Case Studies</span>
              <span className="detail">📜 CME Credits: 6</span>
            </div>
            <button className="primary-button">Enroll Now</button>
          </div>

          <div className="certification-card">
            <div className="cert-header">
              <span className="cert-icon">💻</span>
              <span className="cert-category">Technology</span>
            </div>
            <h3>Telemedicine Mastery</h3>
            <p>Best practices for virtual consultations and remote care</p>
            <div className="cert-details">
              <span className="detail">🕒 4 hours</span>
              <span className="detail">📝 Practical Exercises</span>
              <span className="detail">📜 CME Credits: 4</span>
            </div>
            <button className="primary-button">Enroll Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;