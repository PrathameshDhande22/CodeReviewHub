import { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { LuSearch } from "react-icons/lu";
import Link from "next/link";
import { RiCustomerService2Line } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";

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

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <div
      className={`w-full flex-1 flex flex-col items-center justify-center pt-20 pb-10 px-4 ${inter.className}`}
    >
      {/* Container */}
      <div className="flex flex-col items-center text-center max-w-4xl w-full mx-auto">
        {/* Error Code & Headings */}
        <div className="space-y-4 mb-8">
          <p
            className={`text-teal-400 ${jetbrains_mono.className} tracking-tighter font-bold text-xs uppercase mb-4`}
          >
            Error: Code 404
          </p>
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl font-bold leading-15  ${space_grotesk.className}`}
          >
            <span className="text-slate-200 tracking-tighter block mb-2 md:mb-4">
              Pointer Exception:
            </span>
            <span className="text-primary">Address Null</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className={`text-slate-400 text-base sm:text-lg  leading-relaxed max-w-184 mx-auto mb-7 ${inter.className}`}
        >
          The Digital Architect has encountered a codebase fragment that does
          not exist in the current production branch. The requested memory
          address returned a void state.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 bg-linear-to-r from-primary to-primary-dark text-slate-900 px-7 py-3 rounded-md font-bold transition-all w-full sm:w-auto justify-center text-sm"
          >
            <MdOutlineDashboard className="text-xl" />
            <span>Return to Dashboard</span>
          </Link>
          <Link
            href="/snippets"
            className="flex items-center gap-3 bg-slate-800/40 hover:bg-slate-800/80 text-slate-200 border border-slate-700/50 px-7 py-3 rounded-md font-semibold transition-all w-full sm:w-auto justify-center text-sm"
          >
            <LuSearch className="text-xl" />
            <span>Search Snippets</span>
          </Link>
        </div>

        {/* Contact Link */}
        <div className="flex justify-center mt-2">
          <Link
            href="/support"
            className="flex items-center gap-2 text-slate-400 hover:text-sky-300 tracking-[0.08em] text-sm transition-colors uppercase font-medium"
          >
            <RiCustomerService2Line className="text-lg" />
            <span>Contact System Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
