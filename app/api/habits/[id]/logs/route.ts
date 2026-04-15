import { NextRequest, NextResponse } from 'next/server';
import { HabitService } from '../../../../../services/habit.service';
import { BaseResponse } from '../../../../../types';

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unexpected error';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const completed = await HabitService.toggleTodayLog(id);
    return NextResponse.json({ success: true, data: { completed } } satisfies BaseResponse<unknown>);
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}
