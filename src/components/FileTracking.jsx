import { useEffect, useState } from "react";
import "../styles/tracking.css";
import "../styles/dashboard.css";

export default function FileTracking() {
  const [fileRecords, setFileRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [editMode, setEditMode] = useState(false); // 👈 controls slide
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // ✅ Format dates
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // ✅ Fetch files
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://katsina-local-government-server-base-url.onrender.comapi/files"
        );
        const data = await res.json();
        setFileRecords(data);
        setFilteredRecords(data);
      } catch (err) {
        console.error("Failed to fetch files:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // ✅ Filter logic
  useEffect(() => {
    let results = [...fileRecords];

    if (searchTerm) {
      results = results.filter(
        (file) =>
          file.staffName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          file.fileNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      if (statusFilter === "collected") {
        results = results.filter((file) => file.collected);
      } else if (statusFilter === "returned") {
        results = results.filter((file) => file.returned);
      } else if (statusFilter === "pending") {
        results = results.filter((file) => file.collected && !file.returned);
      }
    }

    setFilteredRecords(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, fileRecords]);

  // ✅ Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  // ✅ Handle edit form change
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Save changes
  const handleSaveChanges = async () => {
    try {
      const res = await fetch(
        `https://katsina-local-government-server-base-url.onrender.comapi/files/${selectedFile._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        }
      );

      if (!res.ok) throw new Error("Failed to update file");

      const updatedFile = await res.json();
      setFileRecords((prev) =>
        prev.map((f) => (f._id === updatedFile._id ? updatedFile : f))
      );
      setSelectedFile(updatedFile);
      setEditMode(false);
      alert("✅ File updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error updating file");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">File Tracking</h1>
      </div>

      <div className="table-container">
        <div className="table-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search files..."
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-options">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="collected">Collected</option>
              <option value="returned">Returned</option>
              <option value="pending">Pending Return</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading records...</p>
          </div>
        ) : (
          <>
            {/* ✅ Table Scroll Wrapper */}
            <div className="table-scroll-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Staff Name</th>
                    <th>File Number</th>
                    <th>Office File Number</th>
                    <th>Department</th>
                    <th>Collected</th>
                    <th>Returned</th>
                    <th>Collection Date</th>
                    <th>Returning Date</th>
                    <th>Purpose</th>
                    <th>Transferred To</th>
                    <th>Collector</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length > 0 ? (
                    currentRecords.map((file, index) => (
                      <tr key={file._id}>
                        <td>{indexOfFirstRecord + index + 1}</td>
                        <td>{file.staffName}</td>
                        <td>{file.fileNumber}</td>
                        <td>{file.officeFileNumber || "-"}</td>
                        <td>{file.department}</td>
                        <td>
                          <span className="status-badge badge-collected">
                            {file.collected ? "Yes" : "No"}
                          </span>
                        </td>
                        <td>
                          {file.returned ? (
                            <span className="status-badge badge-returned">
                              Yes
                            </span>
                          ) : (
                            <span className="status-badge badge-pending">
                              No
                            </span>
                          )}
                        </td>
                        <td>{formatDate(file.collectionDate)}</td>
                        <td>{formatDate(file.returningDate)}</td>
                        <td>{file.purpose || "-"}</td>
                        <td>{file.transferredTo || "-"}</td>
                        <td>{file.collectorName || "-"}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setSelectedFile(file);
                              setEditForm(file);
                              setEditMode(false);
                            }}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="13" style={{ textAlign: "center" }}>
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ✅ Pagination */}
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* ✅ Modal */}
      {selectedFile && (
        <div className="modal-overlay">
          <div className="modal-content">
            {!editMode ? (
              <>
                <h2>File Details</h2>
                <p>
                  <strong>Staff Name:</strong> {selectedFile.staffName}
                </p>
                <p>
                  <strong>File Number:</strong> {selectedFile.fileNumber}
                </p>
                <p>
                  <strong>Office File Number:</strong>{" "}
                  {selectedFile.officeFileNumber || "-"}
                </p>
                <p>
                  <strong>Department:</strong> {selectedFile.department}
                </p>
                <p>
                  <strong>Staff ID:</strong> {selectedFile.staffIdNumber}
                </p>
                <p>
                  <strong>Collected:</strong>{" "}
                  {selectedFile.collected ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Returned:</strong>{" "}
                  {selectedFile.returned ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Collection Date:</strong>{" "}
                  {formatDate(selectedFile.collectionDate)}
                </p>
                <p>
                  <strong>Returning Date:</strong>{" "}
                  {formatDate(selectedFile.returningDate)}
                </p>
                <p>
                  <strong>Purpose:</strong> {selectedFile.purpose || "-"}
                </p>
                <p>
                  <strong>Transferred To:</strong>{" "}
                  {selectedFile.transferredTo || "-"}
                </p>
                <p>
                  <strong>Collector:</strong>{" "}
                  {selectedFile.collectorName || "-"}
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => setEditMode(true)}
                >
                  Modify
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedFile(null)}
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h2>Edit File</h2>
                <form>
                  <label>
                    Collected:
                    <input
                      type="checkbox"
                      name="collected"
                      checked={editForm.collected || false}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Returned:
                    <input
                      type="checkbox"
                      name="returned"
                      checked={editForm.returned || false}
                      onChange={handleEditChange}
                    />
                  </label>

                  {/* 👇 New date fields */}
                  <label>
                    Collection Date:
                    <input
                      type="datetime-local"
                      name="collectionDate"
                      value={
                        editForm.collectionDate
                          ? new Date(editForm.collectionDate)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Returning Date:
                    <input
                      type="datetime-local"
                      name="returningDate"
                      value={
                        editForm.returningDate
                          ? new Date(editForm.returningDate)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={handleEditChange}
                    />
                  </label>

                  <label>
                    Purpose of Collection:
                    <input
                      type="text"
                      name="purpose"
                      value={editForm.purpose || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Transferred To:
                    <input
                      type="text"
                      name="transferredTo"
                      value={editForm.transferredTo || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Collector Name:
                    <input
                      type="text"
                      name="collectorName"
                      value={editForm.collectorName || ""}
                      onChange={handleEditChange}
                    />
                  </label>
                </form>

                <button className="btn btn-primary" onClick={handleSaveChanges}>
                  Save Changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
