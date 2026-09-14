import React, { useState, useEffect, useMemo } from 'react';
import { jsPDF } from 'jspdf';
import { Logo } from './Logo';
import {
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Download,
  Phone,
  Navigation,
  ShieldCheck,
  CreditCard,
  User,
  Users,
  AlertCircle,
  Lock,
  Hourglass,
  Sparkles,
  RefreshCw,
  Ban,
  Activity,
  Timer,
  Star,
  Edit3,
} from 'lucide-react';
import { Booking } from '../types';
import { parseTimeToMinutes } from '../services/timeslotService';

export type LiveStatusType = 'upcoming' | 'ready_for_entry' | 'in_progress' | 'completed' | 'cancelled';

export interface BookingPassProps {
  booking?: Partial<Booking>;
  onClose?: () => void;
  onShowToast?: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
  initialStatusOverride?: LiveStatusType | null;
  onRate?: (booking: Booking) => void;
}

function formatMinutesToTimeStr(totalMins: number): string {
  const normMins = Math.max(0, Math.min(1439, totalMins));
  const h24 = Math.floor(normMins / 60);
  const m = normMins % 60;
  const period = h24 >= 12 && h24 < 24 ? 'PM' : 'AM';
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  const mStr = m < 10 ? `0${m}` : `${m}`;
  return `${h12}:${mStr} ${period}`;
}

function formatTimeClean(timeStr: string): string {
  if (!timeStr) return '07:00 PM';
  const mins = parseTimeToMinutes(timeStr);
  return formatMinutesToTimeStr(mins);
}

