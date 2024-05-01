import dbConn from "@/lib/dbConnector";

export async function deletePolicyType(policyTypeId: number) {
  const conn = await dbConn;
  await conn.connect();

  const result = await conn.query(
    "DELETE FROM policy_type WHERE policy_type_id = ?",
    [policyTypeId]
  );
  return result;
}
