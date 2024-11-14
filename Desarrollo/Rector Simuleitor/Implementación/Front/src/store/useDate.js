import { create } from "zustand";
import axios from "axios";

const URL = "http://localhost:8000";

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
  saveScore: async (user, money, people, day, month) => {
    set({ loading: true });
    const dias = day + month * 30;
    const jugador_id = user.jugador_id;
    const score = {
      jugador_id,
      dias,
      recursos_criticos: {
        dinero: money,
        aprobacion: people,
      },
    };
    try {
      const { data } = await axios.post(`${URL}/save-score/`, score);
      console.log(data);
      set({ loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false });
      set({ error: error.message });
    }
  },
  reset: () => {
    set({ day: 1, month: 0 });
  },
}));
