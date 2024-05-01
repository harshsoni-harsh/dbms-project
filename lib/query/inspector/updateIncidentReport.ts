import dbConn from "@/lib/dbConnector";

export async function updateIncidentReport(
    incidentId: number,
    status: string
): Promise<boolean> {
    const conn = await dbConn;
    await conn.connect();

    const [result] = await conn.query(
        `
        UPDATE incident_report
        SET status = ?
        WHERE incident_id = ?
    `,
        [status, incidentId]
    );

    // @ts-expect-error cant narrow it
    return result.affectedRows > 0;
}
