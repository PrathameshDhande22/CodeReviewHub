import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import type { User as PrismaUser } from "@generated/prisma/client";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.BETTER_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    newUser: "/",
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "CodeReviewLogin",
      name: "CodeReview",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "dev@codereview.hub",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "••••••••",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        type AuthUser = PrismaUser & { password?: string; username?: string };
        const user = (await prisma.user.findUnique({
          where: { email: credentials.email },
        })) as AuthUser | null;

        if (!user || !user.password) {
          return null;
        }

        const valid = await compare(credentials.password, user.password);
        if (!valid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name ?? user.username,
          email: user.email,
          image: user.image,
        };
      },
    }),
    GoogleProvider({
      clientId: String(process.env.AUTH_GOOGLE_ID),
      clientSecret: String(process.env.AUTH_GOOGLE_SECRET),
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
      }

      return session;
    },
  },

  debug: true,
};

const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;

export const getOptionalServerSession = async () => {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    if (error instanceof Error && error.name === "JWEDecryptionFailed") {
      return null;
    }

    throw error;
  }
};
