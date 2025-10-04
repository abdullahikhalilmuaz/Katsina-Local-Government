import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/primaryhome.css";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import StaffRecords from "../components/StaffRecords";
import FileTracking from "../components/FileTracking";
import FileForm from "../components/FileForm";
import Reports from "../components/Reports";
import Notifications from "../components/Notification"; // Add this import

export default function LandingPage({ sideme, setSideme }) {
  const [sidebarContent, setSideBarContent] = useState(() => {
    return localStorage.getItem("currentScreen") || "dashboard";
  });
  const [myScreens, setMyscreens] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (!adminData) {
      navigate("/primary-register");
    }
  }, [navigate]);

  const closeSidebar = () => {
    setSideme(false);
  };

  const handleScreenChange = (screen) => {
    setSideBarContent(screen);
    localStorage.setItem("currentScreen", screen);
  };

  useEffect(() => {
    if (sidebarContent) {
      localStorage.setItem("currentScreen", sidebarContent);
    }
  }, [sidebarContent]);

  const saveScreen = localStorage.setItem("screen-name", myScreens);

  return (
    <div className="app-container">
      <Sidebar
        sideme={sideme}
        setSideme={setSideme}
        setSideBarContent={handleScreenChange}
        closeSidebar={closeSidebar}
        myScreens={myScreens}
        setMyscreens={setMyscreens}
      />
      <div className="content-area" onClick={() => sideme && closeSidebar()}>
        {sidebarContent === "dashboard" ? (
          <Dashboard
            setSideBarContent={handleScreenChange}
            myScreens={myScreens}
            setMyscreens={setMyscreens}
          />
        ) : sidebarContent === "staff-record" ? (
          <StaffRecords myScreens={myScreens} setMyscreens={setMyscreens} />
        ) : sidebarContent === "file-tracking" ? (
          <FileTracking myScreens={myScreens} setMyscreens={setMyscreens} />
        ) : sidebarContent === "reports" ? (
          <Reports myScreens={myScreens} setMyscreens={setMyscreens} />
        ) : sidebarContent === "new-file" ? (
          <FileForm myScreens={myScreens} setMyscreens={setMyscreens} />
        ) : sidebarContent === "notifications" ? ( // Add this condition
          <Notifications myScreens={myScreens} setMyscreens={setMyscreens} />
        ) : (
          <Dashboard
            setSideBarContent={handleScreenChange}
            myScreens={myScreens}
            setMyscreens={setMyscreens}
          />
        )}
      </div>
    </div>
  );
}
