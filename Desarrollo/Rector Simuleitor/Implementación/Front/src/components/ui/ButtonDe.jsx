import { Link } from "react-router-dom";

export const ButtonDe = ({
  bg,
  isReplay,
  decision,
  onClick,
  outOfResources,
}) => {
  return (
    <button
      className="w-2/5 rounded-lg border-none shadow-[0px_4px_8px_rgba(0,0,0,0.3)] transition duration-300 ease-in-out hover:scale-105 hover:shadow-[0px_6px_12px_rgba(0,0,0,0.4)]"
      style={{
        backgroundColor: outOfResources() ? bg : "#D9D9D9",
      }}
      onClick={onClick}
    >
      {outOfResources() ? (
        isReplay ? (
          <h3 className="text-center font-s text-xl font-bold text-white">
            Reintentar
          </h3>
        ) : (
          <Link
            to="/"
            className="text-center font-s text-xl font-bold text-white"
          >
            Volver al menu
          </Link>
        )
      ) : (
        <h3 className="text-center font-s font-bold">{decision}</h3>
      )}
    </button>
  );
};
