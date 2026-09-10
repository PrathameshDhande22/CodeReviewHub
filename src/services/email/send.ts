import { EmailServiceError, getMailerConfig, getTransporter } from "./client";
import {
  passwordChangedTemplate,
  passwordResetTemplate,
  welcomeTemplate,
  type EmailTemplate,
  type PasswordChangedTemplateData,
  type PasswordResetTemplateData,
  type WelcomeTemplateData,
} from "./templates";

type SendMailArgs = {
  to: string;
  template: EmailTemplate;
};

export const sendMail = async ({
  to,
  template,
}: SendMailArgs): Promise<void> => {
  const config = getMailerConfig();

  try {
    await getTransporter().sendMail({
      from: { name: config.fromName, address: config.fromAddress },
      replyTo: config.replyTo,
      to,
      subject: template.subject,
      text: template.text,
      html: template.html,
    });
  } catch (error) {
    console.error("[email] failed to send", template.subject, error);
    throw new EmailServiceError(
      "We could not send the email right now. Please try again in a moment.",
      502,
    );
  }
};

export const sendMailQuietly = async (args: SendMailArgs): Promise<void> => {
  try {
    await sendMail(args);
  } catch {}
};

//#region Transactional Emails
export const sendPasswordResetEmail = async (
  to: string,
  data: PasswordResetTemplateData,
): Promise<void> => {
  await sendMail({ to, template: passwordResetTemplate(data) });
};

export const sendPasswordChangedEmail = async (
  to: string,
  data: PasswordChangedTemplateData,
): Promise<void> => {
  await sendMailQuietly({ to, template: passwordChangedTemplate(data) });
};

export const sendWelcomeEmail = async (
  to: string,
  data: WelcomeTemplateData,
): Promise<void> => {
  await sendMailQuietly({ to, template: welcomeTemplate(data) });
};
//#endregion
