export interface OwnerNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'booking' | 'maintenance' | 'cancellation' | 'earnings';
  read: boolean;
}

export interface OwnerSettings {
  autoApproveBookings: boolean;
  cancellationWindowHours: number;
  instantRefundAllowed: boolean;
  payoutUpiId: string;
  bankAccount: string;
  ifscCode: string;
  operatingDays: string[];
}

const STORAGE_NOTIFICATIONS_KEY = 'quickcourt_owner_notifications';
const STORAGE_SETTINGS_KEY = 'quickcourt_owner_settings';

const DEFAULT_NOTIFICATIONS: OwnerNotification[] = [
  {
    id: 'notif_1',
    title: 'New Booking Received',
    message: 'Rahul Patel reserved Court 02 (Badminton) for tomorrow 06:00 PM - 07:00 PM.',
    time: '5 mins ago',
    type: 'booking',
    read: false,
  },
  {
    id: 'notif_2',
    title: 'Maintenance Block Active',
    message: 'Court 01 has a scheduled line resurfacing block on 05 Sep, 02:00 PM.',
    time: '2 hours ago',
    type: 'maintenance',
    read: false,
  },
  {
    id: 'notif_3',
    title: 'Booking Cancelled by Player',
    message: 'Booking QC-20260904-8921 was cancelled by player with 100% refund policy.',
    time: 'Yesterday',
    type: 'cancellation',
    read: true,
  },
  {
    id: 'notif_4',
    title: 'Weekly Payout Processed',
    message: '₹48,200 net weekly settlement has been initiated to your linked HDFC bank account.',
    time: '2 days ago',
    type: 'earnings',
    read: true,
  },
];

const DEFAULT_SETTINGS: OwnerSettings = {
  autoApproveBookings: true,
  cancellationWindowHours: 2,
  instantRefundAllowed: true,
  payoutUpiId: 'smasharena@okhdfcbank',
  bankAccount: '•••• •••• •••• 8921',
  ifscCode: 'HDFC0001248',
  operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};

export const ownerService = {
  getNotifications(): OwnerNotification[] {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    localStorage.setItem(STORAGE_NOTIFICATIONS_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
    return DEFAULT_NOTIFICATIONS;
  },

  markAllNotificationsRead(): OwnerNotification[] {
    const notifs = this.getNotifications().map((n) => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_NOTIFICATIONS_KEY, JSON.stringify(notifs));
    return notifs;
  },

  getSettings(): OwnerSettings {
    const raw = localStorage.getItem(STORAGE_SETTINGS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  },

  saveSettings(updates: Partial<OwnerSettings>): OwnerSettings {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  },
};
