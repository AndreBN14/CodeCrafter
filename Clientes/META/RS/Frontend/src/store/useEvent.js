import student from "../assets/characters/student.svg";
import dean from "../assets/characters/dean.svg";
import teacher from "../assets/characters/teacher.svg";
import journalist from "../assets/characters/journalist.svg";
import { create } from "zustand";
import axios from "axios";

const URL = "https://backend-rs-production.up.railway.app";

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

      switch (personaje) {
        case "estudiante":
          set({
            character: {
              name: "Estudiante",
              img: student,
            },
          });
          break;
        case "profesora":
          set({
            character: {
              name: "Profesora",
              img: teacher,
            },
          });
          break;
        case "periodista":
          set({
            character: {
              name: "Periodista",
              img: journalist,
            },
          });
          break;
        case "decano":
          set({
            character: {
              name: "Decano",
              img: dean,
            },
          });
          break;
        default:
          set({ error: "No se encontró el personaje" });
      }
      set({ event: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  startGame: () => set({ start: true }),
  restartGame: () => set({ start: false }),
}));
