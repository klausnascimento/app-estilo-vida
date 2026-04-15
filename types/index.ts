export type Language = 'PT_BR' | 'EN' | 'ES';
export type Theme = 'LIGHT' | 'DARK' | 'SYSTEM';
export type PriorityStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';
export type TransactionType = 'INCOME' | 'EXPENSE';

export interface BaseResponse<T = undefined> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface EnergyCheckInDTO {
  score: number;
  reason?: string;
  notes?: string;
}

export interface DailyPriorityDTO {
  title: string;
  description?: string;
  status?: PriorityStatus;
}

export interface HabitDTO {
  name: string;
  description?: string;
  active?: boolean;
}

export interface FinancialEntryDTO {
  type: TransactionType;
  title: string;
  description?: string;
  amount: number;
  category: string;
  entryDate?: string;
}

export interface UserPreferenceDTO {
  language?: Language;
  theme?: Theme;
}

// Dummy user ID for the single-user local implementation until Auth is added
export const MOCK_USER_ID = 'mock-user-id-1234';
