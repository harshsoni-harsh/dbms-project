import { createPremiumPayment } from '@/lib/query/customer/createPremiumPayment';
import { viewReceipts } from '@/lib/query/customer/viewReceipts';
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
        const result = await viewReceipts(session.user.uid);

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

const putBodySchema = z.object({
    policyId: z.coerce.number(),
    amount: z.coerce.number().positive(),
    txnId: z.coerce.number()
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
        const result = await createPremiumPayment(data.amount, data.policyId, new Date(), data.txnId);

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
