import dbConn from "@/lib/dbConnector";

export async function viewAllClaims() {
  const conn = await dbConn;
  await conn.connect();
  const queryStatement = `
    select * from claim;
  `;

  const [results] = await conn.query(queryStatement);
  return results;
}
