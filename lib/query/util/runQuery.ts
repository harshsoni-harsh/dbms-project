import dbConn from "@/lib/dbConnector";

export async function runQuery(query: string) {
  const conn = await dbConn;
  await conn.connect();

  const result = await conn.query(query);
  return result;
}
