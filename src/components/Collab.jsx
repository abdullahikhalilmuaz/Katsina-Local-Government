import { useEffect } from "react";

export default function Collab() {
  useEffect(() => {
    window.prompt("Window under construction, continue viewing ?");
  }, []);
  return (
    <div className="chat-container">
      {/* Sidebar with online users */}
      <div className="sidebar">
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
      <div className="chat-area">
        <div className="chat-header">
          <h2 className="chat-title">Design Team Collaboration</h2>
        </div>

        <div className="messages-container">
          {/* Example messages */}
          <div className="message received">
            <div className="message-avatar">JS</div>
            <div className="message-content">
              <div className="message-sender">John Smith</div>
              <div className="message-text">
                Hey team, I've just updated the design mockups. Can everyone
                take a look and share feedback?
              </div>
              <div className="message-time">10:24 AM</div>
            </div>
          </div>

          <div className="message sent">
            <div className="message-avatar">You</div>
            <div className="message-content">
              <div className="message-sender">You</div>
              <div className="message-text">
                Just checked them out. The new color scheme looks great! I have
                a few suggestions for the typography.
              </div>
              <div className="message-time">10:28 AM</div>
            </div>
          </div>

          <div className="message received">
            <div className="message-avatar">EM</div>
            <div className="message-content">
              <div className="message-sender">Emma Miller</div>
              <div className="message-text">
                I agree with the feedback. The layout is much cleaner now.
                Should we schedule a meeting to discuss the details?
              </div>
              <div className="message-time">10:31 AM</div>
            </div>
          </div>

          <div className="message received">
            <div className="message-avatar">RJ</div>
            <div className="message-content">
              <div className="message-sender">Robert Johnson</div>
              <div className="message-text">
                I've integrated the new designs into the development branch. The
                team can check the staging environment to see them in action.
              </div>
              <div className="message-time">10:45 AM</div>
            </div>
          </div>

          <div className="message sent">
            <div className="message-avatar">You</div>
            <div className="message-content">
              <div className="message-sender">You</div>
              <div className="message-text">
                That's great! I'll take a look at the staging site and provide
                more detailed feedback by EOD.
              </div>
              <div className="message-time">10:48 AM</div>
            </div>
          </div>
        </div>

        <div className="input-area">
          <input
            type="text"
            className="message-input"
            placeholder="Type your message here..."
          />
          <button className="send-button">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .chat-container {
          width: 100%;
          max-width: 900px;
          height: 90vh;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          display: flex;
          overflow: hidden;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 250px;
          background-color: #f5f7fb;
          border-right: 1px solid #e1e4e8;
          display: flex;
          flex-direction: column;
        }

        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid #e1e4e8;
        }

        .sidebar-header h2 {
          color: #333;
          font-size: 20px;
        }

        .online-users {
          padding: 15px 20px;
          border-bottom: 1px solid #e1e4e8;
        }

        .online-users h3 {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .user-list {
          list-style: none;
        }

        .user-item {
          display: flex;
          align-items: center;
          padding: 8px 0;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #6e8efb;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          margin-right: 10px;
          position: relative;
        }

        .online-dot {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: #4caf50;
          border-radius: 50%;
          bottom: 0;
          right: 0;
          border: 2px solid #f5f7fb;
        }

        .user-name {
          font-size: 15px;
          color: #333;
        }

        /* Chat Area Styles */
        .chat-area {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .chat-header {
          padding: 15px 20px;
          border-bottom: 1px solid #e1e4e8;
          display: flex;
          align-items: center;
          background-color: #fff;
        }

        .chat-title {
          font-size: 18px;
          color: #333;
        }

        .messages-container {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          margin-left: 25%;
          width: 75%;
          background-color: #f9f9f9;
        }

        .message {
          display: flex;
          margin-bottom: 20px;
          max-width: 80%;
        }

        .message.sent {
          align-self: flex-end;
          margin-left: auto;
          flex-direction: row-reverse;
        }

        .message.received {
          align-self: flex-start;
        }

        .message-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #a777e3;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          margin: 0 10px;
          flex-shrink: 0;
        }

        .message-content {
          background-color: #e9ecf1;
          padding: 12px 15px;
          border-radius: 18px;
          position: relative;
        }

        .sent .message-content {
          background-color: #6e8efb;
          color: white;
        }

        .message-sender {
          font-weight: 600;
          font-size: 13px;
          margin-bottom: 5px;
          color: #555;
        }

        .sent .message-sender {
          text-align: right;
          color: rgba(255, 255, 255, 0.8);
        }

        .message-text {
          font-size: 15px;
          line-height: 1.4;
        }

        .message-time {
          font-size: 11px;
          color: #777;
          margin-top: 5px;
          text-align: right;
        }

        .sent .message-time {
          color: rgba(255, 255, 255, 0.8);
        }

        .input-area {
          padding: 15px 20px;
          border-top: 1px solid #e1e4e8;
          display: flex;
          align-items: center;
          background-color: #fff;
        }

        .message-input {
          flex: 1;
          padding: 12px 15px;
          border: 1px solid #e1e4e8;
          border-radius: 24px;
          font-size: 15px;
          outline: none;
          transition: border-color 0.3s;
        }

        .message-input:focus {
          border-color: #6e8efb;
        }

        .send-button {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background-color: #6e8efb;
          color: white;
          border: none;
          margin-left: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s;
        }

        .send-button:hover {
          background-color: #5a7ce2;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .sidebar {
            width: 70px;
          }

          .sidebar-header h2,
          .online-users h3,
          .user-name {
            display: none;
          }

          .online-users {
            text-align: center;
            padding: 15px 5px;
          }

          .user-item {
            justify-content: center;
          }

          .user-avatar {
            margin-right: 0;
          }
        }

        @media (max-width: 576px) {
          .chat-container {
            flex-direction: column;
            height: 95vh;
          }

          .sidebar {
            width: 100%;
            height: 70px;
            flex-direction: row;
            border-right: none;
            border-bottom: 1px solid #e1e4e8;
          }

          .sidebar-header,
          .online-users {
            border-bottom: none;
            border-right: 1px solid #e1e4e8;
            height: 100%;
            display: flex;
            align-items: center;
          }

          .online-users {
            flex: 1;
            justify-content: space-around;
          }

          .user-list {
            display: flex;
          }

          .user-item {
            padding: 0 10px;
          }
        }
      `}</style>
    </div>
  );
}
