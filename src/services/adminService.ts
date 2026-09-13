import {
  Facility,
  User,
  Booking,
  Report,
  AdminAuditLog,
  Notification,
} from '../types';
import {
  SEED_FACILITIES,
  SEED_USERS,
  SEED_BOOKINGS,
  SEED_REPORTS,
  SEED_AUDIT_LOGS,
  SEED_NOTIFICATIONS,
} from '../data/seedData';
import { authService } from './authService';

const STORAGE_FACILITIES_KEY = 'quickcourt_facilities';
const STORAGE_USERS_KEY = 'quickcourt_users';
const STORAGE_BOOKINGS_KEY = 'quickcourt_bookings';
const STORAGE_REPORTS_KEY = 'quickcourt_reports';
const STORAGE_AUDIT_LOGS_KEY = 'quickcourt_audit_logs';
const STORAGE_NOTIFICATIONS_KEY = 'quickcourt_notifications';
const STORAGE_ADMIN_SETTINGS_KEY = 'quickcourt_admin_settings';

export interface AdminSettings {
  platformFee: number;
  commissionPercentage: number;
  autoApproveVerifiedOwners: boolean;
  maintenanceMode: boolean;
  supportEmail: string;
  emergencyAlertBanner: string;
}

const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  platformFee: 25,
  commissionPercentage: 5,
  autoApproveVerifiedOwners: false,
  maintenanceMode: false,
  supportEmail: 'ops@quickcourt.in',
  emergencyAlertBanner: '',
};

// Ensure realistic pending facilities exist in seed data for rich demo
function ensureDemoPendingFacilities(facilities: Facility[]): Facility[] {
  const hasPending = facilities.some((f) => f.status === 'pending');
  if (!hasPending) {
    const demoPending: Facility[] = [
      {
        id: 'fac_pending_1',
        ownerId: 'usr_owner_1',
        ownerName: 'Arjun Mehta',
        name: 'Smash Arena Bopal',
        description:
          'Modern indoor badminton and squash facility featuring 6 BWF-standard wooden courts, AC waiting lounge, and sports physio room.',
        sports: ['Badminton', 'Squash'],
        venueType: 'Indoor',
        address: 'Bopal-Ambli Road, Near South Bopal Circle',
        area: 'Bopal',
        city: 'Ahmedabad',
        pincode: '380058',
        lat: 23.033,
        lng: 72.464,
        rating: 0,
        reviewCount: 0,
        startingPrice: 400,
        amenities: [
          'Parking',
          'Changing Rooms',
          'Showers',
          'Air Conditioning',
          'Wi-Fi',
          'Water Dispenser',
          'Cafeteria',
        ],
        openingTime: '06:00',
        closingTime: '23:00',
        images: [
          'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=900&auto=format&fit=crop&q=80',
        ],
        verifiedBadge: false,
        status: 'pending',
        courtCount: 6,
        rules: [
          'Non-marking gum sole shoes mandatory.',
          'Please register 10 minutes prior to match.',
        ],
        createdAt: '2026-09-04T02:15:00Z',
      },
      {
        id: 'fac_pending_2',
        ownerId: 'usr_owner_2',
        ownerName: 'Vikas Malhotra',
        name: 'Champions Turf & Cricket Net Arena',
        description:
          'Twin 7v7 artificial grass floodlit turf and 4 automated cricket bowling machine cages with high-speed video recording.',
        sports: ['Football', 'Cricket'],
        venueType: 'Outdoor',
        address: 'Sindhu Bhavan Road, Thaltej',
        area: 'SBR',
        city: 'Ahmedabad',
        pincode: '380059',
        lat: 23.052,
        lng: 72.508,
        rating: 0,
        reviewCount: 0,
        startingPrice: 850,
        amenities: [
          'Parking',
          'Floodlights',
          'Changing Rooms',
          'Equipment Rental',
          'Spectator Gallery',
          'First Aid',
        ],
        openingTime: '06:00',
        closingTime: '02:00',
        images: [
          'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&auto=format&fit=crop&q=80',
        ],
        verifiedBadge: false,
        status: 'pending',
        courtCount: 4,
        rules: [
          'No metal studs permitted on turf.',
          'Bring valid government photo ID for equipment rental.',
        ],
        createdAt: '2026-09-03T18:40:00Z',
      },
      {
        id: 'fac_pending_3',
        ownerId: 'usr_owner_3',
        ownerName: 'Deepak Patel',
        name: 'Ace Tennis & Pickleball Centre',
        description:
          'ITF acrylic hard tennis court and 4 championship pickleball courts with USA Pickleball regulation nets and night lighting.',
        sports: ['Tennis', 'Pickleball'],
        venueType: 'Outdoor',
        address: 'Drive-In Road, Memnagar',
        area: 'Memnagar',
        city: 'Ahmedabad',
        pincode: '380052',
        lat: 23.048,
        lng: 72.529,
        rating: 0,
        reviewCount: 0,
        startingPrice: 600,
        amenities: ['Parking', 'Showers', 'Pro Shop', 'Ball Machine Rental', 'Coaches Available'],
        openingTime: '06:00',
        closingTime: '22:00',
        images: [
          'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=900&auto=format&fit=crop&q=80',
        ],
        verifiedBadge: false,
        status: 'pending',
        courtCount: 5,
        rules: ['Proper tennis footwear required.', 'Maximum 4 players per court.'],
        createdAt: '2026-09-03T14:10:00Z',
      },
    ];
    facilities.unshift(...demoPending);
    localStorage.setItem(STORAGE_FACILITIES_KEY, JSON.stringify(facilities));
  }
  return facilities;
}

