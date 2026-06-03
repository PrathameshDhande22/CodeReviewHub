import { getOptionalServerSession } from "@/auth";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
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

//#region SEO Metadata
export const metadata: Metadata = {
  title: "Reset Password",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};
//#endregion

export default async function ResetPassword({
  searchParams,
}: PageProps<"/reset-password">) {
  const session = await getOptionalServerSession();
  if (session?.user) {
    redirect("/");
  }

  const { email } = await searchParams;
  const prefillEmail = Array.isArray(email) ? email[0] : email;

  return (
    <div
      className={`bg-hero ${space_grotesk.className} h-[85vh] w-full flex items-center justify-center`}
    >
      <div className="bg-[#141927] rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="mb-5">
          <h1 className="text-xl text-gray-200 font-semibold">
            Reset Password
          </h1>
          <span
            className={`${inter.className} text-gray-300 font-light text-sm`}
          >
            Enter your reset code and choose a new password
          </span>
        </div>

        <ResetPasswordForm prefillEmail={prefillEmail} />

        <div
          className={`${inter.className} mt-4 text-gray-400 text-sm text-center`}
        >
          <p className="space-x-1">
            <span>Need a new code?</span>
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Request again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
