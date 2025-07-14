import React, { useState } from "react";
import { socket } from "../socket";
import "../css/LoginPage.css";

function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    socket.emit("login", username, password, (response) => {
      if (response.success) {
        setUser(response.user);
      } else {
        setError(response.message);
      }
    });
  };

  const handleRegister = () => {
    socket.emit("register", username, password, (response) => {
      if (response.success) {
        setUser(response.user);
      } else {
        setError(response.message);
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />
        <div className="login-buttons">
          <button onClick={handleLogin} className="login-btn primary">
            Login
          </button>
          <button onClick={handleRegister} className="login-btn secondary">
            Register
          </button>
        </div>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
