import "../styles/notification.css";
import ChatSidebar from "../components/ChatSidebar";
import ChatArea from "../components/ChatArea";
import { useState } from "react";

export default function Notification() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="notification-main-container">
      <ChatSidebar setMenu={setMenu} menu={menu} />
      <ChatArea />

      {console.log(menu)}
    </div>
  );
}
