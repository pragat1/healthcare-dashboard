function Header({ toggleSidebar, toggleTheme }) {
  return (
    <div className="header">
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <button 
          className="menu-button" 
          onClick={toggleSidebar}
          style={{
            background: "#f1f5f9",
            border: "none",
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "20px"
          }}
        >
          ☰
        </button>
        <h1>Intelly Dashboard</h1>
      </div>
      
      <div className="header-actions">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "600"
          }}>
            DO
          </div>
          <div>
            <div style={{ fontWeight: "600", color: "#1e293b" }}>Dr. Olivia</div>
            <div style={{ fontSize: "13px", color: "#64748b" }}>Admin</div>
          </div>
        </div>
        
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
        >
          🌙
        </button>
      </div>
    </div>
  );
}

export default Header;