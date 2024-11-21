import un from "../assets/backgrounds/university-night.svg";

export const Loader = ({ error, message }) => {
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${un})` }}
    >
      <p className="text-3xl text-white">{error ? error : message}</p>
    </div>
  );
};
