"use client";

import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={`${className} w-full p-3 mt-1 rounded-lg bg-[#1c2436] text-white focus:outline-none focus:ring-2 focus:ring-primary`}
      {...props}
    />
  );
};

export default Input;
