import dbConn from "@/lib/dbConnector";

export async function createPolicyType(
  maturityDuration: number,
  renewDuration: number,
  title: string,
  description: string,
  coverage: number
) {
  const conn = await dbConn;
  await conn.connect();

  const [results] = await conn.query(
    `insert into policy_type(maturity_duration, renew_duration, title, description, coverage)  values (?,?,?,?,?)`,
    [maturityDuration, renewDuration, title, description, coverage]
  );
  return results;
}
