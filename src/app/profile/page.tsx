"use server";

import { getOptionalServerSession } from "@/auth";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import RankCard from "@/components/profile/RankCard";
import StatsGrid from "@/components/profile/StatsGrid";
import { canonicalUrl, SITE_NAME_SHORT, TWITTER_HANDLE } from "@/lib/seo";
import { getUserDashboardData } from "@/services/userprofile.service";
import { Metadata } from "next";

const validTabs = ["posts", "history", "comments"] as const;
type Tab = (typeof validTabs)[number];

//#region SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const user = await getOptionalServerSession();
  const name = user?.user.name ?? "Your";

  return {
    title: `${name} - Profile`,
    description: `View ${name}'s code review profile on ${SITE_NAME_SHORT}. See their posts, review history, reputation score, and earned badges.`,
    alternates: {
      canonical: canonicalUrl("/profile"),
    },
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    openGraph: {
      type: "profile",
      url: canonicalUrl("/profile"),
      title: `${name} - Profile | ${SITE_NAME_SHORT}`,
      description: `View ${name}'s code review profile, posts, and reputation on ${SITE_NAME_SHORT}.`,
      siteName: SITE_NAME_SHORT,
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: `${name} - Profile | ${SITE_NAME_SHORT}`,
      description: `${name}'s developer profile on ${SITE_NAME_SHORT}.`,
      site: TWITTER_HANDLE,
    },
  };
}
// #endregion

const UserProfile = async ({ searchParams }: PageProps<"/profile">) => {
  const user = await getOptionalServerSession();

  const userDashboarddata = await getUserDashboardData(user?.user.id!);

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
          <RankCard
            ranktitle={userDashboarddata.reputation.levelname}
            score={userDashboarddata.reputation.score}
            nextScore={userDashboarddata.nextReputation.score}
            nextRankTitle={userDashboarddata.nextReputation.levelname}
          />
          <StatsGrid
            reviewCount={userDashboarddata.userStats.reviewAdded}
            language={userDashboarddata.userStats.primaryLanguage}
          />
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
