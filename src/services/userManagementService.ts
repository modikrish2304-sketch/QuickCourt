import { User, Booking } from '../types';
import { adminService } from './adminService';
import { bookingService } from './bookingService';

export interface UserQueryParams {
  tab?: 'all' | 'players' | 'owners' | 'banned';
  search?: string;
  role?: 'all' | 'player' | 'facility_owner' | 'admin';
  status?: 'all' | 'active' | 'banned' | 'pending';
  sortBy?: 'newest' | 'oldest' | 'name' | 'bookings';
  page?: number;
  limit?: number;
}

export const userManagementService = {
  getUsers(params: UserQueryParams = {}) {
    let users = adminService.getUsers();

    // Tab Filter
    if (params.tab === 'players') {
      users = users.filter((u) => u.role === 'player');
    } else if (params.tab === 'owners') {
      users = users.filter((u) => u.role === 'facility_owner');
    } else if (params.tab === 'banned') {
      users = users.filter((u) => u.isBanned);
    }

    // Role Filter
    if (params.role && params.role !== 'all') {
      users = users.filter((u) => u.role === params.role);
    }

    // Status Filter
    if (params.status && params.status !== 'all') {
      if (params.status === 'banned') {
        users = users.filter((u) => u.isBanned);
      } else if (params.status === 'active') {
        users = users.filter((u) => !u.isBanned && u.isVerified);
      } else if (params.status === 'pending') {
        users = users.filter((u) => !u.isVerified && !u.isBanned);
      }
    }

    // Search query: Name, Email, User ID, City
    if (params.search && params.search.trim()) {
      const q = params.search.trim().toLowerCase();
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q) ||
          (u.city && u.city.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (params.sortBy === 'oldest') {
      users.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (params.sortBy === 'name') {
      users.sort((a, b) => a.name.localeCompare(b.name));
    } else if (params.sortBy === 'bookings') {
      users.sort((a, b) => (b.gamesPlayed || 0) - (a.gamesPlayed || 0));
    } else {
      // Default: newest
      users.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    const total = users.length;
    const page = Math.max(1, params.page || 1);
    const limit = params.limit || 8;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const offset = (page - 1) * limit;
    const paginated = users.slice(offset, offset + limit);

    return {
      users: paginated,
      total,
      page,
      totalPages,
      limit,
    };
  },

  getUserCounts() {
    const all = adminService.getUsers();
    return {
      all: all.length,
      players: all.filter((u) => u.role === 'player').length,
      owners: all.filter((u) => u.role === 'facility_owner').length,
      banned: all.filter((u) => u.isBanned).length,
    };
  },

  getUserBookings(userId: string): Booking[] {
    return bookingService.getBookings(userId);
  },

  banUser(userId: string, reason?: string): User {
    return adminService.banUser(userId, reason);
  },

  unbanUser(userId: string): User {
    return adminService.unbanUser(userId);
  },
};
