import { useState } from "react";
import "../styles/primarysignup.css";

export default function PrimarySignup({ setPages }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (form.password !== form.confirmPassword) {
      return setErrorMsg("Passwords do not match");
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://katsina-local-government-server-base-url.onrender.com/api/admins/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Something went wrong");
      } else {
        setSuccessMsg("Signup successful! You can now login.");
        setForm({ name: "", email: "", password: "", confirmPassword: "" });
      }
    } catch (err) {
      setErrorMsg("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageLogin = () => setPages("login");

  return (
    <div className="primary-signup-main-container-form">
      <h2>Admin Signup</h2>

      {errorMsg && <div className="error-box">{errorMsg}</div>}
      {successMsg && <div className="success-box">{successMsg}</div>}

      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </label>
      </form>

      <button onClick={handlePageLogin}>Back to Login</button>
    </div>
  );
}
