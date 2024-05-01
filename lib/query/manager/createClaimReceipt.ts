import dbConn from "@/lib/dbConnector";

export async function createClaimReceipt(
  claimId: number,
  createdAt: Date,
  amount: number,
  txnId: number
) {
  const conn = await dbConn;
  await conn.connect();

  const queryStatement = `
        insert into claim_receipt (claim_id, created_at, amount, txn_id)
        values (?,?,?,?)
    `;
  const [results] = await conn.query(queryStatement, [
    claimId,
    createdAt,
    amount,
    txnId,
  ]);
  return results;
}
