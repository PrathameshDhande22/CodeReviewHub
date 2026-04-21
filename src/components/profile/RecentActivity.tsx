"use client";

import { Space_Grotesk, Inter } from "next/font/google";
import { BsFileText } from "react-icons/bs";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const RecentActivity = () => {
  return (
    <div>
      {/* Section Header */}
      <h2
        className={`${space_grotesk.className} text-xl font-bold text-primary mb-4`}
      >
        Recent Activity
      </h2>

      {/* Activity Card */}
      <div className="rounded-xl border border-white/8 bg-[#0d1424]/90 p-5 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <BsFileText className="text-primary text-lg mt-0.5 shrink-0" />
          <div className={inter.className}>
            <p className="text-sm font-semibold text-white mb-2">
              On Distributed Hash Tables in Go
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mb-3">
              &quot;The implementation of the Kademlia routing table could be
              further optimized if you use a fixed-size bitset for the bucket
              flags. Check out the recent changes in the P2P core for
              reference.&quot;
            </p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold">
              4 Hours Ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
