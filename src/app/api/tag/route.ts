import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
import type { Tag } from "@generated/prisma/client";
import status from "http-status";

export async function GET() {
  const tag = await prisma.tag.findMany({
    distinct: ["name"],
  });
  return NextResponse.json<Tag[]>(tag, {
    status: status.OK,
  });
}
