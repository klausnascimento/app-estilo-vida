import { prisma } from '../lib/prisma';
import { DailyPriorityDTO, MOCK_USER_ID, PriorityStatus } from '../types';
import { getStartOfDay } from '../utils/date';

export const PriorityService = {
  async getTodayPriority(userId: string = MOCK_USER_ID) {
    const today = getStartOfDay();
    
    return prisma.dailyPriority.findFirst({
      where: {
        userId,
        priorityDate: today,
      },
    });
  },

  async setPriority(data: DailyPriorityDTO, userId: string = MOCK_USER_ID) {
    const today = getStartOfDay();
    const existing = await this.getTodayPriority(userId);

    if (existing) {
      return prisma.dailyPriority.update({
        where: { id: existing.id },
        data: {
          title: data.title,
          description: data.description,
          status: data.status,
        },
      });
    }

    return prisma.dailyPriority.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        status: data.status || 'PENDING',
        priorityDate: today,
      },
    });
  },
  
  async updateStatus(id: string, status: PriorityStatus) {
    return prisma.dailyPriority.update({
      where: { id },
      data: { status }
    });
  },

  async deletePriority(id: string) {
    return prisma.dailyPriority.delete({
      where: { id },
    });
  }
};
