import React, { useEffect, useState } from "react";
import "../css/Visualization.css";

const DONATION_PER_CHILD = 1000;

// The isPopupVisible prop is no longer needed here
function Visualization({ user }) {
  const [walkingChildren, setWalkingChildren] = useState([]);
  const [lastDonated, setLastDonated] = useState(0);

  const childrenSaved = Math.floor(user.donated / (DONATION_PER_CHILD - 0.001));
  const progressToNextChild =
    ((user.donated % DONATION_PER_CHILD) / DONATION_PER_CHILD) * 100;

  // Your existing logic for walking children remains untouched
  useEffect(() => {
    const prevCount = Math.floor(lastDonated + 0.0001);
    const newCount = Math.floor(user.donated + 0.0001);
    console.log("prevCount:", lastDonated);
    console.log("newCount:", user.donated);
    if (
      Math.floor(newCount / DONATION_PER_CHILD) >
      Math.floor(prevCount / DONATION_PER_CHILD)
    ) {
      console.log("Here!");
      const numToAdd = newCount - prevCount;
      const newChildren = [];
      for (let i = 0; i < 1; i++) {
        const bottom = 10 + Math.random() * 30;
        const duration = 3 + Math.random() * 5;
        const direction = Math.random() < 0.5 ? "left" : "right";
        newChildren.push({ bottom, duration, direction, id: Date.now() + i });
      }
      setWalkingChildren((prev) => [...prev, ...newChildren]);
      setLastDonated(user.donated);
    }
  }, [user.donated, lastDonated]);

  return (
    // The popup logic has been removed from here
    <div className="visualization-container">
      <h2>Your Impact</h2>
      <div className="scene">
        {walkingChildren.map((child) => {
          const className =
            "walking-child " +
            (child.direction === "left" ? "walk-left" : "walk-right");
          return (
            <img
              key={child.id}
              src="/images/child-walking.gif"
              alt="child walking"
              className={className}
              style={{
                bottom: `${child.bottom}%`,
                animationDuration: `${child.duration}s`,
                transform: `scaleX(${child.direction === "left" ? -1 : 1})`,
              }}
            />
          );
        })}
      </div>
      <div className="children-saved-display">
        <span className="label">Children Saved</span>
        <span className="count">{childrenSaved}</span>
      </div>
      <h4>Progress to saving the next child:</h4>
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressToNextChild}%` }}
        ></div>
        <span className="progress-label">
          $
          {Math.max(
            0,
            (DONATION_PER_CHILD - (user.donated % DONATION_PER_CHILD)).toFixed(
              2
            )
          )}{" "}
          until next child
        </span>
      </div>
    </div>
  );
}

export default Visualization;
