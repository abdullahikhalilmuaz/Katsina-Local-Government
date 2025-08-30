import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/primaryregister.css";
import PrimarySignup from "../components/PrimarySignup";
import PrimaryLogin from "../components/PrimaryLogin";

export default function PrimaryRegister() {
  const [pages, setPages] = useState("signup");
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      navigate("/primary-home"); // already logged in as admin
    }
  }, [navigate]);

  return (
    <div className="primary-register-main-container">
      {pages === "signup" ? (
        <PrimarySignup setPages={setPages} />
      ) : (
        <PrimaryLogin setPages={setPages} />
      )}
    </div>
  );
}
