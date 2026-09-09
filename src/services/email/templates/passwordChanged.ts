import { canonicalUrl } from "@/lib/seo";
import {
  button,
  detailRow,
  detailTable,
  divider,
  escapeHtml,
  heading,
  noticeBox,
  paragraph,
  renderEmailLayout,
  strong,
  textFooter,
  type EmailTemplate,
} from "./layout";

export type PasswordChangedTemplateData = {
  name?: string | null;
  email: string;
  method: "reset" | "change";
  changedAt: Date;
};

const formatTimestamp = (date: Date): string =>
  `${date.toISOString().slice(0, 16).replace("T", " ")} UTC`;

export const passwordChangedTemplate = ({
  name,
  email,
  method,
  changedAt,
}: PasswordChangedTemplateData): EmailTemplate => {
  const greeting = name ? `Hey ${escapeHtml(name)},` : "Hey there,";
  const methodLabel =
    method === "reset"
      ? "Password reset with an emailed code"
      : "Changed from account settings";
  const timestamp = formatTimestamp(changedAt);

  const content = `${heading("Your password was changed")}
${paragraph(greeting)}
${paragraph(
  `The password for your CodeReview Hub account was updated. Here is what we recorded:`,
)}
${detailTable(
  `${detailRow("Account", escapeHtml(email))}
${detailRow("Method", methodLabel)}
${detailRow("When", timestamp)}`,
)}
${paragraph(
  `If this was you, nothing else to do &mdash; sign in with your new password and get back to reviewing.`,
)}
${button("Go to CodeReview Hub", canonicalUrl("/login"))}
${noticeBox(
  `${strong("Wasn't you?")} Reset your password right away and review the devices signed in to your account.`,
  "danger",
)}
${divider()}
${paragraph(
  `You can request a fresh reset code any time at ${canonicalUrl("/forgot-password")}.`,
  { muted: true, size: 13 },
)}`;

  const text = `Your password was changed

${name ? `Hey ${name},` : "Hey there,"}

The password for your CodeReview Hub account was updated.

Account: ${email}
Method:  ${methodLabel}
When:    ${timestamp}

If this was you, nothing else to do - sign in with your new password: ${canonicalUrl("/login")}

Wasn't you? Reset your password right away: ${canonicalUrl("/forgot-password")}
${textFooter()}`;

  return {
    subject: "Your CodeReview Hub password was changed",
    html: renderEmailLayout({
      preheader: `Password updated on ${timestamp}. If this wasn't you, secure your account now.`,
      content,
      footerNote:
        "This is a security notification and cannot be turned off while your account is active.",
    }),
    text,
  };
};
