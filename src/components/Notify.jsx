import { useEffect, useState } from "react";
import "../styles/notify.css";

export default function Notify() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterTarget, setFilterTarget] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedNotification, setExpandedNotification] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "https://katsina-local-government-server-base-url.onrender.com/api/notifications"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      // Sort by date, most recent first
      const sortedData = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setNotifications(sortedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
      case "warning":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case "urgent":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesType =
      filterType === "all" || notification.type === filterType;
    const matchesTarget =
      filterTarget === "all" ||
      notification.target === filterTarget ||
      notification.target === "all";
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchesType && matchesTarget && matchesSearch && notification.isActive
    );
  });

  // Group notifications by type
  const groupedNotifications = {
    urgent: filteredNotifications.filter((n) => n.type === "urgent"),
    warning: filteredNotifications.filter((n) => n.type === "warning"),
    info: filteredNotifications.filter((n) => n.type === "info"),
  };

  if (loading) {
    return (
      <div className="notify-loading">
        <div className="spinner"></div>
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="notify-container">
      <div className="notify-header">
        <h1 className="notify-title">Notifications</h1>
        <div className="notify-badge">
          {filteredNotifications.length}{" "}
          {filteredNotifications.length === 1
            ? "Notification"
            : "Notifications"}
        </div>
      </div>

      {/* Filters Section */}
      <div className="notify-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search notifications..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            className="filter-select"
            value={filterTarget}
            onChange={(e) => setFilterTarget(e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="Personnel">Personnel</option>
            <option value="PHCC">PHCC</option>
            <option value="ESSD">ESSD</option>
            <option value="Agric">Agric</option>
            <option value="WATSAN">WATSAN</option>
            <option value="Works">Works</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="notifications-content">
        {filteredNotifications.length === 0 ? (
          <div className="no-notifications">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <h3>No notifications found</h3>
            <p>You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          <>
            {/* Urgent Notifications */}
            {groupedNotifications.urgent.length > 0 && (
              <div className="notification-section">
                <h2 className="section-title urgent-title">
                  <span className="title-icon">🔴</span>
                  Urgent Notifications
                </h2>
                {groupedNotifications.urgent.map((notification) => (
                  <div
                    key={notification._id}
                    className={`notification-card urgent ${
                      expandedNotification === notification._id
                        ? "expanded"
                        : ""
                    }`}
                    onClick={() => toggleExpand(notification._id)}
                  >
                    <div className="notification-header-card">
                      <div className="notification-icon urgent-icon">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="notification-content">
                        <h3 className="notification-title">
                          {notification.title}
                        </h3>
                        <div className="notification-meta">
                          <span className="notification-date">
                            {formatDate(notification.date)}
                          </span>
                          <span className="notification-separator">•</span>
                          <span className="notification-target">
                            {notification.target === "all"
                              ? "All Departments"
                              : notification.target}
                          </span>
                          <span className="notification-separator">•</span>
                          <span className="notification-admin">
                            By: {notification.admin}
                          </span>
                        </div>
                      </div>
                      <div className="expand-icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                    {expandedNotification === notification._id && (
                      <div className="notification-message">
                        <p>{notification.message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Warning Notifications */}
            {groupedNotifications.warning.length > 0 && (
              <div className="notification-section">
                <h2 className="section-title warning-title">
                  <span className="title-icon">⚠️</span>
                  Warnings
                </h2>
                {groupedNotifications.warning.map((notification) => (
                  <div
                    key={notification._id}
                    className={`notification-card warning ${
                      expandedNotification === notification._id
                        ? "expanded"
                        : ""
                    }`}
                    onClick={() => toggleExpand(notification._id)}
                  >
                    <div className="notification-header-card">
                      <div className="notification-icon warning-icon">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="notification-content">
                        <h3 className="notification-title">
                          {notification.title}
                        </h3>
                        <div className="notification-meta">
                          <span className="notification-date">
                            {formatDate(notification.date)}
                          </span>
                          <span className="notification-separator">•</span>
                          <span className="notification-target">
                            {notification.target === "all"
                              ? "All Departments"
                              : notification.target}
                          </span>
                          <span className="notification-separator">•</span>
                          <span className="notification-admin">
                            By: {notification.admin}
                          </span>
                        </div>
                      </div>
                      <div className="expand-icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                    {expandedNotification === notification._id && (
                      <div className="notification-message">
                        <p>{notification.message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Info Notifications */}
            {groupedNotifications.info.length > 0 && (
              <div className="notification-section">
                <h2 className="section-title info-title">
                  <span className="title-icon">ℹ️</span>
                  Information
                </h2>
                {groupedNotifications.info.map((notification) => (
                  <div
                    key={notification._id}
                    className={`notification-card info ${
                      expandedNotification === notification._id
                        ? "expanded"
                        : ""
                    }`}
                    onClick={() => toggleExpand(notification._id)}
                  >
                    <div className="notification-header-card">
                      <div className="notification-icon info-icon">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="notification-content">
                        <h3 className="notification-title">
                          {notification.title}
                        </h3>
                        <div className="notification-meta">
                          <span className="notification-date">
                            {formatDate(notification.date)}
                          </span>
                          <span className="notification-separator">•</span>
                          <span className="notification-target">
                            {notification.target === "all"
                              ? "All Departments"
                              : notification.target}
                          </span>
                          <span className="notification-separator">•</span>
                          <span className="notification-admin">
                            By: {notification.admin}
                          </span>
                        </div>
                      </div>
                      <div className="expand-icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                    {expandedNotification === notification._id && (
                      <div className="notification-message">
                        <p>{notification.message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
