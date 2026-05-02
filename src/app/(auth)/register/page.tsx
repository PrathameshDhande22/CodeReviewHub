import RegisterForm from "@/components/auth/RegisterForm";
import { getOptionalServerSession } from "@/auth";
import CodeSnippet from "@/components/CodeSnippet";
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

// TODO: Add the Metadata for the Register Page
export const metadata: Metadata = {
  title: "Register",
};

export default async function Register() {
  const session = await getOptionalServerSession();
  if (session?.user) {
    // TODO: Found the user redirect to the user dashboard
    redirect("/");
  }

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
          <CodeSnippet title={""}>
            <>
              <p>
                <span className="text-primary">git commit -m</span>{" "}
                <span className="text-gray-200">
                  &quot;feat: architect_onboarding&quot;
                </span>
              </p>

              <p className="text-gray-400 mt-2">
                Waiting for user authentication...
              </p>
            </>
          </CodeSnippet>
        </div>
      </div>
      {/* Right Side - Register Form */}
      <div className="md:w-1/2 w-full bg-[#111520] lg:py-20 lg:px-10 p-10">
        <RegisterForm />
        <div className="mt-5 space-y-3">
          {/* terms and conditions */}
          <div
            className={`${inter.className} text-gray-500 text-xs text-center`}
          >
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
          <div
            className={`${inter.className} text-gray-400 text-sm text-center`}
          >
            <p className="space-x-1">
              <span>Already have an account?</span>
              <Link href={"/login"} className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
