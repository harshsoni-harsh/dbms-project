import dbConn from "@/lib/dbConnector";

export async function viewReceipts(customerId: string) {

  const conn = await dbConn;
  await conn.connect();

  const queryStatement = `
    select premium_receipt.* 
    from premium_receipt, policy 
    where policy.customer_id = ? and
    premium_receipt.policy_id = policy.policy_id;
  `;

  const res = await conn.query(queryStatement, [customerId]);
  return res;

}
