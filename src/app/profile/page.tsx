"use server";

import { getOptionalServerSession } from "@/auth";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import RankCard from "@/components/profile/RankCard";
import RecentActivity from "@/components/profile/RecentActivity";
import StatsGrid from "@/components/profile/StatsGrid";
import { Metadata } from "next";

const validTabs = ["posts", "history", "comments"] as const;
type Tab = (typeof validTabs)[number];

// TODO: Generate the Metadata based on the User Rank and Position
export async function generateMetadata(): Promise<Metadata> {
  const user = await getOptionalServerSession();
  return {
    title: `${user?.user.name} - Profile`,
  };
}

const UserProfile = async ({ searchParams }: PageProps<"/profile">) => {
  // Validate the Tabs
  const { tab } = await searchParams;
  const activeTab: Tab = validTabs.includes(tab as Tab)
    ? (tab as Tab)
    : "posts";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Profile Header */}
      <ProfileHeader />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Left Sidebar - Sticky on desktop */}
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <RankCard />
          <StatsGrid />
        </aside>

        {/* Right Content Area */}
        <div className="space-y-8">
          <ProfileTabs activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
