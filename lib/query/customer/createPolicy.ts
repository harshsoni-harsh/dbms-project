import dbConn from "@/lib/dbConnector";
export async function createPolicy(
    customerId: number,
    policyTypeId: number,
    vehicleManufacturer: string,
    vehicleType: string,
    vehicleMake: string,
    registrationYear: number,
    registrationMonth: number,
    vehicleNumber: string,
    vehiclePrice: number,
    premiumAmount: number
) {
    const conn = await dbConn;
    await conn.connect();

    const [results]= await conn.query(
        // `insert into policy(customer_id,policy_type_id,vehicle_number,vehicle_type,vehicle_make,registration_year,registration_month,vehicle_number,vehicle_price,premium_amount) values (?,?,?,?,?,?,?,?,?);`,
        `insert into policy(
            customer_id,
            policy_type_id,
            vehicle_manufacturer,
            vehicle_type,
            vehicle_make,
            registration_year,
            registration_month,
            vehicle_number,
            vehicle_price,
            premium_amount
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
            customerId,
            policyTypeId,
            vehicleManufacturer,
            vehicleType,
            vehicleMake,
            registrationYear,
            registrationMonth,
            vehicleNumber,
            vehiclePrice,
            premiumAmount
        ]
    );
    return results;
}
