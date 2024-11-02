// ManagamentDays.jsx
import React, { useContext } from "react";
import { DateContext } from "./DateContext";

export const ManagamentDays = () => {
  const { day, month } = useContext(DateContext);

  return (
    <section
      className="dateSurvived"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        lineHeight: "1.5",
      }}
    >
      <h1 style={{ fontFamily: "Inknut Antiqua", margin: "0", color: "white" }}>
        2024
      </h1>
      <h2
        style={{
          fontFamily: "Inria Sans",
          marginTop: "10px",
          margin: "0",
          color: "white",
        }}
      >
        {month} meses y {day} días ejerciendo
      </h2>
    </section>
  );
};
