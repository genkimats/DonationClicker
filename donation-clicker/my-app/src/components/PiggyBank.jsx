import React, { useState, useEffect } from "react";
import "../css/PiggyBank.css";
import piggyBankImage from "../assets/piggy-bank.png";
import happyPiggyImage from "../assets/happy-pig.png";

const PIGGY_BANK_GOAL = 1000;

const PiggyBank = ({ donated }) => {
  const [isHappy, setIsHappy] = useState(false);

  const getFillPercentage = () => {
    return Math.min((donated / PIGGY_BANK_GOAL) * 100, 100);
  };

  const fillHeight = `${getFillPercentage()}%`;

  useEffect(() => {
    if (donated > 0) {
      setIsHappy(true);
      const timer = setTimeout(() => setIsHappy(false), 400); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [donated]);

  return (
    <div className="piggy-bank-container">
      <div className="piggy-bank">
        <img
          src={isHappy ? happyPiggyImage : piggyBankImage}
          alt="Piggy Bank"
          className={`piggy-bank-image ${isHappy ? "happy-pig" : ""}`}
        />
      </div>
    </div>
  );
};

export default PiggyBank;
