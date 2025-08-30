import "../styles/landingpage.css";
export default function LandingPage() {
  const handleLogin = () => {
    window.location.href = "/primary-register";
  };
  return (
    <div className="landing-page-main-container">
      <div className="landing-page-wrapper">
        <h3>Welcome Back!</h3>
        <button onClick={handleLogin}>login ?</button>
      </div>
    </div>
  );
}
