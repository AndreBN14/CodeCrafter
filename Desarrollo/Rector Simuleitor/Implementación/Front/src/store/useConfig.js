import { create } from "zustand";
import mediaFile from "../assets/audio/Daddy Castle.mp3";

export const useConfig = create((set) => {
  const audio = new Audio(mediaFile); // Cambia la ruta al archivo de audio
  audio.volume = 0.2; // Ajustar el volumen

  return {
    playMusic: false,
    showSettings: false,
    toggleMusic: () => {
      set((state) => {
        if (state.playMusic) {
          audio.pause(); // Pausar si se está reproduciendo
        } else {
          audio
            .play()
            .catch((error) => console.error("Error al reproducir:", error));
          audio.loop = true; // Repetir en bucle
        }

        return { playMusic: !state.playMusic };
      });
    },
    setShowSettings: (value) => set({ showSettings: value }),
  };
});
