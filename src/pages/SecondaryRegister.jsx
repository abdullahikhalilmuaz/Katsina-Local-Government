import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/secondaryregister.css";
import SecondarySignup from "../components/SecondarySignup";
import SecondaryLogin from "../components/SecondaryLogin";

export default function SecondaryRegister() {
  const [pages, setPages] = useState("signup");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      navigate("/secondary-home"); // already logged in as user
    }
  }, [navigate]);

  return (
    <div className="secondary-register-main-container">
      {pages === "signup" ? (
        <SecondarySignup setPages={setPages} />
      ) : (
        <SecondaryLogin setPages={setPages} />
      )}
    </div>
  );
}
