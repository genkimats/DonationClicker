import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import { socket } from "./socket";
import "./css/App.css";

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
      <nav>
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>
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
