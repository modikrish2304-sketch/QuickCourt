import { Facility } from '../types';
import { adminService } from './adminService';

export interface FacilityQueryParams {
  status?: 'all' | 'pending' | 'approved' | 'rejected';
  venueType?: 'all' | 'Indoor' | 'Outdoor' | 'Premium' | 'Community' | 'both';
  sport?: string;
  search?: string;
  city?: string;
  sortBy?: 'newest' | 'oldest' | 'name' | 'status';
  page?: number;
  limit?: number;
}

export const facilityApprovalService = {
  getFacilities(params: FacilityQueryParams = {}) {
    let facilities = adminService.getFacilities();

    // Status Filter
    if (params.status && params.status !== 'all') {
      facilities = facilities.filter((f) => f.status === params.status);
    }

    // Search Query
    if (params.search && params.search.trim()) {
      const q = params.search.trim().toLowerCase();
      facilities = facilities.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.ownerName.toLowerCase().includes(q) ||
          f.city.toLowerCase().includes(q) ||
          f.area.toLowerCase().includes(q) ||
          f.address.toLowerCase().includes(q)
      );
    }

    // Venue Type Filter
    if (params.venueType && params.venueType !== 'all') {
      const vt = params.venueType.toLowerCase();
      facilities = facilities.filter((f) => {
        const facType = (f.venueType || '').toLowerCase();
        return facType === vt || facType === 'both';
      });
    }

    // Sport Filter
    if (params.sport && params.sport !== 'all' && params.sport !== 'All') {
      const sp = params.sport.toLowerCase();
      facilities = facilities.filter((f) =>
        f.sports.some((s) => s.toLowerCase() === sp)
      );
    }

    // City Filter
    if (params.city && params.city !== 'all') {
      facilities = facilities.filter(
        (f) => f.city.toLowerCase() === params.city?.toLowerCase()
      );
    }

    // Sorting
    if (params.sortBy === 'oldest') {
      facilities.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (params.sortBy === 'name') {
      facilities.sort((a, b) => a.name.localeCompare(b.name));
    } else if (params.sortBy === 'status') {
      facilities.sort((a, b) => a.status.localeCompare(b.status));
    } else {
      // Default: newest first
      facilities.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    const total = facilities.length;
    const page = Math.max(1, params.page || 1);
    const limit = params.limit || 8;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const offset = (page - 1) * limit;
    const paginated = facilities.slice(offset, offset + limit);

    return {
      facilities: paginated,
      total,
      page,
      totalPages,
      limit,
    };
  },

  getFacilityCounts() {
    const all = adminService.getFacilities();
    return {
      all: all.length,
      pending: all.filter((f) => f.status === 'pending').length,
      approved: all.filter((f) => f.status === 'approved').length,
      rejected: all.filter((f) => f.status === 'rejected').length,
    };
  },

  approveFacility(facilityId: string, comment?: string): Facility {
    return adminService.approveFacility(facilityId, comment);
  },

  rejectFacility(facilityId: string, reason: string): Facility {
    return adminService.rejectFacility(facilityId, reason);
  },
};
