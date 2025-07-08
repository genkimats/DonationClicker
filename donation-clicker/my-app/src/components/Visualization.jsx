import React from "react";
import "../css/Visualization.css";

const DONATION_PER_CHILD = 500;

function Visualization({ user }) {
  const childrenSaved = Math.floor(user.donated / DONATION_PER_CHILD);
  const progressToNextChild =
    ((user.donated % DONATION_PER_CHILD) / DONATION_PER_CHILD) * 100;

  // Create an array for houses (based on children saved)
  const houses = Array.from({ length: childrenSaved });

  // Create an array for walking children (based on dollars donated)
  const walkingChildren = Array.from({ length: Math.floor(user.donated) });

  return (
    <div className="visualization-container">
      <h2>Your Impact</h2>

      {/* This is the main scene */}
      <div className="scene">
        {/* Render walking children */}
        {walkingChildren.map((_, index) => (
          <img
            key={`child-${index}`}
            src="/images/child-walking.jpg"
            alt="child walking"
            className="walking-child"
            style={{
              left: `${5 + (index % 10) * 9}%`, // spread across the scene
              bottom: `${20 + Math.floor(index / 10) * 12}%`, // stack rows
            }}
          />
        ))}

        {/* Render a house for each child saved */}
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
