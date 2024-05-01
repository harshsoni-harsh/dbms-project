import dbConn from "@/lib/dbConnector";

export async function viewAllPolicies() {
  const conn = await dbConn;
  await conn.connect();

  const queryStatement = `
    select * 
    from policy;
  `;

  const [res] = await conn.query(queryStatement);
  return res;
}
