import { create } from "zustand";
import axios from "axios";
import URL from "../constants/URL";

export const useAuth = create((set) => ({
  user: null,
  loading: false,
  error: null,
  register: async (user) => {
    try {
      set({ loading: true });
      const { data } = await axios.post(`${URL}/registrarse`, user);
      set({ user: data });

      localStorage.setItem("authData", JSON.stringify(data));

      console.log(data);
      set({ loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false });
      set({ error: error.message });
    }
  },
  login: async (user) => {
    try {
      set({ loading: true });
      const { data } = await axios.post(`${URL}/loggin`, user);
      set({ user: data });

      localStorage.setItem("authData", JSON.stringify(data));

      console.log(data);
      set({ loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false });
      set({ error: error.message });
    }
  },
  logout: () => {
    set({ user: null, token: null });

    // Eliminar 'authData' de localStorage
    localStorage.removeItem("authData");
  },
  setUser: (user) => {
    set({ user });
  },
}));
