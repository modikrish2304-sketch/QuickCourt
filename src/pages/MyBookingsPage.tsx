import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/bookingService';
import { Booking } from '../types';
import { BookingCard } from '../components/BookingCard';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  CalendarCheck,
  Search,
  Filter,
  QrCode,
  MapPin,
  Calendar,
  Clock,
  Printer,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export interface MyBookingsPageProps {
  onNavigate: (route: string) => void;
  onShowToast?: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const MyBookingsPage: React.FC<MyBookingsPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedBookingForPass, setSelectedBookingForPass] = useState<Booking | null>(null);
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('Change of plans');
  const [isCancelling, setIsCancelling] = useState(false);

  const loadBookings = () => {
    try {
      setLoading(true);
      const all = bookingService.getBookings(user?.id);
      setBookings(all);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [user]);

  // Filter and search bookings
  const filteredBookings = bookings.filter((b) => {
    // Tab filter
    if (activeTab !== 'all' && b.status !== activeTab) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchVenue = (b.venueName || b.facilityName || '').toLowerCase().includes(q);
      const matchId = b.id.toLowerCase().includes(q);
      const matchCourt = (b.courtName || '').toLowerCase().includes(q);
      const matchSport = (b.sport || '').toLowerCase().includes(q);
      return matchVenue || matchId || matchCourt || matchSport;
    }
    return true;
  });

  const handleConfirmCancel = async () => {
    if (!selectedBookingForCancel) return;
    try {
      setIsCancelling(true);
      await bookingService.cancelBooking(selectedBookingForCancel.id, cancelReason);
      if (onShowToast) {
        onShowToast(
          'success',
          'Booking Cancelled',
          `Reservation #${selectedBookingForCancel.id} has been cancelled.`
        );
      }
      setSelectedBookingForCancel(null);
      loadBookings();
    } catch (err: any) {
      if (onShowToast) {
        onShowToast('error', 'Cancellation Failed', err.message);
      }
    } finally {
      setIsCancelling(false);
    }
  };

  const tabs: { id: typeof activeTab; label: string; count: number }[] = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'confirmed', label: 'Confirmed', count: bookings.filter((b) => b.status === 'confirmed').length },
    { id: 'completed', label: 'Completed', count: bookings.filter((b) => b.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: bookings.filter((b) => b.status === 'cancelled').length },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
          <CalendarCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Login to View Bookings</h2>
        <p className="text-xs text-slate-500 max-w-sm mb-6">
          Sign in with your QuickCourt account to access your upcoming court passes and match history.
        </p>
        <Button variant="primary" size="md" onClick={() => onNavigate('/login?redirect=/my-bookings')}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-12 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              My Bookings
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your upcoming games, access digital passes, and track match history.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate('/venues')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Book Another Court
          </Button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by venue or ID..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="py-16 text-center">
            <LoadingSpinner size="md" text="Loading your reservations..." />
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
              🏸
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              No Bookings Found
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {activeTab !== 'all'
                ? `You have no ${activeTab} bookings.`
                : "You haven't reserved any courts yet. Start by exploring venues in your city."}
            </p>
            <Button variant="primary" size="sm" onClick={() => onNavigate('/venues')}>
              Explore Venues
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={(b) => setSelectedBookingForCancel(b)}
                onViewPass={(b) => setSelectedBookingForPass(b)}
              />
            ))}
          </div>
        )}
      </div>

      {/* DIGITAL PASS MODAL */}
      {selectedBookingForPass && (
        <Modal
          isOpen={Boolean(selectedBookingForPass)}
          onClose={() => setSelectedBookingForPass(null)}
          title="Digital Court Entry Pass"
          maxWidth="md"
        >
          <div className="space-y-5">
            {/* Pass Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50 via-white to-slate-50 border border-emerald-200 text-center space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <span className="text-[11px] font-mono font-bold text-slate-500">
                  {selectedBookingForPass.id}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-600 text-white">
                  <CheckCircle2 className="w-3 h-3" />
                  CONFIRMED
                </span>
              </div>

              {/* QR Code Graphic Box */}
              <div className="w-40 h-40 bg-white p-3 rounded-2xl mx-auto border border-slate-200 shadow-md flex flex-col items-center justify-center">
                <QrCode className="w-28 h-28 text-slate-900" />
                <span className="text-[9px] font-mono text-slate-400 mt-1">SCAN AT VENUE DESK</span>
              </div>

              {/* Match Details */}
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {selectedBookingForPass.venueName || selectedBookingForPass.facilityName}
                </h3>
                <p className="text-xs font-bold text-emerald-700">
                  {selectedBookingForPass.courtName} ({selectedBookingForPass.sport})
                </p>
                {selectedBookingForPass.facilityAddress && (
                  <p className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {selectedBookingForPass.facilityAddress}
                  </p>
                )}
              </div>

              {/* Timing & Player */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200/80 text-xs">
                <div className="text-left bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Date & Time</span>
                  <span className="font-bold text-slate-800 block mt-0.5">
                    {new Date(selectedBookingForPass.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-emerald-700 font-semibold block text-[11px]">
                    {selectedBookingForPass.startTime} - {selectedBookingForPass.endTime}
                  </span>
                </div>

                <div className="text-left bg-white p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Player Info</span>
                  <span className="font-bold text-slate-800 block mt-0.5 truncate">
                    {selectedBookingForPass.userName || user?.name || 'Player'}
                  </span>
                  <span className="text-slate-500 font-medium block text-[11px] truncate">
                    {selectedBookingForPass.userPhone || '+91 98765 43210'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="md"
                className="flex-1"
                onClick={() => window.print()}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print Pass
              </Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                onClick={() => {
                  if (onShowToast) {
                    onShowToast('success', 'Pass Downloaded', 'E-receipt and digital pass saved.');
                  }
                  setSelectedBookingForPass(null);
                }}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Download Receipt
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* CANCELLATION MODAL */}
      {selectedBookingForCancel && (
        <Modal
          isOpen={Boolean(selectedBookingForCancel)}
          onClose={() => setSelectedBookingForCancel(null)}
          title="Cancel Reservation?"
          description="Are you sure you want to cancel this booking? This slot will be released to other players."
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-900">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Full simulated refund applicable.</p>
                <p className="text-red-700 mt-0.5">
                  ₹{selectedBookingForCancel.totalAmount || selectedBookingForCancel.courtPrice} will be credited back to your payment source.
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Reason for Cancellation
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Change of plans / Schedule conflict</option>
                <option>Weather conditions</option>
                <option>Court changed by group</option>
                <option>Booked wrong time slot</option>
                <option>Other personal reason</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                size="md"
                className="flex-1"
                onClick={() => setSelectedBookingForCancel(null)}
              >
                Keep Booking
              </Button>
              <Button
                variant="danger"
                size="md"
                className="flex-1"
                isLoading={isCancelling}
                onClick={handleConfirmCancel}
              >
                Confirm Cancellation
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
