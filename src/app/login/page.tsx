import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});
//#endregion

export const metadata: Metadata = {
  title: "Login",
};

export default async function Login() {
  return (
    <div className={`bg-hero ${space_grotesk.className} h-full w-full`}>
      <div className="bg-[#141927]">
        <div className="">
          <h1 className="text-xl text-gray-200 font-semibold">Welcome back</h1>
          <span
            className={`${inter.className} text-gray-300 font-light text-sm`}
          >
            Access your professional workspace
          </span>
        </div>
        {/* Login Form */}
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
