import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * Crawling stays allowed even while the site is not indexable: crawlers must
 * read the page to see its noindex meta (decision D7). The sitemap is only
 * advertised when indexing is on.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    ...(env.indexable && { sitemap: `${env.siteUrl}/sitemap.xml` }),
  };
}
