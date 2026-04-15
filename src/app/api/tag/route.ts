import { NextResponse } from "next/server";
import type { Tag } from "@generated/prisma/client";
import status from "http-status";
import { getTags } from "@/services/tag.service";

export async function GET() {
  const tag = await getTags();
  return NextResponse.json<Tag[]>(tag, {
    status: status.OK,
  });
}
