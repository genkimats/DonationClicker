import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { socket } from "../socket";
import "../css/Leaderboard.css";

// UPDATED: This is a new, working URL for the map data.
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Example: Highlighting West African countries known for cacao production
const highlightedCountries = ["CIV", "GHA", "NGA", "CMR"];

const SDG_GOAL_CHILD_LABOR = 1000000; // Example goal in dollars

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [totals, setTotals] = useState({
    totalDonations: 0,
    totalChildrenSaved: 0,
  });

  useEffect(() => {
    // Handler functions
    const handleUpdateLeaderboard = (data) => setLeaderboard(data);
    const handleUpdateTotals = (data) => setTotals(data);

    // Listen for events
    socket.on("updateLeaderboard", handleUpdateLeaderboard);
    socket.on("updateTotals", handleUpdateTotals);

    // Clean up listeners on component unmount
    return () => {
      socket.off("updateLeaderboard", handleUpdateLeaderboard);
      socket.off("updateTotals", handleUpdateTotals);
    };
  }, []); // Empty dependency array ensures this runs only once

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

        <ComposableMap projection="geoMercator">
          <ZoomableGroup center={[0, 0]} zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    // The API now provides country codes in a different format
                    fill={
                      highlightedCountries.includes(geo.properties.ISO_A3)
                        ? "#E42"
                        : "#D6D6DA"
                    }
                    stroke="#FFF"
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}

export default Leaderboard;
