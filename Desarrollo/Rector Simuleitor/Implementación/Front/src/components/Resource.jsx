export const Resource = ({ resource }) => {
  return (
    <div className="relative py-[10px]">
      <img
        src={resource.icon}
        alt={resource.name}
        className="absolute h-[90px] w-[90px]"
        style={{
          clipPath: `inset(${100 - resource.state}% 0 0 0)`,
          transition: "clip-path 0.3s ease",
        }}
      />
      <img
        className="h-[90px] w-[90px]"
        src={resource.iconEmpty}
        alt={resource.name}
      />
    </div>
  );
};
