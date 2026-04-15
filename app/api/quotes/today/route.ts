import { NextRequest, NextResponse } from 'next/server';
import { QuoteService } from '../../../../services/quote.service';
import { PreferenceService } from '../../../../services/preference.service';
import { BaseResponse, Language } from '../../../../types';

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unexpected error';

export async function GET() {
  try {
    const prefs = await PreferenceService.getPreferences();
    const lang = (prefs?.language || 'PT_BR') as Language;
    
    const verse = await QuoteService.getDailyBibleVerse(lang);
    const motivation = await QuoteService.getDailyMotivation(lang);
    
    return NextResponse.json({ 
      success: true, 
      data: { verse, motivation } 
    } satisfies BaseResponse<unknown>);
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}
