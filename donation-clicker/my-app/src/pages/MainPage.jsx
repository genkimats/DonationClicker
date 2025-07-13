import React, { useState, useEffect, useRef } from "react";
import Clicker from "../components/Clicker";
import PiggyBank from "../components/PiggyBank";
import Visualization from "../components/Visualization";
import Achievements, { achievementsList } from "../components/Achievements";
import AchievementPopup from "../components/AchievementPopup";
import { socket } from "../socket";
import "../css/MainPage.css";
import "../css/Visualization.css";

function MainPage({ user, setUser }) {
  const [localUser, setLocalUser] = useState(user);
  const [newlyUnlocked, setNewlyUnlocked] = useState(null);
  const [isChildSavedPopupVisible, setChildSavedPopupVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const prevClicksRef = useRef(user.clicks);

  const handleChildSaved = () => {
    setIsFadingOut(false);
    setChildSavedPopupVisible(true);

    setTimeout(() => {
      setIsFadingOut(true);
    }, 3000);
  };

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      setChildSavedPopupVisible(false);
    }
  };

  useEffect(() => {
    const justUnlocked = achievementsList
      .slice()
      .reverse()
      .find(
        (ach) =>
          ach.requirement(localUser) &&
          !ach.requirement({ clicks: prevClicksRef.current })
      );
    if (justUnlocked) {
      setNewlyUnlocked(justUnlocked);
    }
    prevClicksRef.current = localUser.clicks;
  }, [localUser]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (localUser.donated > user.donated + 0.0001) {
        socket.emit("donate", {
          username: localUser.username,
          amount: localUser.donated - user.donated,
          clicks: localUser.clicks - user.clicks,
        });
        setUser(localUser);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [localUser, user, setUser]);

  return (
    <div className="main-page-wrapper">
      {isChildSavedPopupVisible && (
        <div
          className={`popup-overlay ${isFadingOut ? "fading-out" : ""}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <img
            src="/images/congratulation.gif"
            alt="Congratulation"
            className="congratulation-gif"
          />
          <img
            src="/images/child-bowing.gif"
            alt="A child is saved!"
            className="bowing-child-gif"
          />
        </div>
      )}

      <div
        className={`main-container ${
          isChildSavedPopupVisible ? "blurred" : ""
        }`}
      >
        <AchievementPopup achievement={newlyUnlocked} />
        <div className="content-area">
          <div className="panel left-panel">
            <div className="sdg-tag">SDGs1 NO POVERTY</div>
            <div className="clicks-display">
              $
              <span className="clicks-number">
                {localUser.donated.toFixed(2)}
              </span>
              <div className="cps-display">
                Total Clicks: {localUser.clicks}
              </div>
            </div>
            <Clicker
              user={localUser}
              setUser={setLocalUser}
              onChildSaved={handleChildSaved}
            />
            <PiggyBank donated={localUser.donated} />
          </div>
          <div className="panel middle-panel">
            <div className="visualization-box">
              <Visualization user={localUser} />
            </div>
          </div>
          <div className="panel right-panel">
            <div className="achievement-header">Achievement</div>
            <div className="achievement-list-container">
              <Achievements user={localUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;