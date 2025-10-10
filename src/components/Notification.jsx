import { useState, useEffect } from "react";
import "../styles/notification.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info", // info, warning, urgent
    target: "all", // all, specific departments
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch existing notifications
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(
        "https://katsina-local-government-server-base-url.onrender.com/api/notifications"
      );
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://katsina-local-government-server-base-url.onrender.com/api/notifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newNotification,
            date: new Date().toISOString(),
            admin: "Admin", // You can get this from your auth context
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to create notification");

      setNewNotification({
        title: "",
        message: "",
        type: "info",
        target: "all",
      });
      setShowForm(false);
      fetchNotifications(); // Refresh the list
      alert("✅ Notification created successfully!");
    } catch (err) {
      console.error("Error creating notification:", err);
      alert("❌ Failed to create notification");
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?"))
      return;

    try {
      const res = await fetch(
        `https://katsina-local-government-server-base-url.onrender.com/api/notifications/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete notification");

      fetchNotifications(); // Refresh the list
      alert("✅ Notification deleted successfully!");
    } catch (err) {
      console.error("Error deleting notification:", err);
      alert("❌ Failed to delete notification");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Notifications Management</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add New Notification
        </button>
      </div>

      {/* Add Notification Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Notification</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={newNotification.title}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  value={newNotification.message}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      message: e.target.value,
                    })
                  }
                  required
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select
                  value={newNotification.type}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="info">Information</option>
                  <option value="warning">Warning</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="form-group">
                <label>Target Audience</label>
                <select
                  value={newNotification.target}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      target: e.target.value,
                    })
                  }
                >
                  <option value="all">All Users</option>
                  <option value="Personnel">Personnel Department</option>
                  <option value="PHCC">PHCC Department</option>
                  <option value="ESSD">ESSD Department</option>
                  <option value="Agric">Agric Department</option>
                  <option value="Treasury">Treasury Department</option>
                  <option value="WATSAN">WATSAN Department</option>
                  <option value="Works">Works Department</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary" // Added btn classes here
                >
                  {loading ? "Creating..." : "Create Notification"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="table-container">
        <div className="table-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search notifications..."
              className="form-control"
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Message</th>
                <th>Type</th>
                <th>Target</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <tr key={notification._id}>
                    <td>{notification.title}</td>
                    <td>{notification.message}</td>
                    <td>
                      <span
                        className={`notification-badge badge-${notification.type}`}
                      >
                        {notification.type}
                      </span>
                    </td>
                    <td>{notification.target}</td>
                    <td>{new Date(notification.date).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteNotification(notification._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No notifications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
