import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/bookingService';
import { paymentService } from '../services/paymentService';
import { supabaseService } from '../services/supabaseService';
import { Booking } from '../types';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { UpiQrCode } from '../components/UpiQrCode';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building2,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  Lock,
} from 'lucide-react';

export interface PaymentPageProps {
  bookingId: string;
  onNavigate: (route: string) => void;
  onShowToast?: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  bookingId,
  onNavigate,
  onShowToast,
}) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'demo'>('demo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [upiId, setUpiId] = useState('player@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState('Arjun Mehta');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('888');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  useEffect(() => {
    const b = bookingService.getBookingById(bookingId);
    if (b) {
      setBooking(b);
    }
    setLoading(false);
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <LoadingSpinner size="lg" text="Loading payment session..." />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Booking Not Found</h2>
        <Button variant="primary" size="sm" onClick={() => onNavigate('/venues')}>
          Explore Venues
        </Button>
      </div>
    );
  }

  const handleProcessPayment = async () => {
    try {
      setIsProcessing(true);
      const paymentRes = await paymentService.processSimulatedPayment({
        bookingId: booking.id,
        amount: booking.totalAmount || booking.courtPrice + 25,
        method: paymentMethod,
        upiId: paymentMethod === 'upi' ? upiId : undefined,
        bankName: paymentMethod === 'netbanking' ? selectedBank : undefined,
      });

      // Update confirmed status in Supabase backend
      supabaseService.updateBookingStatus(booking.id, {
        status: 'confirmed',
        payment_status: 'successful',
        transaction_id: paymentRes.transactionId,
      }).catch((err) => console.warn('[Supabase] Failed to update payment in Supabase:', err));

      setIsSuccess(true);
      if (onShowToast) {
        onShowToast(
          'success',
          'Booking Confirmed!',
          `Your slot at ${booking.venueName || booking.facilityName} is confirmed.`
        );
      }

      // Short delay for the user to see the success banner before taking them to My Bookings
      setTimeout(() => {
        onNavigate('/my-bookings');
      }, 1500);
    } catch (err: any) {
      const errorMsg = err.message || 'Could not process payment.';
      if (onShowToast) {
        onShowToast('error', 'Payment Failed', errorMsg);
      }

      // Record failed payment / booking attempt to Supabase
      supabaseService.recordFailedBooking({
        id: booking.id,
        userId: booking.userId,
        userName: booking.userName,
        userEmail: booking.userEmail,
        userPhone: booking.userPhone,
        venueId: booking.venueId || booking.facilityId,
        venueName: booking.venueName || booking.facilityName,
        courtId: booking.courtId,
        courtName: booking.courtName,
        sport: booking.sport,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        duration: booking.duration,
        courtPrice: booking.courtPrice,
        totalAmount: totalAmount,
        errorMessage: errorMsg,
        errorType: 'payment_failed',
      }).catch((e) => console.warn('[Supabase] Error logging failed payment:', e));
    } finally {
      setIsProcessing(false);
    }
  };

  const totalAmount = booking.totalAmount || booking.courtPrice + (booking.platformFee || 25);

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 sm:pt-28 pb-16 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Back Nav */}
        <button
          onClick={() => onNavigate(`/booking/${booking.venueId || booking.facilityId}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Booking Details</span>
        </button>

        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Lock className="w-3 h-3 text-emerald-600" />
              128-Bit Encrypted Simulated Checkout
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Complete Your Booking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Select your simulated payment option to finalize your reservation.
          </p>
        </div>

        {isSuccess ? (
          /* Payment Success Confirmation Card */
          <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-12 text-center shadow-lg space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-display">
              Payment Successful!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Your court at <span className="font-bold text-slate-800">{booking.venueName || booking.facilityName}</span> is reserved. Your digital pass and QR code have been issued.
            </p>
            <div className="pt-2 text-xs text-slate-400 font-mono">
              Booking Ref: {booking.id} • Redirecting to My Bookings...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left 2 Columns: Payment Method Options */}
            <div className="md:col-span-2 space-y-6">
              {/* Payment Methods Tabs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Payment Option
                </label>

                {/* Methods Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('demo')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'demo'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 text-emerald-800 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs">1-Click Demo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'upi'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 text-emerald-800 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-slate-700" />
                    <span className="text-xs">UPI (GPay)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 text-emerald-800 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-slate-700" />
                    <span className="text-xs">Debit/Credit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'netbanking'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 text-emerald-800 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-slate-700" />
                    <span className="text-xs">Net Banking</span>
                  </button>
                </div>

                {/* Sub-form based on selected method */}
                <div className="pt-4 border-t border-slate-100">
                  {paymentMethod === 'demo' && (
                    <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-900 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        Hackathon Evaluation Mode
                      </div>
                      <p className="leading-relaxed">
                        Instant 1-click payment simulation. No OTP or card input needed. Click <strong>"Pay ₹{totalAmount}"</strong> below to immediately confirm the court booking and issue the digital pass.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      {/* Scan UPI QR Code Option */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
                        <span className="text-xs font-bold text-slate-800 mb-2">
                          Scan to Pay with Any UPI App
                        </span>
                        <UpiQrCode
                          upiId="quickcourt.sports@icici"
                          payeeName={booking.venueName || booking.facilityName || 'QuickCourt Arena'}
                          amount={totalAmount}
                          bookingId={booking.id}
                          type="upi_payment"
                          size="md"
                          onCopy={() => {
                            if (onShowToast) {
                              onShowToast('info', 'UPI ID Copied', 'quickcourt.sports@icici copied to clipboard.');
                            }
                          }}
                        />
                      </div>

                      <div className="relative flex py-1 items-center">
                        <div className="flex-grow border-t border-slate-200" />
                        <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-slate-400">or enter UPI ID</span>
                        <div className="flex-grow border-t border-slate-200" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Enter UPI Virtual Payment Address (VPA)
                        </label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@bank"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <div className="flex gap-2">
                          {['@okaxis', '@okhdfcbank', '@paytm', '@ybl'].map((suf) => (
                            <button
                              key={suf}
                              type="button"
                              onClick={() => setUpiId(`athlete${suf}`)}
                              className="px-2 py-1 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600 hover:bg-slate-200"
                            >
                              {suf}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1">
                              Expiry
                            </label>
                            <input
                              type="text"
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-mono text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1">
                              CVV
                            </label>
                            <input
                              type="password"
                              maxLength={3}
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-mono text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-3">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Select Bank
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option>HDFC Bank</option>
                        <option>State Bank of India</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Sandbox Notice */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Simulated transaction environment. No real funds are deducted.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Order Total & CTA */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                <h3 className="text-sm font-bold text-slate-900 font-display border-b border-slate-100 pb-3">
                  Reservation Summary
                </h3>

                <div className="space-y-2.5 text-xs text-slate-600">
                  <div>
                    <h4 className="font-bold text-slate-900">{booking.venueName || booking.facilityName}</h4>
                    <p className="text-[11px] text-slate-500">{booking.courtName}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Sport:</span>
                      <span className="font-semibold text-slate-800">{booking.sport}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Date:</span>
                      <span className="font-semibold text-slate-800">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Slot:</span>
                      <span className="font-semibold text-emerald-700">
                        {booking.startTime} - {booking.endTime}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Court charges</span>
                      <span>₹{booking.courtPrice}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Platform fee</span>
                      <span>₹{booking.platformFee || 25}</span>
                    </div>
                    <div className="flex items-center justify-between font-black text-base text-slate-900 font-display pt-2 border-t border-slate-100">
                      <span>Total Due</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleProcessPayment}
                  isLoading={isProcessing}
                  className="w-full"
                >
                  Pay ₹{totalAmount}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
