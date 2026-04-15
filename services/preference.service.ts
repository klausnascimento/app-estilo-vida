import { prisma } from '../lib/prisma';
import { UserPreferenceDTO, MOCK_USER_ID, Language, Theme } from '../types';

export const PreferenceService = {
  async getPreferences(userId: string = MOCK_USER_ID) {
    let pref = await prisma.userPreference.findUnique({
      where: { userId },
    });
    
    // Auto-create if not exists
    if (!pref) {
      pref = await prisma.userPreference.create({
        data: {
          userId,
          language: 'PT_BR',
          theme: 'SYSTEM'
        }
      });
    }
    
    return pref;
  },

  async updatePreferences(data: UserPreferenceDTO, userId: string = MOCK_USER_ID) {
    const pref = await this.getPreferences(userId);
    
    return prisma.userPreference.update({
      where: { id: pref.id },
      data: {
        language: data.language ?? pref.language,
        theme: data.theme ?? pref.theme,
      }
    });
  }
};
