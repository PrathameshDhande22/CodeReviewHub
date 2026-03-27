"use client";

import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import FormField from "@/components/auth/FormField";
import Divider from "../Divider";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
});
//#endregion

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className={`${space_grotesk.className}`}>
      <div className="flex flex-col gap-5">
        {/* Register title */}
        <div className="space-y-3">
          <h2 className="text-gray-300 font-bold text-2xl">
            Create Your Account
          </h2>
          <h4 className={`${inter.className} text-gray-300 text-md font-light`}>
            Start Architecting better Software Today.
          </h4>
        </div>
        {/* External Logins */}
        <div className="flex flex-row gap-3">
          {/* TODO: GEt the Providers from the Auth.ts file when implementing the functionality  */}
          <button className="bg-[#232d44] text-white px-6 py-4 w-full rounded-xl text-sm flex flex-row items-center justify-center gap-2">
            <FaGoogle size={20} />
          </button>
        </div>
        {/* Divider */}
        <Divider
          text="OR USE CREDENTIALS"
          className={`${jetbrains_mono.className} text-gray-400 text-sm font-light tracking-widest`}
        />
        {/* Register Form */}
        <div>
          {/* TODO: Implement the Form afterwards */}
          <form
            action=""
            className={`${inter.className} text-gray-400 space-y-5`}
          >
            {/* full name */}
            <FormField
              label="FULL NAME"
              htmlFor="fullname"
              inputProps={{
                type: "text",
                name: "fullname",
                placeholder: "Linus Torvalds",
              }}
            />
            {/* Username and Email */}
            <div className="flex flex-row gap-3">
              {/* Username */}
              <div className="w-full">
                <FormField
                  label="USERNAME"
                  htmlFor="username"
                  inputProps={{
                    type: "text",
                    name: "username",
                    placeholder: "architect_01",
                  }}
                />
              </div>
              {/* Email */}
              <div className="w-full">
                <FormField
                  label="EMAIL"
                  htmlFor="email"
                  inputProps={{
                    type: "email",
                    name: "email",
                    placeholder: "dev@hub.io",
                  }}
                />
              </div>
            </div>
            {/* Password */}
            <FormField
              label="PASSWORD"
              htmlFor="password"
              inputProps={{
                type: showPassword ? "text" : "password",
                name: "password",
                placeholder: "••••••••",
              }}
              extra={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <MdOutlineVisibilityOff size={20} />
                  ) : (
                    <MdOutlineVisibility size={20} />
                  )}
                </button>
              }
            />
            {/* Create Button */}
            <div>
              <button
                className={`${space_grotesk.className} text-black w-full py-4 rounded-xs bg-linear-to-r from-primary to-primary-dark space-x-3 font-bold`}
              >
                <span>Create Account</span>
                <FaArrowRight className="inline-block" size={15} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
