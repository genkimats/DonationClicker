import React, { useState } from "react";
import { socket } from "../socket";

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
    <div>
      <h2>Login / Register</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LoginPage;
