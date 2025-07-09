import React, { useEffect, useState } from "react";
import "../css/Visualization.css";

const DONATION_PER_CHILD = 500;

function Visualization({ user }) {
  const [walkingChildren, setWalkingChildren] = useState([]);
  const [lastDonated, setLastDonated] = useState(0);

  const childrenSaved = Math.floor(user.donated / DONATION_PER_CHILD);
  const progressToNextChild =
    ((user.donated % DONATION_PER_CHILD) / DONATION_PER_CHILD) * 100;

  const houses = Array.from({ length: childrenSaved });

  // Detect donation increase and add a new walking child
  useEffect(() => {
    const prevCount = Math.floor(lastDonated);
    const newCount = Math.floor(user.donated);

    if (newCount > prevCount) {
      const numToAdd = newCount - prevCount;
      const newChildren = [];

      for (let i = 0; i < numToAdd; i++) {
        const bottom = 10 + Math.random() * 30; // 10% ~ 40%
        const duration = 3 + Math.random() * 5; // 3s ~ 8s
        const direction = Math.random() < 0.5 ? "left" : "right";
        newChildren.push({ bottom, duration, direction, id: Date.now() + i });
      }

      setWalkingChildren((prev) => [...prev, ...newChildren]);
      setLastDonated(user.donated);
    }
  }, [user.donated, lastDonated]);

  return (
    <div className="visualization-container">
      <h2>Your Impact</h2>

      <div className="scene">
        {/* Render walking children with individual settings */}
        {walkingChildren.map((child) => {
          const className =
            "walking-child " +
            (child.direction === "left" ? "walk-left" : "walk-right");

          return (
            <img
              key={child.id}
              src="/images/child-walking.jpg"
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

        {/* Render houses based on children saved */}
        {houses.map((_, index) => (
          <img
            key={`house-${index}`}
            src="/images/house.png"
            alt="house"
            className="house"
            style={{ left: `${10 + index * 15}%`, bottom: "10%" }}
          />
        ))}
      </div>

      <p>Children Saved: {childrenSaved}</p>

      <h4>Progress to saving the next child:</h4>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressToNextChild}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Visualization;
