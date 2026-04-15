import { NextRequest, NextResponse } from 'next/server';
import { FinanceService } from '../../../services/finance.service';
import { BaseResponse } from '../../../types';

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unexpected error';

export async function GET() {
  try {
    const list = await FinanceService.getEntries();
    const summary = await FinanceService.getSummary();
    
    return NextResponse.json({ success: true, data: { list, summary } } satisfies BaseResponse<unknown>);
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await FinanceService.addEntry(body);
    return NextResponse.json({ success: true, data } satisfies BaseResponse<unknown>);
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}
