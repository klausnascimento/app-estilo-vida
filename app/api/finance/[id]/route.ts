import { NextRequest, NextResponse } from 'next/server';
import { FinanceService } from '../../../../services/finance.service';
import { BaseResponse } from '../../../../types';

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unexpected error';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = await FinanceService.updateEntry(id, body);
    return NextResponse.json({ success: true, data } satisfies BaseResponse<unknown>);
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await FinanceService.deleteEntry(id);
    return NextResponse.json({ success: true } satisfies BaseResponse<unknown>);
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}
