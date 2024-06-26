import dbConn from "@/lib/dbConnector";
export async function createPremiumPayment(
    amount: number,
    policyId: number,
    createdAt: Date,
    txnId: number
) {
    const conn = await dbConn;
    await conn.connect();

    const [results] = await conn.query(
        `insert into premium_receipt(amount,policy_id,created_at,txn_id) values (?,?,?,?);`,
        [amount, policyId, createdAt, txnId]
    );
    return results;
}
