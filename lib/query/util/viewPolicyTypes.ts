import dbConn from "@/lib/dbConnector";

export async function viewPolicyTypes() {
    const conn = await dbConn;
    await conn.connect();

    const queryStatement = `
    select * from policy_type;
  `;
    const res = await conn.query(queryStatement);
    return res;
}
