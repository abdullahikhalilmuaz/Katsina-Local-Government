import { useState } from "react";
import "../styles/primaryregister.css";
import PrimarySignup from "../components/PrimarySignup";
import PrimaryLogin from "../components/PrimaryLogin";

export default function PrimaryRegister() {
  const [pages, setPages] = useState("signup");
  return (
    <div className="primary-register-main-container">
      {pages === "signup" ? (
        <PrimarySignup setPages={setPages} />
      ) : pages === "login" ? (
        <PrimaryLogin setPages={setPages} />
      ) : (
        <PrimaryLogin setPages={setPages} />
      )}
    </div>
  );
}
