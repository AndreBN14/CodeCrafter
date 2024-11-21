import { useConfig } from "../store/useConfig";
import un from "../assets/backgrounds/university-night.svg";
import conf from "../assets/others/configuration.svg";
import { Settings } from "../components/Settings";
import { Link } from "react-router-dom";
import clsx from "clsx";

export const InitialLayout = ({ tittle, children, confb, ret, reg }) => {
  const { showSettings, setShowSettings, playSoundEffect } = useConfig();

  return (
    <div
      className="relative flex h-screen flex-col items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${un})`,
      }}
    >
      <h1
        className={clsx(
          "text-center font-p text-5xl text-white md:text-7xl lg:text-8xl",
          reg ? "mt-5" : "mt-16",
        )}
      >
        {tittle}
      </h1>
      {children}

      {/* Mostrar página de configuración */}
      {showSettings && <Settings />}

      {/* Botón de configuración */}
      {confb && (
        <div
          className="absolute bottom-5 right-10 cursor-pointer rounded-3xl bg-[#d77b74] p-2 transition-colors duration-300 hover:bg-[#b95f5b]"
          onClick={() => {
            setShowSettings(true);
            playSoundEffect();
          }}
        >
          <img src={conf} alt="configuration" className="h-[50px] w-[50px]" />
        </div>
      )}

      {ret && (
        <button
          className="absolute bottom-5 left-10 bg-[#d77b74] p-4 font-p text-2xl text-white"
          onClick={() => playSoundEffect()}
        >
          <Link to="/">Volver</Link>
        </button>
      )}
    </div>
  );
};
