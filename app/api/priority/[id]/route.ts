import { NextRequest, NextResponse } from 'next/server';
import { PriorityService } from '../../../../services/priority.service';
import { BaseResponse } from '../../../../types';

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unexpected error';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    if (!body.status) throw new Error('Status required');
    
    const data = await PriorityService.updateStatus(id, body.status);
    return NextResponse.json({ success: true, data } satisfies BaseResponse<unknown>);
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await PriorityService.deletePriority(id);
    return NextResponse.json({ success: true } satisfies BaseResponse<unknown>);
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}
