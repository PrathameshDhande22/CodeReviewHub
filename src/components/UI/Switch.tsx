"use client";

type SwitchProps = {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
};

const Switch = ({
  id,
  checked,
  onCheckedChange,
  onBlur,
  disabled = false,
  className = "",
}: SwitchProps) => {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      onBlur={onBlur}
      className={`relative inline-flex h-4 w-8 items-center rounded-full border border-transparent transition-colors duration-200 ${
        checked ? "bg-[#3c4f7d]" : "bg-[#283349]"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"} ${className}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-[#bde9ff] shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-3.5" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default Switch;
