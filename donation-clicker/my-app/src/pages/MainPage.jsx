import React, { useState, useEffect, useRef } from "react";
import Clicker from "../components/Clicker";
import PiggyBank from "../components/PiggyBank";
import Visualization from "../components/Visualization";
import Achievements, { achievementsList } from "../components/Achievements";
import AchievementPopup from "../components/AchievementPopup";
import { socket } from "../socket";
import "../css/MainPage.css";
import "../css/Visualization.css";

const DONATION_PER_CHILD = 1;

function MainPage({ user, setUser }) {
  const [localUser, setLocalUser] = useState(user);
  const [newlyUnlocked, setNewlyUnlocked] = useState(null);
  const [isChildSavedPopupVisible, setChildSavedPopupVisible] = useState(false);

  // --- NEW: State to control the fade-out animation ---
  const [isFadingOut, setIsFadingOut] = useState(false);

  const prevChildrenSaved = useRef(
    Math.floor(user.donated / DONATION_PER_CHILD)
  );
  const prevClicksRef = useRef(user.clicks);

  useEffect(() => {
    const currentChildrenSaved = Math.floor(
      localUser.donated / DONATION_PER_CHILD
    );

    if (currentChildrenSaved > prevChildrenSaved.current) {
      setIsFadingOut(false); // Reset fade-out state
      setChildSavedPopupVisible(true);
      prevChildrenSaved.current = currentChildrenSaved;

      // Set a timer to START the fade-out animation
      const fadeOutTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 3000); // Start fading out after 2.5 seconds

      return () => clearTimeout(fadeOutTimer);
    }
  }, [localUser.donated]);

  // --- NEW: Function to hide the element after fade-out completes ---
  const handleAnimationEnd = () => {
    if (isFadingOut) {
      setChildSavedPopupVisible(false);
    }
  };

  // Your other useEffect hooks remain untouched
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
  }, [localUser, user, setUser]);

  return (
    <div className="main-page-wrapper">
      {isChildSavedPopupVisible && (
        <div
          // Add the 'fading-out' class to trigger the animation
          className={`popup-overlay ${isFadingOut ? "fading-out" : ""}`}
          // Add the event listener to know when the animation is done
          onAnimationEnd={handleAnimationEnd}
        >
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
            <Clicker user={localUser} setUser={setLocalUser} />
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
