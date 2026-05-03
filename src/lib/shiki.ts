"use server";

import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
} from "shiki";

let highlighter: Highlighter | null = null;
const loadedLangs = new Set<string>();

async function getHighlighter(lang: string) {
  const shikiLang = lang as BundledLanguage;

  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["houston"],
      langs: [shikiLang],
    });
    loadedLangs.add(lang);
  } else if (!loadedLangs.has(lang)) {
    await highlighter.loadLanguage(shikiLang);
    loadedLangs.add(lang);
  }

  return highlighter;
}

export async function highlightCode(code: string, lang: string) {
  const h = await getHighlighter(lang);

  return h.codeToHtml(code, {
    lang: lang as BundledLanguage,
    theme: "houston",
  });
}

export type Token = {
  content: string;
  color: string;
};

export async function highlightCodeByLine(
  code: string,
  lang: string
): Promise<Token[][]> {
  const h = await getHighlighter(lang);

  const result = h.codeToTokens(code, {
    lang: lang as BundledLanguage,
    theme: "houston",
  });

  return result.tokens.map((line) =>
    line.map((token) => ({
      content: token.content,
      color: token.color ?? "#e1e4e8",
    }))
  );
}
