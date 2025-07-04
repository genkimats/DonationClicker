import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import "./css/App.css";

function App() {
  const [user, setUser] = React.useState(null);

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
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
