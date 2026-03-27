"use client";

import { JetBrains_Mono } from "next/font/google";
import { ReactNode } from "react";

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
});

interface CodeSnippetProps {
  children: ReactNode;
  title: string;
}

const CodeSnippet = ({ children, title }: CodeSnippetProps) => {
  return (
    <div className="bg-[#141a27] rounded-xl p-4 w-full max-w-md shadow-lg">
      {/* TOP bar */}
      <div className="flex items-center mb-3 gap-3">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-[#a36b6b]" />
          <span className="w-3 h-3 rounded-full bg-[#3f8f8b]" />
          <span className="w-3 h-3 rounded-full bg-[#5f7f99]" />
        </div>
        <div
          className={`${jetbrains_mono.className} text-[10px] uppercase  text-slate-400`}
        >
          {title}
        </div>
      </div>

      {/* Code content */}
      <code className="font-mono text-sm leading-relaxed">{children}</code>
    </div>
  );
};

export default CodeSnippet;
