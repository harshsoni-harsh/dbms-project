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
    `select * from USER where email is not null and email =  '${body.cust_email}' `
  )) as [RowDataPacket[], FieldPacket[]];
  if (results && results[0])
    return NextResponse.json({ error: "user already exists" }, { status: 401 });

  const hashedPassword = hashSync(body.cust_password, 10);

  await conn.query(`insert into USER(name, email, password, createdAt, updatedAt) values ('${body.cust_fname} ${body.cust_lname}', '${body.cust_email}', '${hashedPassword}', now(),now());
    `);
  [results] = (await conn.query(
    `select * from USER where email is not null and email = '${body.cust_email}'`
  )) as [RowDataPacket[], FieldPacket[]];
  const user = results[0] as RowDataPacket & User;
  return NextResponse.json({ email: user.email }, { status: 201 });
}
