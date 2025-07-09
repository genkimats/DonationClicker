import React from 'react';
import '../css/PiggyBank.css';
import piggyBankImage from '../assets/piggy-bank.png';

const PIGGY_BANK_GOAL = 1000; // Goal in dollars

const PiggyBank = ({ donated }) => {
  const getFillPercentage = () => {
    return Math.min((donated / PIGGY_BANK_GOAL) * 100, 100);
  };

  const fillHeight = `${getFillPercentage()}%`;

  return (
    <div className="piggy-bank-container">
      <div className="piggy-bank">
        <div className="piggy-bank-fill" style={{ height: fillHeight }}></div>
        <img src={piggyBankImage} alt="Piggy Bank" className="piggy-bank-image" />
      </div>
    </div>
  );
};

export default PiggyBank;