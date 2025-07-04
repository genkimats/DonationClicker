import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import "../css/Leaderboard.css";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const highlightedCountries = ["CIV", "GHA", "NGA", "CMR"];
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

        <ComposableMap projection="geoMercator">
          <ZoomableGroup center={[0, 0]} zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
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
