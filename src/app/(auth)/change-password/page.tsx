import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import { getOptionalServerSession } from "@/auth";
import { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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
  title: "Change Password",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};
//#endregion

export default async function ChangePassword() {
  const session = await getOptionalServerSession();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div
      className={`bg-hero ${space_grotesk.className} h-[85vh] w-full flex items-center justify-center`}
    >
      <div className="bg-[#141927] rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="mb-5">
          <h1 className="text-xl text-gray-200 font-semibold">
            Change Password
          </h1>
          <span
            className={`${inter.className} text-gray-300 font-light text-sm`}
          >
            Update your account password
          </span>
        </div>

        <ChangePasswordForm />
      </div>
    </div>
  );
}
