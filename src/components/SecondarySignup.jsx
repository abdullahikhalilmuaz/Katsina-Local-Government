import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/primarysignup.css"; // reuse same style

export default function SecondarySignup({ setPages }) {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

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
        "https://katsina-local-government-server-base-url.onrender.com/api/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: form.firstname,
            lastname: form.lastname,
            username: form.username,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Something went wrong");
      } else {
        setSuccessMsg("✅ Signup successful!");

        // ✅ Save user to localStorage immediately after signup
        localStorage.setItem("userData", JSON.stringify(data.user));

        console.log("User signed up:", data.user);

        // ✅ Redirect to /secondary-home
        navigate("/secondary-home");
      }
    } catch (err) {
      setErrorMsg("❌ Server error, please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="primary-signup-main-container-form">
      <h2>User Signup</h2>

      {errorMsg && <p className="error">{errorMsg}</p>}
      {successMsg && <p className="success">{successMsg}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="firstname"
            placeholder="Firstname"
            value={form.firstname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="text"
            name="lastname"
            placeholder="Lastname"
            value={form.lastname}
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
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
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

      <button onClick={() => setPages("login")}>Back to Login</button>
    </div>
  );
}
