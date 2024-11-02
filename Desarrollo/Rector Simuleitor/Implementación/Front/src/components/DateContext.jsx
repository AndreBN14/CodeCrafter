// DateContext.jsx
import React, { createContext, useState } from "react";

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(0);

  const incrementDate = () => {
    if (day < 30) {
      setDay(day + 1);
    } else {
      setDay(1);
      setMonth(month + 1);
    }
  };

  return (
    <DateContext.Provider value={{ day, month, incrementDate }}>
      {children}
    </DateContext.Provider>
  );
};
