"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import Input from "@/components/UI/Input";
import { UseFormRegister } from "react-hook-form";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  register?: ReturnType<UseFormRegister<any>>;
  extra?: ReactNode;
  className?: string;
};

const FormField = ({
  label,
  htmlFor,
  inputProps,
  extra,
  className = "",
  register,
}: FormFieldProps) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-sm tracking-wider w-full">
        {label}
      </label>
      <div className="relative">
        <Input id={htmlFor} {...inputProps} {...register} />
        {extra}
      </div>
    </div>
  );
};

export default FormField;