// Ensure realistic demo reports
function ensureDemoReports(reportsList: Report[]): Report[] {
  if (reportsList.length <= 1) {
    const richReports: Report[] = [
      {
        id: 'REP-20260904-001',
        reporterId: 'usr_player_2',
        reporterName: 'Rohan Deshmukh',
        targetType: 'facility',
        targetId: 'fac_4',
        targetName: 'Hoops & Spike Indoor Complex',
        reason: 'Air conditioning malfunction during booked tournament slot',
        details:
          'The indoor court air ventilation was switched off during our 2-hour game despite high heat. Staff took 45 minutes to respond.',
        status: 'pending',
        createdAt: '2026-09-04T03:10:00Z',
      },
      {
        id: 'REP-20260903-018',
        reporterId: 'usr_player_3',
        reporterName: 'Ananya Roy',
        targetType: 'facility',
        targetId: 'fac_2',
        targetName: 'Apex Turf & Box Cricket Arena',
        reason: 'Lighting flicker on pitch 2',
        details:
          'Left floodlight mast kept blinking during evening cricket match, making it unsafe to face fast bowling.',
        status: 'pending',
        createdAt: '2026-09-03T20:45:00Z',
      },
      {
        id: 'REP-20260902-044',
        reporterId: 'usr_owner_1',
        reporterName: 'Rajesh Sharma',
        targetType: 'user',
        targetId: 'usr_player_4',
        targetName: 'Kabir Mehta',
        reason: 'Repeated late check-in with outside non-sports footwear',
        details:
          'Player wore muddy street shoes onto badminton synthetic mat despite warnings from the front desk staff.',
        status: 'pending',
        createdAt: '2026-09-02T18:15:00Z',
      },
      {
        id: 'REP-20260830-102',
        reporterId: 'usr_player_1',
        reporterName: 'Krish Patel',
        targetType: 'facility',
        targetId: 'fac_1',
        targetName: 'Smash Arena Indiranagar',
        reason: 'Parking barricade jammed',
        details: 'Underground 2-wheeler parking gate was locked for 20 minutes.',
        status: 'resolved',
        actionTaken: 'Contacted facility manager. Gate motor replaced on 31 Aug.',
        createdAt: '2026-08-30T17:30:00Z',
      },
    ];
    reportsList = [...richReports, ...reportsList];
    localStorage.setItem(STORAGE_REPORTS_KEY, JSON.stringify(reportsList));
  }
  return reportsList;
}

