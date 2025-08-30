import { useState } from "react";
import "../styles/secondaryregister.css";
import SecondarySignup from "../components/SecondarySignup";
import SecondaryLogin from "../components/SecondaryLogin";

export default function SecondaryRegister() {
  const [pages, setPages] = useState("signup");
  return (
    <div className="secondary-register-main-container">
      {pages === "signup" ? (
        <SecondarySignup setPages={setPages} />
      ) : pages === "login" ? (
        <SecondaryLogin setPages={setPages} />
      ) : (
        <SecondaryLogin setPages={setPages} />
      )}
    </div>
  );
}
