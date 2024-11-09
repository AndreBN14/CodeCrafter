// ManagamentDays.jsx
import React from "react";
import { useDate } from "../store/useDate";

export const ManagamentDays = () => {
  const { day, month } = useDate();

  return (
    <section className="flex flex-col items-center text-center leading-normal">
      <h1 className="font-p text-2xl text-white">2024</h1>
      <h2 className="mt-1 font-s text-2xl text-white">
        {month} meses y {day} días ejerciendo
      </h2>
    </section>
  );
};