export const adminService = {
  // Facilities
  getFacilities(): Facility[] {
    const raw = localStorage.getItem(STORAGE_FACILITIES_KEY);
    let list: Facility[] = [];
    if (raw) {
      try {
        list = JSON.parse(raw);
      } catch {
        list = SEED_FACILITIES;
      }
    } else {
      list = [...SEED_FACILITIES];
    }
    return ensureDemoPendingFacilities(list);
  },

  approveFacility(
    facilityId: string,
    adminComment = 'Verified business license, court specifications and safety standards.'
  ): Facility {
    const facilities = this.getFacilities();
    const idx = facilities.findIndex((f) => f.id === facilityId);
    if (idx === -1) throw new Error('Facility not found');

    const facility = facilities[idx];
    const updated: Facility = {
      ...facility,
      status: 'approved',
      approved: true,
      verifiedBadge: true,
      rejectionReason: undefined,
    };

    facilities[idx] = updated;
    localStorage.setItem(STORAGE_FACILITIES_KEY, JSON.stringify(facilities));

    // Create Audit Log
    this.addAuditLog({
      action: 'Facility Approved',
      target: `${facility.name} (${facility.id})`,
      description: adminComment,
    });

    // Notify Owner
    this.addNotification({
      userId: facility.ownerId,
      roleTarget: 'facility_owner',
      title: '🎉 Facility Approved & Live!',
      message: `Congratulations! ${facility.name} has been reviewed and approved by QuickCourt administration. Players can now book your courts!`,
      type: 'facility_approved',
      link: '/owner/dashboard',
    });

    return updated;
  },

  rejectFacility(facilityId: string, reason: string): Facility {
    const facilities = this.getFacilities();
    const idx = facilities.findIndex((f) => f.id === facilityId);
    if (idx === -1) throw new Error('Facility not found');

    const facility = facilities[idx];
    const updated: Facility = {
      ...facility,
      status: 'rejected',
      approved: false,
      rejectionReason: reason || 'Facility did not meet current platform quality standards.',
    };

    facilities[idx] = updated;
    localStorage.setItem(STORAGE_FACILITIES_KEY, JSON.stringify(facilities));

    // Create Audit Log
    this.addAuditLog({
      action: 'Facility Rejected',
      target: `${facility.name} (${facility.id})`,
      description: `Reason: ${reason || 'Not specified'}`,
    });

    // Notify Owner
    this.addNotification({
      userId: facility.ownerId,
      roleTarget: 'facility_owner',
      title: '⚠️ Facility Review Update',
      message: `Your facility submission for "${facility.name}" was not approved: ${
        reason || 'Quality criteria unfulfilled'
      }. You may edit and resubmit.`,
      type: 'facility_rejected',
      link: '/owner/facility',
    });

    return updated;
  },

  // Users
  getUsers(): User[] {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    const seed = [...SEED_USERS];
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(seed));
    return seed;
  },

  banUser(userId: string, reason?: string): User {
    const users = this.getUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new Error('User not found');

    const user = users[idx];
    const updated: User = {
      ...user,
      isBanned: true,
    };

    users[idx] = updated;
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    this.addAuditLog({
      action: 'User Banned',
      target: `${user.name} (${user.id})`,
      description: reason ? `Reason: ${reason}` : 'Account suspended due to policy violation.',
    });

    return updated;
  },

  unbanUser(userId: string): User {
    const users = this.getUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new Error('User not found');

    const user = users[idx];
    const updated: User = {
      ...user,
      isBanned: false,
    };

    users[idx] = updated;
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    this.addAuditLog({
      action: 'User Unbanned',
      target: `${user.name} (${user.id})`,
      description: 'Account access restored by administrator.',
    });

    return updated;
  },

  // Bookings
  getBookings(): Booking[] {
    const raw = localStorage.getItem(STORAGE_BOOKINGS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    const seed = [...SEED_BOOKINGS];
    localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(seed));
    return seed;
  },

  // Reports
  getReports(): Report[] {
    const raw = localStorage.getItem(STORAGE_REPORTS_KEY);
    let list: Report[] = [];
    if (raw) {
      try {
        list = JSON.parse(raw);
      } catch {
        list = SEED_REPORTS;
      }
    } else {
      list = [...SEED_REPORTS];
    }
    return ensureDemoReports(list);
  },

  updateReportStatus(
    reportId: string,
    status: 'pending' | 'resolved' | 'dismissed',
    actionTaken?: string
  ): Report {
    const reports = this.getReports();
    const idx = reports.findIndex((r) => r.id === reportId);
    if (idx === -1) throw new Error('Report not found');

    const updated: Report = {
      ...reports[idx],
      status,
      actionTaken: actionTaken || (status === 'resolved' ? 'Reviewed and resolved by admin.' : 'Dismissed'),
    };

    reports[idx] = updated;
    localStorage.setItem(STORAGE_REPORTS_KEY, JSON.stringify(reports));

    this.addAuditLog({
      action: `Report ${status.toUpperCase()}`,
      target: `Report #${reportId}`,
      description: actionTaken || `Marked as ${status}`,
    });

    return updated;
  },

  // Audit Trail
  getAuditLogs(): AdminAuditLog[] {
    const raw = localStorage.getItem(STORAGE_AUDIT_LOGS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    const seed = [...SEED_AUDIT_LOGS];
    localStorage.setItem(STORAGE_AUDIT_LOGS_KEY, JSON.stringify(seed));
    return seed;
  },

  addAuditLog(data: { action: string; target: string; description: string }): AdminAuditLog {
    const logs = this.getAuditLogs();
    const currentUser = authService.getCurrentUser();
    const newLog: AdminAuditLog = {
      id: `log_${Date.now()}`,
      adminId: currentUser?.id || 'usr_admin_1',
      adminName: currentUser?.name || 'Priya Verma',
      action: data.action,
      target: data.target,
      description: data.description,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    localStorage.setItem(STORAGE_AUDIT_LOGS_KEY, JSON.stringify(logs.slice(0, 100)));
    return newLog;
  },

  // Notifications
  getNotifications(): Notification[] {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    return [...SEED_NOTIFICATIONS];
  },

  addNotification(data: Omit<Notification, 'id' | 'read' | 'timestamp'>): Notification {
    const notifs = this.getNotifications();
    const newNotif: Notification = {
      ...data,
      id: `notif_${Date.now()}`,
      read: false,
      timestamp: new Date().toISOString(),
    };
    notifs.unshift(newNotif);
    localStorage.setItem(STORAGE_NOTIFICATIONS_KEY, JSON.stringify(notifs.slice(0, 50)));
    return newNotif;
  },

  markNotificationRead(id: string) {
    const notifs = this.getNotifications();
    const idx = notifs.findIndex((n) => n.id === id);
    if (idx !== -1) {
      notifs[idx].read = true;
      localStorage.setItem(STORAGE_NOTIFICATIONS_KEY, JSON.stringify(notifs));
    }
  },

  // Settings
  getSettings(): AdminSettings {
    const raw = localStorage.getItem(STORAGE_ADMIN_SETTINGS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    return DEFAULT_ADMIN_SETTINGS;
  },

  updateSettings(settings: Partial<AdminSettings>): AdminSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_ADMIN_SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  },
};
