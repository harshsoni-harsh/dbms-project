import { NextRequest, NextResponse } from "next/server";
import { number, string, z } from "zod";
import dbConn from "@/lib/dbConnector";
import { FieldPacket, RowDataPacket } from "mysql2";
import { hashSync } from "bcrypt";
import { createCustomer } from "@/lib/query/customer/createCustomer";

export interface User {
  id: Number;
  // name: string;
  // username: string;
  email: string;
  password: string;
  // emailVerified: string;
  // image: string;
  createdAt: string;
  // updatedAt: string;
  role: string;
}

const cust_schema = z.object({
  email: string().email(),
  first_name: string().min(3),
  last_name: string(),
  gender: string().min(1),
  phone_no: string(),
  pan_no: string().min(6),
  password: string().min(6),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = cust_schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const conn = await dbConn;
  await conn.connect();

  let [results, fields] = (await conn.query(
    `select * from USER where email is not null and email =  '${body.email}' `
  )) as [RowDataPacket[], FieldPacket[]];
  if (results && results[0])
    return NextResponse.json({ error: "user already exists" }, { status: 401 });

  const hashedPassword = hashSync(body.password, 10);
  try {
    await conn.query(
      `insert into user(email, pwd_hash, created_at,role) values (?, ?, now(),"customer");`,
      [body.email, hashedPassword]
    );
    [results] = (await conn.query(
      `select * from USER where email is not null and email = ?`,
      [body.email]
    )) as [RowDataPacket[], FieldPacket[]];
    const user = results[0] as RowDataPacket & User;
    await conn.query(
      `insert into customer( customer_id ,first_name, last_name,email, phone_no, gender, pan_no) values (?,?,?,?,?,?,?);`,
      [
        user.uid,
        body.first_name,
        body.last_name,
        body.email,
        body.phone_no,
        body.gender,
        body.pan_no,
      ]
    );
    return NextResponse.json({ email: user.email }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "database error" }, { status: 400 });
  }
}
