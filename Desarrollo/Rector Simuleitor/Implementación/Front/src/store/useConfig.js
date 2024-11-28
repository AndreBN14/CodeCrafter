import { create } from "zustand";
import musicFile from "../assets/audio/Daddy Castle.mp3";
import soundEffectFile from "../assets/audio/Swish _ OMORI SFX [ ezmp3.cc ].mp3";

export const useConfig = create((set) => {
  const musicAudio = new Audio(musicFile); // Audio para la música
  musicAudio.volume = 0.08; // Ajustar el volumen de la música

  const soundEffectAudio = new Audio(soundEffectFile); // Audio para efectos de sonido
  soundEffectAudio.volume = 0.6; // Ajustar el volumen del efecto de sonido

  return {
    playMusic: false,
    playSoundEffects: false,
    showSettings: false,

    toggleMusic: () => {
      set((state) => {
        if (state.playMusic) {
          musicAudio.pause(); // Pausar la música si está reproduciéndose
        } else {
          musicAudio
            .play()
            .catch((error) => console.error("Error al reproducir música:", error));
          musicAudio.loop = true; // Repetir la música en bucle
        }

        return { playMusic: !state.playMusic };
      });
    },

    toggleSoundEffects: () => {
      set((state) => ({ playSoundEffects: !state.playSoundEffects }));
    },

    playSoundEffect: () => {
      set((state) => {
        if (state.playSoundEffects) {
          soundEffectAudio.currentTime = 0; // Reiniciar el audio si ya se ha reproducido
          soundEffectAudio
            .play()
            .catch((error) => console.error("Error al reproducir efecto de sonido:", error));
        }
        return state; // No cambia el estado, solo reproduce el sonido si está activado
      });
    },

    setShowSettings: (value) => set({ showSettings: value }),
  };
});

