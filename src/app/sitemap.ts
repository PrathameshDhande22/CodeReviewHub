import { getPosts } from "@/db/postcode.repo";
import { BASE_URL } from "@/lib/seo";
import { cacheLife } from "next/cache";
import { MetadataRoute } from "next";
import { connection } from "next/server";

async function getSitemapPosts() {
    "use cache";
    cacheLife("hours");
    return await getPosts(0, Number.MAX_SAFE_INTEGER);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    await connection();
    const posts = await getSitemapPosts();

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
            url: `${BASE_URL}/legal/terms-and-conditions`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/legal/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.3,
        },
        ...postSiteMaps,
    ];
}
