import dbConn from "@/lib/dbConnector";

export async function viewClaims(customerId: number) {
  const conn = await dbConn;
  await conn.connect();

  const queryStatement = `
    select *
    from claim
        natural left JOIN claim_receipt
    where
        claim.customer_id = ?;
  `;

  const [results] = await conn.query(queryStatement, [customerId]);
  return results;
}
