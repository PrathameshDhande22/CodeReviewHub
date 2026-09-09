import "dotenv/config";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

export class EmailServiceError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "EmailServiceError";
  }
}

export type MailerConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  fromName: string;
  fromAddress: string;
  replyTo?: string;
};

export const getMailerConfig = (): MailerConfig => ({
  host: String(process.env.SMTP_HOST),
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  user: String(process.env.SMTP_USER),
  password: String(process.env.SMTP_PASSWORD),
  fromName: String(process.env.EMAIL_FROM_NAME),
  fromAddress: String(process.env.EMAIL_FROM_ADDRESS),
  replyTo: process.env.EMAIL_REPLY_TO || undefined,
});


const globalForMailer = globalThis as unknown as {
  mailTransporter?: Transporter;
};

export const getTransporter = (): Transporter => {
  if (globalForMailer.mailTransporter) {
    return globalForMailer.mailTransporter;
  }

  const config = getMailerConfig();

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.password,
    },
    pool: true,
    maxConnections: 3,
    maxMessages: 50,
  });

  globalForMailer.mailTransporter = transporter;
  return transporter;
};

export const verifyTransporter = async (): Promise<boolean> => {
  return await getTransporter().verify();
};
