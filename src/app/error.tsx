"use client";

import { useEffect, useState } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { MdOutlineDashboard, MdRefresh } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import {
  VscDebugConsole,
  VscChevronDown,
  VscChevronUp,
  VscCopy,
} from "react-icons/vsc";
import Link from "next/link";

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

const isDev = process.env.NODE_ENV === "development";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showStack, setShowStack] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.error("[ErrorBoundary]", error);
  }, [error]);

  const copyErrorDetails = () => {
    const details = [
      `Error: ${error.message}`,
      error.digest ? `Digest: ${error.digest}` : "",
      `Stack Trace:\n${error.stack ?? "No stack trace available"}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    navigator.clipboard.writeText(details).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`w-full flex-1 flex flex-col items-center justify-center pt-20 pb-10 px-4 ${inter.className}`}
    >
      {/* Container */}
      <div className="flex flex-col items-center text-center max-w-4xl w-full mx-auto">
        {/* Error Code & Headings */}
        <div className="space-y-4 mb-8">
          <p
            className={`text-red-400 ${jetbrains_mono.className} tracking-tighter font-bold text-xs uppercase mb-4`}
          >
            Error: Runtime Exception
          </p>
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl font-bold leading-15 ${space_grotesk.className}`}
          >
            <span className="text-slate-200 tracking-tighter block mb-2 md:mb-4">
              Something Went
            </span>
            <span className="bg-linear-to-r from-red-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
              Wrong
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className={`text-slate-400 text-base sm:text-lg leading-relaxed max-w-184 mx-auto mb-7 ${inter.className}`}
        >
          {isDev
            ? "A runtime error occurred in the application. The debug information below should help you diagnose the issue."
            : "The Digital Architect encountered an unexpected fault in the execution pipeline. Our systems are aware and working on resolution."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
          <button
            onClick={reset}
            className="flex items-center gap-3 bg-linear-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 text-white px-7 py-3 rounded-md font-bold transition-all w-full sm:w-auto justify-center text-sm cursor-pointer"
          >
            <MdRefresh className="text-xl" />
            <span>Try Again</span>
          </button>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 bg-slate-800/40 hover:bg-slate-800/80 text-slate-200 border border-slate-700/50 px-7 py-3 rounded-md font-semibold transition-all w-full sm:w-auto justify-center text-sm"
          >
            <MdOutlineDashboard className="text-xl" />
            <span>Return to Dashboard</span>
          </Link>
        </div>

        {/* === Development-only Debug Panel === */}
        {isDev && (
          <div className="w-full max-w-3xl text-left mt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Debug Header */}
            <div className="flex items-center gap-2 mb-3">
              <VscDebugConsole className="text-red-400 text-lg" />
              <span
                className={`text-red-400 ${jetbrains_mono.className} text-xs uppercase tracking-widest font-bold`}
              >
                Debug Information
              </span>
              <span className="flex-1 h-px bg-slate-700/50" />
              <span className="text-[10px] text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/30">
                DEV ONLY
              </span>
            </div>

            {/* Error Card */}
            <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl overflow-hidden backdrop-blur-sm">
              {/* Error Message */}
              <div className="p-5 border-b border-slate-700/30">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1.5 font-medium">
                      Error Message
                    </p>
                    <p
                      className={`text-red-300 text-sm break-all ${jetbrains_mono.className}`}
                    >
                      {error.message || "Unknown error"}
                    </p>
                  </div>
                  <button
                    onClick={copyErrorDetails}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors text-xs shrink-0 mt-5 cursor-pointer"
                    title="Copy error details"
                  >
                    <VscCopy className="text-sm" />
                    <span className={jetbrains_mono.className}>
                      {copied ? "Copied!" : "Copy"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Error Name & Digest */}
              <div className="px-5 py-3.5 border-b border-slate-700/30 flex flex-wrap gap-x-8 gap-y-2">
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1 font-medium">
                    Error Type
                  </p>
                  <p
                    className={`text-orange-300/90 text-xs ${jetbrains_mono.className}`}
                  >
                    {error.name || "Error"}
                  </p>
                </div>
                {error.digest && (
                  <div>
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1 font-medium">
                      Digest
                    </p>
                    <p
                      className={`text-sky-300/80 text-xs ${jetbrains_mono.className}`}
                    >
                      {error.digest}
                    </p>
                  </div>
                )}
              </div>

              {/* Stack Trace */}
              <div>
                <button
                  onClick={() => setShowStack(!showStack)}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-800/30 transition-colors cursor-pointer"
                >
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">
                    Stack Trace
                  </span>
                  {showStack ? (
                    <VscChevronUp className="text-slate-500 text-sm" />
                  ) : (
                    <VscChevronDown className="text-slate-500 text-sm" />
                  )}
                </button>

                {showStack && (
                  <div className="px-5 pb-5">
                    <pre
                      className={`text-[12px] leading-5 text-slate-400 ${jetbrains_mono.className} overflow-x-auto whitespace-pre-wrap break-all bg-slate-950/50 rounded-lg p-4 border border-slate-800/50 max-h-80 overflow-y-auto`}
                    >
                      {error.stack ?? "No stack trace available."}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Hint */}
            <p className="text-[11px] text-slate-600 mt-3 text-center">
              This debug panel is only visible in development mode and will not
              appear in production builds.
            </p>
          </div>
        )}

        {/* Contact Link — shown only in production */}
        {!isDev && (
          <div className="flex justify-center mt-2">
            <Link
              href="/support"
              className="flex items-center gap-2 text-slate-400 hover:text-sky-300 tracking-[0.08em] text-sm transition-colors uppercase font-medium"
            >
              <RiCustomerService2Line className="text-lg" />
              <span>Contact System Support</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
