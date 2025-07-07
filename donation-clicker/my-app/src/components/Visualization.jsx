import React from "react";
import "../css/Visualization.css";

const DONATION_PER_CHILD = 500;

function Visualization({ user }) {
  const childrenSaved = Math.floor(user.donated / DONATION_PER_CHILD);
  const progressToNextChild =
    ((user.donated % DONATION_PER_CHILD) / DONATION_PER_CHILD) * 100;

  // Create an array to easily render the houses
  const houses = Array.from({ length: childrenSaved });

  return (
    <div className="visualization-container">
      <h2>Your Impact</h2>

      {/* This is the main scene */}
      <div className="scene">
        {/* The walking child GIF */}
        <img
          src="/images/child-walking.jpg"
          alt="child walking"
          className="walking-child"
        />

        {/* Render a house for each child saved */}
        {houses.map((_, index) => (
          <img
            key={index}
            src="/images/house.png"
            alt="house"
            className="house"
            // Position each house differently
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
