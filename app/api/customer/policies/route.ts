import { createPolicy } from '@/lib/query/customer/createPolicy';
import { viewPolicies } from "@/lib/query/customer/viewPolicies";
import { viewPolicyTypes } from '@/lib/query/util/viewPolicyTypes';
import { User } from "@/types/dbSchema";
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const GET = async () => {
    
    const session = await getServerSession();

    if (!session || !session.user || !session.user.name) {
        return NextResponse.json(
            null,
            { status: 401 },
        );
    }

    try {
        const user = JSON.parse(session.user.name) as User;
        if (user.role !== "customer") {
            return NextResponse.json(
                null,
                { status: 403 },
            );
        }
        try {
            const result = await viewPolicies(user.uid);
            return NextResponse.json(
                { data: result, },
                { status: 200 },
            );
        } catch (error) {
            return NextResponse.json(
                { error: typeof error === "string" ? error : "DB Error" },
                { status: 500 },
            );
        }
    } catch (error) {
        return NextResponse.json(
            null,
            { status: 400 },
        );
    }

}

const putBodySchema = z.object({
    policyTypeId: z.coerce.number(),
    vehicleManufacturer: z.string(),
    vehicleType: z.string(),
    vehicleMake: z.string(),
    registrationYear: z.coerce.number().positive(),
    registrationMonth: z.coerce.number().positive(),
    vehicleNumber: z.string(),
    vehiclePrice: z.coerce.number().positive()
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
        const policyTypesResult = await viewPolicyTypes();
        // @ts-expect-error its an array
        const pType = policyTypesResult.find(v => v.policy_type_id === data.policyTypeId);
        if(!pType) return NextResponse.json({
            error: 'Invalid policy type id'
        }, {
            status: 400
        });

        const profile = JSON.parse(session.user.name!);
        const result = await createPolicy(
            profile.uid,
            data.policyTypeId,
            data.vehicleManufacturer,
            data.vehicleType,
            data.vehicleMake,
            data.registrationYear,
            data.registrationMonth,
            data.vehicleNumber,
            data.vehiclePrice,
            data.vehiclePrice * pType.coverage / 100
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
