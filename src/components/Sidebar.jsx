import { NavLink } from "react-router-dom";

function Sidebar({ isOpen }) {
  const mainMenu = [
    { icon: "📊", label: "Dashboard", path: "/dashboard" },
    { icon: "📅", label: "Schedule", path: "/schedule" },
    { icon: "👥", label: "Patients", path: "/patients" },
    { icon: "📈", label: "Statistics & reports", path: "/statistics" },
    { icon: "📚", label: "Education", path: "/education" },
    { icon: "📄", label: "My articles", path: "/articles" },
  ];

  const toolsMenu = [
    { icon: "💬", label: "Chats & calls", path: "/chats" },
    { icon: "💰", label: "Billing", path: "/billing" },
    { icon: "📁", label: "Documents base", path: "/documents" },
    { icon: "⚙️", label: "Settings", path: "/settings" },
    { icon: "🚪", label: "Log out", path: "/logout" },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">🏥</div>
        <h2>intelly</h2>
      </div>

      {/* Search */}
      <div className="sidebar-search">
        <input type="text" placeholder="Search..." />
        <span className="search-icon">🔍</span>
      </div>

      {/* General Menu */}
      <div className="menu-section">
        <div className="section-label">General</div>
        <nav className="sidebar-menu">
          {mainMenu.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Tools Menu */}
      <div className="menu-section">
        <div className="section-label">Tools</div>
        <nav className="sidebar-menu">
          {toolsMenu.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Quick Stats */}
      <div className="sidebar-stats">
        <div className="stat-item">
          <div className="stat-label">All patients</div>
          <div className="stat-value">57685</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Today's appointments</div>
          <div className="stat-value">14</div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;