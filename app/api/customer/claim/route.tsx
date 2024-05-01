import { createClaim } from '@/lib/query/customer/createClaim';
import { createIncidentReport } from '@/lib/query/customer/createIncidentReport';
import { viewClaims } from '@/lib/query/customer/viewClaims';
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
    const session = await getServerSession();
    if (!session || !session.user) {
        return NextResponse.json(
            {
                error: "Not signed in",
            },
            {
                status: 403,
            }
        );
    }

    const body = await req.json();
    const parseResult = putBodySchema.safeParse(body);

    if (!parseResult.success) {
        return NextResponse.json({
            error: 'Invalid body: ' + parseResult.error.message
        }, {
            status: 400
        });
    }

    try {
        const data = parseResult.data;
        const resultIncident = await createIncidentReport(data.damageType, data.damageDescription)
        const result = await createClaim(
            session.user.uid,
            data.policyId,
            data.claimAmount,
            // @ts-expect-error it exists (probably)
            resultIncident.data.insertId,
            new Date()
        );

        return NextResponse.json({
            message: 'success',
            data: result
        });
    } catch (err) {
        return NextResponse.json({
            error: err
        }, {
            status: 500
        });
    }
}

export async function GET(req: NextRequest) {
    const session = await getServerSession();
    if (!session || !session.user) {
        return NextResponse.json(
            {
                error: "Not signed in",
            },
            {
                status: 403,
            }
        );
    }

    try {
        const result = await viewClaims(session.user.uid);

        return NextResponse.json({
            message: 'success',
            data: result
        });
    } catch (err) {
        return NextResponse.json({
            error: err
        }, {
            status: 500
        });
    }
}

