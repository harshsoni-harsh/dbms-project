import dbConn from "@/lib/dbConnector";

export async function viewStaff(staffId: number) {
  const conn = await dbConn;
  await conn.connect();

  const queryStatement = `
    select * from staff;
  `;

  const [results] = await conn.query(queryStatement);
  return results;
}
