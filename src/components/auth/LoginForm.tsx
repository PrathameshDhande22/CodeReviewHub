"use client";

import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
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

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="">
      <div className="space-y-5">
        {/* Login Form */}
        <form
          action=""
          className={`${inter.className} text-gray-400 space-y-5`}
        >
          <FormField
            label="EMAIL"
            htmlFor="email"
            inputProps={{
              type: "email",
              name: "email",
              placeholder: "dev@codereview.hub",
            }}
          />

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

          <div>
            <button
              className={`${space_grotesk.className} text-black w-full py-4 rounded-xs bg-linear-to-r from-primary to-primary-dark space-x-3 font-bold`}
            >
              <span>Sign In</span>
              <FaArrowRight className="inline-block" size={15} />
            </button>
          </div>
        </form>

        {/* Divider */}
        <Divider
          className={`${jetbrains_mono.className} text-gray-400 text-sm font-light tracking-widest`}
          text="OR CONTINUE WITH"
        />

        {/* External Logins */}
        {/* TODO: GEt the Providers from the Auth.ts file when implementing the functionality  */}
        <div className="flex flex-row gap-3">
          <button className="bg-[#232d44] text-white px-6 py-4 w-full rounded-xl text-sm flex flex-row items-center justify-center gap-2">
            <FaGoogle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
