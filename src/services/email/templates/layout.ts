import { BASE_URL, SITE_NAME_SHORT, canonicalUrl } from "@/lib/seo";

export const brand = {
  page: "#020617",
  card: "#141927",
  panel: "#1c2436",
  border: "#232c40",
  primary: "#8ed5ff",
  primaryDark: "#38bdf8",
  heading: "#e2e8f0",
  body: "#94a3b8",
  muted: "#64748b",
  danger: "#f87171",
  warning: "#facc15",
} as const;

export const fonts = {
  heading: "'Space Grotesk', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  body: "'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, Consolas, monospace",
} as const;

export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

//#region Building Blocks
export const heading = (text: string): string => `
        <h1 style="margin:0 0 12px;font-family:${fonts.heading};font-size:24px;line-height:32px;font-weight:700;color:${brand.heading};">${text}</h1>`;

export const paragraph = (
  html: string,
  options: { muted?: boolean; size?: number } = {},
): string => {
  const color = options.muted ? brand.muted : brand.body;
  const size = options.size ?? 15;
  return `
        <p style="margin:0 0 16px;font-family:${fonts.body};font-size:${size}px;line-height:24px;color:${color};">${html}</p>`;
};

export const strong = (text: string): string =>
  `<span style="color:${brand.heading};font-weight:600;">${text}</span>`;

export const button = (label: string, href: string): string => `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px;">
          <tr>
            <td align="center" bgcolor="${brand.primaryDark}" style="border-radius:2px;">
              <a href="${href}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:${fonts.heading};font-size:15px;font-weight:700;color:#020617;text-decoration:none;border-radius:2px;">${label} &rarr;</a>
            </td>
          </tr>
        </table>`;

export const codePanel = (code: string, caption: string): string => `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 24px;">
          <tr>
            <td align="center" bgcolor="${brand.panel}" style="padding:28px 20px;border:1px solid ${brand.border};border-radius:12px;">
              <p style="margin:0 0 14px;font-family:${fonts.body};font-size:11px;letter-spacing:3px;color:${brand.muted};text-transform:uppercase;">Your reset code</p>
              <p class="crh-code" style="margin:0;font-family:${fonts.mono};font-size:34px;line-height:42px;font-weight:700;letter-spacing:10px;color:${brand.primary};">${code}</p>
              <p style="margin:14px 0 0;font-family:${fonts.body};font-size:12px;color:${brand.muted};">${caption}</p>
            </td>
          </tr>
        </table>`;

export const noticeBox = (
  html: string,
  tone: "warning" | "danger" | "info" = "warning",
): string => {
  const color =
    tone === "danger"
      ? brand.danger
      : tone === "info"
        ? brand.primary
        : brand.warning;
  return `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 24px;">
          <tr>
            <td style="padding:14px 16px;background-color:#151b2b;border-left:3px solid ${color};border-radius:4px;">
              <p style="margin:0;font-family:${fonts.body};font-size:13px;line-height:20px;color:${brand.body};">${html}</p>
            </td>
          </tr>
        </table>`;
};

export const detailRow = (label: string, value: string): string => `
          <tr>
            <td style="padding:6px 0;font-family:${fonts.body};font-size:13px;color:${brand.muted};width:110px;">${label}</td>
            <td style="padding:6px 0;font-family:${fonts.body};font-size:13px;color:${brand.heading};">${value}</td>
          </tr>`;

export const detailTable = (rows: string): string => `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 24px;padding:8px 16px;background-color:${brand.panel};border:1px solid ${brand.border};border-radius:8px;">
          ${rows}
        </table>`;

export const divider = (): string => `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td style="border-top:1px solid ${brand.border};font-size:0;line-height:0;">&nbsp;</td></tr>
        </table>`;
//#endregion

//#region Layout
type LayoutOptions = {
  preheader: string;
  content: string;
  footerNote?: string;
};

export const renderEmailLayout = ({
  preheader,
  content,
  footerNote,
}: LayoutOptions): string => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    <title>${SITE_NAME_SHORT}</title>
    <style>
      a { color: ${brand.primary}; }
      @media only screen and (max-width: 620px) {
        .crh-card { padding: 28px 22px !important; }
        .crh-code { font-size: 28px !important; letter-spacing: 6px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:${brand.page};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px;">${escapeHtml(preheader)}&nbsp;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${brand.page};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;">

            <tr>
              <td align="left" style="padding:0 4px 20px;">
                <a href="${canonicalUrl("/")}" target="_blank" style="text-decoration:none;">
                  <span style="font-family:${fonts.heading};font-size:20px;font-weight:700;color:${brand.primaryDark};">CodeReview Hub</span>
                </a>
                <span style="display:block;margin-top:2px;font-family:${fonts.heading};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${brand.muted};">The Digital Architect</span>
              </td>
            </tr>

            <tr>
              <td class="crh-card" bgcolor="${brand.card}" style="padding:36px 32px;border-radius:16px;border:1px solid ${brand.border};">
${content}
              </td>
            </tr>

            <tr>
              <td style="padding:24px 6px 0;">
                <p style="margin:0 0 8px;font-family:${fonts.body};font-size:12px;line-height:20px;color:${brand.muted};">
                  <a href="${canonicalUrl("/browse")}" target="_blank" style="color:${brand.muted};text-decoration:none;">Browse Posts</a>
                  &nbsp;&middot;&nbsp;
                  <a href="${canonicalUrl("/legal/terms-and-conditions")}" target="_blank" style="color:${brand.muted};text-decoration:none;">Terms of Service</a>
                  &nbsp;&middot;&nbsp;
                  <a href="${canonicalUrl("/legal/privacy-policy")}" target="_blank" style="color:${brand.muted};text-decoration:none;">Privacy Policy</a>
                </p>
                ${
                  footerNote
                    ? `<p style="margin:0 0 8px;font-family:${fonts.body};font-size:12px;line-height:20px;color:${brand.muted};">${footerNote}</p>`
                    : ""
                }
                <p style="margin:0;font-family:${fonts.body};font-size:12px;line-height:20px;color:#475569;">
                  &copy; ${new Date().getUTCFullYear()} ${SITE_NAME_SHORT}. Sent from ${BASE_URL.replace(/^https?:\/\//, "")} &mdash; this mailbox is not monitored.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

export const textFooter = (): string => `
--
${SITE_NAME_SHORT} - The Digital Architect
${canonicalUrl("/")}
Terms: ${canonicalUrl("/legal/terms-and-conditions")}
Privacy: ${canonicalUrl("/legal/privacy-policy")}`;
//#endregion

export type EmailTemplate = {
  subject: string;
  html: string;
  text: string;
};
