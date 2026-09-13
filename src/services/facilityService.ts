import { Facility, SportType } from '../types';
import { SEED_FACILITIES } from '../data/seedData';

const STORAGE_FACILITIES_KEY = 'quickcourt_facilities';

function initializeFacilities(): Facility[] {
  const existing = localStorage.getItem(STORAGE_FACILITIES_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
      // ignore
    }
  }
  localStorage.setItem(STORAGE_FACILITIES_KEY, JSON.stringify(SEED_FACILITIES));
  return SEED_FACILITIES;
}

export const facilityService = {
  getAllFacilities(): Facility[] {
    return initializeFacilities();
  },

  getOwnerFacility(ownerId: string): Facility {
    const facilities = initializeFacilities();
    const found = facilities.find((f) => f.ownerId === ownerId);
    if (found) return found;
    // Fallback to first facility if owner has one or create a realistic Smash Arena default
    return facilities[0] || SEED_FACILITIES[0];
  },

  getFacilityById(facilityId: string): Facility | null {
    const facilities = initializeFacilities();
    return facilities.find((f) => f.id === facilityId) || null;
  },

  async updateFacility(
    facilityId: string,
    updates: Partial<Facility>
  ): Promise<Facility> {
    const facilities = initializeFacilities();
    const index = facilities.findIndex((f) => f.id === facilityId);
    if (index === -1) {
      throw new Error('Facility not found');
    }

    const updated: Facility = {
      ...facilities[index],
      ...updates,
    };
    facilities[index] = updated;
    localStorage.setItem(STORAGE_FACILITIES_KEY, JSON.stringify(facilities));
    return updated;
  },

  async createFacility(data: Partial<Facility>): Promise<Facility> {
    const facilities = initializeFacilities();
    const newFacility: Facility = {
      id: `fac_${Date.now()}`,
      ownerId: data.ownerId || 'usr_owner_1',
      ownerName: data.ownerName || 'Rajesh Sharma',
      name: data.name || 'New Sports Complex',
      description:
        data.description ||
        'State-of-the-art sports arena with multi-surface courts.',
      sports: data.sports || ['Badminton', 'Tennis'],
      venueType: data.venueType || 'Indoor',
      address: data.address || 'Sports Park Road',
      area: data.area || 'Central Zone',
      city: data.city || 'Ahmedabad',
      pincode: data.pincode || '380015',
      lat: data.lat || 23.0225,
      lng: data.lng || 72.5714,
      rating: 4.8,
      reviewCount: 0,
      startingPrice: data.startingPrice || 450,
      amenities: data.amenities || [
        'Parking',
        'Changing Rooms',
        'Washrooms',
        'Drinking Water',
        'Wi-Fi',
      ],
      openingTime: data.openingTime || '06:00',
      closingTime: data.closingTime || '23:00',
      images:
        data.images && data.images.length > 0
          ? data.images
          : [
              'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&auto=format&fit=crop&q=80',
            ],
      verifiedBadge: true,
      status: 'approved',
      courtCount: data.courtCount || 4,
      rules: data.rules || [
        'Non-marking shoes required on all synthetic surfaces.',
        'Arrive 10 minutes before booked time slot.',
      ],
      createdAt: new Date().toISOString(),
    };

    facilities.unshift(newFacility);
    localStorage.setItem(STORAGE_FACILITIES_KEY, JSON.stringify(facilities));
    return newFacility;
  },
};
