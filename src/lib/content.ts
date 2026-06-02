import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkFrontmatter from "remark-frontmatter";
import { LegalPage, LegalPageFrontmatter } from "@/types/legal";

const CONTENTS_DIR = path.join(process.cwd(), "src", "contents");

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkFrontmatter)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  return result.toString();
}

async function readContentFile(filename: string): Promise<LegalPage> {
  const fullPath = path.join(CONTENTS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf-8");

  const { data, content } = matter(raw);
  const frontmatter = data as LegalPageFrontmatter;

  const contentHtml = await markdownToHtml(content);

  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: String(frontmatter.date),
    published: frontmatter.published,
    author: frontmatter.author,
    contentHtml,
  };
}
export function getLegalSlugs(): { slug: string }[] {
  const files = fs
    .readdirSync(CONTENTS_DIR)
    .filter((file) => file.endsWith(".md"));

  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

export async function getLegalPageBySlug(
  slug: string
): Promise<LegalPage | null> {
  const filename = `${slug}.md`;
  const fullPath = path.join(CONTENTS_DIR, filename);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return readContentFile(filename);
}