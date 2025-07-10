import React from "react";
import "../css/Leaderboard.css";

const SDG_GOAL_CHILD_LABOR = 1000000;

// This component is now much simpler and just displays the data it receives.
function Leaderboard({ leaderboard, totals }) {
  const progress = (totals.totalDonations / SDG_GOAL_CHILD_LABOR) * 100;

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-list">
        <h3>Top 10 Donators</h3>
        <ol>
          {leaderboard.map((user, index) => (
            <li key={index}>
              {user.username}: ${user.donated.toFixed(2)}
            </li>
          ))}
        </ol>
      </div>

      <div className="global-stats">
        <h3>Global Impact</h3>
        <p>Total Donations: ${totals.totalDonations.toFixed(2)}</p>
        <p>Total Children Saved: {totals.totalChildrenSaved}</p>

        <h4>Progress Towards SDG Goal (End Child Labour):</h4>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
