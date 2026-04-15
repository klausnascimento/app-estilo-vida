import { NextRequest, NextResponse } from 'next/server';
import { EnergyService } from '../../../services/energy.service';
import { BaseResponse } from '../../../types';

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unexpected error';

export async function GET() {
  try {
    const todayLog = await EnergyService.getTodayCheckIn();
    const history = await EnergyService.getRecentHistory();
    
    return NextResponse.json({
      success: true,
      data: { todayLog, history }
    } satisfies BaseResponse<unknown>);
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await EnergyService.registerCheckIn(body);
    
    return NextResponse.json({
      success: true,
      data: result
    } satisfies BaseResponse<unknown>);
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}

export async function DELETE() {
  try {
    const result = await EnergyService.deleteTodayCheckIn();

    return NextResponse.json({
      success: true,
      data: result
    } satisfies BaseResponse<unknown>);
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}
