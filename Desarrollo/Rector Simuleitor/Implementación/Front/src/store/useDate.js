import { create } from "zustand";

export const useDate = create((set) => ({
  day: 1,
  month: 0,
  incrementDate: () =>
    set((state) => {
      if (state.day < 30) {
        return { day: state.day + 1 };
      } else {
        return { day: 1, month: state.month + 1 };
      }
    }),
}));
