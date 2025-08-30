import { useEffect, useState } from "react";
import "../styles/view.css"

export default function ViewStaff({ setViews }) {
  const [staffData, setStaffData] = useState(null);

  useEffect(() => {
    setViews(true);

    // Get staff data from localStorage
    const storedData =
      localStorage.getItem("viewStaffData") ||
      localStorage.getItem("printStaffData");

    if (storedData) {
      setStaffData(JSON.parse(storedData));
    }
  }, [setViews]);

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    setViews(false);
    window.history.back();
  };

  if (!staffData) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading staff information...</p>
      </div>
    );
  }

  return (
    <div className="view-staff-container">
      {/* Header that won't print */}
      <header
        className="no-print"
        style={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #dee2e6",
          marginBottom: "20px",
        }}
      >
        <h2>Staff Details</h2>
        <div>
          <button
            className="btn btn-primary"
            onClick={handlePrint}
            style={{ marginRight: "10px" }}
          >
            Print
          </button>
          <button className="btn btn-secondary" onClick={handleBack}>
            Back
          </button>
        </div>
      </header>

      {/* Printable content */}
      <div className="printable-content">
        {/* Letterhead */}
        <div className="letterhead">
          <div className="letterhead-content">
            <h1>Katsina Local Government</h1>
            <p>Staff File Management System</p>
          </div>
          <div className="logo">{/* Add your logo here or leave empty */}</div>
        </div>

        <div className="staff-details-card">
          <h2 className="staff-name">{staffData.staffName}</h2>

          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Staff ID:</span>
              <span className="detail-value">{staffData.staffIdNumber}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">File Number:</span>
              <span className="detail-value">{staffData.fileNumber}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Office File Number:</span>
              <span className="detail-value">
                {staffData.officeFileNumber || "N/A"}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Department:</span>
              <span className="detail-value">{staffData.department}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Grade Level:</span>
              <span className="detail-value">{staffData.gradeLevel}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span
                className={`detail-value status ${
                  staffData.collected
                    ? staffData.returned
                      ? "returned"
                      : "collected"
                    : "pending"
                }`}
              >
                {staffData.collected
                  ? staffData.returned
                    ? "Returned"
                    : "Collected"
                  : "Pending"}
              </span>
            </div>
            {staffData.collectionDate && (
              <div className="detail-item">
                <span className="detail-label">Collection Date:</span>
                <span className="detail-value">
                  {new Date(staffData.collectionDate).toLocaleDateString()}
                </span>
              </div>
            )}
            {staffData.collectorName && (
              <div className="detail-item">
                <span className="detail-label">Collector Name:</span>
                <span className="detail-value">{staffData.collectorName}</span>
              </div>
            )}
            {staffData.purpose && (
              <div className="detail-item">
                <span className="detail-label">Purpose:</span>
                <span className="detail-value">{staffData.purpose}</span>
              </div>
            )}
          </div>
        </div>

        <div className="print-footer">
          <p>Generated on: {new Date().toLocaleDateString()}</p>
          <p>Katsina Local Government File Management System</p>
        </div>
      </div>

      {/* Add CSS for printing */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body, html {
            margin: 0;
            padding: 0;
            background: white;
            height: 100%;
          }
          
          .view-staff-container {
            width: 100%;
            height: auto;
          }
          
          .printable-content {
            width: 100%;
            padding: 0;
          }
          
          .letterhead {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
          }
          
          .staff-details-card {
            border: 1px solid #ddd;
            padding: 20px;
            margin: 20px 0;
          }
          
          .print-footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
        }
      `}</style>
    </div>
  );
}
