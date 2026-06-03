import { getPosts } from "@/db/postcode.repo";
import { MetadataRoute } from "next";

const BASE_URL = "https://codereviewhub.prathameshd.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts(0, Number.MAX_SAFE_INTEGER);

    const postSiteMaps: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${BASE_URL}/post/${post.id}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/browse`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/legal/terms`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/legal/privacy`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.3,
        },
        ...postSiteMaps,
    ];
}