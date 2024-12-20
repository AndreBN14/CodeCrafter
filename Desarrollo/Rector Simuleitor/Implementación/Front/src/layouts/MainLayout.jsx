import { Settings } from "../components/Settings";
import { useConfig } from "../store/useConfig";

export const MainLayout = ({ children, background, color }) => {
  const { showSettings } = useConfig();
  return (
    <div
      className="flex h-screen justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div
        className="h-full w-[538px]"
        style={{
          backgroundColor: color,
        }}
      >
        {children}
      </div>

      {/* Mostrar página de configuración */}
      {showSettings && <Settings />}
    </div>
  );
};
