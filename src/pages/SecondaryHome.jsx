import { useState } from "react";
import SecondaryHomeBottomNavBar from "../components/SecondaryHomeBottomNavBar";
import "../styles/userhome.css";
import Home from "../components/Home";
import Profile from "../components/Profile";

export default function LandingPage() {
  const [screens, setScreens] = useState(null);

  return (
    <div className="user-main-home-container">
      <div className="user-main-content-container">
        <div>
          {screens === null ? (
            <Home />
          ) : screens === "home" ? (
            <Home />
          ) : screens === "profile" ? (
            <Profile />
          ) : screens === "collab" ? (
            "collab"
          ) : screens === "notification" ? (
            "notification"
          ) : (
            <Home />
          )}
        </div>
      </div>
      <SecondaryHomeBottomNavBar setScreens={setScreens} />
    </div>
  );
}
