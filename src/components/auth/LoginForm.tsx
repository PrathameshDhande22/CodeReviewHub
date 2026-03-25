"use client";

import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

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

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div>
      <form action="" className={`${inter.className} text-gray-400 space-y-5`}>
        {/* Email */}
        <div>
          <label htmlFor="email" className="text-sm tracking-wider w-full">
            EMAIL
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 mt-1 rounded-lg bg-[#1c2436] text-white focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="dev@codereview.hub"
          />
        </div>
        {/* Password */}
        <div>
          <label htmlFor="password" className="text-sm tracking-wider w-full">
            PASSWORD
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full p-3 mt-1 rounded-lg bg-[#1c2436] text-white focus:outline-none focus:ring-2 focus:ring-primary"
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
        {/* SignIn Button */}
        <div>
          <button
            className={`${space_grotesk.className} text-black w-full py-4 rounded-xs bg-linear-to-r from-primary to-primary-dark space-x-3 font-bold`}
          >
            <span>Sign In</span>
            <FaArrowRight className="inline-block" size={15} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
