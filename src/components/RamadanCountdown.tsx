
import { useState, useEffect } from "react";
import { getRamadanDaysRemaining } from "../utils/dateUtils";

const RamadanCountdown = () => {
  const [daysRemaining, setDaysRemaining] = useState(getRamadanDaysRemaining());
  
  useEffect(() => {
    // Update countdown once per day
    const timer = setInterval(() => {
      setDaysRemaining(getRamadanDaysRemaining());
    }, 1000 * 60 * 60 * 24); // Update every 24 hours
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-ramadan-green/30 backdrop-blur-sm rounded-full px-4 py-2 flex items-center border border-ramadan-gold/30 animate-pulse">
      <div className="mr-2 text-ramadan-gold">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <span className="text-sm font-medium">
        റമദാൻ അവസാനിക്കാൻ <span className="text-ramadan-gold font-bold">{daysRemaining}</span> ദിവസങ്ങൾ
      </span>
    </div>
  );
};

export default RamadanCountdown;
