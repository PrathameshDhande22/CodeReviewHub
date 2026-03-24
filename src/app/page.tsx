"use server";

import { CodeSnippet, RegisterForm } from "@/components";
import { Space_Grotesk } from "next/font/google";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});
//#endregion

export default async function Home() {
  return (
    <div className={`${space_grotesk.className} bg-hero p-10 h-full`}>
      <div className="flex flex-col md:flex-row gap-10 h-full items-center justify-center">
        {/* Left Side - Website Details */}
        <div className="flex flex-col gap-10 flex-1">
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
              Join the elite ecosystem where code is treated as fine art.
              Elevate your review process with sophisticated logic and tonal
              precision.
            </h2>
          </div>
          {/* Command */}
          <div>
            <CodeSnippet />
          </div>
        </div>
        {/* Right Side - Register Form */}
        <div className="flex-1">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
