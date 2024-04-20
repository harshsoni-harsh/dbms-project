import { NextRequest, NextResponse } from "next/server";
import { number, string, z } from "zod";
import dbConn from "@/lib/dbConnector";
import { FieldPacket, RowDataPacket } from "mysql2";

export interface User {
  id: Number;
  name: string;
  username: string;
  email: string;
  password: string;
  emailVerified: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

const cust_schema = z.object({
  cust_email: string().email(),
  cust_fname: string().min(3),
  cust_lname: string(),
  cust_gender: string().min(1),
  cust_address: string().min(3),
  cust_mob_number: number(),
  cust_passport_number: string().min(6),
  cust_marital_status: string().min(1),
  cust_pps_number: number(),
  cust_password: string().min(6),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = cust_schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const conn = await dbConn;
  await conn.connect();

  let [results, fields] = await conn.query(
    `select * from USER where email is not null and email =  '${body.cust_email}' `
  ) as [RowDataPacket[], FieldPacket[]];
  if (results && results[0]) return NextResponse.json({ error: "user already exists" }, { status: 401 });;

  await conn.query(`insert into USER(name, email, password, createdAt, updatedAt) values ('${body.cust_fname} ${body.cust_lname}', '${body.cust_email}', '${body.cust_password}', now(),now());
    `);
  [results] = await conn.query(
    `select * from USER where email is not null and email = '${body.cust_email}'`
  ) as [RowDataPacket[], FieldPacket[]];
  const user = results[0] as (RowDataPacket & User);
  return NextResponse.json({ email: user.email }, { status: 201 });
}
