import { getOptionalServerSession } from "@/auth";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter, Space_Grotesk } from "next/font/google";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Initiate New Review",
};

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});
//#endregion

//#region Dynamic Import
const PostForm = dynamic(() => import("@/components/post/PostForm"));
//#endregion

export default async function CreatePost() {
  const session = await getOptionalServerSession();
  if (session == null || session.user == null) {
    redirect("/login");
  }

  return (
    <div className="md:py-14 py-5 md:px-14 px-5 bg-[#0a1429] h-full w-full">
      <div className="space-y-2">
        <h1
          className={`md:text-4xl text-2xl text-slate-200 font-bold ${space_grotesk.className}`}
        >
          Architect New Review
        </h1>
        <h6
          className={`text-slate-400 tracking-wider text-sm ${inter.className}`}
        >
          Initialize a protocol for collaborative review
        </h6>
      </div>
      <div>
        <PostForm />
      </div>
    </div>
  );
}
