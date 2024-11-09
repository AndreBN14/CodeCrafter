import { useConfig } from "../store/useConfig";

export const Settings = () => {
  const { toggleMusic, playMusic, setShowSettings } = useConfig();

  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-between bg-black bg-opacity-90 p-8 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Ajustes</h2>
        <button className="text-2xl" onClick={() => setShowSettings(false)}>
          X
        </button>
      </div>
      <div className="mt-4">
        <p className="text-lg">Versión del juego: 2.1</p>
        <hr className="my-4 border-gray-600" />
        <div className="my-4 flex items-center justify-between">
          <p className="text-xl">Música</p>
          <button className="text-2xl" onClick={toggleMusic}>
            {playMusic ? "🎶" : "🎵"} {/* Cambiar el ícono según el estado */}
          </button>
        </div>
        <div className="my-4 flex items-center justify-between">
          <p className="text-xl">Efectos de sonido</p>
          <button className="text-2xl">🔊</button>
        </div>
        <div className="my-4 flex items-center justify-between">
          <p className="text-xl">Idioma</p>
          <button className="text-xl">Español &gt;</button>
        </div>
        <div className="my-4 flex items-center justify-between rounded-lg border-2 border-white p-4">
          <p className="flex items-center text-xl">
            <span className="mr-2">☣️</span>
            Remover Anuncios
          </p>
          <p className="text-xl">€1.29</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-4 text-lg">Conectado a Correo Electrónico</p>
        <button className="rounded-lg bg-gray-700 p-2 text-lg">
          Más Información
        </button>
      </div>
    </div>
  );
};
