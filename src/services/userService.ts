import { User } from '../types';
import { authService } from './authService';

export const userService = {
  getUserProfile(userId: string): User | null {
    const users = authService.getUsers();
    return users.find((u) => u.id === userId) || null;
  },

  async updateUserProfile(
    userId: string,
    updates: { fullName?: string; name?: string; email?: string; avatar?: string; phone?: string; city?: string }
  ): Promise<User> {
    const users = authService.getUsers();
    const index = users.findIndex((u) => u.id === userId);

    if (index === -1) {
      throw new Error('User not found');
    }

    const current = users[index];
    const updatedName = updates.fullName || updates.name || current.name;
    const updatedUser: User = {
      ...current,
      name: updatedName,
      fullName: updatedName,
      email: updates.email || current.email,
      avatar: updates.avatar || current.avatar,
      phone: updates.phone || current.phone,
      city: updates.city || current.city,
    };

    users[index] = updatedUser;
    localStorage.setItem('quickcourt_users', JSON.stringify(users));

    const currentUser = authService.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      localStorage.setItem('quickcourt_current_user', JSON.stringify(updatedUser));
    }

    return updatedUser;
  }
};
