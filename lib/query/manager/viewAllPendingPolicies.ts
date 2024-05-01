import dbConn from "@/lib/dbConnector";

export async function viewAllPendingPolicies() {
    const conn = await dbConn;
    await conn.connect();

    const queryStatement = `
    select * 
    from policy 
    where policy.status = 'pending';
  `;

    const [res] = await conn.query(queryStatement);
    return res;
}
