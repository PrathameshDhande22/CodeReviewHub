import { canonicalUrl } from "@/lib/seo";
import {
  button,
  codePanel,
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

export type PasswordResetTemplateData = {
  name?: string | null;
  email: string;
  otp: string;
  expiresInMinutes: number;
};

export const passwordResetTemplate = ({
  name,
  email,
  otp,
  expiresInMinutes,
}: PasswordResetTemplateData): EmailTemplate => {
  const greeting = name ? `Hey ${escapeHtml(name)},` : "Hey there,";
  const resetUrl = canonicalUrl(
    `/reset-password?email=${encodeURIComponent(email)}`,
  );

  const content = `${heading("Reset your password")}
${paragraph(greeting)}
${paragraph(
  `We received a request to reset the password for the CodeReview Hub account linked to ${strong(escapeHtml(email))}. Use the code below to finish setting a new one.`,
)}
${codePanel(escapeHtml(otp), `Expires in ${expiresInMinutes} minutes`)}
${paragraph("Enter it on the reset page, or jump straight there:")}
${button("Reset my password", resetUrl)}
${noticeBox(
  `Didn't ask for this? You can safely ignore this email. Your password stays as it is until the code above is used. If you keep getting these, change your password from ${strong("Profile &rarr; Change Password")}.`,
)}
${divider()}
${paragraph(
  "Never share this code. CodeReview Hub reviewers, moderators and support will never ask you for it.",
  { muted: true, size: 13 },
)}`;

  const text = `Reset your password

${name ? `Hey ${name},` : "Hey there,"}

We received a request to reset the password for the CodeReview Hub account linked to ${email}.

Your reset code: ${otp}
It expires in ${expiresInMinutes} minutes.

Finish here: ${resetUrl}

Didn't ask for this? You can safely ignore this email. Your password stays as it is until the code above is used.

Never share this code. CodeReview Hub will never ask you for it.
${textFooter()}`;

  return {
    subject: `${otp} is your CodeReview Hub reset code`,
    html: renderEmailLayout({
      preheader: `Your reset code is ${otp}. It expires in ${expiresInMinutes} minutes.`,
      content,
      footerNote:
        "You received this email because a password reset was requested for this address.",
    }),
    text,
  };
};
