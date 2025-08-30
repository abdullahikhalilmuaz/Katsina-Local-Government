import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import "../styles/primarylogin.css";

export default function PrimaryLogin({ setPages }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate(); // ✅ navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      setLoading(true);

      const res = await fetch(
        "https://katsina-local-government-server-base-url.onrender.com/api/admins/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, adminCode }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg("✅ Login successful!");

        // ✅ Save to localStorage
        localStorage.setItem("adminData", JSON.stringify(data.admin));

        console.log("Admin data saved:", data.admin);

        // ✅ Redirect to primary-home
        navigate("/primary-home");
      } else {
        setErrorMsg(data.message || "Invalid credentials");
      }
    } catch (error) {
      setErrorMsg("❌ Server error, please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="primary-login-main-container-form">
      <h2>Admin Login</h2>

      {errorMsg && <div className="error-box">{errorMsg}</div>}
      {successMsg && <div className="success-box">{successMsg}</div>}

      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            type="text"
            placeholder="Admin Code"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            required
          />
        </label>

        <label>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </label>
      </form>

      <button onClick={() => setPages("signup")}>Back to Signup</button>
    </div>
  );
}
