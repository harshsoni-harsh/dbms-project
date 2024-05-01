import { viewPolicyTypes } from '@/lib/query/util/viewPolicyTypes';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const result = await viewPolicyTypes();

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
