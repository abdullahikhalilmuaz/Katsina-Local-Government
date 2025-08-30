import { useState } from "react";
import "../styles/primaryhome.css";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import StaffRecords from "../components/StaffRecords";
import FileTracking from "../components/FileTracking";
import FileForm from "../components/FileForm";
import Reports from "../components/Reports";
export default function LandingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarContent, setSideBarContent] = useState(null);

  return (
    <div className="app-container">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setSideBarContent={setSideBarContent}
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
