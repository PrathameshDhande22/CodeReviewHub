"use client";

import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import { FaGoogle } from "react-icons/fa";

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
  return (
    <div className={`${space_grotesk.className} bg-[#141a27] h-full p-4`}>
      <div className="flex flex-col gap-5">
        {/* Register title */}
        <div className="space-y-3">
          <h2 className="text-white font-bold text-2xl">Create Your Account</h2>
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
          <form action=""></form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
