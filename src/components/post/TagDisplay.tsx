"use client";

import { Inter } from "next/font/google";

interface TagDisplayProps {
  tag: string[];
}

//#region Font Declaration
const inter = Inter({ subsets: ["latin"] });
//#endregion

const TagDisplay = ({ tag }: TagDisplayProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-2 mt-3 text-xs">
      {/* TODO: Make the tag as clickable link and navigate to browse page according to that tag */}
      {tag.map((value, index) => {
        return (
          <span
            key={index}
            className={`${inter.className} bg-[#363e51] text-slate-300 px-3 py-1`}
          >
            #{value}
          </span>
        );
      })}
    </div>
  );
};

export default TagDisplay;
