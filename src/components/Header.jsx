import { useState } from "react";
import "../styles/header.css";
import coatOfArms from "../assets/coat-of-arms.png";

export default function Header({ setOpenState, openState }) {
  const handleOpenState = () => {
    if (window.location.href === "http://localhost:5173/secondary-register") {
      window.location.href === "http://localhost:5173/primary-register";
    } else if (
      window.location.href === "http://localhost:5173/primary-register"
    ) {
      window.location.href === "http://localhost:5173/secondary-register";
    }
  };
  let user;

  function setAdmin() {
    window.location.href = "secondary-register";
  }
  function setUser() {
    window.location.href = "primary-register";
  }
  return (
    <div className="main-header">
      <div className="menu-logo-title">
        <div className="menu-icon">
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

      <div
        className="header-actions"
        style={{ display: "flex", flexDirection: "column" }}
        onClick={handleOpenState}
      >
        <div className="user-profile">
          <span className="user-avatar"></span>
          <span>{`${openState ? "Admin" : "Users"}`}</span>
        </div>
      </div>

      {/* <div
        className="header-actions"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="user-profile">
          <span className="user-avatar">AD</span>
          <span className="user-name">Admin User</span>
        </div>
        <div className="logout-toggle">logout</div>
      </div> */}
    </div>
  );
}
