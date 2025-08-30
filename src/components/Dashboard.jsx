import { useEffect, useState } from "react";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const statsRes = await fetch(
          "http://localhost:3000/api/dashboard/stats"
        );
        const statsData = await statsRes.json();

        const recentRes = await fetch(
          "http://localhost:3000/api/dashboard/recent"
        );
        const recentData = await recentRes.json();

        setStats(statsData);
        setRecentActivities(recentData.activities || []);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <div className="dashboard-container">
        <div className="dashboard-card">
          <span className="card-icon">👥</span>
          <h3 className="card-title">Total Staff</h3>
          <p className="card-value">{stats.totalStaff}</p>
        </div>
        <div className="dashboard-card">
          <span className="card-icon">📥</span>
          <h3 className="card-title">Files Collected</h3>
          <p className="card-value">{stats.filesCollected}</p>
        </div>
        <div className="dashboard-card">
          <span className="card-icon">📤</span>
          <h3 className="card-title">Files Returned</h3>
          <p className="card-value">{stats.filesReturned}</p>
        </div>
        <div className="dashboard-card">
          <span className="card-icon">⏳</span>
          <h3 className="card-title">Pending Returns</h3>
          <p className="card-value">{stats.pendingReturns}</p>
        </div>
      </div>

      <div className="section-title">Recent Activities</div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity, index) => (
              <tr key={index}>
                <td>{activity.name}</td>
                <td>{activity.action}</td>
                <td>
                  <span className={`status-badge badge-${activity.status}`}>
                    {activity.status.charAt(0).toUpperCase() +
                      activity.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
