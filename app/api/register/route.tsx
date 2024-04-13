import { NextRequest, NextResponse } from "next/server";
import { number, string, z, ZodNumber } from "zod";
import util from "util";
import db from "@/dbConnector/db";
const query = util.promisify(db.query).bind(db);

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
  cust_fname: string().min(3), //.max(20),
  cust_lname: string(), //.max(20),
  cust_gender: string().min(1), //.max(2),
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

  let users = await query(
    `select * from user where email is not null and email =  '${body.cust_email}' `
  );
  let user: User = users[0];

  if (user)
    return NextResponse.json({ error: "user already exists" }, { status: 401 });

  await query(`insert into user(email,password, createdAt,updatedAt) values ('${body.cust_email}', '${body.cust_password}', now(),now());
    `);
  users = await query(
    `select * from user where email is not null and email =  '${body.cust_email}' `
  );
  user = users[0];
  return NextResponse.json({ email: user.email }, { status: 201 });
}
