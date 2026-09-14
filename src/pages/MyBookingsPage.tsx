import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/bookingService';
import { Booking } from '../types';
import { BookingCard } from '../components/BookingCard';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { UpiQrCode } from '../components/UpiQrCode';
import { BookingPass } from '../components/BookingPass';
import { RatingReviewModal } from '../components/RatingReviewModal';
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
  X,
  Star,
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
  const [activeTab, setActiveTab] = useState<'all' | 'in_progress' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedBookingForPass, setSelectedBookingForPass] = useState<Booking | null>(null);
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<Booking | null>(null);
  const [selectedBookingForRate, setSelectedBookingForRate] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('Change of plans');
  const [isCancelling, setIsCancelling] = useState(false);

  const loadBookings = () => {
    try {
      const all = bookingService.getBookings(user?.id);
      setBookings(all);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();

    // Set up auto-refresh every 30 seconds for live status transitions
    const interval = setInterval(loadBookings, 30000);
    window.addEventListener('quickcourt_slots_updated', loadBookings);
    window.addEventListener('storage', loadBookings);

    return () => {
      clearInterval(interval);
      window.removeEventListener('quickcourt_slots_updated', loadBookings);
      window.removeEventListener('storage', loadBookings);
    };
  }, [user]);

  // Filter and search bookings
  const filteredBookings = bookings.filter((b) => {
    const status = b.liveStatus || b.status;
    // Tab filter
    if (activeTab !== 'all' && status !== activeTab) {
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

  const generateReceiptHTML = (b: Booking) => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QuickCourt E-Receipt - ${b.id}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .ticket { max-width: 480px; margin: 0 auto; background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #059669; color: white; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.5px; }
    .header p { margin: 4px 0 0; font-size: 12px; opacity: 0.9; }
    .body { padding: 24px; }
    .badge { display: inline-block; background: #ecfdf5; color: #047857; font-weight: 700; font-size: 11px; padding: 4px 12px; border-radius: 9999px; border: 1px solid #a7f3d0; margin-bottom: 16px; }
    .row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px; border-bottom: 1px dashed #f1f5f9; padding-bottom: 8px; }
    .label { color: #64748b; font-weight: 500; }
    .value { font-weight: 700; color: #0f172a; text-align: right; }
    .total-box { background: #f8fafc; border-radius: 12px; padding: 16px; margin-top: 16px; border: 1px solid #e2e8f0; }
    .total-row { display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 800; color: #059669; }
    .footer { text-align: center; font-size: 11px; color: #94a3b8; padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; }
    @media print {
      body { background: #fff; padding: 0; }
      .ticket { border: none; box-shadow: none; max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="header">
      <h1>🏸 QuickCourt Digital Pass</h1>
      <p>Official Reservation Receipt & Entry Voucher</p>
    </div>
    <div class="body">
      <div style="text-align: center;">
        <span class="badge">CONFIRMED RESERVATION</span>
      </div>
      <div class="row">
        <span class="label">Booking Reference</span>
        <span class="value" style="font-family: monospace;">${b.id}</span>
      </div>
      <div class="row">
        <span class="label">Venue</span>
        <span class="value">${b.venueName || b.facilityName}</span>
      </div>
      <div class="row">
        <span class="label">Court & Sport</span>
        <span class="value">${b.courtName} (${b.sport})</span>
      </div>
      <div class="row">
        <span class="label">Date</span>
        <span class="value">${new Date(b.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>
      <div class="row">
        <span class="label">Time Slot</span>
        <span class="value">${b.startTime} - ${b.endTime}</span>
      </div>
      <div class="row">
        <span class="label">Player Name</span>
        <span class="value">${b.userName || user?.name || 'Player'}</span>
      </div>
      <div class="row">
        <span class="label">Contact</span>
        <span class="value">${b.userPhone || '+91 98765 43210'}</span>
      </div>
      <div class="row">
        <span class="label">Payment Status</span>
        <span class="value" style="color: #059669;">PAID (${(b.paymentMethod || 'ONLINE / UPI').toUpperCase()})</span>
      </div>
      <div class="row">
        <span class="label">Transaction ID</span>
        <span class="value" style="font-family: monospace; font-size: 11px;">${b.transactionId || b.paymentId || 'TXN_SIM_' + b.id}</span>
      </div>

      <div class="total-box">
        <div class="total-row">
          <span>Amount Paid</span>
          <span>₹${b.totalAmount || b.total || b.courtPrice}</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Present this digital voucher at the venue front desk before entry.</p>
      <p>Support: support@quickcourt.app | QuickCourt App</p>
    </div>
  </div>
</body>
</html>`;
  };

  const handlePrintPass = (b: Booking) => {
    try {
      const html = generateReceiptHTML(b);
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
        }, 400);
      } else {
        window.print();
      }
    } catch {
      window.print();
    }
  };

  const handleDownloadReceipt = (b: Booking) => {
    try {
      const html = generateReceiptHTML(b);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `QuickCourt-Receipt-${b.id}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (onShowToast) {
        onShowToast('success', 'Receipt Downloaded', `Saved QuickCourt-Receipt-${b.id}.html successfully!`);
      }
    } catch {
      if (onShowToast) {
        onShowToast('error', 'Download Failed', 'Could not generate receipt file.');
      }
    }
  };

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

  const inProgressCount = bookings.filter((b) => (b.liveStatus || b.status) === 'in_progress').length;
  const confirmedCount = bookings.filter((b) => (b.liveStatus || b.status) === 'confirmed').length;
  const completedCount = bookings.filter((b) => (b.liveStatus || b.status) === 'completed').length;
  const cancelledCount = bookings.filter((b) => (b.liveStatus || b.status) === 'cancelled').length;

  const tabs: { id: typeof activeTab; label: string; count: number; badgeColor?: string }[] = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    ...(inProgressCount > 0
      ? [{ id: 'in_progress' as const, label: 'In Progress', count: inProgressCount, badgeColor: 'bg-amber-100 text-amber-800' }]
      : []),
    { id: 'confirmed', label: 'Upcoming', count: confirmedCount },
    { id: 'completed', label: 'Completed', count: completedCount },
    { id: 'cancelled', label: 'Cancelled', count: cancelledCount },
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
    <div className="min-h-screen bg-slate-50/50 pt-24 sm:pt-28 pb-16 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Status Tabs with smooth animated moving selection pill */}
          <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 flex items-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-none relative">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 z-10 min-h-[38px] ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeBookingTab"
                      className="absolute inset-0 bg-emerald-600 rounded-xl shadow-sm shadow-emerald-600/25"
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                      isActive
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-200/90 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box with proper sizing & clear action */}
          <div className="relative w-full md:w-72 sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by venue or ID..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-emerald-500 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-all min-h-[42px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
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
                onRebook={(b) => onNavigate(`/booking/${b.facilityId || 'fac_1'}`)}
                onRate={(b) => setSelectedBookingForRate(b)}
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
          maxWidth="lg"
        >
          <BookingPass
            booking={selectedBookingForPass}
            onShowToast={onShowToast}
            onClose={() => setSelectedBookingForPass(null)}
            onRate={(b) => setSelectedBookingForRate(b)}
          />
        </Modal>
      )}

      {/* POST-BOOKING RATING & REVIEW MODAL */}
      {selectedBookingForRate && (
        <RatingReviewModal
          isOpen={Boolean(selectedBookingForRate)}
          booking={selectedBookingForRate}
          onClose={() => setSelectedBookingForRate(null)}
          onShowToast={onShowToast}
          onReviewSubmitted={(updatedBooking) => {
            loadBookings();
            if (selectedBookingForPass && selectedBookingForPass.id === updatedBooking.id) {
              setSelectedBookingForPass(updatedBooking);
            }
          }}
        />
      )}

      {/* CANCELLATION MODAL */}
      {selectedBookingForCancel && (
        <Modal
          isOpen={Boolean(selectedBookingForCancel)}
          onClose={() => setSelectedBookingForCancel(null)}
          title="Cancel Reservation?"
          description="Are you sure you want to cancel this booking? This slot will immediately be released back to other players."
          maxWidth="lg"
        >
          <div className="space-y-5">
            {/* Booking Summary Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">
                    {selectedBookingForCancel.venueName || selectedBookingForCancel.facilityName}
                  </span>
                  <span className="text-emerald-700 font-semibold block mt-0.5">
                    {selectedBookingForCancel.courtName} • {selectedBookingForCancel.sport}
                  </span>
                  <span className="text-slate-500 block mt-1">
                    {new Date(selectedBookingForCancel.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })} | {selectedBookingForCancel.startTime} - {selectedBookingForCancel.endTime}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Refund Amount</span>
                  <span className="text-base font-black text-emerald-700 font-display">
                    ₹{selectedBookingForCancel.totalAmount || selectedBookingForCancel.courtPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 flex items-start gap-3 text-xs text-rose-900">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">100% Instant Refund</p>
                <p className="text-rose-700 mt-0.5 leading-relaxed">
                  The full amount of ₹{selectedBookingForCancel.totalAmount || selectedBookingForCancel.courtPrice} will be refunded directly to your original payment method.
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
                className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Change of plans / Schedule conflict</option>
                <option>Booked wrong time slot (want to fix)</option>
                <option>Weather conditions</option>
                <option>Court changed by group</option>
                <option>Other personal reason</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                className="flex-1 min-h-[44px] text-xs font-semibold"
                onClick={() => setSelectedBookingForCancel(null)}
              >
                Keep Booking
              </Button>
              <Button
                type="button"
                variant="danger"
                size="md"
                className="flex-1 min-h-[44px] text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
                isLoading={isCancelling}
                onClick={handleConfirmCancel}
              >
                Confirm & Cancel Booking
              </Button>
            </div>

            {/* Quick Reschedule helper */}
            <div className="text-center pt-1 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  const facilityId = selectedBookingForCancel.facilityId || 'fac_1';
                  setSelectedBookingForCancel(null);
                  onNavigate(`/booking/${facilityId}`);
                }}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                Need a different time? Reschedule directly &rarr;
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
