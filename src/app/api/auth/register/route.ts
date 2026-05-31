import { registerSchema } from "@/schemas";
import { RegisterServiceError, registerUser } from "@/services/auth.service";
import { RegisterResponse } from "@/types";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = registerSchema.parse(body);

    await registerUser(data);

    return NextResponse.json<RegisterResponse>(
      { success: true },
      { status: status.OK },
    );
  } catch (err: unknown) {
    console.error(err);

    if (err instanceof RegisterServiceError) {
      return NextResponse.json<RegisterResponse>(
        { error: err.message, success: false },
        { status: err.statusCode },
      );
    }

    return NextResponse.json<RegisterResponse>(
      { error: "Unable to register", success: false },
      { status: status.INTERNAL_SERVER_ERROR },
    );
  }
}
