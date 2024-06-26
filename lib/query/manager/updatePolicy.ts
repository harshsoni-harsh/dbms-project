import dbConn from "@/lib/dbConnector";

export async function updatePolicy(policyId: number, status: string) {
  const conn = await dbConn;
  await conn.connect();

  const [results] = await conn.query(
    "UPDATE policy SET status = ? WHERE policy_id = ?",
    [status, policyId]
  );
  return results;
}
