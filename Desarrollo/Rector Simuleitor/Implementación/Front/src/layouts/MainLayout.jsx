export const MainLayout = ({ children, background, color }) => {
  return (
    <div
      className="flex h-screen justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div
        className="h-full w-[35%]"
        style={{
          backgroundColor: color,
        }}
      >
        {children}
      </div>
    </div>
  );
};
