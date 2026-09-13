import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  CalendarCheck,
  AlertTriangle,
  UserCheck,
  Settings,
  Shield,
  LogOut,
  X,
  Activity,
  ArrowRightLeft,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { facilityApprovalService } from '../../services/facilityApprovalService';
import { reportService } from '../../services/reportService';

interface AdminSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentPath,
  onNavigate,
  isOpen,
  onClose,
}) => {
  const { logout, switchDemoRole } = useAuth();
  const facilityCounts = facilityApprovalService.getFacilityCounts();
  const reportCounts = reportService.getReportCounts();

  const navigationSections = [
    {
      title: 'OVERVIEW',
      items: [
        {
          name: 'Dashboard',
          path: '/admin/dashboard',
          icon: LayoutDashboard,
          badge: null,
        },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        {
          name: 'Facilities',
          path: '/admin/facilities',
          icon: Building2,
          badge:
            facilityCounts.pending > 0 ? (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                {facilityCounts.pending}
              </span>
            ) : null,
        },
        {
          name: 'Users',
          path: '/admin/users',
          icon: Users,
          badge: (
            <span className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-100 rounded-md">
              12.8k
            </span>
          ),
        },
        {
          name: 'Bookings',
          path: '/admin/bookings',
          icon: CalendarCheck,
          badge: null,
        },
      ],
    },
    {
      title: 'MODERATION',
      items: [
        {
          name: 'Reports',
          path: '/admin/reports',
          icon: AlertTriangle,
          badge:
            reportCounts.pending > 0 ? (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                {reportCounts.pending}
              </span>
            ) : null,
        },
      ],
    },
    {
      title: 'ACCOUNT',
      items: [
        {
          name: 'Profile',
          path: '/admin/profile',
          icon: UserCheck,
          badge: null,
        },
        {
          name: 'Settings',
          path: '/admin/settings',
          icon: Settings,
          badge: null,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-[#E5E7EB] flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#E5E7EB]">
          <div
            onClick={() => onNavigate('/admin/dashboard')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold font-display tracking-tight text-[#172033] flex items-center gap-1.5">
                QuickCourt
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-md">
                  ADMIN
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium tracking-wide">
                Control Center
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <div className="px-3 mb-2 text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    currentPath === item.path ||
                    (item.path !== '/admin/dashboard' && currentPath.startsWith(item.path));
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        onNavigate(item.path);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-[#F7F9F8]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? 'text-emerald-600' : 'text-slate-400'
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* System Health & Footer */}
        <div className="p-4 border-t border-[#E5E7EB] space-y-3 bg-[#F7F9F8]/60">
          {/* Status Indicator */}
          <div className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-slate-200/80 text-[11px]">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Platform 99.9%</span>
            </div>
            <span className="font-mono text-emerald-600 font-bold text-[10px]">
              ONLINE
            </span>
          </div>

          {/* Quick Exit / Switch */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                switchDemoRole('player');
                onNavigate('/');
              }}
              className="flex-1 py-2 px-2.5 text-[11px] font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              title="Open Player Portal"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>Player View</span>
            </button>
            <button
              onClick={() => {
                logout();
                onNavigate('/login');
              }}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-xl transition-colors"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
