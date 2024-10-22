import student from "../assets/characters/student.svg";
import dean from "../assets/characters/dean.svg";
import teacher from "../assets/characters/teacher.svg";
import journalist from "../assets/characters/journalist.svg";
import { create } from "zustand";
import axios from "axios";

const URL = "http://localhost:8000";

export const useEvent = create((set) => ({
  event: null,
  error: null,
  loading: true,
  start: false,
  character: null,
  getEvent: async (resource) => {
    set({ loading: true });
    try {
      const { data } = await axios.post(`${URL}/api/generar-evento/`, resource);
      const personaje = data.personaje;
      console.log(personaje);
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
}));
