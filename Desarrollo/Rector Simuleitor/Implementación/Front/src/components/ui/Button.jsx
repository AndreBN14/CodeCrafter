import { Link } from "react-router-dom";

export const Button = ({ children, width, to }) => {
  const widthClass = width === "half" ? "50%" : "100%";

  return (
    <Link
      to={to}
      className="my-2 flex cursor-pointer items-center justify-center rounded-md border-none bg-[#d77b74] p-4 text-center font-p text-3xl text-white transition-colors duration-300 hover:bg-[#b95f5b] sm:text-3xl"
      style={{ width: widthClass }}
    >
      {children}
    </Link>
  );
};
