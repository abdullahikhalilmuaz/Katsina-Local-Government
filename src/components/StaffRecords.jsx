import { useEffect, useState } from "react";

export default function StaffRecords() {
  const [staffRecords, setStaffRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [editingStaff, setEditingStaff] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [departmentStats, setDepartmentStats] = useState({});

  useEffect(() => {
    fetchStaffRecords();
  }, []);

  useEffect(() => {
    if (staffRecords.length > 0) {
      calculateDepartmentStats();
    }
  }, [staffRecords]);

  const calculateDepartmentStats = () => {
    const stats = {};
    staffRecords.forEach((staff) => {
      const dept = staff.department || "Unassigned";
      if (!stats[dept]) {
        stats[dept] = 0;
      }
      stats[dept]++;
    });
    setDepartmentStats(stats);
  };

  const fetchStaffRecords = () => {
    fetch(
      "https://katsina-local-government-server-base-url.onrender.com/api/staff"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch staff records");
        }
        return res.json();
      })
      .then((data) => {
        setStaffRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching staff:", err);
        setLoading(false);
        setMessage({ text: "Failed to load staff records", type: "error" });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      });
  };

  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setEditForm({ ...staff });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://katsina-local-government-server-base-url.onrender.com/api/staff/${editingStaff._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update staff record");
      }

      fetchStaffRecords();
      setIsEditing(false);
      setEditingStaff(null);
      setMessage({
        text: "Staff record updated successfully",
        type: "success",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error updating staff:", error);
      setMessage({ text: error.message, type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const handleView = (staff) => {
    // Clear any existing staff data first
    if (typeof window !== "undefined") {
      // Remove from localStorage
      localStorage.removeItem("viewStaffData");
      localStorage.removeItem("printStaffData");

      // Store new data in localStorage
      localStorage.setItem("viewStaffData", JSON.stringify(staff));
    }

    // Open in new tab
    window.open("/view-staff", "_blank");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleDepartmentSelect = (department) => {
    setDepartmentFilter(department);
  };

  const handleClearFilter = () => {
    setDepartmentFilter("");
    setSearchTerm("");
  };

  const filteredStaff = staffRecords.filter((staff) => {
    const matchesSearch =
      staff.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.verificationNumber
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      staff.nFileNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.ktlgNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "" || staff.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const getSelectedDepartmentCount = () => {
    if (departmentFilter === "") {
      return staffRecords.length;
    }
    return departmentStats[departmentFilter] || 0;
  };

  const getSummaryDisplayName = () => {
    if (departmentFilter === "") {
      return "All Departments";
    }
    return departmentFilter;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading staff records...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="header-left">
          <h1 className="page-title">Staff Records</h1>
          {departmentFilter && (
            <div className="active-filter">
              Showing: <strong>{departmentFilter}</strong>
              <button className="clear-filter-btn" onClick={handleClearFilter}>
                × Clear
              </button>
            </div>
          )}
        </div>
        <div className="header-right">
          <div className="department-summary">
            <h3>Department Summary</h3>
            <div className="department-stats">
              <div className="department-stat-item active">
                <span className="dept-name">{getSummaryDisplayName()}:</span>
                <span className="dept-count">
                  {getSelectedDepartmentCount()} staff
                </span>
              </div>
              <div
                className="department-stat-item total"
                onClick={handleClearFilter}
              >
                <span className="dept-name">View All Departments </span>
                <span className="dept-count" style={{ marginLeft: "10px" }}>
                  ↶ Reset
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="table-container">
        <div className="table-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search staff by name, email, verification no., N file no., KTLG no..."
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-options">
            <select
              className="form-select"
              value={departmentFilter}
              onChange={(e) => handleDepartmentSelect(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="Personnel">Personnel</option>
              <option value="PHCC">PHCC</option>
              <option value="ESSD">ESSD</option>
              <option value="Agric">Agric</option>
              <option value="WATSAN">WATSAN</option>
              <option value="Works">Works</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Portfolio</th>
                <th>Grade Level</th>
                <th>Verification No.</th>
                <th>N File No.</th>
                <th>KTLG No.</th>
                <th>First Appointment</th>
                <th>Present Appointment</th>
                <th>Date of Birth</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff, index) => (
                  <tr key={staff._id}>
                    <td>{index + 1}</td>
                    <td>{staff.firstname}</td>
                    <td>{staff.lastname}</td>
                    <td>{staff.username}</td>
                    <td>{staff.email}</td>
                    <td>{staff.phone || "N/A"}</td>
                    <td>{staff.department || "N/A"}</td>
                    <td>{staff.portfolio || "N/A"}</td>
                    <td>{staff.gradeLevel || "N/A"}</td>
                    <td>{staff.verificationNumber || "N/A"}</td>
                    <td>{staff.nFileNumber || "N/A"}</td>
                    <td>{staff.ktlgNumber || "N/A"}</td>
                    <td>
                      {staff.dateOfFirstAppointment
                        ? new Date(
                            staff.dateOfFirstAppointment
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {staff.dateOfPresentAppointment
                        ? new Date(
                            staff.dateOfPresentAppointment
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {staff.dateOfBirth
                        ? new Date(staff.dateOfBirth).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {staff.lastLogin
                        ? new Date(staff.lastLogin).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        style={{
                          marginRight: "5px",
                          marginBottom: "5px",
                          padding: "6px 15px",
                        }}
                        onClick={() => handleEdit(staff)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-info"
                        onClick={() => handleView(staff)}
                        style={{ background: "#3498db", color: "#fff" }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="17" style={{ textAlign: "center" }}>
                    No staff records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && editingStaff && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Staff Record</h2>
            <div className="form-container">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={editForm.firstname || ""}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={editForm.lastname || ""}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                />
              </div>

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={editForm.username || ""}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email || ""}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone || ""}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <select
                  name="department"
                  value={editForm.department || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>
                  <option value="Personnel">Personnel</option>
                  <option value="PHCC">PHCC</option>
                  <option value="ESSD">ESSD</option>
                  <option value="Agric">Agric</option>
                  <option value="WATSAN">WATSAN</option>
                  <option value="Works">Works</option>
                </select>
              </div>

              <div className="form-group">
                <label>Portfolio</label>
                <input
                  type="text"
                  name="portfolio"
                  value={editForm.portfolio || ""}
                  onChange={handleInputChange}
                  placeholder="Enter portfolio/position"
                />
              </div>

              <div className="form-group">
                <label>Grade Level</label>
                <input
                  type="text"
                  name="gradeLevel"
                  value={editForm.gradeLevel || ""}
                  onChange={handleInputChange}
                  placeholder="Enter grade level"
                />
              </div>

              <div className="form-group">
                <label>Verification Number</label>
                <input
                  type="text"
                  name="verificationNumber"
                  value={editForm.verificationNumber || ""}
                  onChange={handleInputChange}
                  placeholder="Enter verification number"
                />
              </div>

              <div className="form-group">
                <label>N File Number</label>
                <input
                  type="text"
                  name="nFileNumber"
                  value={editForm.nFileNumber || ""}
                  onChange={handleInputChange}
                  placeholder="Enter N file number"
                />
              </div>

              <div className="form-group">
                <label>KTLG Number</label>
                <input
                  type="text"
                  name="ktlgNumber"
                  value={editForm.ktlgNumber || ""}
                  onChange={handleInputChange}
                  placeholder="Enter KTLG number"
                />
              </div>

              <div className="form-group">
                <label>Date of First Appointment</label>
                <input
                  type="date"
                  name="dateOfFirstAppointment"
                  value={
                    editForm.dateOfFirstAppointment
                      ? new Date(editForm.dateOfFirstAppointment)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Date of Present Appointment</label>
                <input
                  type="date"
                  name="dateOfPresentAppointment"
                  value={
                    editForm.dateOfPresentAppointment
                      ? new Date(editForm.dateOfPresentAppointment)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={
                    editForm.dateOfBirth
                      ? new Date(editForm.dateOfBirth)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
          background-color: #f5f7fa;
          color: #2c3e50;
          line-height: 1.4;
        }

        .page-header {
          background: linear-gradient(135deg, #027a30 0%, #0be4b5 100%);
          padding: 20px 24px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
        }

        .page-title {
          color: #ffffff;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.3px;
          margin: 0;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          gap: 16px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f3f4f6;
          border-top: 3px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .message {
          padding: 12px 16px;
          margin: 0 24px 16px;
          border-radius: 6px;
          font-weight: 500;
          font-size: 14px;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message.success {
          background-color: #d4edda;
          color: #155724;
          border-left: 4px solid #28a745;
        }

        .message.error {
          background-color: #f8d7da;
          color: #721c24;
          border-left: 4px solid #dc3545;
        }

        .table-container {
          margin: 0 24px;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          // overflow: hidden;
        }

        .table-actions {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
        }

        .filter-options {
          min-width: 180px;
        }

        .form-control,
        .form-select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #dce1e8;
          border-radius: 6px;
          font-size: 13px;
          transition: all 0.2s ease;
          background-color: #ffffff;
        }

        .form-control:focus,
        .form-select:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
        }

        .form-control::placeholder {
          color: #95a5a6;
          font-size: 13px;
        }

        /* FIXED TABLE STYLES - Reduced spacing and better overflow */
        .table-wrapper {
          overflow-x: auto;
          max-height: calc(100vh - 300px);
          position: relative;
        }

        .table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 12px;
          min-width: 1400px; /* Ensure all columns fit */
        }

        .table thead {
          position: sticky;
          top: 0;
          z-index: 10;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .table thead th {
          padding: 10px 8px;
          text-align: left;
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          color: #ffffff;
          white-space: nowrap;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .table thead th:first-child {
          padding-left: 16px;
          width: 50px;
        }

        .table thead th:last-child {
          padding-right: 16px;
          width: 120px;
        }

        .table tbody tr {
          background-color: #ffffff;
          transition: all 0.2s ease;
        }

        .table tbody tr:nth-child(even) {
          background-color: #f8f9fa;
        }

        .table tbody tr:hover {
          background-color: #e3f2fd;
        }

        .table tbody td {
          padding: 8px;
          border-bottom: 1px solid #e9ecef;
          color: #495057;
          vertical-align: middle;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 150px;
        }

        .table tbody td:first-child {
          padding-left: 16px;
          font-weight: 600;
          color: #6c757d;
          width: 50px;
        }

        .table tbody td:last-child {
          width: auto;
          white-space: normal;
        }

        .table tbody tr:last-child td {
          border-bottom: none;
        }

        /* Compact buttons */
        .btn {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          margin: 2px;
        }

        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
        }

        .btn-secondary {
          background-color: #6c757d;
          color: #ffffff;
        }

        .btn-info {
          background-color: #3498db;
          color: #ffffff;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
          padding: 16px;
          overflow-y: auto;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 800px;
          max-height: 85vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-content h2 {
          padding: 20px 24px;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          font-size: 20px;
          font-weight: 600;
          border-radius: 8px 8px 0 0;
        }

        .form-container {
          padding: 24px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: #495057;
        }

        .form-group input,
        .form-group select {
          padding: 8px 12px;
          border: 1px solid #dce1e8;
          border-radius: 6px;
          font-size: 13px;
          transition: all 0.2s ease;
          background-color: #ffffff;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
        }

        .form-actions {
          grid-column: 1 / -1;
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          padding-top: 16px;
          border-top: 1px solid #e9ecef;
          margin-top: 8px;
        }

        .department-summary {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          padding: 12px;
          min-width: 200px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .department-summary h3 {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #495057;
          font-weight: 600;
          border-bottom: 1px solid #dee2e6;
          padding-bottom: 6px;
        }

        .department-stats {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .department-stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 8px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .department-stat-item.active {
          background: #006600;
          color: white;
        }

        .department-stat-item.total {
          background: #e7f3ff;
          border: 1px solid #b3d9ff;
          cursor: pointer;
          margin-top: 4px;
        }

        .department-stat-item.total:hover {
          background: #d4e9ff;
        }

        .dept-name {
          font-size: 13px;
          font-weight: 500;
          color: #6c757d;
        }

        .department-stat-item.active .dept-name {
          color: white;
          font-weight: 600;
        }

        .department-stat-item.total .dept-name {
          color: #0066cc;
          font-weight: 500;
        }

        .dept-count {
          font-size: 12px;
          font-weight: 600;
          color: #495057;
          background: #e9ecef;
          padding: 2px 8px;
          border-radius: 12px;
        }

        .department-stat-item.active .dept-count {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .department-stat-item.total .dept-count {
          background: #0066cc;
          color: white;
          font-size: 11px;
        }

        .active-filter {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
          padding: 6px 10px;
          background: #e7f3ff;
          border: 1px solid #b3d9ff;
          border-radius: 4px;
          font-size: 13px;
        }

        .clear-filter-btn {
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 2px 6px;
          font-size: 11px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .clear-filter-btn:hover {
          background: #ff5252;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            padding: 16px 20px;
          }

          .page-title {
            font-size: 20px;
          }

          .table-container {
            margin: 0 16px;
          }

          .table-actions {
            padding: 12px;
            gap: 8px;
          }

          .search-box,
          .filter-options {
            min-width: 100%;
          }

          .form-container {
            grid-template-columns: 1fr;
            padding: 20px;
            gap: 12px;
          }

          .modal-content {
            max-height: 90vh;
          }
        }

        @media (max-width: 480px) {
          .page-header {
            padding: 12px 16px;
          }

          .table-container {
            margin: 0 12px;
          }

          .message {
            margin: 0 16px 12px;
            padding: 10px 12px;
          }
        }
      `}</style>
    </div>
  );
}
