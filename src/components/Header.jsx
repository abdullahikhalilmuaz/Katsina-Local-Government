import { useNavigate, useLocation } from "react-router-dom";
import "../styles/header.css";
import coatOfArms from "../assets/coat-of-arms.png";

export default function Header({ setOpenState, openState, setSideme, sideme }) {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = localStorage.getItem("userData");
  const adminData = localStorage.getItem("adminData");

  // Toggle sidebar
  const handleSidebar = () => {
    setSideme(!sideme); // toggles true/false
  };

  // User/Admin toggle or logout
  const handleToggle = () => {
    if (userData || adminData) {
      // Logout flow
      localStorage.removeItem("userData");
      localStorage.removeItem("adminData");
      localStorage.removeItem("viewStaffData");
      localStorage.removeItem("printStaffData");

      navigate("/secondary-register");
      window.location.reload();
    } else {
      // Toggle Admin/User when no one is logged in
      if (openState) {
        setOpenState(false);
        if (location.pathname.includes("primary-register")) {
          navigate("/secondary-register");
        }
      } else {
        setOpenState(true);
        if (location.pathname.includes("secondary-register")) {
          navigate("/primary-register");
        }
      }
    }
  };

  return (
    <div className="main-header">
      <div className="menu-logo-title">
        {/* Sidebar toggle button */}
        <div
          className="menu-icon"
          onClick={handleSidebar}
          style={{ cursor: "pointer" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="coat-of-arms">
          <img
            src={coatOfArms}
            alt="Coat of Arms"
            className="logo"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </div>

        <div className="header-titles">
          <h1 className="header-title">
            Katsina Local Government Council
            <span className="header-subtitle">
              Staff File Record Management System
            </span>
          </h1>
        </div>

        <div className="header-titles2">
          <h1 className="header-title">
            KTLG Council
            <br />
            <span className="header-subtitle">
              Staff File Record Management System
            </span>
          </h1>
        </div>
      </div>

      {/* User/Admin Toggle OR Logout */}
      <div
        className="header-actions"
        style={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          alignItems: "flex-end",
        }}
        onClick={handleToggle}
      >
        <div className="user-profile">
          <span className="user-avatar"></span>
          <span>
            {userData || adminData ? "Logout" : openState ? "Admin" : "User"}
          </span>
        </div>
      </div>
    </div>
  );
}
