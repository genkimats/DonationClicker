import React, { useState } from "react";
import "../css/Clicker.css";
import "../css/animation.css";

const DONATION_PER_CHILD = 1000;

function Clicker({ user, setUser, onChildSaved }) {
  const [fallingCoins, setFallingCoins] = useState([]);

  const handleClick = () => {
    const newUser = {
      ...user,
      clicks: user.clicks + 1,
      donated: user.donated + 1.5,
    };

    const oldChildrenSaved = Math.floor(user.donated + 0.001);
    const newChildrenSaved = Math.floor(newUser.donated + 0.001);

    if (
      Math.floor(newChildrenSaved / DONATION_PER_CHILD) >
        Math.floor(oldChildrenSaved / DONATION_PER_CHILD) &&
      onChildSaved
    ) {
      onChildSaved();
    }

    setUser(newUser);

    const newCoin = { id: Date.now() + Math.random() };
    setFallingCoins((prevCoins) => [...prevCoins, newCoin]);
  };

  const handleAnimationEnd = (id) => {
    setFallingCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== id));
  };

  return (
    <div className="clicker-container">
      {/* This is a div styled by Clicker.css */}
      <div className="coin-image" onClick={handleClick}>
        <img
          src="/images/coin.png"
          alt="Donate Coin"
          className="coin-image"
          onClick={handleClick}
        />
      </div>

      <div className="falling-coins-container">
        {fallingCoins.map((coin) => (
          // This is a div styled by animation.css
          <div
            key={coin.id}
            clssName="falling-coin"
            onAnimationEnd={() => handleAnimationEnd(coin.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Clicker;
