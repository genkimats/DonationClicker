import React from "react";
import "../css/Clicker.css";
import coinImage from "../assets/coin.png";

function Clicker({ user, setUser }) {
  const handleClick = () => {
    setUser({
      ...user,
      donated: user.donated + 0.1,
      clicks: user.clicks + 1,
    });
  };

  return (
    <div className="clicker-container" onClick={handleClick}>
      <img src={coinImage} alt="Click to Donate" className="coin-image" />
    </div>
  );
}

export default Clicker;