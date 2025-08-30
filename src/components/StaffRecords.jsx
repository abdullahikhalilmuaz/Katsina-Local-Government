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

  useEffect(() => {
    fetchStaffRecords();
  }, []);

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
        `https://katsina-local-government-server-base-url.onrender.com/api/staff/${editingStaff._id}`, // ✅ FIXED
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

  // Filter staff records
  const filteredStaff = staffRecords.filter((staff) => {
    const matchesSearch =
      staff.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "" || staff.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

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
        <h1 className="page-title">Staff Records</h1>
        <button
          className="btn btn-primary"
          style={{ padding: "8px 15px", margin: "10px auto" }}
          onClick={() => (window.location.href = "/add-staff")}
        >
          Add New Staff{" "}
          <span style={{ fontWeight: "bolder", fontSize: "16px" }}>+</span>
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="table-container">
        <div className="table-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search staff..."
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-options">
            <select
              className="form-select"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
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
                <th>Position</th>
                <th>Grade Level</th>
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
                    <td>{staff.position || "N/A"}</td>
                    <td>{staff.gradeLevel || "N/A"}</td>
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
                  <td colSpan="10" style={{ textAlign: "center" }}>
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
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Staff Record</h2>
            <div className="form-container">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstname"
                  value={editForm.firstname || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastname"
                  value={editForm.lastname || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Username *</label>
                <input
                  type="text"
                  name="username"
                  value={editForm.username || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone || ""}
                  onChange={handleInputChange}
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
                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  value={editForm.position || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Grade Level</label>
                <input
                  type="text"
                  name="gradeLevel"
                  value={editForm.gradeLevel || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-actions">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
