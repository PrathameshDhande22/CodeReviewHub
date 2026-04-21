import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

//#region Font Declaration
const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"], weight: "400" });
//#endregion

interface StatItem {
  label: string;
  value: string;
  indicator?: string;
}

// TODO: Fetch the Stat Item from the DB
const stats: StatItem[] = [
  { label: "PRIMARY_LANG", value: "Rust", indicator: "rust" },
  { label: "REVIEWS_DONE", value: "428" },
  { label: "STREAK_DAYS", value: "12" },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl bg-[#19233a] p-4 backdrop-blur-sm"
        >
          <p
            className={`${jetbrains_mono.className} text-[9px] uppercase tracking-[0.15em] text-slate-400 mb-2`}
          >
            {stat.label}
          </p>
          <div className="flex items-center gap-2">
            {stat.indicator === "rust" && (
              <span className="w-2 h-2 rounded-full bg-orange-400" />
            )}
            <span
              className={`${space_grotesk.className} text-xl font-bold text-white`}
            >
              {stat.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
