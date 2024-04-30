import dbConn from "@/lib/dbConnector";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  //   if (!session || !session.user)
  //     return NextResponse.json(
  //       {
  //         error: "Not signed in",
  //       },
  //       {
  //         status: 403,
  //       }
  //     );

  const conn = await dbConn;
  await conn.connect();

  const body = await req.json();
  return NextResponse.json({ body });
}
