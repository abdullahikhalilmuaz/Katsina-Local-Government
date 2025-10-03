import "../styles/collab.css";

export default function ChatArea() {
  return (
    <>
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
    </>
  );
}
