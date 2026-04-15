import status from "http-status";
import type { Languages } from "@generated/prisma/client";
import { NextResponse } from "next/server";
import { getLanguages } from "@/services/language.service";

export async function GET() {
  const languages: Languages[] = await getLanguages();
  return NextResponse.json<Languages[]>(languages, {
    status: status.OK,
  });
}
