import { create } from "zustand";

export const useResources = create((set) => ({
  money: 100,
  people: 100,
  impactMoney: (value) =>
    set((state) => {
      const newMoney = state.money + value;

      if (newMoney > 100) {
        return { money: state.money };
      }

      return {
        money: newMoney,
      };
    }),
  impactPeople: (value) =>
    set((state) => {
      const newPeople = state.people + value;

      if (newPeople > 100) {
        return { people: state.people };
      }

      return {
        people: newPeople,
      };
    }),
  setMoney: (value) => set(() => ({ money: value })),
  setPeople: (value) => set(() => ({ people: value })),
}));
