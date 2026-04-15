import { prisma } from '../lib/prisma';
import { Language } from '../types';

export const QuoteService = {
  async getDailyBibleVerse(language: Language = 'PT_BR') {
    // Basic day-of-year rotation algorithm for picking a quote deterministically
    const quotes = await prisma.dailyBibleVerse.findMany({
      where: { language, active: true },
    });
    
    if (!quotes.length) return null;
    
    // Simplistic rotating index based on the day of the year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % quotes.length;
    
    return quotes[index];
  },

  async getDailyMotivation(language: Language = 'PT_BR') {
    const quotes = await prisma.dailyMotivation.findMany({
      where: { language, active: true },
    });
    
    if (!quotes.length) return null;
    
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % quotes.length;
    
    return quotes[index];
  }
};
