import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Schedule from "./pages/Schedule";
import Statistics from "./pages/Statistics";
import Billing from "./pages/Billing";
import Education from "./pages/Education";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`app ${darkMode ? "dark" : ""}`}>
        <Sidebar isOpen={sidebarOpen} />
        
        <div className="main-container">
          <Header 
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            toggleTheme={() => setDarkMode(!darkMode)}
          />
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/education" element={<Education />} />
          
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;