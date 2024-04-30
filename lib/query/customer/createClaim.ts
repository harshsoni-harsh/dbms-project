import dbConn from "@/lib/dbConnector";
export async function createClaim(
    customerId: string,
    policyId: string,
    claimAmount: number,
    incidentId: number,
    createdAt: Date
) {
    const conn = await dbConn;
    await conn.connect();


    const result =await conn.query(`insert into claim(customer_id, policy_id,claim_amount,incident_id,created_at,status) values (?,?,?,?,?,'pending')`,[customerId,claimAmount,policyId, incidentId,createdAt]);
    return result;
}
