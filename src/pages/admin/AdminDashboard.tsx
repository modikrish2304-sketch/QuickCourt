import React, { useState } from 'react';
import {
  Users,
  Building2,
  CalendarCheck,
  TrendingUp,
  Clock,
  ShieldCheck,
  Download,
  Filter,
} from 'lucide-react';
import { analyticsService } from '../../services/analyticsService';
import { adminService } from '../../services/adminService';
import { AdminKPICard } from '../../components/admin/AdminKPICard';
import { BookingActivityChart } from '../../components/admin/BookingActivityChart';
import { UserRegistrationChart } from '../../components/admin/UserRegistrationChart';
import { FacilityApprovalChart } from '../../components/admin/FacilityApprovalChart';
import { ActiveSportsChart } from '../../components/admin/ActiveSportsChart';
import { EarningsChart } from '../../components/admin/EarningsChart';
import { RecentActivity } from '../../components/admin/RecentActivity';
import { PendingFacilities } from '../../components/admin/PendingFacilities';
import { FacilityReviewModal } from '../../components/admin/FacilityReviewModal';
import { Facility } from '../../types';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const stats = analyticsService.getGlobalAdminStats();
  const [facilities, setFacilities] = useState<Facility[]>(() => adminService.getFacilities());
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleOpenReview = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsReviewOpen(true);
  };

  const handleApprove = (facilityId: string, comment?: string) => {
    adminService.approveFacility(facilityId, comment);
    setFacilities(adminService.getFacilities());
  };

  const handleReject = (facilityId: string, reason: string) => {
    adminService.rejectFacility(facilityId, reason);
    setFacilities(adminService.getFacilities());
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#172033]">
              Admin Dashboard
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
              Live Control
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Platform-wide metrics, active user registrations, facility audits, and revenue simulations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('/admin/facilities')}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Audit Queue ({stats.pendingFacilities})</span>
          </button>

          <button
            onClick={() => {
              // Export platform snapshot
              const csvContent =
                'data:text/csv;charset=utf-8,Category,Value\nTotal Users,' +
                stats.totalUsers +
                '\nTotal Facilities,' +
                stats.totalActiveCourts +
                '\nTotal Bookings,' +
                stats.todayBookings +
                '\nPlatform GMV,₹42.8L';
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement('a');
              link.setAttribute('href', encodedUri);
              link.setAttribute('download', 'quickcourt_admin_metrics.csv');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Snapshot</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <AdminKPICard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          growth="+14.2%"
          subtitle="this month"
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50 border-blue-100"
          onClick={() => onNavigate('/admin/users')}
        />

        <AdminKPICard
          title="Total Facilities"
          value={stats.totalActiveCourts}
          growth="+8"
          subtitle="new this month"
          icon={Building2}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50 border-emerald-100"
          onClick={() => onNavigate('/admin/facilities')}
        />

        <AdminKPICard
          title="Active Bookings"
          value={stats.todayBookings.toLocaleString()}
          growth="+22.4%"
          subtitle="vs last week"
          icon={CalendarCheck}
          iconColor="text-purple-600"
          iconBg="bg-purple-50 border-purple-100"
          onClick={() => onNavigate('/admin/bookings')}
        />

        <AdminKPICard
          title="Platform GMV"
          value={stats.monthlyEarnings}
          growth="+18.5%"
          subtitle="run rate"
          icon={TrendingUp}
          iconColor="text-teal-600"
          iconBg="bg-teal-50 border-teal-100"
        />

        <AdminKPICard
          title="Pending Approvals"
          value={stats.pendingFacilities}
          subtitle="requires action"
          growth={stats.pendingFacilities > 0 ? 'Action Needed' : 'All clear'}
          isPositive={stats.pendingFacilities === 0}
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50 border-amber-100"
          onClick={() => onNavigate('/admin/facilities')}
        />
      </div>

      {/* Primary Analytics Charts (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingActivityChart />
        <UserRegistrationChart />
      </div>

      {/* Secondary Analytics Charts (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FacilityApprovalChart />
        <ActiveSportsChart />
      </div>

      {/* Platform Earnings Simulation */}
      <EarningsChart />

      {/* Live Operations & Review Queue Grid (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PendingFacilities
          facilities={facilities}
          onReviewAll={() => onNavigate('/admin/facilities')}
          onSelectFacility={handleOpenReview}
        />
        <RecentActivity onNavigate={onNavigate} />
      </div>

      {/* Facility Review Modal */}
      <FacilityReviewModal
        facility={selectedFacility}
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};
