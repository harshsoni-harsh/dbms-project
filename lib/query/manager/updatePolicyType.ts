import dbConn from "@/lib/dbConnector";

type PolicyType = {
  maturityDuration: number;
  renewDuration: number;
  title: string;
  description: string;
  coverage: number;
};

export async function updatePolicyType(
  policyTypeId: number,
  updates: Partial<PolicyType>
) {
  const conn = await dbConn;
  await conn.connect();

  const updateKeys = Object.keys(updates);
  const updateValues = Object.values(updates);

  let query = `UPDATE policy_type SET `;
  for (let key of updateKeys) {
    query += `${key} = ?`;
    if (key != updateKeys[updateKeys.length - 1]) query += ", ";
  }
  query += " WHERE policy_type_id = ?";

  const [results] = await conn.query(query, [...updateValues, policyTypeId]);
  return results;
}
