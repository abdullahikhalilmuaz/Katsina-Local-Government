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

  useEffect(() => {
    fetchStaffRecords();
  }, []);

  const fetchStaffRecords = () => {
    fetch("http://localhost:3000/api/staff")
      .then((res) => res.json())
      .then((data) => {
        setStaffRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching staff:", err);
        setLoading(false);
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
        `http://localhost:3000/api/staff/${editingStaff._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update staff record");
      }

      // Refresh the staff records
      fetchStaffRecords();
      setIsEditing(false);
      setEditingStaff(null);
      alert("Staff record updated successfully!");
    } catch (error) {
      console.error("Error updating staff:", error);
      alert("Failed to update staff record");
    }
  };

  const handlePrint = (staff) => {
    // Store staff data in localStorage for the print view
    localStorage.setItem("printStaffData", JSON.stringify(staff));
    // Open print view in a new tab
    window.open("/view-staff", "_blank");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  // Filter staff records based on search term and department filter
  const filteredStaff = staffRecords.filter((staff) => {
    const matchesSearch =
      staff.staffName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.fileNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.staffIdNumber?.toLowerCase().includes(searchTerm.toLowerCase());

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
        >
          Add New Staff{" "}
          <span style={{ fontWeight: "bolder", fontSize: "16px" }}>+</span>
        </button>
      </div>

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

        <table className="table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Staff Name</th>
              <th>File Number</th>
              <th>Staff ID</th>
              <th>Department</th>
              <th>Grade Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staff, index) => (
                <tr key={staff._id}>
                  <td>{index + 1}</td>
                  <td>{staff.staffName}</td>
                  <td>{staff.officeFileNumber || staff.fileNumber}</td>
                  <td>{staff.staffIdNumber}</td>
                  <td>{staff.department}</td>
                  <td>{staff.gradeLevel}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        staff.collected
                          ? staff.returned
                            ? "badge-returned"
                            : "badge-collected"
                          : "badge-pending"
                      }`}
                    >
                      {staff.collected
                        ? staff.returned
                          ? "Returned"
                          : "Collected"
                        : "Pending"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleEdit(staff)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-primary"
                      style={{ marginRight: "5px" }}
                      onClick={() => handlePrint(staff)}
                    >
                      Print
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        localStorage.setItem(
                          "viewStaffData",
                          JSON.stringify(staff)
                        );
                        window.location.href = "/view-staff";
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No staff records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditing && editingStaff && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Staff Record</h2>
            <div className="form-container">
              <div className="form-group">
                <label>Staff Name</label>
                <input
                  type="text"
                  name="staffName"
                  value={editForm.staffName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Staff ID Number</label>
                <input
                  type="text"
                  name="staffIdNumber"
                  value={editForm.staffIdNumber || ""}
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
                <label>Grade Level</label>
                <input
                  type="text"
                  name="gradeLevel"
                  value={editForm.gradeLevel || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>File Number</label>
                <input
                  type="text"
                  name="fileNumber"
                  value={editForm.fileNumber || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Office File Number</label>
                <input
                  type="text"
                  name="officeFileNumber"
                  value={editForm.officeFileNumber || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <div className="status-options">
                  <label>
                    <input
                      type="checkbox"
                      name="collected"
                      checked={editForm.collected || false}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          collected: e.target.checked,
                        })
                      }
                    />
                    Collected
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="returned"
                      checked={editForm.returned || false}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          returned: e.target.checked,
                        })
                      }
                    />
                    Returned
                  </label>
                </div>
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
