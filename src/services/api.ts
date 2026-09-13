import {
  Facility,
  Court,
  TimeSlot,
  Booking,
  Match,
  Review,
  Notification,
  User,
  Report,
  AdminAuditLog,
} from '../types';

const API_BASE = '/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('qc_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.');
  }

  return data as T;
}

export const api = {
  // Auth
  login: (email: string, password?: string) =>
    request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (payload: {
    name: string;
    email: string;
    phone: string;
    role: string;
    sportsPreferences?: string[];
    businessName?: string;
  }) =>
    request<{ message: string; email: string; demoOtp: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  verifyOtp: (email: string, otp: string) =>
    request<{ token: string; user: User }>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    }),

  resendOtp: (email: string) =>
    request<{ message: string; demoOtp: string }>('/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  // Facilities
  getFacilities: (params?: {
    sport?: string;
    search?: string;
    city?: string;
    venueType?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    amenity?: string;
    status?: string;
    ownerId?: string;
    sort?: string;
  }) => {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          query.append(key, String(val));
        }
      });
    }
    return request<Facility[]>(`/facilities?${query.toString()}`);
  },

  getFacilityById: (id: string) =>
    request<Facility & { courts: Court[]; reviews: Review[] }>(`/facilities/${id}`),

  createFacility: (data: Partial<Facility> & { courtCount?: number }) =>
    request<Facility>('/facilities', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Courts
  getCourts: (facilityId: string) => request<Court[]>(`/courts/${facilityId}`),

  createCourt: (data: Partial<Court>) =>
    request<Court>('/courts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateCourt: (id: string, data: Partial<Court>) =>
    request<Court>(`/courts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  updateCourtStatus: (id: string, status: string) =>
    request<Court>(`/courts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  // Slots
  getSlots: (courtId: string, facilityId: string, date: string) =>
    request<TimeSlot[]>(`/slots?courtId=${courtId}&facilityId=${facilityId}&date=${date}`),

  // Bookings
  createBooking: (data: {
    userId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    facilityId: string;
    courtId: string;
    date: string;
    startTime: string;
    endTime: string;
    discount?: number;
  }) =>
    request<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMyBookings: (userId: string) => request<Booking[]>(`/bookings/my?userId=${userId}`),
  getBookings: (userId?: string) => request<Booking[]>(`/bookings/my?userId=${userId || 'usr_player_1'}`),

  cancelBooking: (id: string, reason?: string) =>
    request<{ message: string; booking: Booking; refundAmount: number; refundPercent: string }>(
      `/bookings/${id}/cancel`,
      {
        method: 'PATCH',
        body: JSON.stringify({ reason }),
      }
    ),

  // Matches
  getMatches: (params?: { sport?: string; skillLevel?: string; city?: string; status?: string }) => {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v && v !== 'All') query.append(k, v);
      });
    }
    return request<Match[]>(`/matches?${query.toString()}`);
  },

  createMatch: (data: Partial<Match>) =>
    request<Match>('/matches', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  joinMatch: (matchId: string, user: { userId: string; name: string; avatar: string }) =>
    request<Match>(`/matches/${matchId}/join`, {
      method: 'POST',
      body: JSON.stringify(user),
    }),

  // Reviews
  getReviews: (facilityId?: string) =>
    request<Review[]>(`/reviews${facilityId ? `?facilityId=${facilityId}` : ''}`),

  createReview: (data: Partial<Review>) =>
    request<Review>('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Notifications
  getNotifications: (userId: string, role: string) =>
    request<Notification[]>(`/notifications?userId=${userId}&role=${role}`),

  markNotificationRead: (id: string) =>
    request<{ success: boolean }>(`/notifications/${id}/read`, {
      method: 'PATCH',
    }),

  // Facility Owner
  getOwnerDashboard: (ownerId: string) =>
    request<{
      kpis: {
        totalBookings: number;
        activeCourts: number;
        totalEarnings: number;
        occupancyRate: string;
      };
      facilities: Facility[];
      courts: Court[];
      bookingTrends: { day: string; bookings: number; earnings: number }[];
      peakHours: { hour: string; bookings: number }[];
    }>(`/owner/dashboard?ownerId=${ownerId}`),

  blockSlot: (courtId: string, date: string, startTime: string, action: 'block' | 'unblock') =>
    request<{ success: boolean; slotKey: string; action: string }>('/owner/slots/block', {
      method: 'POST',
      body: JSON.stringify({ courtId, date, startTime, action }),
    }),

  // Admin
  getAdminDashboard: () =>
    request<{
      kpis: {
        totalUsers: number;
        totalOwners: number;
        totalBookings: number;
        activeCourts: number;
        pendingFacilities: number;
        activeFacilities: number;
        platformEarnings: number;
      };
      registrationTrends: { month: string; players: number; owners: number }[];
      sportsBreakdown: { name: string; bookings: number; share: number }[];
      recentAudits: AdminAuditLog[];
    }>('/admin/dashboard'),

  getAdminFacilities: () => request<Facility[]>('/admin/facilities'),

  approveFacility: (id: string) =>
    request<Facility>(`/admin/facilities/${id}/approve`, {
      method: 'PATCH',
    }),

  rejectFacility: (id: string, reason: string) =>
    request<Facility>(`/admin/facilities/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    }),

  getAdminUsers: () => request<User[]>('/admin/users'),

  toggleBanUser: (id: string) =>
    request<User>(`/admin/users/${id}/ban`, {
      method: 'PATCH',
    }),

  toggleUserBan: (id: string, _isBanned?: boolean) =>
    request<User>(`/admin/users/${id}/ban`, {
      method: 'PATCH',
    }),

  getAdminReports: () => request<Report[]>('/admin/reports'),

  resolveReport: (id: string, action: string, actionTaken: string) =>
    request<Report>(`/admin/reports/${id}/resolve`, {
      method: 'PATCH',
      body: JSON.stringify({ action, actionTaken }),
    }),

  getAdminAuditLogs: () => request<AdminAuditLog[]>('/admin/audit-logs'),
};
