import { MainLayout } from "../layouts/MainLayout";
import ua from "../assets/backgrounds/university-afternoon.svg";
import { LockedCharacter } from "../components/LockedCharacter";
import st from "../assets/characters/student.svg";
import dc from "../assets/characters/dean.svg";
import tc from "../assets/characters/teacher.svg";
import jr from "../assets/characters/journalist.svg";

const characters = [
  {
    name: "Decano",
    img: dc,
    unlock: false,
  },
  {
    name: "Estudiante",
    img: st,
    unlock: true,
  },
  {
    name: "Profesora",
    img: tc,
    unlock: true,
  },
  {
    name: "Periodista",
    img: jr,
    unlock: false,
  },
];

export const Characters = () => {
  return (
    <MainLayout background={ua} color="#110909">
      <div className="mx-auto my-[19px] h-[95%] w-[95%] border border-white bg-[#231212]">
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
