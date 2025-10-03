import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SecondaryHomeBottomNavBar from "../components/SecondaryHomeBottomNavBar";
import "../styles/userhome.css";
import Home from "../components/Home";
import Profile from "../components/Profile";
import Collab from "../components/Collab";
import Notification from "../components/Notification";

export default function LandingPage() {
  const [screens, setScreens] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const userData = localStorage.getItem("userData");
  //   if (!userData) {
  //     navigate("/secondary-register"); // 🚀 redirect if not logged in
  //   }
  // }, [navigate]);

  return (
    <div className="user-main-home-container">
      <div className="user-main-content-container">
        <div className="contnet">
          {screens === null ? (
            <Home />
          ) : screens === "home" ? (
            <Home />
          ) : screens === "profile" ? (
            <Profile />
          ) : (
            <Home />
          )}
        </div>
      </div>
      <SecondaryHomeBottomNavBar setScreens={setScreens} />
      {console.log(screens)}
    </div>
  );
}
