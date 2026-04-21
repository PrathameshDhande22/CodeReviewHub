import { JetBrains_Mono, Space_Grotesk, Inter } from "next/font/google";

//#region Font Declaration
const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });
//#endregion

const RankCard = async () => {
  return (
    <div className="rounded-xl border border-white/8 bg-[#1c2539] p-5 backdrop-blur-sm">
      {/* Rank Label */}
      <p
        className={`${jetbrains_mono.className} text-[10px] uppercase tracking-[0.2em] text-emerald-400 mb-3`}
      >
        Rank Designation
      </p>

      {/* XP Value */}
      {/* TODO: Fetch the Rank Reputation  */}
      <div className="flex items-baseline gap-2 mb-1">
        <span
          className={`${space_grotesk.className} text-5xl font-black text-slate-200 tracking-tight`}
        >
          12,480
        </span>
        <span
          className={`${space_grotesk.className} text-lg font-bold text-primary`}
        >
          XP
        </span>
      </div>

      {/* Rank Title */}
      {/* TODO: Assign the Title based on teh Rank */}
      <p
        className={`${inter.className} text-base font-semibold text-slate-300 mb-4`}
      >
        Digital Architect
      </p>

      {/* XP Progress Bar */}
      <div className="w-full h-1.5 bg-slate-700/60 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-linear-to-r from-emerald-400 to-primary rounded-full"
          style={{ width: "72%" }}
        />
      </div>

      {/* Progress Info */}
      <p className={`${inter.className} text-[11px] text-slate-400`}>
        Next: Principal (15k)
      </p>
    </div>
  );
};

export default RankCard;
