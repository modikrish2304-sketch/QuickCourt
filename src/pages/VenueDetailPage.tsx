import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Star,
  CheckCircle2,
  Clock,
  Shield,
  Phone,
  Calendar,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  Check,
  Building2,
  X,
  Tag,
} from 'lucide-react';
import { Facility, Court, Review } from '../types';
import { reviewService } from '../services/reviewService';

interface VenueDetailPageProps {
  facility: Facility & { courts: Court[]; reviews: Review[] };
  navigate: (route: string) => void;
}

export const VenueDetailPage: React.FC<VenueDetailPageProps> = ({ facility, navigate }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [liveReviews, setLiveReviews] = useState<Review[]>(facility.reviews || []);
  const [ratingStats, setRatingStats] = useState(() =>
    reviewService.getFacilityRatingStats(facility.id)
  );

  const loadReviewsAndStats = () => {
    const revs = reviewService.getReviewsForFacility(facility.id);
    setLiveReviews(revs.length > 0 ? revs : facility.reviews || []);
    setRatingStats(reviewService.getFacilityRatingStats(facility.id));
  };

  useEffect(() => {
    loadReviewsAndStats();
    window.addEventListener('quickcourt_reviews_updated', loadReviewsAndStats);
    window.addEventListener('storage', loadReviewsAndStats);
    return () => {
      window.removeEventListener('quickcourt_reviews_updated', loadReviewsAndStats);
      window.removeEventListener('storage', loadReviewsAndStats);
    };
  }, [facility.id]);

  const courts = facility.courts || [];
  const reviews = liveReviews;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % facility.images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + facility.images.length) % facility.images.length);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Back Nav & Quick Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/venues')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Venues</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Facility link copied to clipboard!');
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* 1. HERO PHOTO GALLERY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Main Large Photo */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="lg:col-span-8 relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-800 cursor-zoom-in group shadow-xl"
          >
            <img
              src={facility.images[activeImageIndex]}
              alt={facility.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Gallery Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Verified badge */}
            {facility.verifiedBadge && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md text-xs font-bold text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Facility</span>
              </div>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] font-mono text-slate-300">
              {activeImageIndex + 1} / {facility.images.length} Photos
            </div>
          </div>

          {/* Thumbnails Sidebar */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2.5">
            {facility.images.slice(0, 4).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-20 sm:h-22 lg:h-[86px] rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? 'border-emerald-500 shadow-md' : 'border-slate-800 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* 2. VENUE HEADER INFO & STICKY BOOKING CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Details (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header Title */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {facility.sports.map((sport) => (
                  <span
                    key={sport}
                    className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                  >
                    {sport}
                  </span>
                ))}
                <span className="text-xs text-slate-500 capitalize px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {facility.venueType} Venue
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                {facility.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1 font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{facility.rating}</span>
                  <span className="text-slate-500 font-normal">({facility.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{facility.address}, {facility.city} - {facility.pincode}</span>
                </div>

                <div className="flex items-center gap-1 text-emerald-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{facility.openingTime} - {facility.closingTime} Daily</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                About this Facility
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {facility.description}
              </p>
            </div>

            {/* Courts Available at this facility */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-display">
                  Courts at this Venue ({courts.length})
                </h3>
                <span className="text-xs text-emerald-400 font-semibold">
                  Real-time Availability Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {courts.map((court) => (
                  <div
                    key={court.id}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{court.name}</span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            court.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                        <span>{court.sport}</span>
                        <span>•</span>
                        <span>{court.openingTime} - {court.closingTime}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400 font-display">
                        ₹{court.pricePerHour}/hr
                      </div>
                      <button
                        onClick={() => navigate(`/venues/${facility.id}/book?courtId=${court.id}`)}
                        className="mt-1 px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-[10px] transition-colors"
                      >
                        Select Court
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                Amenities & Facilities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {facility.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facility Rules & Etiquette */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-400" />
                Facility Rules & Etiquette
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {facility.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews Section */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Player Reviews ({reviews.length})
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-amber-300 font-bold mt-0.5">
                    <Star className="w-4 h-4 fill-amber-300" />
                    <span>
                      {ratingStats.totalReviews > 0 ? ratingStats.averageRating : facility.rating} out of 5.0 rating
                    </span>
                    <span className="text-slate-500 font-normal">
                      • {ratingStats.totalReviews > 0 ? ratingStats.totalReviews : (facility.reviewsCount || reviews.length)} verified reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Ratings Category breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-800/50 rounded-xl text-[11px] text-slate-300">
                <div className="text-center p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                  <div className="text-slate-400 font-medium">Court Quality</div>
                  <div className="font-bold text-amber-300 mt-0.5 flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>{ratingStats.courtQualityAvg}</span>
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                  <div className="text-slate-400 font-medium">Cleanliness</div>
                  <div className="font-bold text-amber-300 mt-0.5 flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>{ratingStats.cleanlinessAvg}</span>
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                  <div className="text-slate-400 font-medium">Staff & Service</div>
                  <div className="font-bold text-amber-300 mt-0.5 flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>{ratingStats.staffServiceAvg}</span>
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                  <div className="text-slate-400 font-medium">Value for Money</div>
                  <div className="font-bold text-amber-300 mt-0.5 flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>{ratingStats.valueForMoneyAvg}</span>
                  </div>
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-3 pt-2">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2.5 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                          alt={rev.userName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-600 shrink-0"
                        />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5 flex-wrap">
                            <span>{rev.userName}</span>
                            {rev.verifiedBooking && (
                              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                Verified Player
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(rev.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-amber-300 text-xs font-bold shrink-0">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-300" />
                        ))}
                      </div>
                    </div>

                    {/* Review Tags */}
                    {rev.tags && rev.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {rev.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              t === 'Needs improvement'
                                ? 'bg-rose-950/40 text-rose-300 border-rose-800/40'
                                : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {rev.comment && (
                      <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
                        {rev.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Booking Action Box (Right 4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-5">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Starting from</span>
                  <span className="text-3xl font-extrabold text-emerald-400 font-display">
                    ₹{facility.startingPrice}
                  </span>
                  <span className="text-xs text-slate-400">/hour</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Instant Booking
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 border-t border-b border-slate-800 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Courts:</span>
                  <span className="font-semibold text-white">{courts.length} Courts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Cancellation:</span>
                  <span className="font-semibold text-emerald-400">Allowed (Up to 1 hr before)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Operating Hours:</span>
                  <span className="font-semibold text-white">{facility.openingTime} - {facility.closingTime}</span>
                </div>
              </div>

              {/* Big CTA */}
              <button
                onClick={() => navigate(`/venues/${facility.id}/book`)}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4 stroke-[2.5]" />
                <span>BOOK A COURT NOW</span>
              </button>

              <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                Zero double-booking guarantee. Instant gate pass issued immediately upon booking.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4 backdrop-blur-md"
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={facility.images[activeImageIndex]}
            alt="Enlarged preview"
            className="max-w-4xl max-h-[85vh] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
