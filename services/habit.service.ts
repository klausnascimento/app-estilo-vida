import { prisma } from '../lib/prisma';
import { HabitDTO, MOCK_USER_ID } from '../types';
import { getStartOfDay } from '../utils/date';

export const HabitService = {
  async getActiveHabits(userId: string = MOCK_USER_ID) {
    return prisma.habit.findMany({
      where: {
        userId,
      },
      include: {
        logs: {
          orderBy: {
            completedAt: 'desc'
          }
        }
      }
    });
  },

  async createHabit(data: HabitDTO, userId: string = MOCK_USER_ID) {
    return prisma.habit.create({
      data: {
        userId,
        name: data.name,
        description: data.description,
      }
    });
  },
  
  async updateHabit(id: string, data: HabitDTO) {
    return prisma.habit.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      }
    });
  },

  async deleteHabit(id: string) {
    return prisma.habit.delete({
      where: { id },
    });
  },

  async toggleTodayLog(habitId: string) {
    const today = getStartOfDay();
    const nextDay = new Date(today);
    nextDay.setDate(nextDay.getDate() + 1);

    // Check if already completed today
    const existingLog = await prisma.habitLog.findFirst({
      where: {
        habitId,
        completedAt: {
          gte: today,
          lt: nextDay
        }
      }
    });

    if (existingLog) {
      // Remove it (toggle off)
      await prisma.habitLog.delete({
        where: { id: existingLog.id }
      });
      return false; // Not completed
    } else {
      // Create it (toggle on)
      await prisma.habitLog.create({
        data: {
          habitId,
          weekDay: today.getDay(),
          completedAt: new Date() // actual current time
        }
      });
      return true; // Completed
    }
  },

  calculateStreak(logs: { completedAt: Date }[]): number {
    if (!logs || logs.length === 0) return 0;
    
    // Sort desc to be safe
    const sortedLogs = [...logs].sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());
    
    let streak = 0;
    const currentDate = getStartOfDay();
    let index = 0;

    // Check if today was done
    const lastCompletedStartOfDay = getStartOfDay(sortedLogs[0].completedAt);
    
    if (lastCompletedStartOfDay.getTime() === currentDate.getTime()) {
        streak++;
        index++;
        currentDate.setDate(currentDate.getDate() - 1);
    } else if (lastCompletedStartOfDay.getTime() === currentDate.getTime() - 86400000) {
        // yesterday was done, we continue streak
        currentDate.setDate(currentDate.getDate() - 1);
    } else {
        // Did not do it today nor yesterday, streak is 0
        return 0;
    }

    // Traverse rest
    for (let i = index; i < sortedLogs.length; i++) {
        const logDate = getStartOfDay(sortedLogs[i].completedAt);
        if (logDate.getTime() === currentDate.getTime()) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            // Gap found
            break;
        }
    }
    
    return streak;
  }
};
