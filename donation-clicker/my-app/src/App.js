import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import { socket } from "./socket";
import "./css/App.css";
import sdgsLogo from "./assets/sdgs-logo.png";

function App() {
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [totals, setTotals] = useState({
    totalDonations: 0,
    totalChildrenSaved: 0,
  });

  useEffect(() => {
    // Handler functions to update state
    const handleUpdateLeaderboard = (data) => setLeaderboard(data);
    const handleUpdateTotals = (data) => setTotals(data);

    // Listen for events from the server
    socket.on("updateLeaderboard", handleUpdateLeaderboard);
    socket.on("updateTotals", handleUpdateTotals);

    // Clean up listeners when the App component unmounts
    return () => {
      socket.off("updateLeaderboard", handleUpdateLeaderboard);
      socket.off("updateTotals", handleUpdateTotals);
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div className="App">
      <div className="header">
        <div className="logo-container">
          <img src={sdgsLogo} alt="SDGs Logo" className="sdgs-image" />
        </div>
        <div className="header-placeholder">
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/leaderboard">Leaderboard</Link>
          </nav>
        </div>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <MainPage user={user} setUser={setUser} />
            ) : (
              <LoginPage setUser={setUser} />
            )
          }
        />
        <Route
          path="/leaderboard"
          element={
            <LeaderboardPage leaderboard={leaderboard} totals={totals} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
