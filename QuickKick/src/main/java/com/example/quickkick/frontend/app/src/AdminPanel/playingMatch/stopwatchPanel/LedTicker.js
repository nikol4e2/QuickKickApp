import React from "react";
import "./LedTicker.css";

const LedTicker = ({ text }) => {
  return (
    <div className="ticker-container">
      <div className="ticker">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default LedTicker;