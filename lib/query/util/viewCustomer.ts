import dbConn from "@/lib/dbConnector";

export async function viewCustomer(customerId: number) {
  const conn = await dbConn;
  await conn.connect();

  const queryStatement = `
    select * 
    from customer 
    where customer.customer_id = ?;`;
    const [results]= await conn.query(queryStatement, [customerId]);

    return results;
}
