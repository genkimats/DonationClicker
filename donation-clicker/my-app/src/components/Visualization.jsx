import React from "react";
import "../css/Visualization.css";

const DONATION_PER_CHILD = 500;

function Visualization({ user }) {
  const childrenSaved = Math.floor(user.donated / DONATION_PER_CHILD);
  const progressToNextChild =
    ((user.donated % DONATION_PER_CHILD) / DONATION_PER_CHILD) * 100;

  const getImageForChildrenSaved = () => {
    if (childrenSaved >= 5) return "school.jpg"; // Placeholder image names
    if (childrenSaved >= 2) return "clean_water.jpg";
    if (childrenSaved >= 1) return "food.jpg";
    return "cacao_farm.jpg";
  };

  return (
    <div className="visualization">
      <h2>Impact Visualization</h2>
      <p>Children Saved: {childrenSaved}</p>

      <h4>Progress to saving the next child:</h4>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressToNextChild}%` }}
        ></div>
      </div>

      <h4>Quality of Life Improvement:</h4>
      <img
        src={`/images/${getImageForChildrenSaved()}`}
        alt="Quality of life visualization"
        className="visualization-image"
      />
    </div>
  );
}

export default Visualization;
