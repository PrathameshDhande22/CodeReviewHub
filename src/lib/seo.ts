export const BASE_URL = "https://codereviewhub.prathameshd.com";
export const SITE_NAME = "CodeReview Hub - The Digital Architect";
export const SITE_NAME_SHORT = "CodeReview Hub";
export const TWITTER_HANDLE = "@CodeReviewHub";

/** Build a canonical URL for a given path (no trailing slash). */
export function canonicalUrl(path: string = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${normalized}`;
}
