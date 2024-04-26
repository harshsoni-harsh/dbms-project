import dbConn from "@/lib/dbConnector";
import { FieldPacket, RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const conn = await dbConn;
  await conn.connect();

  const body = await req.text();
  const isMultipleQueries = body
    .split(";")
    .filter((obj) => obj !== " " && Boolean(obj));
  if (isMultipleQueries.length > 1)
    return new Response(
      JSON.stringify("Multiple Queries are not allowed for now")
    );
  try {
    await conn.query("use sql6691668;");

    const [results, fields] = (await conn.query(body)) as [
      RowDataPacket[],
      FieldPacket[]
    ];
    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json(e);
  }
}
