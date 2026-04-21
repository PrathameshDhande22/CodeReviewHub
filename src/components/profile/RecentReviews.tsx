"use client";

import { JetBrains_Mono, Space_Grotesk, Inter } from "next/font/google";
import { FiCode } from "react-icons/fi";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

const RecentReviews = () => {
  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`${space_grotesk.className} text-xl font-bold text-primary`}
        >
          Recent Reviews
        </h2>
        <button
          className={`${inter.className} text-sm font-semibold text-primary hover:text-primary-dark transition-colors`}
        >
          VIEW ALL
        </button>
      </div>

      {/* Review Card */}
      <div className="rounded-xl border border-white/8 bg-[#0d1424]/90 p-5 backdrop-blur-sm">
        {/* File Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiCode className="text-primary text-sm" />
            <span
              className={`${jetbrains_mono.className} text-sm text-slate-300`}
            >
              src/core/scheduler.rs
            </span>
          </div>
          <span
            className={`${jetbrains_mono.className} text-xs text-emerald-400`}
          >
            Review Status: Approved
          </span>
        </div>

        {/* Code Block */}
        <div
          className={`${jetbrains_mono.className} rounded-lg bg-[#080d18] p-4 text-[12px] leading-6 overflow-x-auto mb-4`}
        >
          <div className="flex">
            <span className="text-slate-600 select-none w-8 text-right mr-4 shrink-0">
              124
            </span>
            <span>
              <span className="text-purple-400">pub async fn</span>{" "}
              <span className="text-blue-300">process_queue</span>
              <span className="text-slate-300">
                (&amp;mut self) → Result&lt;(), Error&gt; {"{"}
              </span>
            </span>
          </div>
          <div className="flex bg-emerald-500/8 border-l-2 border-emerald-400">
            <span className="text-slate-600 select-none w-8 text-right mr-4 shrink-0 pl-1">
              125
            </span>
            <span className="text-emerald-300">
              + let tasks: Vec&lt;Task&gt; =
              self.drain_active_buffer().await?;
            </span>
          </div>
          <div className="flex bg-emerald-500/8 border-l-2 border-emerald-400">
            <span className="text-slate-600 select-none w-8 text-right mr-4 shrink-0 pl-1">
              126
            </span>
            <span className="text-emerald-300">
              + self.executor.spawn_batch(tasks).map_err(Into::into)
            </span>
          </div>
          <div className="flex">
            <span className="text-slate-600 select-none w-8 text-right mr-4 shrink-0">
              127
            </span>
            <span className="text-slate-300">{"}"}</span>
          </div>
        </div>

        {/* Reviewer Comment */}
        <div className={`${inter.className}`}>
          <p className="text-sm text-slate-300 leading-relaxed">
            <span className="font-bold text-white">Reviewer Comment:</span>{" "}
            Logic looks solid. The batch spawning significantly reduces the
            overhead on the primary event loop. Recommended for immediate merge.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentReviews;
