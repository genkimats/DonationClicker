import React, { useEffect, useState } from 'react';
import '../css/Achievements.css'; // The styles for this are in the achievements CSS file

function AchievementPopup({ achievement }) {
  const [visible, setVisible] = useState(false);

  // This effect makes the popup appear and disappear
  useEffect(() => {
    if (achievement) {
      setVisible(true);
      // The popup will hide after 3 seconds
      const timer = setTimeout(() => setVisible(false), 3000); 
      return () => clearTimeout(timer);
    }
  }, [achievement]);

  if (!achievement || !visible) {
    return null;
  }

  // This JSX builds the popup dynamically
  return (
    <div className={`achievement-popup ${visible ? 'show' : ''}`}>
      {/* This is where your achievement symbol is placed */}
      <img src={achievement.unlockedImage} alt={achievement.name} className="popup-icon" />
      
      {/* This holds the text, which can be easily changed */}
      <div className="popup-text">
        <div className="popup-title">Challenge Complete</div>
        <div className="popup-name">{achievement.name}</div>
      </div>
    </div>
  );
}

export default AchievementPopup;
