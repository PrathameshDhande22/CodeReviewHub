"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import RecentPost from "../post/RecentPost";
import RecentReviews from "./RecentReviews";
import RecentComments from "./RecentComments";

//#region Font Declaration
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
      <div
        className={`${inter.className} flex items-center gap-6 sticky top-1 z-10 bg-[#0a101e] py-3 -mt-3`}
      >
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

      {/* Review History */}
      {activeTab === "history" && <RecentReviews />}

      {/* Recent Comments */}
      {activeTab === "comments" && <RecentComments />}
    </div>
  );
};

export default ProfileTabs;
