"use client";

type DividerProps = {
  className?: string;
  text: string;
};

const Divider = ({ className, text }: DividerProps) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <div className="bg-gray-800 h-px flex-1" />
      <span className={className}>{text}</span>
      <div className="bg-gray-800 h-px flex-1" />
    </div>
  );
};

export default Divider;
