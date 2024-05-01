import dbConn from "@/lib/dbConnector";

export async function createIncidentReport(
    damageType: string,
    damageDescription: string
) {
    const conn = await dbConn;
    await conn.connect();

    const result = await conn.query(
        `insert into incident_report(damage_type,damage_description) values (?,?,'pending')`,
        [damageType, damageDescription]
    );
    return result;
}
