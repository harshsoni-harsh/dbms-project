import { createClaimReceipt } from '@/lib/query/manager/createClaimReceipt';
import { updateClaim } from '@/lib/query/manager/updateClaim';
import { viewAllClaims } from '@/lib/query/manager/viewAllClaims';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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
        const result = await viewAllClaims();

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

const postBodySchema = z.object({
    claimId: z.coerce.number().int(),
    status: z.string(),
    receipt: z.object({
        created: z.coerce.date(),
        amount: z.coerce.number().int(),
        txnId: z.coerce.number().int()
    })
});

export async function POST(req: NextRequest) {
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
    const parseResult = postBodySchema.safeParse(body);

    if (!parseResult.success) {
        return NextResponse.json({
            error: 'Invalid body: ' + parseResult.error.message
        }, {
            status: 400
        });
    }

    try {
        const data = parseResult.data;
        const result1 = await updateClaim(data.claimId, data.status);
        const result2 = await createClaimReceipt(data.claimId, data.receipt.created, data.receipt.amount, data.receipt.txnId);

        return NextResponse.json({
            message: 'success',
            data: [result1, result2]
        });
    } catch (err) {
        return NextResponse.json({
            error: err
        }, {
            status: 500
        });
    }
}
