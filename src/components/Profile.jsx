import { useState, useEffect } from "react";
import "../styles/userhome.css";
import "../styles/profile.css";

export default function Profile() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    gradeLevel: "",
    department: "",
    phone: "",
    position: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Get user ID from localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const userId = userData._id;

  useEffect(() => {
    if (userId) {
      fetchUserData();
    } else {
      setLoading(false);
      setMessage({
        text: "User not authenticated. Please log in again.",
        type: "error",
      });
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://katsina-local-government-server-base-url.onrender.comapi/profile/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setMessage({ text: "Failed to load user data", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Validate inputs
    if (!user.firstname || !user.lastname || !user.username || !user.email) {
      setMessage({ text: "Please fill in all required fields", type: "error" });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(user.email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://katsina-local-government-server-base-url.onrender.comapi/profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const result = await response.json();
      setUser(result.user);
      setIsEditing(false);
      setMessage({ text: "Profile updated successfully", type: "success" });

      // Update localStorage with new user data
      const updatedUserData = { ...userData, ...result.user };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        text: error.message || "Failed to update profile",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const handlePasswordSave = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ text: "New passwords do not match", type: "error" });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({
        text: "Password must be at least 6 characters",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://katsina-local-government-server-base-url.onrender.comapi/profile/${userId}/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change password");
      }

      setChangePasswordMode(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setMessage({ text: "Password changed successfully", type: "success" });
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage({ text: error.message, type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const handleCancel = () => {
    fetchUserData();
    setIsEditing(false);
    setChangePasswordMode(false);
    setMessage({ text: "", type: "" });
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <h2>Authentication Required</h2>
          <p>Please log in to access your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
        <p>Manage your account information</p>
      </div>

      {message.text && (
        <div className={`profile-message ${message.type}`}>{message.text}</div>
      )}

      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {user.firstname?.charAt(0) || "U"}
            {user.lastname?.charAt(0) || "S"}
          </div>
          <h2>
            {user.firstname} {user.lastname}
          </h2>
          <p>
            {user.position || "Staff Member"} |{" "}
            {user.department || "No department specified"}
          </p>
        </div>

        {!changePasswordMode ? (
          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstname">First Name *</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={user.firstname || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name *</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={user.lastname || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">Username *</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={user.department || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your department"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gradeLevel">Grade Level</label>
                <input
                  type="text"
                  id="gradeLevel"
                  name="gradeLevel"
                  value={user.gradeLevel || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your grade level"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={user.position || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your position"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={user.phone || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button
                    className="btn-primary"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => setChangePasswordMode(true)}
                  >
                    Change Password
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="password-form">
            <h3>Change Password</h3>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password *</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your current password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password *</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your new password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm your new password"
              />
            </div>
            <div className="profile-actions">
              <button
                className="btn-primary"
                onClick={handlePasswordSave}
                disabled={loading}
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
              <button
                className="btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="profile-info">
        <h3>Account Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Member Since</span>
            <span className="info-value">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Last Updated</span>
            <span className="info-value">
              {user.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Status</span>
            <span className="info-value status-active">Active</span>
          </div>
          <div className="info-item">
            <span className="info-label">Role</span>
            <span className="info-value">Staff</span>
          </div>
        </div>
      </div>
    </div>
  );
}
