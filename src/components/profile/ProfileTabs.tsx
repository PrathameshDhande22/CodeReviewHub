import Link from "next/link";
import { JetBrains_Mono, Space_Grotesk, Inter } from "next/font/google";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import PostShort from "../post/PostShort";
import RecentPost from "../post/RecentPost";

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
      <div className={`${inter.className} flex items-center gap-6 mb-6 sticky top-0 z-10 bg-[#0a101e] py-3 -mt-3`}>
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={{
              pathname: "/profile",
              query: {
                tab: tab.key,
              },
            }}
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
          <RecentPost />
        </div>
      )}

      {/* TODO: Show the History like which review he had added */}
      {activeTab === "history" && (
        <div className="rounded-xl border border-white/8 bg-[#0d1424]/90 p-8 backdrop-blur-sm text-center">
          <p className={`${inter.className} text-slate-500 text-sm`}>
            No review history to display yet.
          </p>
        </div>
      )}

      {/* TODO: Show the recent comments he added */}
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
