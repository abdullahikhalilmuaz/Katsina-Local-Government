import { useEffect, useState } from "react";

export default function ViewStaff({ setViews }) {
  const [staffData, setStaffData] = useState(null);

  useEffect(() => {
    setViews(true);

    // Get staff data from memory or localStorage
    const storedData =
      window.viewStaffData ||
      (typeof localStorage !== "undefined" &&
        (localStorage.getItem("viewStaffData") ||
          localStorage.getItem("printStaffData")));

    if (storedData) {
      if (typeof storedData === "string") {
        setStaffData(JSON.parse(storedData));
      } else {
        setStaffData(storedData);
      }
    }
  }, [setViews]);

  const handlePrint = () => {
    window.print();
  };

  // const handleBack = () => {
  //   setViews(false);
  //   window.history.back();
  //   window.location.href = "/primary-home";
  // };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!staffData) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid #f3f4f6",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <p>Loading staff information...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const initials =
    (staffData.firstname?.[0] || "") + (staffData.lastname?.[0] || "");

  return (
    <div className="view-staff-wrapper">
      {/* Header - No Print */}
      <header className="no-print action-header">
        <h2 className="header-title">📄 Staff Record Details</h2>
        <div className="action-buttons-header">
          <button className="btn btn-print" onClick={handlePrint}>
            🖨️ Print Record
          </button>
          {/* <button className="btn btn-back" onClick={handleBack}>
            ← Back to List
          </button> */}
        </div>
      </header>

      {/* Printable Content */}
      <div className="printable-content">
        {/* Official Letterhead */}
        <div className="letterhead">
          <div className="letterhead-seal">
            <img
              src="/upload/coat-of-arms.png"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              alt="KTLG"
            />
          </div>
          <h1 className="letterhead-title">Katsina Local Government</h1>
          <p className="letterhead-subtitle">Staff Management System</p>
          <div className="letterhead-divider"></div>
        </div>

        {/* Profile Section */}
        <div className="profile-hero">
          <div className="profile-avatar-large">
            {initials.toUpperCase() || "?"}
          </div>
          <div className="profile-hero-info">
            <h2 className="profile-hero-name">
              {staffData.firstname} {staffData.lastname}
            </h2>
            <p className="profile-hero-username">@{staffData.username}</p>
            <div className="profile-hero-badges">
              <span className="hero-badge badge-dept">
                {staffData.department || "No Department"}
              </span>
              <span className="hero-badge badge-grade">
                Grade {staffData.gradeLevel || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="info-section">
          <h3 className="section-heading">
            <span className="section-icon">👤</span>
            Personal Information
          </h3>
          <div className="info-grid">
            <div className="info-card-view">
              <div className="info-card-label">First Name</div>
              <div className="info-card-value">{staffData.firstname}</div>
            </div>
            <div className="info-card-view">
              <div className="info-card-label">Last Name</div>
              <div className="info-card-value">{staffData.lastname}</div>
            </div>
            <div className="info-card-view">
              <div className="info-card-label">Email Address</div>
              <div className="info-card-value">{staffData.email}</div>
            </div>
            <div className="info-card-view">
              <div className="info-card-label">Phone Number</div>
              <div className="info-card-value">{staffData.phone || "N/A"}</div>
            </div>
            <div className="info-card-view">
              <div className="info-card-label">Date of Birth</div>
              <div className="info-card-value">
                {formatDate(staffData.dateOfBirth)}
              </div>
            </div>
            <div className="info-card-view">
              <div className="info-card-label">Username</div>
              <div className="info-card-value">{staffData.username}</div>
            </div>
          </div>
        </div>

        {/* Employment Details Section */}
        <div className="info-section">
          <h3 className="section-heading">
            <span className="section-icon">💼</span>
            Employment Details
          </h3>
          <div className="info-grid">
            <div className="info-card-view">
              <div className="info-card-label">Department</div>
              <div className="info-card-value">
                {staffData.department || "N/A"}
              </div>
            </div>
            <div className="info-card-view">
              <div className="info-card-label">Portfolio/Position</div>
              <div className="info-card-value">
                {staffData.portfolio || "N/A"}
              </div>
            </div>
            <div className="info-card-view">
              <div className="info-card-label">Grade Level</div>
              <div className="info-card-value">
                {staffData.gradeLevel || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Official Records Section */}
        <div className="info-section">
          <h3 className="section-heading">
            <span className="section-icon">🆔</span>
            Official Records
          </h3>
          <div className="info-grid">
            <div className="info-card-view">
              <div className="info-card-label">Verification Number</div>
              <div className="info-card-value">
                {staffData.verificationNumber || "N/A"}
              </div>
            </div>
            <div className="info-card-view">
              <div className="info-card-label">N File Number</div>
              <div className="info-card-value">
                {staffData.nFileNumber || "N/A"}
              </div>
            </div>
            <div className="info-card-view">
              <div className="info-card-label">KTLG Number</div>
              <div className="info-card-value">
                {staffData.ktlgNumber || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Appointment History Section */}
        <div className="info-section">
          <h3 className="section-heading">
            <span className="section-icon">📅</span>
            Appointment History
          </h3>
          <div className="info-grid">
            <div className="info-card-view">
              <div className="info-card-label">Date of First Appointment</div>
              <div className="info-card-value">
                {formatDate(staffData.dateOfFirstAppointment)}
              </div>
            </div>
            <div className="info-card-view">
              <div className="info-card-label">Date of Present Appointment</div>
              <div className="info-card-value">
                {formatDate(staffData.dateOfPresentAppointment)}
              </div>
            </div>
            <div className="info-card-view">
              <div className="info-card-label">Last Login</div>
              <div className="info-card-value">
                {staffData.lastLogin
                  ? new Date(staffData.lastLogin).toLocaleString()
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="print-footer">
          <div className="footer-divider"></div>
          <p className="footer-date">
            Generated on: {new Date().toLocaleString()}
          </p>
          <p className="footer-org">
            Katsina Local Government • Staff Management System
          </p>
          <p className="footer-confidential">⚠️ CONFIDENTIAL DOCUMENT</p>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .view-staff-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .action-header {
          max-width: 1200px;
          margin: 0 auto 20px;
          background: white;
          padding: 20px 30px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header-title {
          margin: 0;
          font-size: 24px;
          color: #2c3e50;
        }

        .action-buttons-header {
          display: flex;
          gap: 12px;
        }

        .printable-content {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.5s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .letterhead {
          text-align: center;
          padding: 30px 0;
          margin-bottom: 40px;
          position: relative;
        }

        .letterhead-seal {
          font-size: 60px;
          margin-bottom: 15px;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .letterhead-title {
          font-size: 36px;
          font-weight: 700;
          color: #027a30;
          margin: 10px 0;
          letter-spacing: 1px;
        }

        .letterhead-subtitle {
          font-size: 16px;
          color: #6c757d;
          margin: 5px 0;
        }

        .letterhead-divider {
          width: 200px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #027a30, transparent);
          margin: 20px auto 0;
        }

        .profile-hero {
          display: flex;
          align-items: center;
          gap: 30px;
          padding: 30px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 15px;
          margin-bottom: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .profile-avatar-large {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 60px;
          font-weight: bold;
          color: white;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          flex-shrink: 0;
        }

        .profile-hero-info {
          flex: 1;
        }

        .profile-hero-name {
          font-size: 32px;
          font-weight: 700;
          color: #2c3e50;
          margin: 0 0 5px 0;
        }

        .profile-hero-username {
          font-size: 18px;
          color: #6c757d;
          margin: 0 0 15px 0;
        }

        .profile-hero-badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .hero-badge {
          padding: 8px 18px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge-dept {
          background: linear-gradient(135deg, #027a30 0%, #0be4b5 100%);
          color: white;
        }

        .badge-grade {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        }

        .info-section {
          margin-bottom: 40px;
        }

        .section-heading {
          font-size: 24px;
          font-weight: 700;
          color: #2c3e50;
          margin: 0 0 20px 0;
          padding-bottom: 12px;
          border-bottom: 3px solid #667eea;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-icon {
          font-size: 28px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .info-card-view {
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          padding: 18px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .info-card-view::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s ease;
        }

        .info-card-view:hover {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
          transform: translateY(-2px);
        }

        .info-card-view:hover::before {
          width: 100%;
          opacity: 0.05;
        }

        .info-card-label {
          font-size: 12px;
          font-weight: 600;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .info-card-value {
          font-size: 16px;
          font-weight: 600;
          color: #2c3e50;
          word-break: break-word;
        }

        .print-footer {
          margin-top: 60px;
          text-align: center;
          padding-top: 30px;
        }

        .footer-divider {
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #027a30, transparent);
          margin-bottom: 20px;
        }

        .footer-date,
        .footer-org,
        .footer-confidential {
          margin: 8px 0;
        }

        .footer-date {
          font-size: 14px;
          color: #6c757d;
        }

        .footer-org {
          font-size: 13px;
          color: #495057;
          font-weight: 600;
        }

        .footer-confidential {
          font-size: 12px;
          color: #dc3545;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .btn {
          padding: 10px 24px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .btn-print {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-back {
          background: #6c757d;
          color: white;
        }

        @media print {
          .view-staff-wrapper {
            background: white;
            padding: 0;
          }

          .no-print {
            display: none !important;
          }

          .printable-content {
            box-shadow: none;
            border-radius: 0;
            padding: 20px;
            max-width: 100%;
          }

          .info-card-view {
            break-inside: avoid;
            box-shadow: none;
          }

          .profile-hero {
            break-inside: avoid;
          }

          .info-section {
            break-inside: avoid;
          }

          .letterhead-seal {
            animation: none;
          }
        }

        @media (max-width: 768px) {
          .view-staff-wrapper {
            padding: 10px;
          }

          .action-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .action-buttons-header {
            width: 100%;
            justify-content: center;
          }

          .printable-content {
            padding: 20px;
          }

          .profile-hero {
            flex-direction: column;
            text-align: center;
          }

          .profile-hero-name {
            font-size: 24px;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .letterhead-title {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}
