import React from "react";
import "../css/Achievements.css";

const DONATION_PER_CHILD = 500;

const achievementsList = [
  { name: "First Dollar", requirement: (user) => user.donated >= 1 },
  {
    name: "Helping Hand",
    requirement: (user) => user.donated >= DONATION_PER_CHILD,
  },
  { name: "Click-tastic", requirement: (user) => user.clicks >= 1000 },
  { name: "Generous Giver", requirement: (user) => user.donated >= 10000 },
];

function Achievements({ user }) {
  return (
    <div className="achievements">
      <h2>Achievements</h2>
      <ul>
        {achievementsList.map((ach, index) => (
          <li
            key={index}
            className={ach.requirement(user) ? "unlocked" : "locked"}
          >
            {ach.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Achievements;
