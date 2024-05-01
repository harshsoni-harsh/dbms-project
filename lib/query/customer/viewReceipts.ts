import dbConn from "@/lib/dbConnector";

export async function viewReceipts(customerId: number) {
    const conn = await dbConn;
    await conn.connect();

    const queryStatement = `
    select premium_receipt.* 
    from premium_receipt, policy 
    where policy.customer_id = ? and
    premium_receipt.policy_id = policy.policy_id;
  `;

    const [results] = await conn.query(queryStatement, [customerId]);
    return results;
}
