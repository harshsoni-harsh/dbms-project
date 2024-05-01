import dbConn from "@/lib/dbConnector";

export async function updatePolicy(policyId: number, status: string) {
  const conn = await dbConn;
  await conn.connect();

  const result = conn.query(
    "UPDATE policy SET status = ? WHERE policy_id = ?",
    [status, policyId]
  );
  return result;
}
