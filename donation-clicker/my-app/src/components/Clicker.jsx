import React from "react";
import "../css/Clicker.css"; // Ensure this is imported
const DONATION_PER_CHILD = 1;

function Clicker({ user, setUser, onChildSaved }) {
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
  };

  return (
    <div className="clicker-container">
      <img
        src="/images/coin.png"
        alt="Donate Coin"
        className="coin-image"
        onClick={handleClick}
      />
    </div>
  );
}

export default Clicker;
