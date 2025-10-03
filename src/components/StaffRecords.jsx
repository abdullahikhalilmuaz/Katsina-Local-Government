import { useEffect, useState } from "react";
import "../styles/view.css";

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

  // Calculate department statistics whenever staffRecords changes
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

      const result = await response.json();

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

  const handlePrint = (staff) => {
    localStorage.setItem("printStaffData", JSON.stringify(staff));
    window.open("/view-staff", "_blank");
  };

  const handleView = (staff) => {
    localStorage.setItem("viewStaffData", JSON.stringify(staff));
    window.location.href = "/view-staff";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  // Handle department click from dropdown
  const handleDepartmentSelect = (department) => {
    setDepartmentFilter(department);
  };

  // Clear department filter
  const handleClearFilter = () => {
    setDepartmentFilter("");
    setSearchTerm("");
  };

  // Filter staff records
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

  // Get the count for the currently selected department
  const getSelectedDepartmentCount = () => {
    if (departmentFilter === "") {
      return staffRecords.length;
    }
    return departmentStats[departmentFilter] || 0;
  };

  // Get the display name for the summary
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

      {/* Edit Modal - Keep your existing modal code */}
      {isEditing && editingStaff && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Staff Record</h2>
            <div className="form-container">
              {/* ... your existing modal form ... */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
