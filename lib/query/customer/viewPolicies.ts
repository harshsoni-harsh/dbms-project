import dbConn from "@/lib/dbConnector";

export async function viewPolicies(customerId: string) {
    const conn = await dbConn;
    await conn.connect();

    const queryStatement = `
    select * from policy 
    where policy.customer_id = ?;
  `;
    const [results] = await conn.query(queryStatement, [customerId]);
    return results;
}
