import dbConn from "@/lib/dbConnector";

export async function viewClaims(customerId: number) {
  const conn = await dbConn;
  await conn.connect();

  const queryStatement = `
    select *
    from claim
        left JOIN claim_receipt on claim.claim_id = claim_receipt.claim_id
    where
        claim.customer_id = ?;
  `;

  const [results] = await conn.query(queryStatement, [customerId]);
  return results;
}
