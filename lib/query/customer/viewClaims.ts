import dbConn from "@/lib/dbConnector";

export async function viewClaims(customerId: number) {
  const conn = await dbConn;
  await conn.connect();

  const queryStatement = `
    select claim.*, 
    case 
      when claim.status = 'accepted' 
        then claim_receipt.* 
    end 
    from claim, claim_receipt 
    where claim.customer_id = ? and claim.claim_id = claim_receipt.claim_id;
  `;

  const [res] = await conn.query(queryStatement, [customerId]);
  return res;
}
