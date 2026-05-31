import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

//#region Font Declaration
const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"], weight: "400" });
//#endregion

interface StatItem {
  label: string;
  value: string;
}

type StatsGridProps = {
  reviewCount: number;
  language: string;
};

const StatsGrid = ({ reviewCount, language }: StatsGridProps) => {
  const stats: StatItem[] = [
    { label: "PRIMARY_LANG", value: language },
    { label: "REVIEWS_ADDED", value: reviewCount.toString() },
  ];
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
            <span
              className={`${space_grotesk.className} capitalize text-xl font-bold text-white`}
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
