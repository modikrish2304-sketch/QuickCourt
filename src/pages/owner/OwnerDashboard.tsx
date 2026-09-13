import React, { useState, useEffect } from 'react';
import {
  Building2,
  CalendarCheck,
  Layers,
  Wallet,
  Clock,
  Plus,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { KPICard } from '../../components/owner/KPICard';
import { BookingTrendChart } from '../../components/owner/BookingTrendChart';
import { EarningsChart } from '../../components/owner/EarningsChart';
import { PeakHoursChart } from '../../components/owner/PeakHoursChart';
import { BookingCalendar } from '../../components/owner/BookingCalendar';
import { RecentBookings } from '../../components/owner/RecentBookings';
import { QuickActions } from '../../components/owner/QuickActions';
import { CourtFormModal } from '../../components/courts/CourtFormModal';
import { BlockSlotModal } from '../../components/timeslots/BlockSlotModal';
import { BookingDetailsModal } from '../../components/owner/BookingDetailsModal';

import { facilityService } from '../../services/facilityService';
import { courtService } from '../../services/courtService';
import { timeslotService } from '../../services/timeslotService';
import { analyticsService } from '../../services/analyticsService';
import { bookingService } from '../../services/bookingService';
import { Facility, Court, Booking } from '../../types';

export interface OwnerDashboardProps {
  onNavigate: (route: string) => void;
  onShowToast?: (type: 'success' | 'warning' | 'error' | 'info', title: string, msg?: string) => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const { user } = useAuth();

  const [facility, setFacility] = useState<Facility>(() =>
    facilityService.getOwnerFacility(user?.id || 'usr_owner_1')
  );
  const [courts, setCourts] = useState<Court[]>(() =>
    courtService.getCourts(facility.id)
  );
  const [bookings, setBookings] = useState<Booking[]>(() =>
    bookingService.getBookings()
  );

  // Modals state
  const [isAddCourtOpen, setIsAddCourtOpen] = useState(false);
  const [isBlockSlotOpen, setIsBlockSlotOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Refresh data
  const refreshData = () => {
    const fac = facilityService.getOwnerFacility(user?.id || 'usr_owner_1');
    setFacility(fac);
    setCourts(courtService.getCourts(fac.id));
    setBookings(bookingService.getBookings());
  };

  useEffect(() => {
    refreshData();
  }, [user?.id]);

  // Analytics stats
  const stats = analyticsService.getStats(facility.id);

  // Handle Add Court
  const handleAddCourtSubmit = async (courtData: any) => {
    try {
      await courtService.addCourt(courtData);
      setIsAddCourtOpen(false);
      refreshData();
      if (onShowToast) {
        onShowToast('success', 'Court Added', `${courtData.name} is now operational.`);
      }
    } catch (err: any) {
      if (onShowToast) {
        onShowToast('error', 'Error', err.message || 'Failed to add court');
      }
    }
  };

  // Handle Block Slot
  const handleBlockSlotSubmit = async (payload: any) => {
    try {
      await timeslotService.blockSlot(payload);
      setIsBlockSlotOpen(false);
      refreshData();
      if (onShowToast) {
        onShowToast(
          'warning',
          'Slot Blocked',
          `Court reserved for: ${payload.reason}`
        );
      }
    } catch (err: any) {
      if (onShowToast) {
        onShowToast('error', 'Error', err.message || 'Failed to block slot');
      }
    }
  };

  // Handle Cancel Booking
  const handleCancelBooking = (bookingId: string, reason: string) => {
    bookingService.cancelBooking(bookingId, reason);
    refreshData();
    if (onShowToast) {
      onShowToast('info', 'Booking Cancelled', '100% refund initiated to player.');
    }
  };

  const ownerName = user?.name || user?.fullName || 'Arjun Mehta';

  return (
    <OwnerLayout
      currentRoute="/owner/dashboard"
      onNavigate={onNavigate}
      pageTitle="Facility Overview"
    >
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Top Greeting Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">
                Good morning, {ownerName} 👋
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200/80">
                Approved Partner ✓
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Here's what's happening with{' '}
              <span className="font-semibold text-slate-700">{facility.name}</span>{' '}
              today.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate('/owner/facility')}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Facility Profile</span>
            </button>

            <button
              onClick={() => setIsAddCourtOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Court</span>
            </button>
          </div>
        </div>

        {/* 1. KPI Cards Grid (4 Primary Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            label="Total Bookings"
            value={stats.totalBookings}
            growth={stats.totalBookingsGrowth}
            isPositive={true}
            subtext="Confirmed slots"
            icon={CalendarCheck}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
            onClick={() => onNavigate('/owner/bookings')}
          />

          <KPICard
            label="Active Courts"
            value={stats.activeCourts}
            subtext={stats.courtsRatioText}
            growth="Operational"
            isPositive={true}
            icon={Layers}
            iconColor="text-teal-600"
            iconBg="bg-teal-50"
            onClick={() => onNavigate('/owner/courts')}
          />

          <KPICard
            label="Estimated Earnings"
            value={`₹${stats.totalEarnings.toLocaleString()}`}
            growth={stats.earningsGrowth}
            isPositive={true}
            subtext="Weekly payout"
            icon={Wallet}
            iconColor="text-emerald-700"
            iconBg="bg-emerald-50"
            onClick={() => onNavigate('/owner/bookings')}
          />

          <KPICard
            label="Today's Bookings"
            value={stats.todayBookingsCount}
            subtext={`${stats.todayUpcomingCount} upcoming slots`}
            growth="Live schedule"
            isPositive={true}
            icon={Clock}
            iconColor="text-blue-600"
            iconBg="bg-blue-50"
            onClick={() => onNavigate('/owner/timeslots')}
          />
        </div>

        {/* 2. Quick Operations Bar */}
        <QuickActions
          onAddCourt={() => setIsAddCourtOpen(true)}
          onBlockSlot={() => setIsBlockSlotOpen(true)}
          onManageSlots={() => onNavigate('/owner/timeslots')}
          onViewBookings={() => onNavigate('/owner/bookings')}
          onEditFacility={() => onNavigate('/owner/facility')}
        />

        {/* 3. Analytics Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <BookingTrendChart facilityId={facility.id} />
          </div>
          <div className="lg:col-span-5">
            <EarningsChart facilityId={facility.id} />
          </div>
        </div>

        {/* 4. Peak Booking Hours + Live Schedule Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <PeakHoursChart facilityId={facility.id} />
          </div>
          <div className="lg:col-span-7">
            <BookingCalendar
              facilityId={facility.id}
              onSelectBooking={(b) => setSelectedBooking(b)}
            />
          </div>
        </div>

        {/* 5. Recent Bookings Table */}
        <RecentBookings
          bookings={bookings}
          onViewAll={() => onNavigate('/owner/bookings')}
          onSelectBooking={(b) => setSelectedBooking(b)}
        />
      </div>

      {/* Add Court Modal */}
      <CourtFormModal
        isOpen={isAddCourtOpen}
        onClose={() => setIsAddCourtOpen(false)}
        onSubmit={handleAddCourtSubmit}
        facilityId={facility.id}
      />

      {/* Block Slot Modal */}
      <BlockSlotModal
        isOpen={isBlockSlotOpen}
        onClose={() => setIsBlockSlotOpen(false)}
        courts={courts}
        onConfirmBlock={handleBlockSlotSubmit}
      />

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        onCancelBooking={handleCancelBooking}
      />
    </OwnerLayout>
  );
};
