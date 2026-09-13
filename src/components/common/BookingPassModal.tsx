import React from 'react';
import { X, QrCode, MapPin, Calendar, Clock, Trophy, CheckCircle2, Download, Printer, Navigation } from 'lucide-react';
import { Booking } from '../../types';

interface BookingPassModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  navigate?: (route: string) => void;
}

export const BookingPassModal: React.FC<BookingPassModalProps> = ({
  booking,
  isOpen,
  onClose,
  navigate,
}) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
        {/* Pass Top Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 p-4 text-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 fill-slate-950 stroke-[2.5]" />
            <div>
              <div className="text-xs font-black tracking-wider uppercase">QUICKCOURT ACCESS PASS</div>
              <div className="text-[10px] font-semibold opacity-90">Official Digital Gate Pass</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-slate-950/20 hover:bg-slate-950/40 text-slate-950 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pass Body */}
        <div className="p-6 space-y-5">
          {/* Facility & Court Details */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirmed Booking</span>
            </div>
            <h3 className="text-xl font-bold text-white font-display leading-snug">
              {booking.facilityName}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="truncate">{booking.facilityAddress}</span>
            </p>
          </div>

          {/* Key Ticket Details Grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Court</span>
              <p className="font-semibold text-white mt-0.5">{booking.courtName}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sport</span>
              <p className="font-semibold text-emerald-400 mt-0.5">{booking.sport}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Date</span>
              <p className="font-semibold text-white mt-0.5 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                {booking.date}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Time Slot</span>
              <p className="font-semibold text-white mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {booking.startTime} - {booking.endTime}
              </p>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white text-slate-950 text-center space-y-2">
            <div className="w-40 h-40 bg-slate-100 rounded-lg p-2 flex items-center justify-center border-2 border-dashed border-slate-300">
              {/* SVG QR Code Pattern representation */}
              <svg viewBox="0 0 100 100" className="w-36 h-36">
                <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" fill="#090d16" />
                <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" fill="#090d16" />
                <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" fill="#090d16" />
                <rect x="40" y="10" width="10" height="20" fill="#090d16" />
                <rect x="10" y="40" width="20" height="10" fill="#090d16" />
                <rect x="40" y="40" width="20" height="20" fill="#059669" />
                <rect x="70" y="40" width="15" height="10" fill="#090d16" />
                <rect x="40" y="70" width="10" height="20" fill="#090d16" />
                <rect x="65" y="65" width="25" height="25" fill="#090d16" />
                <rect x="75" y="75" width="5" height="5" fill="#ffffff" />
              </svg>
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-slate-900 tracking-wider">
                ID: {booking.id}
              </div>
              <div className="text-[10px] text-slate-500">Scan at facility gate for instant entry</div>
            </div>
          </div>

          {/* Price & Player */}
          <div className="flex items-center justify-between text-xs px-1">
            <div>
              <span className="text-slate-400">Player: </span>
              <span className="font-semibold text-white">{booking.userName}</span>
            </div>
            <div>
              <span className="text-slate-400">Total Paid: </span>
              <span className="font-bold text-emerald-400">₹{booking.totalAmount}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                alert(`Navigating to ${booking.facilityName} via GPS navigation...`);
              }}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              Get Directions
            </button>
            <button
              onClick={() => {
                window.print();
              }}
              className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
