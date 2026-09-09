import { canonicalUrl } from "@/lib/seo";
import {
  brand,
  button,
  divider,
  escapeHtml,
  fonts,
  heading,
  paragraph,
  renderEmailLayout,
  strong,
  textFooter,
  type EmailTemplate,
} from "./layout";

export type WelcomeTemplateData = {
  name?: string | null;
  username?: string | null;
  email: string;
};

const steps: { title: string; description: string }[] = [
  {
    title: "Post your first snippet",
    description:
      "Paste code into the editor or upload a file, tag the language and topics, and open it for review.",
  },
  {
    title: "Review someone else's code",
    description:
      "Leave a markdown review or drag-select lines for GitHub-style inline comments.",
  },
  {
    title: "Build your reputation",
    description:
      "Every accepted review earns you points and moves you up the architect levels.",
  },
];

const stepList = (): string =>
  steps
    .map(
      (step, index) => `
          <tr>
            <td valign="top" width="34" style="padding:0 12px 18px 0;">
              <div style="width:26px;height:26px;line-height:26px;text-align:center;border-radius:50%;background-color:${brand.panel};border:1px solid ${brand.border};font-family:${fonts.mono};font-size:12px;font-weight:700;color:${brand.primary};">${index + 1}</div>
            </td>
            <td valign="top" style="padding:0 0 18px;">
              <p style="margin:0 0 4px;font-family:${fonts.heading};font-size:15px;font-weight:600;color:${brand.heading};">${step.title}</p>
              <p style="margin:0;font-family:${fonts.body};font-size:14px;line-height:21px;color:${brand.body};">${step.description}</p>
            </td>
          </tr>`,
    )
    .join("");

export const welcomeTemplate = ({
  name,
  username,
  email,
}: WelcomeTemplateData): EmailTemplate => {
  const displayName = name ?? username ?? email.split("@").at(0) ?? "developer";

  const content = `${heading("Welcome to CodeReview Hub")}
${paragraph(`Hey ${escapeHtml(displayName)},`)}
${paragraph(
  `Your account is ready. CodeReview Hub is where developers post code, get structured line-by-line feedback, and grow a reputation for writing clean code &mdash; think GitHub pull requests crossed with Stack Overflow.`,
)}
${
  username
    ? paragraph(
        `You are signed up as ${strong(`@${escapeHtml(username)}`)} with ${strong(escapeHtml(email))}.`,
      )
    : paragraph(`You are signed up with ${strong(escapeHtml(email))}.`)
}
${divider()}
        <p style="margin:24px 0 16px;font-family:${fonts.heading};font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${brand.muted};">Getting started</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
${stepList()}
        </table>
${button("Browse open posts", canonicalUrl("/browse"))}
${paragraph(
  `Start with your first review &mdash; the fastest way onto the leaderboard is helping someone else ship better code.`,
  { muted: true, size: 13 },
)}`;

  const text = `Welcome to CodeReview Hub

Hey ${displayName},

Your account is ready. CodeReview Hub is where developers post code, get structured line-by-line feedback, and grow a reputation for writing clean code.

You are signed up with ${email}${username ? ` as @${username}` : ""}.

Getting started
${steps.map((step, index) => `${index + 1}. ${step.title} - ${step.description}`).join("\n")}

Browse open posts: ${canonicalUrl("/browse")}
${textFooter()}`;

  return {
    subject: "Welcome to CodeReview Hub 👋",
    html: renderEmailLayout({
      preheader:
        "Your account is ready - post code, review snippets, and build your reputation.",
      content,
      footerNote:
        "You received this email because an account was created with this address.",
    }),
    text,
  };
};
