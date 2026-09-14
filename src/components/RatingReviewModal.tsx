import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  CheckCircle2,
  X,
  Sparkles,
  ShieldCheck,
  Tag,
  MessageSquare,
  ThumbsUp,
  MapPin,
  Calendar,
  Clock,
  Edit3,
} from 'lucide-react';
import { Booking, Review } from '../types';
import { reviewService, REVIEW_TAG_OPTIONS, SubmitReviewInput } from '../services/reviewService';
import { useAuth } from '../context/AuthContext';

export interface RatingReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onShowToast?: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
  onReviewSubmitted?: (updatedBooking: Booking, review: Review) => void;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

export const RatingReviewModal: React.FC<RatingReviewModalProps> = ({
  isOpen,
  onClose,
  booking,
  onShowToast,
  onReviewSubmitted,
}) => {
  const { user } = useAuth();
  const [existingReview, setExistingReview] = useState<Review | null>(null);

  // Form states
  const [overallRating, setOverallRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [courtQuality, setCourtQuality] = useState<number>(5);
  const [cleanliness, setCleanliness] = useState<number>(5);
  const [staffService, setStaffService] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (booking && isOpen) {
      const rev = reviewService.getReviewByBookingId(booking.id);
      if (rev) {
        setExistingReview(rev);
        setOverallRating(rev.rating || 5);
        setCourtQuality(rev.courtQuality || rev.categories?.courtQuality || rev.rating || 5);
        setCleanliness(rev.cleanliness || rev.categories?.cleanliness || rev.rating || 5);
        setStaffService(rev.staffService || rev.categories?.staffService || rev.categories?.staff || rev.rating || 5);
        setSelectedTags(rev.tags || []);
        setComment(rev.comment || '');
      } else {
        setExistingReview(null);
        setOverallRating(5);
        setCourtQuality(5);
        setCleanliness(5);
        setStaffService(5);
        setSelectedTags(['Great court', 'Clean facility']);
        setComment('');
      }
    }
  }, [booking, isOpen]);

  if (!isOpen || !booking) return null;

  const venueName = booking.venueName || booking.facilityName || 'Venue';
  const courtName = booking.courtName || 'Court';
  const sport = booking.sport || 'Sports';

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (overallRating < 1) {
      if (onShowToast) {
        onShowToast('error', 'Rating Required', 'Please select a star rating for your overall experience.');
      }
      return;
    }

    try {
      setIsSubmitting(true);

      const reviewInput: SubmitReviewInput = {
        bookingId: booking.id,
        facilityId: String(booking.facilityId || booking.venueId || 'fac_1'),
        facilityName: venueName,
        courtName: courtName,
        sport: sport,
        userId: user?.id || booking.userId || 'usr_player_1',
        userName: user?.name || booking.userName || 'Player',
        userAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        rating: overallRating,
        courtQuality,
        cleanliness,
        staffService,
        tags: selectedTags,
        comment: comment.trim(),
      };

      let resultReview: Review;

      if (existingReview) {
        const res = await reviewService.updateReview(existingReview.id, reviewInput);
        resultReview = res.review;
      } else {
        const res = await reviewService.submitReview(reviewInput);
        resultReview = res.review;
      }

      const updatedBooking: Booking = {
        ...booking,
        isRated: true,
        userRating: overallRating,
        reviewId: resultReview.id,
        ratedAt: new Date().toISOString(),
      };

      if (onShowToast) {
        onShowToast(
          'success',
          'Thank you for your feedback!',
          'Your review helps other players find better venues.'
        );
      }

      if (onReviewSubmitted) {
        onReviewSubmitted(updatedBooking, resultReview);
      }

      onClose();
    } catch (err: any) {
      if (onShowToast) {
        onShowToast('error', 'Submission Failed', err.message || 'Unable to submit your review.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rating-modal-title"
      >
        {/* Modal Top Header Banner */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 sm:p-6 shrink-0 border-b border-slate-800">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close rating modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Booking Review</span>
            {existingReview && (
              <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-amber-400/30 flex items-center gap-1">
                <Edit3 className="w-3 h-3" />
                Editing Review
              </span>
            )}
          </div>

          <h2 id="rating-modal-title" className="text-xl sm:text-2xl font-black font-display text-white">
            How was your game?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 italic leading-snug">
            Rate your experience at <span className="font-semibold text-emerald-300 not-italic">{venueName}</span>.
          </p>

          {/* Booking Summary Pill */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-300 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
            <span className="font-semibold text-white">{courtName}</span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-300">{sport}</span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1 text-slate-300 font-mono text-[11px]">
              <Clock className="w-3 h-3 text-emerald-400" />
              {booking.startTime} - {booking.endTime}
            </span>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1 text-slate-900">
          {/* 1. OVERALL STAR RATING */}
          <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 text-center space-y-3">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
              Overall Experience Rating *
            </label>

            {/* Big Tappable Interactive Stars */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || overallRating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setOverallRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`Rate ${star} out of 5 stars`}
                    className="p-1 rounded-xl transition-all transform hover:scale-125 active:scale-95 focus:outline-none cursor-pointer"
                  >
                    <Star
                      className={`w-9 h-9 sm:w-11 sm:h-11 transition-colors duration-150 ${
                        isFilled
                          ? 'fill-amber-400 text-amber-400 drop-shadow-md'
                          : 'fill-transparent text-slate-300 hover:text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="text-sm font-extrabold text-slate-900 flex items-center justify-center gap-1.5">
              <span className="text-amber-500 font-black text-base">{hoverRating || overallRating} / 5</span>
              <span className="text-slate-400 font-normal">—</span>
              <span className="text-slate-700 font-bold">{RATING_LABELS[hoverRating || overallRating]}</span>
            </div>
          </div>

          {/* 2. CATEGORY / DIMENSION RATINGS */}
          <div className="space-y-3">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
              Detailed Experience Breakdown
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Court Quality */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Court Quality</span>
                  <span className="text-[10px] text-slate-400 block">Turf, bounce & lines</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setCourtQuality(s)}
                        className="cursor-pointer focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            courtQuality >= s ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{courtQuality}★</span>
                </div>
              </div>

              {/* Cleanliness */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Cleanliness</span>
                  <span className="text-[10px] text-slate-400 block">Hygiene & amenities</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setCleanliness(s)}
                        className="cursor-pointer focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            cleanliness >= s ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{cleanliness}★</span>
                </div>
              </div>

              {/* Staff & Service */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Staff & Service</span>
                  <span className="text-[10px] text-slate-400 block">Assistance & entry speed</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStaffService(s)}
                        className="cursor-pointer focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            staffService >= s ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{staffService}★</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. OPTIONAL TAGS */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span>What stood out most? (Optional Tags)</span>
              </label>
              <span className="text-[10px] text-slate-400">Select all that apply</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {REVIEW_TAG_OPTIONS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                const isNegative = tag === 'Needs improvement';
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isSelected
                        ? isNegative
                          ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-xs'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                        : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 border-slate-200'
                    }`}
                  >
                    {isSelected ? (
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isNegative ? 'text-rose-600' : 'text-emerald-600'}`} />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    )}
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. WRITTEN REVIEW (OPTIONAL) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="review-comment" className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                <span>Written Review (Optional)</span>
              </label>
              <span className="text-[10px] font-mono text-slate-400">{comment.length}/500</span>
            </div>

            <textarea
              id="review-comment"
              rows={3}
              maxLength={500}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell other players about court bounce, lighting quality, changing rooms, parking, or overall vibe..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
            />
          </div>

          {/* SUBMIT / ACTION BUTTONS */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer order-2 sm:order-1"
            >
              Skip for now
            </button>

            <button
              type="submit"
              disabled={isSubmitting || overallRating < 1}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2 min-h-[44px]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : existingReview ? (
                <>
                  <Edit3 className="w-4 h-4" />
                  <span>Update Review</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Submit Review</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
