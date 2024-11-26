import { create } from "zustand";
import axios from "axios";
import URL from "../constants/URL";
import characters from "../constants/characters";
import Desconocido from "../assets/characters/desconocido.svg";
export const useEvent = create((set) => ({
  event: null,
  error: null,
  loading: true,
  start: false,
  character: null,
  getEvent: async (resource) => {
    set({ loading: true });
    try {
      const { data } = await axios.post(`${URL}/api/generar-evento`, resource);
      const personaje = data.personaje;

      const unlockedCharacters =
        JSON.parse(localStorage.getItem("unlockedCharacters")) || [];

      if (!unlockedCharacters.includes(personaje)) {
        unlockedCharacters.push(personaje);
        localStorage.setItem(
          "unlockedCharacters",
          JSON.stringify(unlockedCharacters),
        );
      }

      const character = characters.find(
        (character) => character.name.toLowerCase() === personaje) || {
          name: "Desconocido",
          img: Desconocido,
        };
        console.log(character);
      if (character) {
        set({
          character: {
            name: character.name,
            img: character.img,
          },
        });
      } else {
        set({ error: "Personaje no encontrado" });
      }

      set({ event: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  startGame: () => set({ start: true }),
  restartGame: () => set({ start: false }),
}));
