import { NextRequest, NextResponse } from 'next/server';
import { PriorityService } from '../../../services/priority.service';
import { BaseResponse } from '../../../types';

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unexpected error';

export async function GET() {
  try {
    const data = await PriorityService.getTodayPriority();
    return NextResponse.json({ success: true, data } satisfies BaseResponse<unknown>);
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await PriorityService.setPriority(body);
    return NextResponse.json({ success: true, data } satisfies BaseResponse<unknown>);
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}
