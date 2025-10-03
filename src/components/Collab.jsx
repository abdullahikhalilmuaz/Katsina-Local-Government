import { useEffect, useState } from "react";
import "../styles/collab.css";
import ChatArea from "../components/ChatArea";
import ChatSidebar from "../components/ChatSidebar";

export default function Collab() {
  const [staffUser, setStaffUser] = useState(false);


  return (
    <div className="chat-container">
      {/* Sidebar with online users */}
      <div className="collab-sidebar">
        <div className="sidebar-header">
          <h2>Team Collaboration</h2>
        </div>
        <div className="online-users">
          <h3>Online Now</h3>
          <ul className="user-list">
            <li className="user-item">
              <div className="user-avatar">
                JS
                <span className="online-dot"></span>
              </div>
              <span className="user-name">John Smith</span>
            </li>
            <li className="user-item">
              <div className="user-avatar">
                EM
                <span className="online-dot"></span>
              </div>
              <span className="user-name">Emma Miller</span>
            </li>
            <li className="user-item">
              <div className="user-avatar">
                RJ
                <span className="online-dot"></span>
              </div>
              <span className="user-name">Robert Johnson</span>
            </li>
            <li className="user-item">
              <div className="user-avatar">AD</div>
              <span className="user-name">Alex Davis</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Main chat area */}

      {staffUser ? <ChatArea /> : <ChatSidebar />}
    </div>
  );
}
