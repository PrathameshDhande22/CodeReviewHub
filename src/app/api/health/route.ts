import { prisma } from "@/prisma";
import status from "http-status";
import { NextResponse } from "next/server";
import { connection } from "next/server";

type HealthResponse = {
  status: "ok" | "degraded";
  uptime: number;
  timestamp: string;
  database: "up" | "down";
};

export async function GET() {
  await connection();

  let database: HealthResponse["database"] = "up";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    console.error("[health] database check failed", error);
    database = "down";
  }

  const healthy = database === "up";

  return NextResponse.json<HealthResponse>(
    {
      status: healthy ? "ok" : "degraded",
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      database,
    },
    { status: healthy ? status.OK : status.SERVICE_UNAVAILABLE },
  );
}
