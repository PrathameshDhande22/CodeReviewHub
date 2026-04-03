import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { hash } from "bcryptjs";
import { registerSchema } from "@/schemas";
import status from "http-status";
import { RegisterResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = registerSchema.parse(body);

    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingEmail) {
      return NextResponse.json<RegisterResponse>(
        { error: "Email already in use", success: false },
        { status: status.CONFLICT },
      );
    }

    const existingUsername = data.username
      ? await prisma.user.findUnique({ where: { username: data.username } })
      : null;
    if (existingUsername) {
      return NextResponse.json<RegisterResponse>(
        { error: "Username already in use", success: false },
        { status: status.CONFLICT },
      );
    }

    const passwordHash = await hash(data.password, 12);

    await prisma.user.create({
      data: {
        name: data.fullname,
        username: data.username,
        email: data.email,
        password: passwordHash,
      },
    });

    return NextResponse.json<RegisterResponse>(
      { success: true },
      {
        status: status.OK,
      },
    );
  } catch (err: unknown) {
    console.log(err)
    if (err instanceof Error) {
      return NextResponse.json<RegisterResponse>(
        { error: "Internal Server Error", success: false },
        { status: status.INTERNAL_SERVER_ERROR },
      );
    }
    return NextResponse.json<RegisterResponse>(
      { error: "Unable to register", success: false },
      { status: status.INTERNAL_SERVER_ERROR },
    );
  }
}
