import { User, UserRole } from '../types';
import { SEED_USERS } from '../data/seedData';

const STORAGE_USERS_KEY = 'quickcourt_users';
const STORAGE_CURRENT_USER_KEY = 'quickcourt_current_user';
const STORAGE_PENDING_OTP_KEY = 'quickcourt_pending_otp';

function initializeUsers(): User[] {
  const existing = localStorage.getItem(STORAGE_USERS_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
      // Fallback
    }
  }
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(SEED_USERS));
  return SEED_USERS;
}

export const authService = {
  getUsers(): User[] {
    return initializeUsers();
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    if (!raw) {
      // Default to demo user for seamless instant demo inspection
      const defaultUser = initializeUsers()[0];
      if (defaultUser) {
        localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(defaultUser));
        return defaultUser;
      }
      return null;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  async login(email: string, password?: string, rememberMe = true): Promise<User> {
    const users = initializeUsers();
    const cleanEmail = email.trim().toLowerCase();
    let found = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      // Create user if testing random email during demo
      found = {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0],
        fullName: email.split('@')[0],
        email: cleanEmail,
        phone: '+91 98765 43210',
        role: 'player',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanEmail}`,
        city: 'Bengaluru',
        sportsPreferences: ['Badminton', 'Football'],
        skillLevel: 'Intermediate',
        activityScore: 75,
        gamesPlayed: 12,
        isVerified: true,
        isBanned: false,
        createdAt: new Date().toISOString(),
      };
      users.push(found);
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    }

    if (rememberMe) {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(found));
    } else {
      sessionStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(found));
    }

    return found;
  },

  async signup(data: {
    fullName: string;
    email: string;
    password?: string;
    role?: UserRole;
    avatar?: string;
  }): Promise<{ email: string; demoOtp: string }> {
    const cleanEmail = data.email.trim().toLowerCase();
    const demoOtp = '123456';

    const tempUser: User = {
      id: `usr_${Date.now()}`,
      name: data.fullName,
      fullName: data.fullName,
      email: cleanEmail,
      phone: '+91 98765 00000',
      role: data.role || 'player',
      avatar: data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanEmail}`,
      city: 'Ahmedabad',
      sportsPreferences: ['Badminton', 'Pickleball'],
      skillLevel: 'Beginner',
      activityScore: 50,
      gamesPlayed: 0,
      isVerified: false,
      isBanned: false,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      STORAGE_PENDING_OTP_KEY,
      JSON.stringify({ user: tempUser, otp: demoOtp, sentAt: Date.now() })
    );

    return { email: cleanEmail, demoOtp };
  },

  async verifyOtp(email: string, otp: string): Promise<User> {
    const rawPending = localStorage.getItem(STORAGE_PENDING_OTP_KEY);
    let userToActivate: User;

    if (rawPending) {
      try {
        const parsed = JSON.parse(rawPending);
        if (parsed.otp === otp || otp === '123456') {
          userToActivate = { ...parsed.user, isVerified: true };
        } else {
          throw new Error('Invalid verification code. Please enter 123456.');
        }
      } catch (e: any) {
        if (otp === '123456') {
          userToActivate = {
            id: `usr_${Date.now()}`,
            name: email.split('@')[0],
            fullName: email.split('@')[0],
            email,
            phone: '+91 98765 43210',
            role: 'player',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            city: 'Bengaluru',
            sportsPreferences: ['Badminton'],
            skillLevel: 'Intermediate',
            activityScore: 60,
            gamesPlayed: 0,
            isVerified: true,
            isBanned: false,
            createdAt: new Date().toISOString(),
          };
        } else {
          throw new Error(e.message || 'Invalid code');
        }
      }
    } else {
      if (otp === '123456' || otp.length === 6) {
        userToActivate = {
          id: `usr_${Date.now()}`,
          name: email.split('@')[0],
          fullName: email.split('@')[0],
          email,
          phone: '+91 98765 43210',
          role: 'player',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          city: 'Bengaluru',
          sportsPreferences: ['Badminton'],
          skillLevel: 'Intermediate',
          activityScore: 60,
          gamesPlayed: 0,
          isVerified: true,
          isBanned: false,
          createdAt: new Date().toISOString(),
        };
      } else {
        throw new Error('Invalid verification code. Please enter 123456.');
      }
    }

    const users = initializeUsers();
    const existingIdx = users.findIndex((u) => u.email.toLowerCase() === userToActivate.email.toLowerCase());
    if (existingIdx >= 0) {
      users[existingIdx] = userToActivate;
    } else {
      users.push(userToActivate);
    }

    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(userToActivate));
    localStorage.removeItem(STORAGE_PENDING_OTP_KEY);

    return userToActivate;
  },

  async resendOtp(email: string): Promise<string> {
    const demoOtp = '123456';
    const rawPending = localStorage.getItem(STORAGE_PENDING_OTP_KEY);
    if (rawPending) {
      const parsed = JSON.parse(rawPending);
      parsed.otp = demoOtp;
      parsed.sentAt = Date.now();
      localStorage.setItem(STORAGE_PENDING_OTP_KEY, JSON.stringify(parsed));
    }
    return demoOtp;
  },

  switchDemoRole(newRole: UserRole): User {
    const users = initializeUsers();
    let target = users.find((u) => u.role === newRole);
    if (!target) {
      target = {
        id: `usr_${newRole}_${Date.now()}`,
        name: newRole === 'admin' ? 'Priya Verma (Admin)' : newRole === 'facility_owner' ? 'Rajesh Sharma (Owner)' : 'Arjun Mehta (Player)',
        fullName: newRole === 'admin' ? 'Priya Verma' : newRole === 'facility_owner' ? 'Rajesh Sharma' : 'Arjun Mehta',
        email: `${newRole}@quickcourt.in`,
        phone: '+91 98765 43210',
        role: newRole,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newRole}`,
        city: 'Ahmedabad',
        sportsPreferences: ['Badminton'],
        skillLevel: 'Advanced',
        activityScore: 88,
        gamesPlayed: 14,
        isVerified: true,
        isBanned: false,
        createdAt: new Date().toISOString(),
      };
      users.push(target);
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    }
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(target));
    return target;
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const users = initializeUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      throw new Error('User not found');
    }
    const updatedUser: User = {
      ...users[index],
      ...updates,
    };
    users[index] = updatedUser;
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  },

  logout(): void {
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    sessionStorage.removeItem(STORAGE_CURRENT_USER_KEY);
  },
};
