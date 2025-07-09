import React from "react";
import "../css/Achievements.css";

// --- IMPORTANT: IMAGE PATHS ---
// Make sure your unlocked achievement images are in: my-app/src/assets/achievements/
import ach1Img from '../assets/achievements/ach-1.png'; 
import ach2Img from '../assets/achievements/ach-2.png'; 
import ach3Img from '../assets/achievements/ach-3.png';
import ach4Img from '../assets/achievements/ach-4.png';
import ach5Img from '../assets/achievements/ach-5.png';
import ach6Img from '../assets/achievements/ach-6.png';
import ach7Img from '../assets/achievements/ach-7.png';
import ach8Img from '../assets/achievements/ach-8.png';
import ach9Img from '../assets/achievements/ach-9.png';

// NEW: A component that draws the locked icon directly with code.
function LockedIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z" fill="white" />
      <path d="M10.5 9.5C10.5 8.2375 11.0268 7.025 12 6.5C13.4583 5.70833 15 7 15 8.5C15 9.53333 14.4667 10.2333 13.4 11C12.3333 11.7667 12 12.5 12 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// The full list of 9 achievements based on the number of clicks
export const achievementsList = [
  { name: "The First Step", requirement: (user) => user.clicks >= 1, unlockedImage: ach1Img },
  { name: "Rumors of the Well", requirement: (user) => user.clicks >= 10, unlockedImage: ach2Img },
  { name: "A Small Community", requirement: (user) => user.clicks >= 50, unlockedImage: ach3Img },
  { name: "The Village Elder", requirement: (user) => user.clicks >= 100, unlockedImage: ach4Img },
  { name: "A Ray of Hope", requirement: (user) => user.clicks >= 250, unlockedImage: ach5Img },
  { name: "The People's Hero", requirement: (user) => user.clicks >= 500, unlockedImage: ach6Img },
  { name: "Miracle Worker", requirement: (user) => user.clicks >= 1000, unlockedImage: ach7Img },
  { name: "Continental Fame", requirement: (user) => user.clicks >= 5000, unlockedImage: ach8Img },
  { name: "A Living Legend", requirement: (user) => user.clicks >= 10000, unlockedImage: ach9Img },
];

function Achievements({ user }) {
  return (
    <div className="achievements-container">
      <ul className="hexagon-grid">
        {achievementsList.map((ach, index) => {
          const isUnlocked = ach.requirement(user);
          return (
            <li key={index} className="hexagon">
              <div className="hexagon-inner">
                 {isUnlocked ? (
                    <img src={ach.unlockedImage} alt={ach.name} className="unlocked" />
                 ) : (
                    <div className="locked-icon-wrapper">
                      <LockedIcon />
                    </div>
                 )}
                  <div className="hexagon-label">{ach.name}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Achievements;
