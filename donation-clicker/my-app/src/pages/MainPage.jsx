import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Clicker from "../components/Clicker";
import PiggyBank from "../components/PiggyBank";
import Visualization from "../components/Visualization";
import Achievements, { achievementsList } from "../components/Achievements"; 
import AchievementPopup from "../components/AchievementPopup";
import { socket } from "../socket";
import "../css/MainPage.css";
import sdgsLogo from "../assets/sdgs-logo.png";

function MainPage({ user, setUser }) {
  const [localUser, setLocalUser] = useState(user);
  const [newlyUnlocked, setNewlyUnlocked] = useState(null);
  const prevClicksRef = useRef(user.clicks);

  useEffect(() => {
    const justUnlocked = achievementsList.slice().reverse().find(ach => 
        ach.requirement(localUser) && !ach.requirement({ clicks: prevClicksRef.current })
    );

    if (justUnlocked) {
      setNewlyUnlocked(justUnlocked);
    }

    prevClicksRef.current = localUser.clicks;
  }, [localUser.clicks]);


  // Your socket logic
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
    }, 2000);

    return () => clearInterval(interval);
    // FIXED: Added 'localUser' to the dependency array to fix the warning
  }, [localUser, user, setUser]);

  return (
    <div className="main-container">
      <AchievementPopup achievement={newlyUnlocked} />

      <div className="header">
        <div className="logo-container">
          <img src={sdgsLogo} alt="SDGs Logo" className="sdgs-image" />
        </div>
        <div className="header-placeholder">
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/leaderboard">Leaderboard</Link>
          </nav>
        </div>
      </div>

      <div className="content-area">
        {/* Left Panel */}
        <div className="panel left-panel">
          <div className="sdg-tag">SDGs1 NO POVERTY</div>
          <div className="clicks-display">
            $<span className="clicks-number">{localUser.donated.toFixed(2)}</span>
            <div className="cps-display">Total Clicks: {localUser.clicks}</div>
          </div>
          <Clicker user={localUser} setUser={setLocalUser} />
          <PiggyBank donated={localUser.donated} />
        </div>

        {/* Middle Panel */}
        <div className="panel middle-panel">
          <div className="visualization-box">
             <Visualization user={localUser} />
          </div>
        </div>

        {/* Right Panel */}
        <div className="panel right-panel">
          <div className="achievement-header">Achievement</div>
          <div className="achievement-list-container">
            <Achievements user={localUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
