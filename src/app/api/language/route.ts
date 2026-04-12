import { prisma } from "@/prisma";
import status from "http-status";
import type { Languages } from "@generated/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const languages: Languages[] = await prisma.languages.findMany({
    distinct: ["name"],
  });

  return NextResponse.json<Languages[]>(languages, {
    status: status.OK,
  });
}
