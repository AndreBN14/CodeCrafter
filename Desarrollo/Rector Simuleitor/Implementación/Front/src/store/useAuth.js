import { create } from "zustand";
import axios from "axios";

const URL = "http://localhost:8000";

export const useAuth = create((set) => ({
  user: null,
  token: null,
  loading: false,
  register: async (user) => {
    try {
      set({ loading: true });
      const { data } = await axios.post(`${URL}/registrarse`, user);
      set({ user: data.user, token: data.token });

      localStorage.setItem("authData", JSON.stringify(data));

      console.log(data);
      set({ loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },
  login: async (user) => {
    try {
      set({ loading: true });
      const { data } = await axios.post(`${URL}/loggin`, user);
      set({ user: data.user, token: data.token });

      localStorage.setItem("authData", JSON.stringify(data));

      console.log(data);
      set({ loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false });
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
  setToken: (token) => {
    set({ token });
  },
  setLoading: (loading) => {
    set({ loading });
  },
}));
