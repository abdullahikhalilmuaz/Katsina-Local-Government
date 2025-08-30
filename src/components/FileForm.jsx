import { useState } from "react";
import "../styles/fileform.css";

export default function FileForm() {
  const [formData, setFormData] = useState({
    staffName: "",
    staffIdNumber: "",
    department: "",
    officeFileNumber: "", // optional
  });
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const departments = ["Personnel", "PHCC", "ESSD", "Agric", "WATSAN", "Works"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (document) {
        data.append("document", document);
      }

      const res = await fetch(
        "https://katsina-local-government-server-base-url.onrender.comapi/files",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error saving file");
      }

      alert("✅ File saved successfully!");
      setFormData({
        staffName: "",
        staffIdNumber: "",
        department: "",
        officeFileNumber: "",
      });
      setDocument(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New File Record</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Staff Name</label>
          <input
            type="text"
            name="staffName"
            value={formData.staffName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Staff ID Number</label>
          <input
            type="text"
            name="staffIdNumber"
            value={formData.staffIdNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Office File Number (Optional)</label>
          <input
            type="text"
            name="officeFileNumber"
            value={formData.officeFileNumber}
            onChange={handleChange}
            placeholder="Enter office file number"
          />
        </div>

        <div className="form-group">
          <label>Upload Document (.docx)</label>
          <input type="file" accept=".docx" onChange={handleFileChange} />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Record"}
          </button>
        </div>
      </form>
    </div>
  );
}
