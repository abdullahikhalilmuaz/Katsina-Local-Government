import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/secondarylogin.css";

export default function SecondaryLogin({ setPages }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      setLoading(true);

      const res = await fetch(
        "https://katsina-local-government-server-base-url.onrender.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg("✅ Login successful!");

        // ✅ Save user data to localStorage
        localStorage.setItem("userData", JSON.stringify(data.user));

        console.log("User logged in:", data.user);

        // ✅ Redirect to /secondary-home
        navigate("/secondary-home");
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
    <div className="secondary-login-main-container-form">
      <h2>User Login</h2>

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
          <button
            type="submit"
            disabled={loading}
            style={{ background: "rgb(0, 76, 153)", color: "white" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </label>
      </form>

      <button onClick={() => setPages("signup")}>Back to Signup</button>
    </div>
  );
}
