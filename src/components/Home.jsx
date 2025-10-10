import { useState, useEffect } from "react";
import "../styles/home.css";

export default function Home() {
  const [stats, setStats] = useState({
    totalStaff: 0,
    filesCollected: 0,
    filesReturned: 0,
    pendingReturns: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [departmentReports, setDepartmentReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch dashboard stats
      const statsResponse = await fetch(
        "https://katsina-local-government-server-base-url.onrender.com/api/dashboard/stats"
      );
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Fetch recent activities
      const activitiesResponse = await fetch(
        "https://katsina-local-government-server-base-url.onrender.com/api/dashboard/recent"
      );
      const activitiesData = await activitiesResponse.json();
      setRecentActivities(activitiesData.activities);

      // Fetch department reports
      const reportsResponse = await fetch(
        "https://katsina-local-government-server-base-url.onrender.com/api/reports"
      );
      const reportsData = await reportsResponse.json();
      setDepartmentReports(reportsData.departments);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format date for display - handles "No date" and invalid dates
  const formatDate = (dateString) => {
    if (!dateString || dateString === "No date") {
      return "No date";
    }

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      const options = { year: "numeric", month: "short", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      return "Date error";
    }
  };

  // Get status badge class based on status
  const getStatusClass = (status) => {
    switch (status) {
      case "returned":
        return "status-returned";
      case "collected":
        return "status-collected";
      default:
        return "status-pending";
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-home">
      {/* Header Section */}
      <div className="dashboard-header">
        <h1>Katsina Local Government Dashboard</h1>
        <p>Welcome to your file management system</p>
      </div>

      {/* Stats Overview Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total-staff">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23 21V19C22.9993 18.1135 22.7044 17.2531 22.163 16.5639C21.6217 15.8748 20.8684 15.3956 20 15.2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 3.2C16.8684 3.3956 17.6217 3.87482 18.163 4.56393C18.7044 5.25305 18.9993 6.11348 19 7C18.9993 7.88652 18.7044 8.74695 18.163 9.43607C17.6217 10.1252 16.8684 10.6044 16 10.8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{stats.totalStaff}</h3>
            <p>Total Staff</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon collected">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 13L9 17L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{stats.filesCollected}</h3>
            <p>Files Collected</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon returned">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 6L12 2L8 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 2V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{stats.filesReturned}</h3>
            <p>Files Returned</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8V12L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{stats.pendingReturns}</h3>
            <p>Pending Returns</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-content">
        {/* Recent Activities Section */}
        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <div className="activities-list">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-info">
                    <h4>{activity.name}</h4>
                    <p>{activity.action}</p>
                    <span className="activity-date">
                      {formatDate(activity.date)}
                    </span>
                  </div>
                  <div
                    className={`status-badge ${getStatusClass(
                      activity.status
                    )}`}
                  >
                    {activity.status}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No recent activities found</p>
            )}
          </div>
        </div>

        {/* Department Reports Section */}
        <div className="department-reports">
          <h2>Department Reports</h2>
          <div className="reports-table-container">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Total Staff</th>
                  <th>Files Collected</th>
                  <th>Files Returned</th>
                </tr>
              </thead>
              <tbody>
                {departmentReports.length > 0 ? (
                  departmentReports.map((dept, index) => (
                    <tr key={index}>
                      <td>{dept.department}</td>
                      <td>{dept.totalStaff}</td>
                      <td>{dept.filesCollected}</td>
                      <td>{dept.filesReturned}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">
                      No department data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
