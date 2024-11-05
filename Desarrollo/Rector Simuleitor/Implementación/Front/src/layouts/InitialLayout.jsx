import { useConfig } from "../store/useConfig";
import un from "../assets/backgrounds/university-night.svg";
import conf from "../assets/others/configuration.svg";
import { Settings } from "../components/Settings";
import { Link } from "react-router-dom";

export const InitialLayout = ({ tittle, children, confb, ret, mt }) => {
  const { showSettings, setShowSettings } = useConfig();

  return (
    <div
      className="relative flex h-screen flex-col items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${un})`,
      }}
    >
      <h1 className="mt-16 text-center font-p text-8xl text-white">{tittle}</h1>
      <div
        className="flex h-[60%] w-[40%] flex-col items-center"
        style={{ marginTop: mt }}
      >
        {children}
      </div>

      {/* Mostrar página de configuración */}
      {showSettings && <Settings />}

      {/* Botón de configuración */}
      {confb && (
        <div
          className="absolute bottom-5 right-10 cursor-pointer rounded-3xl bg-[#d77b74] p-2 transition-colors duration-300 hover:bg-[#b95f5b]"
          onClick={() => setShowSettings(true)}
        >
          <img src={conf} alt="configuration" className="h-[50px] w-[50px]" />
        </div>
      )}

      {ret && (
        <button className="absolute bottom-5 left-10 bg-[#d77b74] p-4 font-p text-2xl text-white">
          <Link to="/">Volver</Link>
        </button>
      )}
    </div>
  );
};
