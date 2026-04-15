import { prisma } from '../lib/prisma';
import { EnergyCheckInDTO, MOCK_USER_ID } from '../types';
import { getStartOfDay } from '../utils/date';

export const EnergyService = {
  async getTodayCheckIn(userId: string = MOCK_USER_ID) {
    const today = getStartOfDay();
    
    return prisma.energyCheckIn.findFirst({
      where: {
        userId,
        checkInDate: today,
      },
    });
  },

  async registerCheckIn(data: EnergyCheckInDTO, userId: string = MOCK_USER_ID) {
    const today = getStartOfDay();
    
    if (data.score < 0 || data.score > 10) {
      throw new Error('Score must be between 0 and 10');
    }

    // Check if exists
    const existing = await this.getTodayCheckIn(userId);

    if (existing) {
      return prisma.energyCheckIn.update({
        where: { id: existing.id },
        data: {
          score: data.score,
          reason: data.reason,
          notes: data.notes,
        },
      });
    }

    return prisma.energyCheckIn.create({
      data: {
        userId,
        score: data.score,
        reason: data.reason,
        notes: data.notes,
        checkInDate: today,
      },
    });
  },

  async deleteTodayCheckIn(userId: string = MOCK_USER_ID) {
    const existing = await this.getTodayCheckIn(userId);

    if (!existing) {
      return null;
    }

    return prisma.energyCheckIn.delete({
      where: { id: existing.id },
    });
  },
  
  async getRecentHistory(userId: string = MOCK_USER_ID, days: number = 7) {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - days);
    
    return prisma.energyCheckIn.findMany({
      where: {
        userId,
        checkInDate: {
          gte: getStartOfDay(dateLimit),
        }
      },
      orderBy: {
        checkInDate: 'asc'
      }
    });
  }
};
