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
    <MainLayout
      background={ua}
      color="#110909"
    >
      <div
        style={{
          width: "95%",
          height: "95%",
          backgroundColor: "#231212",
          border: "1px solid white",
          margin: "19px auto",
        }}
      >
        <h1
          style={{
            fontFamily: "Inknut Antiqua",
            color: "white",
            marginLeft: "15px",
            marginTop: "15px",
          }}
        >
          Personajes
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            justifyItems: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {characters.map((character) => (
            <LockedCharacter
              key={character.name}
              character={character}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
