import React from "react";
import "../css/Clicker.css";

function Clicker({ user, setUser }) {
  const handleClick = () => {
    setUser({
      ...user,
      donated: user.donated + 0.1,
      clicks: user.clicks + 1,
    });
  };

  return (
    <div>
      <h2>Click to Donate!</h2>
      <button className="clicker-button" onClick={handleClick}>
        $
      </button>
      <h3>Your Donations: ${user.donated.toFixed(2)}</h3>
    </div>
  );
}

export default Clicker;
