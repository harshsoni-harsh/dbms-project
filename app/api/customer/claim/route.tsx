import { createClaim } from '@/lib/query/customer/createClaim';
import { createIncidentReport } from '@/lib/query/customer/createIncidentReport';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const putBodySchema = z.object({
    // Incident
    damageType: z.string(),
    damageDescription: z.string(),

    // Claim
    policyId: z.coerce.number(),
    claimAmount: z.coerce.number(),
});

export async function PUT(req: NextRequest) {
    // const session = await getServerSession();
    // if (!session || !session.user) {
    //     return NextResponse.json(
    //         {
    //             error: "Not signed in",
    //         },
    //         {
    //             status: 403,
    //         }
    //     );
    // }

    // const body = await req.json();
    // const parseResult = putBodySchema.safeParse(body);

    // if (!parseResult.success) {
    //     return NextResponse.json({
    //         error: 'Invalid body: ' + parseResult.error.message
    //     }, {
    //         status: 400
    //     });
    // }

    // try {
    //     const data = parseResult.data;
    //     // @ts-expect-error it exists
    //     const r1 = await createIncidentReport(data.damageType, data.damageDescription)
    //     const result = await createClaim(
    //         session.user.uid,
    //         data.policyId,
    //         data.claimAmount,
    //         data.
    //     )

    //     return NextResponse.json({
    //         message: 'success',
    //         data: result
    //     });
    // } catch (err) {
    //     return NextResponse.json({
    //         error: err
    //     }, {
    //         status: 500
    //     });
    // }
}

export function GET(req: NextRequest) {

}
