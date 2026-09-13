import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification } from '../types';
import { SEED_NOTIFICATIONS } from '../data/seedData';
import { useAuth } from './AuthContext';
import { api } from '../services/api';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addToast: (title: string, message: string, type?: Notification['type']) => void;
  activeToast: { title: string; message: string; type: string } | null;
  clearToast: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    return SEED_NOTIFICATIONS;
  });

  const [activeToast, setActiveToast] = useState<{ title: string; message: string; type: string } | null>(null);

  useEffect(() => {
    if (user) {
      api.getNotifications(user.id, user.role)
        .then((data) => {
          if (data && data.length) {
            setNotifications(data);
          }
        })
        .catch(() => {
          // Keep initial seed notifications
        });
    }
  }, [user]);

  const unreadCount = notifications.filter(
    (n) => !n.read && (n.userId === user?.id || n.roleTarget === user?.role || n.roleTarget === 'all')
  ).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    api.markNotificationRead(id).catch(() => {});
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addToast = (title: string, message: string, type: Notification['type'] = 'booking_confirmed') => {
    setActiveToast({ title, message, type });
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      userId: user?.id || 'usr_player_1',
      roleTarget: (user?.role as any) || 'all',
      title,
      message,
      type,
      read: false,
      timestamp: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setTimeout(() => {
      setActiveToast((current) => (current?.title === title ? null : current));
    }, 4500);
  };

  const clearToast = () => setActiveToast(null);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addToast,
        activeToast,
        clearToast,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
