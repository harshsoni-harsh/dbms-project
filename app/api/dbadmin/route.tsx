import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/query/util/runQuery";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    if (!session || !session.user) {
        return NextResponse.json(
            {
                error: "Not signed in",
            },
            {
                status: 403,
            }
        );
    }

    const body = await req.text();
    const isMultipleQueries = body
        .split(";")
        .filter((obj) => obj !== " " && Boolean(obj));
    if (isMultipleQueries.length > 1)
        return NextResponse.json({
            message: "Multiple Queries are not allowed for now",
        });
    try {
        const result = await runQuery(body);
        return NextResponse.json({ data: result });
    } catch (err) {
        return NextResponse.json(
            {
                error: err,
            },
            {
                status: 500,
            }
        );
    }
}
