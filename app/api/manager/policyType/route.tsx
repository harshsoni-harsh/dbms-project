import { createPolicyType } from '@/lib/query/manager/createPolicyType';
import { deletePolicyType } from '@/lib/query/manager/deletePolicyType';
import { updatePolicyType } from '@/lib/query/manager/updatePolicyType';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const postBodySchema = z.object({
    policyTypeId: z.coerce.number().int(),
    policyType: z.object({
        maturityDuration: z.optional(z.coerce.number().int()),
        renewDuration: z.optional(z.coerce.number().int()),
        title: z.optional(z.string()),
        description: z.optional(z.string()),
        coverage: z.optional(z.number())
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

    const parseResult = postBodySchema.safeParse(req.body);

    if (!parseResult.success) {
        return NextResponse.json({
            error: 'Invalid body: ' + parseResult.error.message
        }, {
            status: 400
        });
    }

    try {
        const data = parseResult.data;
        const result = await updatePolicyType(data.policyTypeId, data.policyType);

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
    maturityDuration: z.coerce.number().int(),
    renewDuration: z.coerce.number().int(),
    title: z.string(),
    description: z.string(),
    coverage: z.number()
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

    const parseResult = putBodySchema.safeParse(req.body);

    if (!parseResult.success) {
        return NextResponse.json({
            error: 'Invalid body: ' + parseResult.error.message
        }, {
            status: 400
        });
    }

    try {
        const data = parseResult.data;
        const result = await createPolicyType(
            data.maturityDuration,
            data.renewDuration,
            data.title,
            data.description,
            data.coverage
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

const deleteBodySchema = z.object({
    policyTypeId: z.coerce.number().int()
});

export async function DELETE(req: NextRequest) {
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

    const parseResult = postBodySchema.safeParse(req.body);

    if (!parseResult.success) {
        return NextResponse.json({
            error: 'Invalid body: ' + parseResult.error.message
        }, {
            status: 400
        });
    }

    try {
        const data = parseResult.data;
        const result = await deletePolicyType(data.policyTypeId);

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
