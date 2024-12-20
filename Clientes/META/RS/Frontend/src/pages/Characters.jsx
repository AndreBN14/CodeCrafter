import { MainLayout } from "../layouts/MainLayout";
import ua from "../assets/backgrounds/university-afternoon.svg";
import { LockedCharacter } from "../components/LockedCharacter";
import st from "../assets/characters/student.svg";
import dc from "../assets/characters/dean.svg";
import tc from "../assets/characters/teacher.svg";
import jr from "../assets/characters/journalist.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const initialCharacters = [
  {
    name: "Decano",
    img: dc,
    unlock: false,
  },
  {
    name: "Estudiante",
    img: st,
    unlock: false,
  },
  {
    name: "Profesora",
    img: tc,
    unlock: false,
  },
  {
    name: "Periodista",
    img: jr,
    unlock: false,
  },
];

export const Characters = () => {
  const [characters, setCharacters] = useState(initialCharacters);

  useEffect(() => {
    const unlockedCharacters = JSON.parse(
      localStorage.getItem("unlockedCharacters")
    );
    if (unlockedCharacters) {
      const updatedCharacters = characters.map((character) => {
        if (unlockedCharacters.includes(character.name.toLowerCase())) {
          return { ...character, unlock: true };
        }
        return character;
      });

      setCharacters(updatedCharacters);
    }
  }, []);

  return (
    <MainLayout background={ua} color="#110909">
      <div className="relative mx-auto my-[19px] h-[95%] w-[95%] border border-white bg-[#231212]">
        {/* Botón de regreso */}
        <Link
          to="/"
          className="absolute bottom-2 left-2 px-4 py-2 text-white bg-[#d28282] rounded hover:bg-[#b56d6d] font-bold text-lg"
        >
          Volver
        </Link>

        <h1 className="ml-[15px] mt-[15px] font-p text-3xl text-white">
          Personajes
        </h1>
        <div className="mt-5 grid grid-cols-2 items-center justify-center gap-5">
          {characters.map((character) => (
            <LockedCharacter key={character.name} character={character} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
