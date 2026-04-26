"use server";

import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
} from "shiki";

let highlighterInstance: Highlighter | null = null;
const loadedLangs = new Set<string>();

export async function highlightCode(
  code: string,
  lang: string
): Promise<string> {
  const shikiLang = lang as BundledLanguage;

  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ["houston"],
      langs: [shikiLang],
    });
    loadedLangs.add(lang);
  } else if (!loadedLangs.has(lang)) {
    await highlighterInstance.loadLanguage(shikiLang);
    loadedLangs.add(lang);
  }

  return highlighterInstance.codeToHtml(code, {
    lang: shikiLang,
    theme: "houston",
  });
}
