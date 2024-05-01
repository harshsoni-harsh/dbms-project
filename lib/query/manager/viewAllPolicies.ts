import dbConn from "@/lib/dbConnector";

export async function viewAllPolicies() {
  const conn = await dbConn;
  await conn.connect();

  const queryStatement = `
    select * 
    from policy;
  `;

  const [results]= await conn.query(queryStatement);
  return results;
}
