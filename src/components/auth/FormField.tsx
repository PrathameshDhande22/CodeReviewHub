"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import Input from "@/components/UI/Input";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  extra?: ReactNode;
  className?: string;
};

const FormField = ({
  label,
  htmlFor,
  inputProps,
  extra,
  className = "",
}: FormFieldProps) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-sm tracking-wider w-full">
        {label}
      </label>
      <div className="relative">
        <Input id={htmlFor} {...inputProps} />
        {extra}
      </div>
    </div>
  );
};

export default FormField;
