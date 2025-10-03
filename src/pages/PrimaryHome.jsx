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
  const [sidebarContent, setSideBarContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (!adminData) {
      navigate("/primary-register");
    }
  }, [navigate]);

  // Function to close sidebar
  const closeSidebar = () => {
    setSideme(false);
  };

  return (
    <div className="app-container">
      <Sidebar
        sideme={sideme}
        setSideme={setSideme}
        setSideBarContent={setSideBarContent}
        closeSidebar={closeSidebar}
      />
      <div className="content-area" onClick={() => sideme && closeSidebar()}>
        {sidebarContent === "dashboard" ? (
          <Dashboard setSideBarContent={setSideBarContent} />
        ) : sidebarContent === "staff-record" ? (
          <StaffRecords />
        ) : sidebarContent === "file-tracking" ? (
          <FileTracking />
        ) : sidebarContent === "reports" ? (
          <Reports />
        ) : sidebarContent === "new-file" ? (
          <FileForm />
        ) : (
          <Dashboard setSideBarContent={setSideBarContent} />
        )}
      </div>
    </div>
  );
}
