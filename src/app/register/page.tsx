"use server";

import RegisterForm from "@/components/auth/RegisterForm";
import CodeSnippet from "@/components/CodeSnippet";
import { Space_Grotesk } from "next/font/google";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});
//#endregion

export default async function Register() {
  return (
    <div className={`${space_grotesk.className} flex h-full`}>
      {/* Left Side - Website Details */}
      <div className="md:flex flex-col gap-10 w-1/2 bg-hero p-10 hidden justify-center">
        {/* Main Heading */}
        <div className="md:text-5xl text-3xl font-bold">
          <h1>
            <span className="text-white">The Digital</span>{" "}
            <span className="text-primary">Architect</span>
          </h1>
        </div>
        {/* Sub Heading */}
        <div>
          <h2 className="text-white font-light">
            Join the elite ecosystem where code is treated as fine art. Elevate
            your review process with sophisticated logic and tonal precision.
          </h2>
        </div>
        {/* Command */}
        <div>
          <CodeSnippet />
        </div>
      </div>
      {/* Right Side - Register Form */}
      <div className="md:w-1/2 w-full bg-[#111520] lg:py-20 lg:px-10">
        <RegisterForm />
      </div>
    </div>
  );
}
