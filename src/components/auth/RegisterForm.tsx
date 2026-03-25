"use client";

import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";

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
    <div className={`${space_grotesk.className} h-full p-6`}>
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
        <div className="flex flex-row items-center gap-3">
          <div className="bg-gray-800 h-px flex-1" />
          <span
            className={`${jetbrains_mono.className} text-gray-400 text-sm font-light tracking-widest`}
          >
            OR USE CREDENTIALS
          </span>
          <div className="bg-gray-800 h-px flex-1" />
        </div>
        {/* Register Form */}
        <div>
          {/* TODO: Implement the Form afterwards */}
          <form
            action=""
            className={`${inter.className} text-gray-400 space-y-5`}
          >
            {/* full name */}
            <div>
              <label
                htmlFor="fullname"
                className="text-sm tracking-wider w-full"
              >
                FULL NAME
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="w-full p-3 mt-1 rounded-lg bg-[#1c2436] text-white focus:outline-none text-sm focus:ring-2 focus:ring-primary"
                placeholder="Linus Torvalds"
              />
            </div>
            {/* Username and Email */}
            <div className="flex flex-row gap-3">
              {/* Username */}
              <div className="w-full">
                <label
                  htmlFor="username"
                  className="text-sm tracking-wider w-full"
                >
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-3 mt-1 rounded-lg bg-[#1c2436] text-white focus:outline-none focus:ring-2 text-sm focus:ring-primary"
                  placeholder="architect_01"
                />
              </div>
              {/* Email */}
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="text-sm tracking-wider w-full"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 mt-1 rounded-lg bg-[#1c2436] text-white focus:outline-none text-sm focus:ring-2 focus:ring-primary"
                  placeholder="dev@hub.io"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm tracking-wider w-full"
              >
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full p-3 mt-1 rounded-lg bg-[#1c2436] text-white focus:outline-none text-sm focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <MdOutlineVisibilityOff size={20} />
                  ) : (
                    <MdOutlineVisibility size={20} />
                  )}
                </button>
              </div>
            </div>
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
        {/* terms and conditions */}
        <div className={`${inter.className} text-gray-500 text-xs text-center`}>
          <p className="space-x-1">
            <span>By signing up, you agree to the</span>
            <Link href={"/terms"} className="text-primary hover:underline">
              Terms of Service
            </Link>
            <span>and acknowledge our</span>
            <Link href={"/privacy"} className="text-primary hover:underline">
              Privacy Policy.
            </Link>
          </p>
        </div>
        {/* Already have Account */}
        <div className={`${inter.className} text-gray-400 text-sm text-center`}>
          <p className="space-x-1">
            <span>Already have an account?</span>
            <Link href={"/login"} className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
