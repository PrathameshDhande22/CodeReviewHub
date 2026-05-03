"use client";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});
//#endregion

const YearComponent = () => {
  return <span suppressHydrationWarning>{new Date().getUTCFullYear()}</span>;
};

const Footer = () => {
  return (
    <footer
      className={`${space_grotesk.className} dark:bg-neutral flex flex-row flex-wrap justify-between gap-2 p-4 items-center`}
    >
      {/* Logo */}
      <div>
        <Link href={"/"} className="flex flex-row gap-2">
          <span className="text-sky-400 font-bold block self-center">
            CodeReview Hub
          </span>
        </Link>
        <div className="uppercase font-semibold text-neutral-500 md:text-sm text-xs">
          @{" "}
          <Suspense fallback={<span>...</span>}>
            <YearComponent />
          </Suspense>{" "}
          The Code Review Hub. The Digital Architect
        </div>
      </div>
      {/* Footer Nav Links */}
      <div className="font-semibold text-sm text-neutral-500">
        <ul className="flex flex-row items-center gap-3">
          <li>
            <Link href={"/terms"}>
              <span>TERMS OF SERVICE</span>
            </Link>
          </li>
          <li>
            <Link href={"/privacy"}>
              <span>PRIVACY POLICY</span>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;
