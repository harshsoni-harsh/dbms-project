import { viewPolicies } from "@/lib/query/customer/viewPolicies";
import { User } from "@/types/dbSchema";
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';


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
