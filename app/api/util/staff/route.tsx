import { viewCustomer } from '@/lib/query/util/viewCustomer';
import { viewStaff } from '@/lib/query/util/viewStaff';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

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

    if(session.user.role === 'customer') return NextResponse.json({
        error: 'Unauthorized'
    }, {
        status: 403
    });

    try {
        // @ts-expect-error it exists
        const result = await viewStaff(parseInt(session.user.uid));

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