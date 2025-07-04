import React from "react";
import Leaderboard from "../components/Leaderboard";

function LeaderboardPage({ leaderboard, totals }) {
  return (
    <div>
      <h1>Leaderboard</h1>
      <Leaderboard leaderboard={leaderboard} totals={totals} />
    </div>
  );
}

export default LeaderboardPage;