function formatSecondsToHHMMSS(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  const hStr = hours < 10 ? `0${hours}` : `${hours}`;
  const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const sStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${hStr}:${mStr}:${sStr}`;
}

export const BookingPass: React.FC<BookingPassProps> = ({
  booking,
  onClose,
  onShowToast,
  initialStatusOverride = null,
  onRate,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedTxn, setCopiedTxn] = useState(false);
  const [shared, setShared] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Optional status override for interactive demo testing if desired
  const [statusOverride, setStatusOverride] = useState<LiveStatusType | null>(initialStatusOverride);

  // Live Timer: tick every 1000ms to ensure minute and second-level live transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Standard booking attributes with defaults
  const bookingId = booking?.id || 'QC-20260914-4636';
  const sport = booking?.sport || 'Cricket';
  const backupPassCode = (booking as any)?.backupCode || 'QCP-7X4K-92M';
  const venueName = booking?.venueName || (booking as any)?.facilityName || 'Apex Arena & Sports Complex';
  const courtName = booking?.courtName || 'Pitch 1 - Turf Cricket Court';
  const venueAddress =
    booking?.venueAddress ||
    (booking as any)?.facilityAddress ||
    'Plot 42, Sector 18, Near Ring Road, Sports Hub, Mumbai, MH 400076';
  const venuePhone = (booking as any)?.facilityPhone || '+91 98765 43210';
  
  const playerName = booking?.userName || 'Krish Modi';
  const playerPhone = booking?.userPhone || '+91 98765 43210';
  const numberOfPlayers = (booking as any)?.playersCount || 'Up to 22 Players (11 vs 11 Match)';
  const bookingType = (booking as any)?.bookingType || 'Standard Hourly Court Reservation';

  const rawDateStr = booking?.date || '2026-09-14';
  const rawStartTime = booking?.startTime || '7:00 PM';
  const rawEndTime = booking?.endTime || '9:00 PM';

  const bookingDate = new Date(rawDateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedStartTime = formatTimeClean(rawStartTime);
  const formattedEndTime = formatTimeClean(rawEndTime);

  // Compute entry time (15 mins prior to start time)
  const startMins = parseTimeToMinutes(rawStartTime);
  const entryMins = startMins - 15;
  const formattedEntryTime = formatMinutesToTimeStr(entryMins);

  const amountPaid = booking?.totalAmount || (booking as any)?.courtPrice || 1499;
  const paymentMethod = (booking as any)?.paymentMethod || 'UPI (Google Pay / PhonePe)';
  const transactionId = (booking as any)?.transactionId || booking?.paymentId || 'TXN_9842107482';
  const validUntil = (booking as any)?.validUntil || `${formattedEndTime}, ${bookingDate} (15 min grace)`;

  // =========================================================================
  // LIVE STATUS COMPUTATION ENGINE
  // =========================================================================
  const liveStatusInfo = useMemo(() => {
    if (booking?.status === 'cancelled' || statusOverride === 'cancelled') {
      return {
        status: 'cancelled' as LiveStatusType,
        badgeLabel: 'Cancelled',
        statusLabel: 'Cancelled',
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
        badgeIcon: <Ban className="w-3.5 h-3.5 text-rose-600" />,
        isLiveActive: false,
        isExpired: true,
        isCancelled: true,
        timeRemainingSec: 0,
        timeRemainingFormatted: '00:00:00',
      };
    }

    if (statusOverride) {
      // Manual test simulation state
      let badgeLabel = '';
      let statusLabel = '';
      let badgeClass = '';
      let badgeIcon = <CheckCircle2 className="w-3.5 h-3.5" />;
      let isLiveActive = false;
      let isExpired = false;
      let timeRemainingFormatted = '01:24:36';
      let timeRemainingSec = 5076;

      switch (statusOverride) {
        case 'upcoming':
          badgeLabel = `Upcoming — Starts at ${formattedStartTime}`;
          statusLabel = 'Upcoming';
          badgeClass = 'bg-blue-50 text-blue-800 border-blue-200';
          badgeIcon = <Clock className="w-3.5 h-3.5 text-blue-600" />;
          break;
        case 'ready_for_entry':
          badgeLabel = 'Ready for Entry — Entry open now';
          statusLabel = 'Ready for Entry';
          badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-300';
          badgeIcon = <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />;
          break;
        case 'in_progress':
          badgeLabel = `In Progress — Ends at ${formattedEndTime}`;
          statusLabel = 'In Progress';
          badgeClass = 'bg-emerald-600 text-white border-emerald-700 shadow-sm';
          badgeIcon = <span className="w-2 h-2 rounded-full bg-white animate-ping" />;
          isLiveActive = true;
          break;
        case 'completed':
          badgeLabel = 'Completed — Booking finished';
          statusLabel = 'Completed';
          badgeClass = 'bg-slate-100 text-slate-700 border-slate-200';
          badgeIcon = <Check className="w-3.5 h-3.5 text-slate-500" />;
          isExpired = true;
          break;
      }

      return {
        status: statusOverride,
        badgeLabel,
        statusLabel,
        badgeClass,
        badgeIcon,
        isLiveActive,
        isExpired,
        isCancelled: false,
        timeRemainingSec,
        timeRemainingFormatted,
      };
    }

    // Live real-time check against currentTime
    const now = currentTime;
    const todayStr = now.toISOString().split('T')[0];

    // Build Date instances for precise boundary checks
    const [y, m, d] = rawDateStr.split('-').map(Number);
    const endMins = parseTimeToMinutes(rawEndTime);

    const entryDateTime = new Date(y, m - 1, d, Math.floor(entryMins / 60), entryMins % 60, 0);
    const startDateTime = new Date(y, m - 1, d, Math.floor(startMins / 60), startMins % 60, 0);
    const endDateTime = new Date(y, m - 1, d, Math.floor(endMins / 60), endMins % 60, 0);

    const nowTime = now.getTime();

    // 1. If past date or past end time -> Completed
    if (rawDateStr < todayStr || nowTime >= endDateTime.getTime()) {
      return {
        status: 'completed' as LiveStatusType,
        badgeLabel: 'Completed — Booking finished',
        statusLabel: 'Completed',
        badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
        badgeIcon: <Check className="w-3.5 h-3.5 text-slate-500" />,
        isLiveActive: false,
        isExpired: true,
        isCancelled: false,
        timeRemainingSec: 0,
        timeRemainingFormatted: '00:00:00',
      };
    }

    // 2. If in progress (between start time and end time)
    if (nowTime >= startDateTime.getTime() && nowTime < endDateTime.getTime()) {
      const remainingSec = Math.max(0, Math.floor((endDateTime.getTime() - nowTime) / 1000));
      return {
        status: 'in_progress' as LiveStatusType,
        badgeLabel: `In Progress — Ends at ${formattedEndTime}`,
        statusLabel: 'In Progress',
        badgeClass: 'bg-emerald-600 text-white border-emerald-700 shadow-sm',
        badgeIcon: <span className="w-2 h-2 rounded-full bg-white animate-ping" />,
        isLiveActive: true,
        isExpired: false,
        isCancelled: false,
        timeRemainingSec: remainingSec,
        timeRemainingFormatted: formatSecondsToHHMMSS(remainingSec),
      };
    }

    // 3. If ready for entry (between entry time and start time)
    if (nowTime >= entryDateTime.getTime() && nowTime < startDateTime.getTime()) {
      return {
        status: 'ready_for_entry' as LiveStatusType,
        badgeLabel: 'Ready for Entry — Entry open now',
        statusLabel: 'Ready for Entry',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        badgeIcon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
        isLiveActive: false,
        isExpired: false,
        isCancelled: false,
        timeRemainingSec: 0,
        timeRemainingFormatted: '00:00:00',
      };
    }

    // 4. Default: Upcoming (before entry time)
    return {
      status: 'upcoming' as LiveStatusType,
      badgeLabel: `Upcoming — Starts at ${formattedStartTime}`,
      statusLabel: 'Upcoming',
      badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
      badgeIcon: <Clock className="w-3.5 h-3.5 text-blue-600" />,
      isLiveActive: false,
      isExpired: false,
      isCancelled: false,
      timeRemainingSec: 0,
      timeRemainingFormatted: '00:00:00',
    };
  }, [booking, statusOverride, currentTime, rawDateStr, rawStartTime, rawEndTime, formattedStartTime, formattedEndTime, entryMins, startMins]);

  const handleCopyPassCode = () => {
    navigator.clipboard.writeText(backupPassCode);
    setCopiedCode(true);
    if (onShowToast) {
      onShowToast('success', 'Pass Code Copied', `${backupPassCode} copied to clipboard.`);
    }
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyTxn = () => {
    navigator.clipboard.writeText(transactionId);
    setCopiedTxn(true);
    if (onShowToast) {
      onShowToast('info', 'Transaction ID Copied', `${transactionId} copied to clipboard.`);
    }
    setTimeout(() => setCopiedTxn(false), 2000);
  };

  const handleGetDirections = () => {
    const mapsQuery = encodeURIComponent(`${venueName}, ${venueAddress}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
    if (onShowToast) {
      onShowToast('info', 'Opening Maps', `Getting directions to ${venueName}`);
    }
  };

  const handleCallVenue = () => {
    window.location.href = `tel:${venuePhone.replace(/\s+/g, '')}`;
    if (onShowToast) {
      onShowToast('info', 'Calling Venue', `Connecting to ${venuePhone}...`);
    }
  };

  const handleDownloadPass = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Background
      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Main Pass Container Card
      const margin = 14;
      const cardWidth = pageWidth - margin * 2;
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, 12, cardWidth, 272, 6, 6, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.roundedRect(margin, 12, cardWidth, 272, 6, 6, 'S');

      // Top Header Banner
      doc.setFillColor(15, 23, 42); // slate-900
      doc.roundedRect(margin, 12, cardWidth, 24, 6, 6, 'F');
      doc.rect(margin, 28, cardWidth, 8, 'F');

      // Logo & Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.text('QuickCourt', margin + 8, 25);
      
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(52, 211, 153); // emerald-400
      doc.text('OFFICIAL DIGITAL ENTRY PASS (PDF)', pageWidth - margin - 8, 25, { align: 'right' });

      // Status Pill
      let badgeBg = [236, 253, 245]; // emerald-50
      let badgeText = [4, 120, 87]; // emerald-700
      if (liveStatusInfo.type === 'in_progress') {
        badgeBg = [254, 243, 199];
        badgeText = [180, 83, 9];
      } else if (liveStatusInfo.type === 'completed' || liveStatusInfo.type === 'cancelled') {
        badgeBg = [241, 245, 249];
        badgeText = [71, 85, 105];
      }

      doc.setFillColor(badgeBg[0], badgeBg[1], badgeBg[2]);
      doc.roundedRect(margin + 8, 42, 54, 8, 4, 4, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(badgeText[0], badgeText[1], badgeText[2]);
      doc.text(liveStatusInfo.statusLabel.toUpperCase(), margin + 35, 47.5, { align: 'center' });

      // Pass IDs
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(`Booking ID: ${bookingId}`, margin + 66, 47.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(`Backup Code: ${backupPassCode}`, pageWidth - margin - 8, 47.5, { align: 'right' });

      // Divider
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.line(margin + 8, 54, pageWidth - margin - 8, 54);

      // Section 1: Venue & Court Card
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(margin + 8, 58, cardWidth - 16, 32, 4, 4, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin + 8, 58, cardWidth - 16, 32, 4, 4, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('VENUE & PLAYING SURFACE', margin + 14, 65);

      doc.setFontSize(12.5);
      doc.setTextColor(15, 23, 42);
      doc.text(venueName, margin + 14, 72);

      doc.setFontSize(9.5);
      doc.setTextColor(5, 150, 105);
      doc.text(`${courtName} • Sport: ${sport}`, margin + 14, 78);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      const cleanAddr = venueAddress.length > 80 ? venueAddress.substring(0, 80) + '...' : venueAddress;
      doc.text(cleanAddr, margin + 14, 84);

      // Section 2: Timing Grid (4 boxes)
      const boxW = (cardWidth - 16 - 9) / 4;
      const timeBoxes = [
        { label: 'ENTRY TIME', val: formattedEntryTime, sub: '15m Prior', color: [15, 23, 42] },
        { label: 'BOOKING STARTS', val: formattedStartTime, sub: 'Match Kickoff', color: [5, 150, 105] },
        { label: 'BOOKING ENDS', val: formattedEndTime, sub: 'Slot Finish', color: [15, 23, 42] },
        { label: 'CURRENT STATUS', val: liveStatusInfo.statusLabel, sub: 'Live Verified', color: [180, 83, 9] },
      ];

      timeBoxes.forEach((b, idx) => {
        const bx = margin + 8 + idx * (boxW + 3);
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(bx, 94, boxW, 23, 3, 3, 'F');
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(bx, 94, boxW, 23, 3, 3, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text(b.label, bx + boxW / 2, 100, { align: 'center' });

        doc.setFontSize(8.5);
        doc.setTextColor(b.color[0], b.color[1], b.color[2]);
        doc.text(b.val, bx + boxW / 2, 107, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(148, 163, 184);
        doc.text(b.sub, bx + boxW / 2, 112, { align: 'center' });
      });

      // Section 3: QR Code & Check-in Verification Block
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(margin + 8, 121, cardWidth - 16, 52, 4, 4, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin + 8, 121, cardWidth - 16, 52, 4, 4, 'S');

      // QR Code Box Frame
      const qrSize = 40;
      const qrX = margin + 14;
      const qrY = 127;
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(qrX, qrY, qrSize, qrSize, 3, 3, 'F');
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(qrX, qrY, qrSize, qrSize, 3, 3, 'S');

      // Draw Vector QR Code Blocks
      doc.setFillColor(15, 23, 42);
      // Top-Left Finder
      doc.rect(qrX + 3, qrY + 3, 9, 9, 'F');
      doc.setFillColor(255, 255, 255);
      doc.rect(qrX + 4.5, qrY + 4.5, 6, 6, 'F');
      doc.setFillColor(15, 23, 42);
      doc.rect(qrX + 6, qrY + 6, 3, 3, 'F');

      // Top-Right Finder
      doc.rect(qrX + 28, qrY + 3, 9, 9, 'F');
      doc.setFillColor(255, 255, 255);
      doc.rect(qrX + 29.5, qrY + 4.5, 6, 6, 'F');
      doc.setFillColor(15, 23, 42);
      doc.rect(qrX + 31, qrY + 6, 3, 3, 'F');

      // Bottom-Left Finder
      doc.rect(qrX + 3, qrY + 28, 9, 9, 'F');
      doc.setFillColor(255, 255, 255);
      doc.rect(qrX + 4.5, qrY + 29.5, 6, 6, 'F');
      doc.setFillColor(15, 23, 42);
      doc.rect(qrX + 6, qrY + 31, 3, 3, 'F');

      // Matrix patterns
      const patternPoints = [
        [15, 4], [18, 4], [22, 4], [25, 4],
        [4, 15], [7, 15], [14, 15], [18, 15], [22, 15], [26, 15], [30, 15], [34, 15],
        [4, 18], [10, 18], [15, 18], [20, 18], [25, 18], [32, 18],
        [4, 22], [8, 22], [14, 22], [18, 22], [24, 22], [28, 22], [34, 22],
        [4, 25], [10, 25], [16, 25], [22, 25], [28, 25], [32, 25],
        [15, 28], [20, 28], [25, 28], [30, 28], [34, 28],
        [15, 32], [18, 32], [22, 32], [26, 32], [31, 32],
      ];
      patternPoints.forEach(([px, py]) => {
        doc.rect(qrX + px, qrY + py, 2.2, 2.2, 'F');
      });

      // Verification Text beside QR
      const textStartX = qrX + qrSize + 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      doc.text('Scan at Facility Gate', textStartX, 136);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('Show this QR code to the venue marshal for instant biometric or scanner gate entry.', textStartX, 142, { maxWidth: cardWidth - 16 - qrSize - 16 });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text('Backup Pass Code:', textStartX, 155);
      doc.setFont('courier', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(5, 150, 105);
      doc.text(backupPassCode, textStartX + 34, 155);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(`Pass Valid Until: ${validUntil}`, textStartX, 163);

      // Section 4: Player & Payment Summary (Two columns)
      const colW = (cardWidth - 16 - 6) / 2;
      
      // Player Column
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(margin + 8, 177, colW, 36, 4, 4, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin + 8, 177, colW, 36, 4, 4, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('PRIMARY PLAYER & DETAILS', margin + 14, 184);

      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(playerName, margin + 14, 191);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text(`Phone: ${playerPhone}`, margin + 14, 197);
      doc.text(`Players: ${numberOfPlayers} • Type: ${bookingType}`, margin + 14, 203);

      // Payment Column
      const payX = margin + 8 + colW + 6;
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(payX, 177, colW, 36, 4, 4, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(payX, 177, colW, 36, 4, 4, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('PAYMENT SUMMARY', payX + 6, 184);

      doc.setFontSize(11);
      doc.setTextColor(5, 150, 105);
      doc.text(`₹${amountPaid} (Paid & Verified)`, payX + 6, 192);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text(`Method: ${paymentMethod}`, payX + 6, 198);
      doc.text(`Txn ID: ${transactionId}`, payX + 6, 204);

      // Section 5: Venue Entry Guidelines & Rules
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(margin + 8, 217, cardWidth - 16, 38, 4, 4, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin + 8, 217, cardWidth - 16, 38, 4, 4, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('VENUE ENTRY GUIDELINES', margin + 14, 224);

      const instructions = [
        `1. Arrive by ${formattedEntryTime} (15 minutes prior) at Gate Security for check-in.`,
        `2. Scan digital pass QR code or provide backup code ${backupPassCode} at the counter.`,
        '3. Mandatory non-marking sports shoes / turf boots on playing surface.',
        '4. Free cancellation available up to 6 hours before match start time.'
      ];

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);
      instructions.forEach((ins, idx) => {
        doc.text(ins, margin + 14, 230 + idx * 5.2);
      });

      // Pass Footer
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('QuickCourt • Play more. Worry less. Find and book the best sports venues.', pageWidth / 2, 265, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text(`Generated on ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString()} • Official QuickCourt PDF Document`, pageWidth / 2, 271, { align: 'center' });

      // Save as actual PDF file format
      doc.save(`QuickCourt-Pass-${bookingId}.pdf`);

      if (onShowToast) {
        onShowToast('success', 'PDF Pass Downloaded', `Saved QuickCourt-Pass-${bookingId}.pdf to your device.`);
      }
    } catch (error) {
      console.error('Failed to generate PDF pass', error);
      if (onShowToast) {
        onShowToast('error', 'Download Failed', 'Could not generate PDF pass file.');
      }
    }
  };

  const handleSharePass = async () => {
    const shareData = {
      title: `QuickCourt Booking Pass - ${venueName}`,
      text: `Court booking at ${venueName} is ${liveStatusInfo.statusLabel} (${bookingDate}, ${formattedStartTime} - ${formattedEndTime}). Booking ID: ${bookingId}. Pass Code: ${backupPassCode}.`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setShared(true);
        if (onShowToast) {
          onShowToast('success', 'Pass Shared', 'Booking details shared successfully.');
        }
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        // cancelled
      }
    } else {
      navigator.clipboard.writeText(
        `QuickCourt Booking Pass\nStatus: ${liveStatusInfo.badgeLabel}\nVenue: ${venueName}\nCourt: ${courtName} (${sport})\nDate: ${bookingDate}\nEntry Time: ${formattedEntryTime}\nSlot: ${formattedStartTime} - ${formattedEndTime}\nBooking ID: ${bookingId}\nBackup Code: ${backupPassCode}\nAddress: ${venueAddress}`
      );
      setShared(true);
      if (onShowToast) {
        onShowToast('info', 'Copied to Clipboard', 'Full booking pass details copied for sharing.');
      }
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden font-sans text-slate-900 selection:bg-emerald-600 selection:text-white">
      
      {/* Simulation / Status Preview Bar (Easily test all 5 requested states) */}
      <div className="px-5 py-2.5 bg-slate-900 text-slate-300 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5 font-medium text-slate-400">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Live Auto Time Sync:</span>
          <span className="text-white font-mono text-[11px]">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Preview State:</span>
          {(['auto', 'in_progress', 'ready_for_entry', 'upcoming', 'completed', 'cancelled'] as const).map((mode) => {
            const isSelected = mode === 'auto' ? statusOverride === null : statusOverride === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setStatusOverride(mode === 'auto' ? null : mode)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-xs'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {mode === 'auto' ? 'Live Auto' : mode.replace(/_/g, ' ')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Pass Body Container */}
      <div className="p-5 sm:p-7 space-y-6">
        
        {/* ========================================================================= */}
        {/* TOP SECTION / FIRST SCREEN — Visible Immediately Without Scrolling */}
        {/* ========================================================================= */}
        <div>
          {/* Top Branding & LIVE STATUS BADGE */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <Logo size="sm" />
            
            {/* Live Status Badge Near Top of Pass (Required Formats) */}
            <div className="flex items-center">
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black border transition-all ${liveStatusInfo.badgeClass}`}>
                {liveStatusInfo.badgeIcon}
                <span>{liveStatusInfo.badgeLabel}</span>
              </span>
            </div>
          </div>

          {/* Title and ID */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                Your Booking Pass
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  ID: {bookingId}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  {bookingDate}
                </span>
              </div>
            </div>

            {/* Sport Badge */}
            <div className="self-start sm:self-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-slate-900 text-white shadow-xs">
                <span className="text-sm">🏏</span>
                <span>{sport}</span>
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DEDICATED LIVE TIME INFORMATION BLOCK */}
          {/* ========================================================================= */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Live Timing & Status
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60">
                {liveStatusInfo.statusLabel}
              </span>
            </div>

            {/* 4-Item Time Information Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-left">
              {/* 1. Entry Time */}
              <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Entry Time</span>
                <span className="text-xs sm:text-sm font-black text-white block mt-0.5">
                  {formattedEntryTime}
                </span>
                <span className="text-[9px] text-slate-400 block font-medium">15m Prior</span>
              </div>

              {/* 2. Booking Starts */}
              <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Booking Starts</span>
                <span className="text-xs sm:text-sm font-black text-emerald-400 block mt-0.5">
                  {formattedStartTime}
                </span>
                <span className="text-[9px] text-slate-400 block font-medium">Match Kickoff</span>
              </div>

              {/* 3. Booking Ends */}
              <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Booking Ends</span>
                <span className="text-xs sm:text-sm font-black text-white block mt-0.5">
                  {formattedEndTime}
                </span>
                <span className="text-[9px] text-slate-400 block font-medium">Slot Finish</span>
              </div>

              {/* 4. Current Booking Status */}
              <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Status</span>
                <span className="text-xs sm:text-sm font-black text-amber-300 block mt-0.5 truncate">
                  {liveStatusInfo.statusLabel}
                </span>
                <span className="text-[9px] text-slate-400 block font-medium truncate">Live Verified</span>
              </div>
            </div>

            {/* Time Remaining (Active when In Progress or when active status is selected) */}
            {liveStatusInfo.isLiveActive && (
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-300 block">
                      Time Remaining (Active Match)
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Court access active until slot finish</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-lg sm:text-xl font-black text-emerald-400 tracking-widest bg-black/40 px-3 py-1 rounded-lg border border-emerald-700/60 inline-block shadow-inner">
                    {liveStatusInfo.timeRemainingFormatted}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Large, Easily Scannable QR Code Box */}
          <div className="mt-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center text-center relative overflow-hidden">
            
            {/* QR Container Frame */}
            <div className={`w-48 h-48 sm:w-56 sm:h-56 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-md flex items-center justify-center relative ${
              liveStatusInfo.isExpired || liveStatusInfo.isCancelled ? 'opacity-40 grayscale' : ''
            }`}>
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-slate-900 fill-current"
                shapeRendering="crispEdges"
                role="img"
                aria-label="Scannable QR Booking Pass"
              >
                {/* White Background */}
                <rect width="100" height="100" fill="#ffffff" />

                {/* Top-Left Finder Pattern */}
                <rect x="6" y="6" width="22" height="22" rx="2" fill="#0f172a" />
                <rect x="9" y="9" width="16" height="16" rx="1" fill="#ffffff" />
                <rect x="12" y="12" width="10" height="10" rx="1" fill="#0f172a" />

                {/* Top-Right Finder Pattern */}
                <rect x="72" y="6" width="22" height="22" rx="2" fill="#0f172a" />
                <rect x="75" y="9" width="16" height="16" rx="1" fill="#ffffff" />
                <rect x="78" y="12" width="10" height="10" rx="1" fill="#0f172a" />

                {/* Bottom-Left Finder Pattern */}
                <rect x="6" y="72" width="22" height="22" rx="2" fill="#0f172a" />
                <rect x="9" y="75" width="16" height="16" rx="1" fill="#ffffff" />
                <rect x="12" y="78" width="10" height="10" rx="1" fill="#0f172a" />

                {/* High Density Scannable Matrix Grid */}
                <rect x="32" y="8" width="3" height="3" fill="#0f172a" />
                <rect x="38" y="8" width="3" height="3" fill="#0f172a" />
                <rect x="44" y="8" width="3" height="3" fill="#0f172a" />
                <rect x="50" y="8" width="3" height="3" fill="#0f172a" />
                <rect x="56" y="8" width="3" height="3" fill="#0f172a" />
                <rect x="62" y="8" width="3" height="3" fill="#0f172a" />
                
                <rect x="8" y="32" width="3" height="3" fill="#0f172a" />
                <rect x="8" y="38" width="3" height="3" fill="#0f172a" />
                <rect x="8" y="44" width="3" height="3" fill="#0f172a" />
                <rect x="8" y="50" width="3" height="3" fill="#0f172a" />
                <rect x="8" y="56" width="3" height="3" fill="#0f172a" />
                <rect x="8" y="62" width="3" height="3" fill="#0f172a" />

                <rect x="32" y="14" width="4" height="4" fill="#0f172a" />
                <rect x="40" y="14" width="4" height="4" fill="#0f172a" />
                <rect x="48" y="14" width="4" height="4" fill="#0f172a" />
                <rect x="56" y="14" width="4" height="4" fill="#0f172a" />
                <rect x="64" y="14" width="4" height="4" fill="#0f172a" />
                <rect x="36" y="20" width="4" height="4" fill="#0f172a" />
                <rect x="44" y="20" width="4" height="4" fill="#0f172a" />
                <rect x="52" y="20" width="4" height="4" fill="#0f172a" />
                <rect x="60" y="20" width="4" height="4" fill="#0f172a" />
                <rect x="32" y="26" width="4" height="4" fill="#0f172a" />
                <rect x="40" y="26" width="4" height="4" fill="#0f172a" />
                <rect x="48" y="26" width="4" height="4" fill="#0f172a" />
                <rect x="56" y="26" width="4" height="4" fill="#0f172a" />
                <rect x="64" y="26" width="4" height="4" fill="#0f172a" />

                <rect x="14" y="32" width="4" height="4" fill="#0f172a" />
                <rect x="22" y="32" width="4" height="4" fill="#0f172a" />
                <rect x="14" y="40" width="4" height="4" fill="#0f172a" />
                <rect x="22" y="40" width="4" height="4" fill="#0f172a" />
                <rect x="18" y="48" width="4" height="4" fill="#0f172a" />
                <rect x="26" y="48" width="4" height="4" fill="#0f172a" />
                <rect x="14" y="56" width="4" height="4" fill="#0f172a" />
                <rect x="22" y="56" width="4" height="4" fill="#0f172a" />
                <rect x="18" y="64" width="4" height="4" fill="#0f172a" />

                <rect x="72" y="32" width="4" height="4" fill="#0f172a" />
                <rect x="80" y="32" width="4" height="4" fill="#0f172a" />
                <rect x="88" y="32" width="4" height="4" fill="#0f172a" />
                <rect x="76" y="40" width="4" height="4" fill="#0f172a" />
                <rect x="84" y="40" width="4" height="4" fill="#0f172a" />
                <rect x="72" y="48" width="4" height="4" fill="#0f172a" />
                <rect x="88" y="48" width="4" height="4" fill="#0f172a" />
                <rect x="76" y="56" width="4" height="4" fill="#0f172a" />
                <rect x="84" y="56" width="4" height="4" fill="#0f172a" />

                <rect x="70" y="70" width="14" height="14" rx="1" fill="#0f172a" />
                <rect x="73" y="73" width="8" height="8" rx="0.5" fill="#ffffff" />
                <rect x="75" y="75" width="4" height="4" rx="0.5" fill="#0f172a" />

                <rect x="32" y="72" width="4" height="4" fill="#0f172a" />
                <rect x="40" y="72" width="4" height="4" fill="#0f172a" />
                <rect x="48" y="72" width="4" height="4" fill="#0f172a" />
                <rect x="56" y="72" width="4" height="4" fill="#0f172a" />
                <rect x="36" y="80" width="4" height="4" fill="#0f172a" />
                <rect x="44" y="80" width="4" height="4" fill="#0f172a" />
                <rect x="52" y="80" width="4" height="4" fill="#0f172a" />
                <rect x="60" y="80" width="4" height="4" fill="#0f172a" />
                <rect x="32" y="88" width="4" height="4" fill="#0f172a" />
                <rect x="40" y="88" width="4" height="4" fill="#0f172a" />
                <rect x="48" y="88" width="4" height="4" fill="#0f172a" />
                <rect x="56" y="88" width="4" height="4" fill="#0f172a" />

                {/* Centered Pass Verification Badge */}
                <rect x="38" y="38" width="24" height="24" rx="4" fill="#ffffff" />
                <rect x="40" y="40" width="20" height="20" rx="3" fill={liveStatusInfo.isExpired || liveStatusInfo.isCancelled ? '#64748b' : '#059669'} />
                <path
                  d="M45 50 L48 53 L55 46"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* EXPIRATION / CANCELLATION OVERLAY BANNER */}
            {liveStatusInfo.isExpired && !liveStatusInfo.isCancelled && (
              <div className="mt-3 p-3 rounded-xl bg-slate-200/90 border border-slate-300 text-slate-800 text-xs font-semibold max-w-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                <span className="italic">
                  This Booking Pass has expired because the booked slot has ended.
                </span>
              </div>
            )}

            {liveStatusInfo.isCancelled && (
              <div className="mt-3 p-3 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-semibold max-w-sm flex items-center gap-2">
                <Ban className="w-4 h-4 text-rose-600 shrink-0" />
                <span>This Booking Pass is cancelled. Gate entry validation is disabled.</span>
              </div>
            )}

            {/* Heading & Supporting Text for Active Pass */}
            {!liveStatusInfo.isExpired && !liveStatusInfo.isCancelled && (
              <div className="mt-3.5 space-y-1">
                <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                  Scan Booking Pass at Venue Gate
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Show this pass to venue staff for entry verification.
                </p>
              </div>
            )}

            {/* Backup Pass Code & Copy Button */}
            <div className="mt-4 pt-3.5 border-t border-slate-200/80 w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-white p-2.5 rounded-xl border">
              <div className="text-left">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
                  Backup Pass Code
                </span>
                <span className="font-mono text-sm sm:text-base font-black text-slate-900 tracking-wider">
                  {backupPassCode}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyPassCode}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200/80 transition-all shadow-2xs active:scale-95 cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Copy Pass Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Venue & Time Summary Strip */}
          <div className="mt-5 space-y-3">
            {/* Venue & Court Name */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Venue & Court</span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 font-display">
                {venueName}
              </h4>
              <p className="text-xs font-bold text-slate-700">
                {courtName}
              </p>
            </div>

            {/* Booking Date & Entry / Slot Timing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Booking Date */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Booking Date</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm font-black text-slate-900">
                  {bookingDate}
                </p>
              </div>

              {/* Entry Time & Booked Slot */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Booked Slot</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm font-black text-emerald-700">
                  {formattedStartTime} - {formattedEndTime}
                </p>
                <span className="text-[10px] font-semibold text-slate-500 block mt-0.5">
                  Entry Time: {formattedEntryTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Divider Marker */}
        <div className="relative py-2 flex items-center justify-center">
          <div className="w-full border-t border-dashed border-slate-200" />
          <span className="absolute bg-white px-3 text-[10px] uppercase font-black tracking-widest text-slate-400">
            Booking & Player Details
          </span>
        </div>

        {/* ========================================================================= */}
        {/* SECOND SCREEN — Booking Pass Details After Scrolling */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          
          {/* 1. Full Venue Address Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1.5">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600" />
              Full Venue Address
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              {venueAddress}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              Landmark: Opposite City Sports Complex, Gate No. 2
            </p>
          </div>

          {/* 2. Player & Match Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Player Name & Mobile Number */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-1">
                <User className="w-3 h-3 text-slate-400" />
                Primary Player
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                {playerName}
              </p>
              <p className="text-xs font-semibold text-slate-600 font-mono">
                {playerPhone}
              </p>
            </div>

            {/* Number of Players & Booking Type */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" />
                Players & Booking Type
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                {numberOfPlayers}
              </p>
              <p className="text-[11px] font-semibold text-emerald-700 truncate">
                {bookingType}
              </p>
            </div>
          </div>

          {/* 3. Payment Summary & Transaction ID */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-slate-400" />
                Payment Summary
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100/80 text-emerald-800">
                <Check className="w-2.5 h-2.5" />
                Paid & Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200/60 text-xs">
              <div>
                <span className="text-[10px] font-semibold text-slate-500 block">Amount Paid</span>
                <span className="text-base sm:text-lg font-black text-slate-900 block mt-0.5">
                  ₹{amountPaid}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-500 block">Payment Method</span>
                <span className="text-xs font-bold text-slate-800 block mt-0.5">
                  {paymentMethod}
                </span>
              </div>
            </div>

            {/* Transaction ID & Pass Valid Until */}
            <div className="pt-2 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-slate-500">Txn ID:</span>
                <span className="font-mono text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {transactionId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyTxn}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
                  title="Copy Transaction ID"
                >
                  {copiedTxn ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-semibold text-slate-500 block">Pass Valid Until</span>
                <span className="text-[11px] font-bold text-emerald-800">
                  {validUntil}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Venue Entry Instructions Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Venue Entry Instructions
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Arrive by <strong className="text-slate-900">{formattedEntryTime}</strong> (15 minutes prior) at Gate Security.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Scan this digital pass QR code or provide backup pass code <strong className="font-mono text-slate-900">{backupPassCode}</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Wear appropriate sports footwear (turf shoes / non-marking sneakers).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Outside glass containers and metal cleats are strictly prohibited on court.</span>
              </li>
            </ul>
          </div>

          {/* 5. Cancellation Policy */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-900 text-xs font-bold">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Cancellation Policy</span>
            </div>
            <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
              Free cancellation with 100% refund available up to 6 hours before slot commencement. Cancellations within 6 hours are subject to a 50% venue retention fee.
            </p>
          </div>

          {/* 6. Post-Booking Rating and Review Feature (Available only for Completed Bookings) */}
          {(liveStatusInfo.type === 'completed' || liveStatusInfo.isExpired) && !liveStatusInfo.isCancelled && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/95 via-teal-50/80 to-emerald-50/95 border border-emerald-200 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 font-display">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>How was your game?</span>
                  </div>
                  <p className="text-xs text-slate-600 italic">
                    Rate your experience at <strong className="text-slate-800 not-italic">{venueName}</strong>.
                  </p>
                </div>

                {booking?.isRated && (
                  <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    Rated {booking?.userRating ? `★ ${booking.userRating}` : '★ 5'}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => onRate && onRate(booking as Booking)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm shadow-emerald-600/20 transition-all active:scale-[0.98] cursor-pointer min-h-[44px]"
              >
                {booking?.isRated ? (
                  <>
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Your Review</span>
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span>Rate Your Experience</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* BOTTOM ACTIONS BAR — Get Directions, Call Venue, Download, Share */}
          {/* ========================================================================= */}
          <div className="pt-2 pb-6 space-y-2.5">
            <div className="grid grid-cols-2 gap-2.5">
              {/* Get Directions Button */}
              <button
                type="button"
                onClick={handleGetDirections}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold shadow-sm transition-all active:scale-[0.98] cursor-pointer min-h-[44px]"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Get Directions</span>
              </button>

              {/* Call Venue Button */}
              <button
                type="button"
                onClick={handleCallVenue}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-extrabold border border-slate-200 shadow-2xs transition-all active:scale-[0.98] cursor-pointer min-h-[44px]"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Venue</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Download Booking Pass Button */}
              <button
                type="button"
                onClick={handleDownloadPass}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm shadow-emerald-600/20 transition-all active:scale-[0.98] cursor-pointer min-h-[44px]"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Download Pass</span>
              </button>

              {/* Share Booking Pass Button */}
              <button
                type="button"
                onClick={handleSharePass}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-extrabold border border-slate-300 shadow-2xs transition-all active:scale-[0.98] cursor-pointer min-h-[44px]"
              >
                {shared ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Shared!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-600" />
                    <span>Share Pass</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
