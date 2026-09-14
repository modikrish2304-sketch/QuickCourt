import React, { useState } from 'react';
import { Copy, Check, QrCode as QrIcon } from 'lucide-react';

export interface UpiQrCodeProps {
  upiId?: string;
  payeeName?: string;
  amount?: number;
  transactionRef?: string;
  bookingId?: string;
  type?: 'entry_pass' | 'upi_payment' | 'both';
  size?: 'sm' | 'md' | 'lg';
  onCopy?: () => void;
}

export const UpiQrCode: React.FC<UpiQrCodeProps> = ({
  upiId = 'quickcourt.sports@icici',
  payeeName = 'QuickCourt Sports Arena',
  amount,
  transactionRef,
  bookingId,
  type = 'entry_pass',
  size = 'md',
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);

  const displayCode = bookingId || transactionRef || 'QC-PASS-7842';

  const handleCopy = () => {
    navigator.clipboard.writeText(type === 'upi_payment' ? upiId : displayCode);
    setCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  const dimensionClasses = {
    sm: 'w-32 h-32',
    md: 'w-44 h-44',
    lg: 'w-52 h-52',
  }[size];

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      {/* Clean, Simple QR Code Container */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
        <div className={`${dimensionClasses} relative flex items-center justify-center`}>
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-slate-900 fill-current"
            shapeRendering="crispEdges"
          >
            {/* White Background */}
            <rect width="100" height="100" fill="#ffffff" />

            {/* Top-Left Finder Corner */}
            <rect x="6" y="6" width="22" height="22" rx="2" fill="#0f172a" />
            <rect x="9" y="9" width="16" height="16" rx="1" fill="#ffffff" />
            <rect x="12" y="12" width="10" height="10" rx="1" fill="#0f172a" />

            {/* Top-Right Finder Corner */}
            <rect x="72" y="6" width="22" height="22" rx="2" fill="#0f172a" />
            <rect x="75" y="9" width="16" height="16" rx="1" fill="#ffffff" />
            <rect x="78" y="12" width="10" height="10" rx="1" fill="#0f172a" />

            {/* Bottom-Left Finder Corner */}
            <rect x="6" y="72" width="22" height="22" rx="2" fill="#0f172a" />
            <rect x="9" y="75" width="16" height="16" rx="1" fill="#ffffff" />
            <rect x="12" y="78" width="10" height="10" rx="1" fill="#0f172a" />

            {/* Timing Tracks */}
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

            {/* Clean QR Matrix Dots */}
            {/* Top Area */}
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

            {/* Mid Left */}
            <rect x="14" y="32" width="4" height="4" fill="#0f172a" />
            <rect x="22" y="32" width="4" height="4" fill="#0f172a" />
            <rect x="14" y="40" width="4" height="4" fill="#0f172a" />
            <rect x="22" y="40" width="4" height="4" fill="#0f172a" />
            <rect x="18" y="48" width="4" height="4" fill="#0f172a" />
            <rect x="26" y="48" width="4" height="4" fill="#0f172a" />
            <rect x="14" y="56" width="4" height="4" fill="#0f172a" />
            <rect x="22" y="56" width="4" height="4" fill="#0f172a" />
            <rect x="18" y="64" width="4" height="4" fill="#0f172a" />

            {/* Mid Right */}
            <rect x="72" y="32" width="4" height="4" fill="#0f172a" />
            <rect x="80" y="32" width="4" height="4" fill="#0f172a" />
            <rect x="88" y="32" width="4" height="4" fill="#0f172a" />
            <rect x="76" y="40" width="4" height="4" fill="#0f172a" />
            <rect x="84" y="40" width="4" height="4" fill="#0f172a" />
            <rect x="72" y="48" width="4" height="4" fill="#0f172a" />
            <rect x="88" y="48" width="4" height="4" fill="#0f172a" />
            <rect x="76" y="56" width="4" height="4" fill="#0f172a" />
            <rect x="84" y="56" width="4" height="4" fill="#0f172a" />

            {/* Bottom Right Alignment */}
            <rect x="70" y="70" width="14" height="14" rx="1" fill="#0f172a" />
            <rect x="73" y="73" width="8" height="8" rx="0.5" fill="#ffffff" />
            <rect x="75" y="75" width="4" height="4" rx="0.5" fill="#0f172a" />

            {/* Bottom Center */}
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

            {/* Center Eye Cutout & Logo Badge */}
            <rect x="38" y="38" width="24" height="24" rx="4" fill="#ffffff" />
            <rect x="40" y="40" width="20" height="20" rx="3" fill="#059669" />

            {/* Clean Center Check Icon */}
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

        {/* Clean Caption */}
        <p className="text-[11px] font-bold text-slate-700 mt-2.5">
          {type === 'upi_payment' ? 'Scan to Pay via UPI' : 'Scan at Venue Gate'}
        </p>
        <p className="text-[10px] text-slate-400 font-medium">
          {type === 'upi_payment' ? 'GPay, PhonePe, Paytm, BHIM' : 'Digital Gate Pass Verification'}
        </p>
      </div>

      {/* Copy Code Button */}
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-500" />
            <span>{type === 'upi_payment' ? 'Copy UPI ID' : 'Copy Pass Code'}</span>
          </>
        )}
      </button>
    </div>
  );
};
