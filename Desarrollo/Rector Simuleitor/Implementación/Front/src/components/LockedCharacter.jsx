import sm from "../assets/others/sm-logo.svg";

export const LockedCharacter = ({ character }) => {
  return (
    <div className="flex h-[90%] w-[95%] flex-col items-center">
      <div
        className="flex h-[90%] w-4/5 justify-center rounded-[10px]"
        style={{
          backgroundColor: `${character.unlock ? "#904949" : "#321A1A"}`,
          alignItems: `${character.unlock ? "end" : "center"}`,
        }}
      >
        <img
          src={character.unlock ? character.img : sm}
          alt={character.unlock ? character.name : "sm-logo"}
          className="h-4/5 w-full"
        />
      </div>
      <h2 className="font-s text-xl text-white">
        {character.unlock ? character.name : "??????"}
      </h2>
    </div>
  );
};
