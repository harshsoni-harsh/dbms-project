import dbConn from "@/lib/dbConnector";
export async function createIncidentReport(
    damageType: string,
    damageDescription: string
) {
    const conn = await dbConn;
    await conn.connect();

    const [results] = await conn.query(
        `insert into incident_report(damage_type, damage_description, status) values ( ? , ? , 'pending' )`,
        [damageType, damageDescription]
    );
    return results;
}
