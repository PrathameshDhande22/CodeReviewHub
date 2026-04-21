import Link from "next/link";
import { JetBrains_Mono, Space_Grotesk, Inter } from "next/font/google";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import PostShort from "../post/PostShort";

//#region Font Declaration
const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });
//#endregion

const tabs = [
  { label: "Added Posts", key: "posts" },
  { label: "Review History", key: "history" },
  { label: "Recent Comments", key: "comments" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const ProfileTabs = ({ activeTab }: { activeTab: TabKey }) => {
  return (
    <div>
      {/* Tab Headers */}
      <div className={`${inter.className} flex items-center gap-6 mb-6`}>
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={`/profile?tab=${tab.key}`}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              activeTab === tab.key
                ? "text-primary border-primary"
                : "text-slate-500 border-transparent hover:text-slate-300"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Posts List */}
      {activeTab === "posts" && (
        <div className="space-y-4">
          {/* TODO: Show the Recent Post of the User */}
        </div>
      )}

      {activeTab === "history" && (
        <div className="rounded-xl border border-white/8 bg-[#0d1424]/90 p-8 backdrop-blur-sm text-center">
          <p className={`${inter.className} text-slate-500 text-sm`}>
            No review history to display yet.
          </p>
        </div>
      )}

      {activeTab === "comments" && (
        <div className="rounded-xl border border-white/8 bg-[#0d1424]/90 p-8 backdrop-blur-sm text-center">
          <p className={`${inter.className} text-slate-500 text-sm`}>
            No recent comments to display yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileTabs;
