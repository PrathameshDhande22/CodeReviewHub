import { canonicalUrl } from "@/lib/seo";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            allow: "/",
            userAgent: "*"
        },
        host: canonicalUrl("/"),
        sitemap: canonicalUrl("/sitemap.xml"),
    }
}