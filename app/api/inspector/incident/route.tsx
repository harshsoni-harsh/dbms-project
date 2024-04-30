import { updateIncidentReport } from '@/lib/query/inspector/updateIncidentReport';
import { viewPendingIncidentReport } from '@/lib/query/inspector/viewPendingIncidentReports';
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

const postBodySchema = z.object({
  incidentId: z.coerce.number().int(),
  status: z.string()
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
    const result = await updateIncidentReport(parseResult.data.incidentId, parseResult.data.status);

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
    const result = await viewPendingIncidentReport();

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
