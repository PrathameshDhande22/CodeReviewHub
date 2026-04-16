import LoginForm from "@/components/auth/LoginForm";
import { getOptionalServerSession } from "@/auth";
import { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";

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
  const session = await getOptionalServerSession();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div
      className={`bg-hero ${space_grotesk.className} h-[85vh] w-full flex items-center justify-center`}
    >
      <div className="bg-[#141927] rounded-2xl shadow-xl w-full max-w-md p-8">
        <div>
          <h1 className="text-xl text-gray-200 font-semibold">Welcome back</h1>
          <span
            className={`${inter.className} text-gray-300 font-light text-sm`}
          >
            Access your professional workspace
          </span>
        </div>
        {/* Login Form */}
        <div className="mt-5 w-full">
          <LoginForm />
          {/* do not have account */}
          <div
            className={`${inter.className} mt-4 text-gray-400 text-sm text-center`}
          >
            <p className="space-x-1">
              <span>Don&apos;t have an account?</span>
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
