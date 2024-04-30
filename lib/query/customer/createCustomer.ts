
import dbConn from "@/lib/dbConnector";
import { FieldPacket, RowDataPacket } from "mysql2";
import { resourceLimits } from "worker_threads";


export async function createCustomer(
    customerId: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNo: string,
    gender: string,
    panNo: string
) {
    
  const conn = await dbConn;
  await conn.connect();
  

 const result= await conn.query(`insert into customer( customer_id ,first_name, last_name,email, phone_no, gender, pan_no) values (?,?,?,?,?,?,?)`,
 [ customerId ,  firstName ,  lastName , email , phoneNo , gender , panNo ]);

  return result;

}
