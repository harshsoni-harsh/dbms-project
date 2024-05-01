import dbConn from "@/lib/dbConnector";

export async function viewPendingIncidentReport() {
    const conn = await dbConn;
    await conn.connect();

    const queryStatement = `
    select * 
    from incident_report 
    where incident_report.status = 'pending';
  `;
    const [results] = await conn.query(queryStatement);
    return results;
}
