import React, { useState } from "react";
import "../css/Clicker.css";
import "../css/animation.css";

const DONATION_PER_CHILD = 1;

function Clicker({ user, setUser, onChildSaved }) {
  const [fallingCoins, setFallingCoins] = useState([]);

  const handleClick = () => {
    const newUser = {
      ...user,
      clicks: user.clicks + 1,
      donated: user.donated + 0.1,
    };

    const oldChildrenSaved = Math.floor(
      (user.donated + 0.001) / DONATION_PER_CHILD
    );
    const newChildrenSaved = Math.floor(
      (newUser.donated + 0.001) / DONATION_PER_CHILD
    );

    if (newChildrenSaved > oldChildrenSaved && onChildSaved) {
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
            className="falling-coin"
            onAnimationEnd={() => handleAnimationEnd(coin.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Clicker;
