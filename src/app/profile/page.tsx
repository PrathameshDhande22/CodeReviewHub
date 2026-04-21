"use server";

import ProfileHeader from "@/components/profile/ProfileHeader";
import RankCard from "@/components/profile/RankCard";
import StatsGrid from "@/components/profile/StatsGrid";
import ProfileTabs from "@/components/profile/ProfileTabs";
import RecentReviews from "@/components/profile/RecentReviews";
import RecentActivity from "@/components/profile/RecentActivity";
import { Metadata } from "next";
import { getOptionalServerSession } from "@/auth";
import { redirect } from "next/navigation";

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
  const user = getOptionalServerSession();
  if (!user) {
    redirect("/");
  }

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
        {/* Left Sidebar */}
        <aside className="space-y-4">
          <RankCard />
          <StatsGrid />
        </aside>

        {/* Right Content Area */}
        <div className="space-y-8">
          <ProfileTabs activeTab={activeTab} />
          {/* TODO: Remove these Recent Reviews and Recent Activity as they will be shown in the tab */}
          <RecentReviews />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
