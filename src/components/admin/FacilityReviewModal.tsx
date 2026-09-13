import React, { useState } from 'react';
import {
  X,
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Phone,
  User,
  DollarSign,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { Facility } from '../../types';
import { AdminConfirmationModal } from './AdminConfirmationModal';

interface FacilityReviewModalProps {
  facility: Facility | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (facilityId: string, comment?: string) => void;
  onReject: (facilityId: string, reason: string) => void;
}

export const FacilityReviewModal: React.FC<FacilityReviewModalProps> = ({
  facility,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isConfirmApproveOpen, setIsConfirmApproveOpen] = useState(false);
  const [isConfirmRejectOpen, setIsConfirmRejectOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [approvalComment, setApprovalComment] = useState(
    'Verified court dimensions, safety measures, and business documents. Approved for public listing.'
  );

  if (!isOpen || !facility) return null;

  const images = facility.images && facility.images.length > 0 ? facility.images : [
    'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&auto=format&fit=crop&q=80',
  ];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleExecuteApprove = () => {
    onApprove(facility.id, approvalComment);
    setIsConfirmApproveOpen(false);
    onClose();
  };

  const handleExecuteReject = () => {
    onReject(facility.id, rejectionReason);
    setIsConfirmRejectOpen(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
        <div className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
          {/* Modal Header */}
          <div className="p-4 sm:p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F7F9F8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold font-display text-[#172033]">
                    {facility.name}
                  </h2>
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-md capitalize ${
                      facility.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : facility.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {facility.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submitted ID: <span className="font-mono">{facility.id}</span> • Owner: {facility.ownerName}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Interactive Photo Gallery */}
            <div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={images[activeImageIndex]}
                  alt={`${facility.name} preview`}
                  className="w-full h-full object-cover"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 text-white text-xs font-medium">
                      {activeImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails row */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-emerald-600 scale-95 shadow-sm'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="thumb"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Rejection notice banner if already rejected */}
            {facility.status === 'rejected' && facility.rejectionReason && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Rejection Reason on Record:
                </div>
                <p>{facility.rejectionReason}</p>
              </div>
            )}

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#F7F9F8] rounded-xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Starting Price
                </span>
                <span className="text-sm font-extrabold text-slate-900 mt-0.5 block">
                  ₹{facility.startingPrice} / hr
                </span>
              </div>
              <div className="p-3 bg-[#F7F9F8] rounded-xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Court Inventory
                </span>
                <span className="text-sm font-extrabold text-slate-900 mt-0.5 block">
                  {facility.courtCount || 4} Total Courts
                </span>
              </div>
              <div className="p-3 bg-[#F7F9F8] rounded-xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Venue Type
                </span>
                <span className="text-sm font-extrabold text-slate-900 mt-0.5 capitalize block">
                  {facility.venueType}
                </span>
              </div>
              <div className="p-3 bg-[#F7F9F8] rounded-xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Hours of Operation
                </span>
                <span className="text-sm font-extrabold text-slate-900 mt-0.5 block">
                  {facility.openingTime} - {facility.closingTime}
                </span>
              </div>
            </div>

            {/* Description & Sports */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  About Facility & Specifications
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {facility.description || 'Premium sports facility equipped with professional court surfaces.'}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Configured Sports Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {facility.sports.map((sp) => (
                    <span
                      key={sp}
                      className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-xl text-xs font-bold"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location & Owner Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    Physical Location
                  </div>
                  <p className="text-xs text-slate-600">{facility.address}</p>
                  <p className="text-xs text-slate-500 font-medium">
                    {facility.area}, {facility.city} - {facility.pincode}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-blue-600" />
                    Owner Details
                  </div>
                  <p className="text-xs font-bold text-slate-800">{facility.ownerName}</p>
                  <p className="text-xs text-slate-500 font-mono">Owner ID: {facility.ownerId}</p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Amenities & Facilities Provided
                </h4>
                <div className="flex flex-wrap gap-2">
                  {facility.amenities.map((am) => (
                    <span
                      key={am}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                    >
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>

              {/* House Rules */}
              {facility.rules && facility.rules.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Facility House Rules
                  </h4>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {facility.rules.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="p-4 sm:p-6 border-t border-[#E5E7EB] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              {facility.status === 'approved' ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> This facility is verified and active on the platform.
                </span>
              ) : (
                'Reviewing documentation, location accuracy, and surface quality.'
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {facility.status !== 'rejected' && (
                <button
                  type="button"
                  onClick={() => setIsConfirmRejectOpen(true)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors"
                >
                  Reject Facility
                </button>
              )}

              {facility.status !== 'approved' && (
                <button
                  type="button"
                  onClick={() => setIsConfirmApproveOpen(true)}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Publish</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <AdminConfirmationModal
        isOpen={isConfirmApproveOpen}
        title={`Approve "${facility.name}"?`}
        message="Once approved, this facility will immediately be marked as Verified and visible to all players in the venue directory. Courts will become active for real-time bookings."
        confirmLabel="Approve Facility"
        variant="success"
        showInput={true}
        inputValue={approvalComment}
        onInputChange={setApprovalComment}
        inputPlaceholder="Optional inspection notes..."
        onConfirm={handleExecuteApprove}
        onClose={() => setIsConfirmApproveOpen(false)}
      />

      <AdminConfirmationModal
        isOpen={isConfirmRejectOpen}
        title={`Reject "${facility.name}"?`}
        message="Please provide a clear reason for rejecting this facility. The owner will receive this feedback so they can fix any issues and re-submit."
        confirmLabel="Reject Submission"
        variant="danger"
        showInput={true}
        inputValue={rejectionReason}
        onInputChange={setRejectionReason}
        inputPlaceholder="e.g. Missing valid business trade license / non-standard court dimensions..."
        onConfirm={handleExecuteReject}
        onClose={() => setIsConfirmRejectOpen(false)}
      />
    </>
  );
};
