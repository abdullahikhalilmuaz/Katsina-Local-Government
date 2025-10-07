import "../styles/landingpage.css";

export default function LandingPage() {
  const handleLogin = () => {
    window.location.href = "/primary-register";
  };

  return (
    <div className="landing-page-main-container">
      {/* Header Section */}
      <header className="landing-header">
        <div className="header-content">
          <div className="logo-section">
            <h2 className="system-title">Staff Management System</h2>
          </div>
          <br />
          <br />
        </div>
      </header>

      {/* Hero Section with Commissioner */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="welcome-badge" style={{ cursor: "pointer" }}>
              <span>Welcome</span>
            </div>
            <div
              className="welcome-badge"
              onClick={handleLogin}
              style={{ marginLeft: "10px", cursor: "pointer" }}
            >
              <span>Login ?</span>
            </div>
            <p className="hero-subtitle">
              Leading with Excellence, Serving with Dedication
            </p>
            <p className="hero-description">
              As commissioned by Hon. Isah Miqdad AD Saude, we are dedicated to
              delivering exceptional service.
            </p>
            <div className="hero-actions"></div>
          </div>

          <div className="hero-image">
            <div className="image-container">
              <div className="image-wrapper">
                {/* Replace with actual commissioner image */}
                <img
                  src="/upload/img.jpg"
                  alt="Commissioner"
                  className="commissioner-image"
                />

                <div className="image-overlay"></div>
              </div>
              <div className="commissioner-info">
                <h3 className="commissioner-name">Hon. Isah Miqdad AD Saude</h3>
                <p className="commissioner-title">Executive Chairman</p>
                <p className="commissioner-department">
                  Katsina Local Government Council
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Our Services</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Staff Records Management</h3>
              <p>
                Comprehensive database for all staff information and records
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3>Appointment Tracking</h3>
              <p>
                Track first appointments and present appointments efficiently
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3>Document Verification</h3>
              <p>Secure verification numbers and file management system</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3>Department Coordination</h3>
              <p>Seamless coordination across all departments and portfolios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Office Hours</h4>
            <p>Monday - Friday</p>
            <p>8:00 AM - 5:00 PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2025 Katsina Local Government Staff File Management System.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
