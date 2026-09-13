import { Court, SportType } from '../types';
import { SEED_COURTS } from '../data/seedData';

const STORAGE_COURTS_KEY = 'quickcourt_courts';

function initializeCourts(): Court[] {
  const existing = localStorage.getItem(STORAGE_COURTS_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
      // ignore
    }
  }
  localStorage.setItem(STORAGE_COURTS_KEY, JSON.stringify(SEED_COURTS));
  return SEED_COURTS;
}

export const courtService = {
  getCourts(facilityId?: string): Court[] {
    const courts = initializeCourts();
    if (facilityId) {
      return courts.filter((c) => c.facilityId === facilityId);
    }
    return courts;
  },

  getCourtById(courtId: string): Court | null {
    const courts = initializeCourts();
    return courts.find((c) => c.id === courtId) || null;
  },

  async addCourt(data: {
    facilityId: string;
    name: string;
    sport: SportType;
    type?: string;
    pricePerHour: number;
    openingTime?: string;
    closingTime?: string;
    status?: 'active' | 'maintenance' | 'inactive';
  }): Promise<Court> {
    const courts = initializeCourts();
    const newCourt: Court = {
      id: `crt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      facilityId: data.facilityId,
      name: data.name,
      sport: data.sport,
      type: data.type || 'Indoor Synthetic',
      pricePerHour: Number(data.pricePerHour),
      openingTime: data.openingTime || '06:00 AM',
      closingTime: data.closingTime || '11:00 PM',
      status: data.status || 'active',
    };

    courts.push(newCourt);
    localStorage.setItem(STORAGE_COURTS_KEY, JSON.stringify(courts));
    return newCourt;
  },

  async updateCourt(courtId: string, updates: Partial<Court>): Promise<Court> {
    const courts = initializeCourts();
    const index = courts.findIndex((c) => c.id === courtId);
    if (index === -1) {
      throw new Error('Court not found');
    }

    const updated: Court = {
      ...courts[index],
      ...updates,
      pricePerHour:
        updates.pricePerHour !== undefined
          ? Number(updates.pricePerHour)
          : courts[index].pricePerHour,
    };
    courts[index] = updated;
    localStorage.setItem(STORAGE_COURTS_KEY, JSON.stringify(courts));
    return updated;
  },

  async deleteCourt(courtId: string): Promise<boolean> {
    const courts = initializeCourts();
    const filtered = courts.filter((c) => c.id !== courtId);
    if (filtered.length === courts.length) {
      throw new Error('Court not found or already removed');
    }
    localStorage.setItem(STORAGE_COURTS_KEY, JSON.stringify(filtered));
    return true;
  },
};
