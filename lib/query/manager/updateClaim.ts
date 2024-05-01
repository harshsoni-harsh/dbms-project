import dbConn from "@/lib/dbConnector";

export async function updateClaim(claimId: number, status: string) {
  const conn = await dbConn;
  await conn.connect();

  const result = await conn.query(
    "UPDATE claim SET status = ? WHERE claim_id = ?",
    [status, claimId]
  );
  return result;
}
