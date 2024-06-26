import dbConn from "@/lib/dbConnector";
import { hashSync } from "bcrypt";

export async function createUser(
  password: string,
  email: string,
  role: string
) {
  const conn = await dbConn;
  await conn.connect();

  const hashedPassword = hashSync(password, 10);

  const [results] = await conn.query(
    `insert into user(email, pwd_hash, created_at,role) values (?, ?, now(), ?);`,
    [email, hashedPassword, role]
  );
  return results;
}
