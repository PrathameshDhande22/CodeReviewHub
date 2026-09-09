export const BASE_URL = process.env.BASE_URL;
export const SITE_NAME = "CodeReview Hub - The Digital Architect";
export const SITE_NAME_SHORT = "CodeReview Hub";
export const TWITTER_HANDLE = "@CodeReviewHub";

export function canonicalUrl(path: string = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${normalized}`;
}
