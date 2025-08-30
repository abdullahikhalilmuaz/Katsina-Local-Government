import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/primaryhome.css";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import StaffRecords from "../components/StaffRecords";
import FileTracking from "../components/FileTracking";
import FileForm from "../components/FileForm";
import Reports from "../components/Reports";

export default function LandingPage({ sideme, setSideme }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarContent, setSideBarContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (!adminData) {
      navigate("/primary-register"); // 🚀 redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="app-container">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setSideBarContent={setSideBarContent}
        setSideme={setSideme}
        sideme={sideme}
      />
      <div className="content-area">
        {sidebarContent === "dashboard" ? (
          <Dashboard />
        ) : sidebarContent === "staff-record" ? (
          <StaffRecords />
        ) : sidebarContent === "file-tracking" ? (
          <FileTracking />
        ) : sidebarContent === "reports" ? (
          <Reports />
        ) : sidebarContent === "new-file" ? (
          <FileForm />
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
}
