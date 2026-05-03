"use client";

import type { Token } from "@/lib/shiki";
import { cn } from "@/lib/utils";
import { JetBrains_Mono } from "next/font/google";
import { GoPlus } from "react-icons/go";

//#region Font Declaration
const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"], weight: "400" });
//#endregion

interface CodeLineProps {
  lineNumber: number;
  owner: boolean;
  tokens: Token[];
  isSelected: boolean;
  onLineMouseDown: (line: number) => void;
  onLineMouseEnter: (line: number) => void;
  onAddComment: (line: number) => void;
}

const CodeLine = ({
  lineNumber,
  tokens,
  isSelected,
  owner,
  onLineMouseDown,
  onLineMouseEnter,
  onAddComment,
}: CodeLineProps) => {
  return (
    <div
      className={`${jetbrains_mono.className} group flex items-stretch transition-colors ${
        isSelected
          ? "bg-primary/8 border-l-2 border-l-primary/60"
          : "hover:bg-[#1a2744]/60 border-l-2 border-l-transparent"
      }`}
    >
      {/* Line Number - click & drag on this to select lines */}
      <div
        className={cn(
          "w-13 shrink-0 flex items-center justify-end pr-2 select-none text-xs transition-colors",
          isSelected
            ? "text-primary/80 bg-primary/5"
            : "text-slate-600 group-hover:text-slate-400",
          !owner && "cursor-pointer",
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          onLineMouseDown(lineNumber);
        }}
        onMouseEnter={() => onLineMouseEnter(lineNumber)}
      >
        {lineNumber}
      </div>
      {!owner && (
        <div className="w-9 shrink-0 flex items-center justify-center">
          <button
            onClick={() => onAddComment(lineNumber)}
            className={cn(
              "text-primary/70 hover:text-primary hover:bg-primary/10 rounded p-0.5 transition-all cursor-pointer",
              isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
            title={`Add comment on line ${lineNumber}`}
          >
            <GoPlus className="text-sm" />
          </button>
        </div>
      )}

      {/* Code Content - syntax highlighted tokens */}
      <div className="flex-1 px-3 py-px whitespace-pre">
        <span className="text-sm leading-6">
          {tokens.length === 0
            ? "\n"
            : tokens.map((token, i) => (
                <span key={i} style={{ color: token.color }}>
                  {token.content}
                </span>
              ))}
        </span>
      </div>
    </div>
  );
};

export default CodeLine;
