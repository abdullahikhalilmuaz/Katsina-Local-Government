import { useEffect, useState } from "react";
import "../styles/dashboard.css";

export default function Reports() {
  const [departmentStats, setDepartmentStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(
          "https://katsina-local-government-server-base-url.onrender.comapi/reports"
        ); // ✅ backend endpoint
        const data = await res.json();
        setDepartmentStats(data.departments || []);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading records...</p>
    </div>;
  }

  return (
    <div>
      <h1 className="page-title">Reports</h1>

      <div className="dashboard-container" style={{ marginBottom: "30px" }}>
        <div className="dashboard-card">
          <span className="card-icon">📊</span>
          <h3 className="card-title">Files Collected</h3>
          <p className="card-value">
            {departmentStats.reduce((sum, d) => sum + d.filesCollected, 0)}
          </p>
        </div>
        <div className="dashboard-card">
          <span className="card-icon">✅</span>
          <h3 className="card-title">Files Returned</h3>
          <p className="card-value">
            {departmentStats.reduce((sum, d) => sum + d.filesReturned, 0)} (
            {departmentStats.length > 0
              ? Math.round(
                  (departmentStats.reduce(
                    (sum, d) => sum + d.filesReturned,
                    0
                  ) /
                    departmentStats.reduce(
                      (sum, d) => sum + d.filesCollected,
                      0
                    )) *
                    100
                )
              : 0}
            %)
          </p>
        </div>
        <div className="dashboard-card">
          <span className="card-icon">⌛</span>
          <h3 className="card-title">Pending Returns</h3>
          <p className="card-value">
            {departmentStats.reduce(
              (sum, d) => sum + (d.filesCollected - d.filesReturned),
              0
            )}
          </p>
        </div>
      </div>

      <div className="section-title">Department-wise Statistics</div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Total Staff</th>
              <th>Files Collected</th>
              <th>Files Returned</th>
              <th>Return Rate</th>
            </tr>
          </thead>
          <tbody>
            {departmentStats.map((dept, index) => (
              <tr key={index}>
                <td>{dept.department}</td>
                <td>{dept.totalStaff}</td>
                <td>{dept.filesCollected}</td>
                <td>{dept.filesReturned}</td>
                <td>
                  {dept.filesCollected > 0
                    ? Math.round(
                        (dept.filesReturned / dept.filesCollected) * 100
                      )
                    : 0}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
