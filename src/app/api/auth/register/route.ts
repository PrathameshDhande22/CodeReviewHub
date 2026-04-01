import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { hash } from "bcryptjs";
import { registerSchema } from "@/schemas";
import status from "http-status";
import { NextApiRequest } from "next";

export async function POST(request: NextApiRequest) {
  try {
    const body = await request.body;
    const data = registerSchema.parse(body);

    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: status.CONFLICT },
      );
    }

    const existingUsername = data.username
      ? await prisma.user.findUnique({ where: { username: data.username } })
      : null;
    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already in use" },
        { status: status.CONFLICT },
      );
    }

    const passwordHash = await hash(data.password, 12);

    await prisma.user.create({
      data: {
        name: data.fullname,
        username: data.username,
        emailVerified: Date.now().toString(),
        email: data.email,
        password: passwordHash,
      },
    });

    return NextResponse.json(
      { success: true },
      {
        status: status.OK,
      },
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        { error: err.message },
        { status: status.BAD_REQUEST },
      );
    }
    return NextResponse.json(
      { error: "Unable to register" },
      { status: status.INTERNAL_SERVER_ERROR },
    );
  }
}
