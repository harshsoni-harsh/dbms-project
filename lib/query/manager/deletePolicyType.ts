import dbConn from "@/lib/dbConnector";

export async function deletePolicyType(policyTypeId: number) {
  const conn = await dbConn;
  await conn.connect();

  const [results] = await conn.query(
    "DELETE FROM policy_type WHERE policy_type_id = ?",
    [policyTypeId]
  );
  return results;
}
