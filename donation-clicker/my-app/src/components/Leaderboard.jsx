import React from "react";
import "../css/Leaderboard.css"; // We will update this file next

const SDG_GOAL_CHILD_LABOR = 1000000;

function Leaderboard({ leaderboard, totals }) {
  const progress = (totals.totalDonations / SDG_GOAL_CHILD_LABOR) * 100;

  // Helper to assign a class for the top 3 ranks
  const getRankClass = (index) => {
    if (index === 0) return "rank-1";
    if (index === 1) return "rank-2";
    if (index === 2) return "rank-3";
    return "";
  };

  return (
    <div className="leaderboard-page-container">
      {/* Global Stats Section */}
      <div className="global-stats-card">
        <h3>Global Impact</h3>
        <div className="stats-row">
          <span>Total Donations:</span>
          <span className="stats-value">
            ${totals.totalDonations.toFixed(2)}
          </span>
        </div>
        <div className="stats-row">
          <span>Total Children Saved:</span>
          <span className="stats-value">{totals.totalChildrenSaved}</span>
        </div>
        <div className="progress-section">
          <h4>Progress Towards SDG Goal</h4>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}>
              {progress.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Entries Section */}
      <div className="leaderboard-list-card">
        <h3>Top 10 Donators</h3>
        <div className="leaderboard-entries">
          {leaderboard.map((user, index) => (
            <div
              key={index}
              className={`leaderboard-entry ${getRankClass(index)}`}
            >
              <span className="entry-rank">{index + 1}</span>
              <span className="entry-username">{user.username}</span>
              <span className="entry-amount">${user.donated.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
