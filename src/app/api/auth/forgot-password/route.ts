import {
  PasswordServiceError,
  requestPasswordReset,
} from "@/services/password.service";
import { APIResponse } from "@/types";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { forgotPasswordSchema } from "@/schemas/password";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    await requestPasswordReset(email);

    return NextResponse.json<APIResponse>(
      {
        status: "success",
        message: "Reset code sent to your email",
      },
      { status: status.OK },
    );
  } catch (error) {
    if (error instanceof PasswordServiceError) {
      return NextResponse.json<APIResponse>(
        { status: "invalid", message: error.message },
        { status: error.statusCode },
      );
    } else if (error instanceof ZodError) {
      return NextResponse.json<APIResponse>(
        {
          status: "invalid",
          message: error.issues.at(0)?.message ?? "Invalid input",
        },
        { status: status.UNPROCESSABLE_ENTITY },
      );
    }
    return NextResponse.json<APIResponse>(
      { status: "error", message: "Internal Server Error" },
      { status: status.INTERNAL_SERVER_ERROR },
    );
  }
}
