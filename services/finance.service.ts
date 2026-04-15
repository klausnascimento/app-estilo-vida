import { prisma } from '../lib/prisma';
import { FinancialEntryDTO, MOCK_USER_ID, TransactionType } from '../types';

export const FinanceService = {
  async getEntries(userId: string = MOCK_USER_ID, limit: number = 50) {
    return prisma.financialEntry.findMany({
      where: { userId },
      orderBy: { entryDate: 'desc' },
      take: limit,
    });
  },

  async addEntry(data: FinancialEntryDTO, userId: string = MOCK_USER_ID) {
    return prisma.financialEntry.create({
      data: {
        userId,
        type: data.type,
        title: data.title,
        description: data.description,
        amount: data.amount,
        category: data.category,
        entryDate: data.entryDate ? new Date(data.entryDate) : new Date(),
      }
    });
  },

  async updateEntry(id: string, data: FinancialEntryDTO) {
    return prisma.financialEntry.update({
      where: { id },
      data: {
        type: data.type,
        title: data.title,
        description: data.description,
        amount: data.amount,
        category: data.category,
        entryDate: data.entryDate ? new Date(data.entryDate) : new Date(),
      }
    });
  },

  async deleteEntry(id: string) {
    return prisma.financialEntry.delete({
      where: { id }
    });
  },

  async getSummary(userId: string = MOCK_USER_ID) {
    const entries = await prisma.financialEntry.findMany({
      where: { userId }
    });

    const summary = entries.reduce(
      (acc, entry) => {
        if (entry.type === 'INCOME') {
          acc.income += entry.amount;
        } else if (entry.type === 'EXPENSE') {
          acc.expense += entry.amount;
        }
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );

    summary.balance = summary.income - summary.expense;
    return summary;
  }
};
