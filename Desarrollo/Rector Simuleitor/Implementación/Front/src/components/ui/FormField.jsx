export const FormField = ({ label, type, id }) => {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <label
        htmlFor={id}
        className="w-36 text-right font-s text-2xl text-white"
      >
        {label}
      </label>
      <input
        type={type}
        className="my-4 h-[50px] w-[70%] rounded-[10px] border border-black p-4 px-2"
      />
    </div>
  );
};
