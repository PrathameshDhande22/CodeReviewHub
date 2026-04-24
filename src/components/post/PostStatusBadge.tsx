"use client";

import { CodeStatus } from "@generated/prisma/client";
import { Inter } from "next/font/google";

//#region Font Declaration
const inter = Inter({ subsets: ["latin"] });
//#endregion

interface PostStatusBadgeProps {
  status: CodeStatus;
}

const PostStatusBadge = ({ status }: PostStatusBadgeProps) => {
  switch (status) {
    case "OPEN":
      return (
        <div
          className={`${inter.className} px-3 bg-[#213258] text-[0.6em] border-gray-500/90 text-primary border rounded-2xl font-semibold py-0.5`}
        >
          {status}
        </div>
      );
    case "ACCEPTED":
      return (
        <div
          className={`${inter.className} px-3 bg-[#07c7b2] text-[0.6em] border-gray-500/90 text-black border rounded-2xl font-bold py-0.5`}
        >
          {status}
        </div>
      );
    case "CLOSED":
      return (
        <div
          className={`${inter.className} px-3 bg-[#213258] text-[0.6em] border-gray-700/90 text-slate-400 border rounded-2xl font-bold py-0.5`}
        >
          {status}
        </div>
      );
  }
};

export default PostStatusBadge;
