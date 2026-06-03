"use server";

import BrowseFilters from "@/components/post/BrowseFilters";
import BrowsePosts from "@/components/post/BrowsePosts";
import { canonicalUrl, SITE_NAME_SHORT, TWITTER_HANDLE } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

//#region SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Browse Code Posts",
    description:
      "Explore all code review posts from the community. Filter by language, status, or sort by newest. Find code to review or get your own code reviewed.",
    alternates: {
      canonical: canonicalUrl("/browse"),
    },
    openGraph: {
      type: "website",
      url: canonicalUrl("/browse"),
      title: `Browse Code Posts | ${SITE_NAME_SHORT}`,
      description:
        "Explore all code review posts from the community. Filter by language, status, or sort by newest.",
      siteName: SITE_NAME_SHORT,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `Browse Code Posts | ${SITE_NAME_SHORT}`,
      description:
        "Explore all code review posts from the community. Filter by language, status, or sort by newest.",
      site: TWITTER_HANDLE,
    },
  };
}
// #endregion

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});
//#endregion

export default async function BrowsePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-3.5">
      <div className="flex flex-row flex-wrap justify-between items-center gap-1">
        <h1
          className={cn(
            space_grotesk.className,
            "text-xl font-bold text-slate-200 md:text-3xl tracking-tight",
          )}
        >
          Browse Code Posts
        </h1>
        <div className="mt-3">
          <BrowseFilters />
        </div>
      </div>
      <div>
        <BrowsePosts />
      </div>
    </div>
  );
}
