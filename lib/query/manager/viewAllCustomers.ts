import dbConn from "@/lib/dbConnector";

export async function viewAllCustomers() {
  const conn = await dbConn;
  await conn.connect();

  const queryStatement = `
    select * from customer;
  `;

  const [results] = await conn.query(queryStatement);
  return results;
}
