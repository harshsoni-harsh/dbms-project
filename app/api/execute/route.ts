import mysql from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

let db: Awaited<ReturnType<typeof mysql['createConnection']>> | undefined

mysql.createConnection({
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string
})
.then(conn => db = conn)
.catch(console.error);

export async function POST(req: NextRequest) {
    if(!db) return NextResponse.json({ status: 'error' });
    await db.connect();
    const data = await req.json();
    const queryResult = await db.execute(data.query);

    return NextResponse.json({
        status: 'ok',
        result: queryResult[0]
    });
}
