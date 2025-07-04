import React, { useState, useEffect } from "react";
import Clicker from "../components/Clicker";
import Visualization from "../components/Visualization";
import Achievements from "../components/Achievements";
import { socket } from "../socket";
import "../css/MainPage.css";

function MainPage({ user, setUser }) {
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    const interval = setInterval(() => {
      if (localUser.donated > user.donated) {
        socket.emit(
          "donate",
          localUser.donated - user.donated,
          localUser.clicks - user.clicks
        );
        setUser(localUser);
      }
    }, 2000); // Save every 5 seconds

    return () => clearInterval(interval);
  }, [localUser, user, setUser]);

  return (
    <div className="main-page">
      <div className="section">
        <Clicker user={localUser} setUser={setLocalUser} />
      </div>
      <div className="section middle">
        <Visualization user={localUser} />
      </div>
      <div className="section">
        <Achievements user={localUser} />
      </div>
    </div>
  );
}

export default MainPage;
