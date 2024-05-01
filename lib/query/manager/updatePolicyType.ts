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

  const keyToColumnMap = {
    'maturityDuration': 'maturity_duration',
    'renewDuration': 'renew_duration',
    'title': 'title',
    'description': 'description',
    'coverage': 'coverage'
  };

  const updateKeys = Object.keys(updates);
  const updateValues = Object.values(updates);

  let query = `UPDATE policy_type SET `;
  // @ts-expect-error
  query += updateKeys.map(k => `${keyToColumnMap[k]} = ?`).join(', ');
  query += " WHERE policy_type_id = ?";

  const result = conn.query(query, [...updateValues, policyTypeId]);
  return result;
}
