import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPageBySlug, getLegalSlugs } from "@/lib/content";
import { BASE_URL, SITE_NAME_SHORT, TWITTER_HANDLE } from "@/lib/seo";

export function generateStaticParams() {
  return getLegalSlugs();
}

//#region SEO Metadata
export async function generateMetadata({
  params,
}: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) {
    return { title: "Page Not Found" };
  }

  const canonicalUrl = `${BASE_URL}/legal/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: `${page.title} | ${SITE_NAME_SHORT}`,
      description: page.description,
      siteName: SITE_NAME_SHORT,
      locale: "en_US",
      publishedTime: page.date,
      authors: page.author ? [page.author] : undefined,
    },
    twitter: {
      card: "summary",
      title: `${page.title} | ${SITE_NAME_SHORT}`,
      description: page.description,
      site: TWITTER_HANDLE,
    },
  };
}
// #endregion

export default async function LegalPage({
  params,
}: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(page.date));

  return (
    <main className="min-h-screen px-6 py-12 pb-20 sm:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Page title block */}
        <div className="mb-3">
          <h1 className="mb-3 bg-linear-to-br from-primary to-primary-dark bg-clip-text text-3xl font-bold leading-tight tracking-tight text-transparent sm:text-4xl">
            {page.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <time dateTime={page.date}>Last updated: {formattedDate}</time>
            {page.author && <span>By {page.author}</span>}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-2 border-t border-slate-800/60" />

        {/* Rendered markdown — styled via .legal-prose in globals.css */}
        <article
          className="legal-prose"
          dangerouslySetInnerHTML={{ __html: page.contentHtml }}
        />
      </div>
    </main>
  );
}
