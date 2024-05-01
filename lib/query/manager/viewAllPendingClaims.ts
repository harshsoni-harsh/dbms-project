import dbConn from "@/lib/dbConnector";

export async function viewAllPendingClaims() {
    const conn = await dbConn;
    await conn.connect();

    const queryStatement = `
    select * 
    from claim 
    where claim.status = 'pending';
  `;
    const [res] = await conn.query(queryStatement);
    return res;
}
