import React, { useState, useEffect } from 'react';
import { venueService } from '../services/venueService';
import { Facility, Court, Review } from '../types';
import { ImageGallery } from '../components/ImageGallery';
import { Rating } from '../components/Rating';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Info,
  Calendar,
  Share2,
} from 'lucide-react';

export interface VenueDetailsPageProps {
  venueId: string;
  onNavigate: (route: string) => void;
  onShowToast?: (type: 'success' | 'info', title: string, msg?: string) => void;
}

export const VenueDetailsPage: React.FC<VenueDetailsPageProps> = ({
  venueId,
  onNavigate,
  onShowToast,
}) => {
  const [venue, setVenue] = useState<(Facility & { courts: Court[]; reviews: Review[] }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVenue = async () => {
      try {
        setLoading(true);
        const data = await venueService.getVenueById(venueId);
        setVenue(data);
      } finally {
        setLoading(false);
      }
    };
    loadVenue();
  }, [venueId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <LoadingSpinner size="lg" text="Loading venue information..." />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Venue Not Found</h2>
        <p className="text-xs text-slate-500 mb-4">The sports facility you requested could not be located.</p>
        <Button variant="primary" size="sm" onClick={() => onNavigate('/venues')}>
          Back to Venues
        </Button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) {
        onShowToast('success', 'Link Copied', 'Venue link copied to clipboard.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-6 sm:py-10 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation & Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('/venues')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all venues</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share Venue</span>
          </button>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Columns: Media & Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={venue.images || []} venueName={venue.name} />

            {/* Venue Header & Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 capitalize">
                  {venue.venueType || 'Indoor Facility'}
                </span>
                {venue.verifiedBadge && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    Verified Partner
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {venue.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <Rating
                  value={venue.rating}
                  reviewCount={venue.reviewCount}
                  size="md"
                />
                <span>•</span>
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{venue.address || `${venue.area}, ${venue.city}`}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{venue.openingTime || '06:00'} - {venue.closingTime || '23:00'}</span>
                </div>
              </div>

              {/* Sports offered */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Sports Available
                </span>
                <div className="flex flex-wrap gap-2">
                  {venue.sports.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* About Venue */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                About the Facility
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {venue.description ||
                  'Modern sports arena built for professional and recreational play. Fully equipped with tournament-standard flooring, high-lux shadowless LED lighting, clean washrooms, and dedicated parking.'}
              </p>
            </div>

            {/* Available Courts */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Courts & Pitches ({venue.courts?.length || 0})
                </h2>
                <span className="text-xs text-slate-400 font-medium">All active</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {venue.courts?.map((court) => (
                  <div
                    key={court.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{court.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {court.sport} • {court.type || 'Indoor'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-slate-900 font-display">
                        ₹{court.pricePerHour}
                      </span>
                      <span className="text-[10px] text-slate-400 block">/hr</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {venue.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules & Guidelines */}
            {venue.rules && venue.rules.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
                <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-600" />
                  Venue Rules & Guidelines
                </h2>
                <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
                  {venue.rules.map((rule, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    Player Reviews
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verified feedback from players who booked this venue.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-slate-900 font-display">
                    {venue.rating.toFixed(1)}
                  </span>
                  <Rating value={venue.rating} showNumber={false} size="md" />
                </div>
              </div>

              <div className="space-y-4">
                {venue.reviews && venue.reviews.length > 0 ? (
                  venue.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                            {rev.userName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{rev.userName}</h4>
                            <span className="text-[10px] text-slate-400">
                              {new Date(rev.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                        <Rating value={rev.rating} showNumber={false} size="sm" />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-10">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No reviews yet for this venue.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Callout Card */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg shadow-slate-200/40 space-y-5">
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Starting From
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-black text-slate-900 font-display">
                      ₹{venue.startingPrice}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ hour</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Instant Booking
                </span>
              </div>

              {/* Quick Summary list */}
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Courts available</span>
                  <span className="font-bold text-slate-800">{venue.courts?.length || 0} Courts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Operating hours</span>
                  <span className="font-bold text-slate-800">{venue.openingTime} - {venue.closingTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Platform convenience fee</span>
                  <span className="font-bold text-emerald-600">Flat ₹25</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Cancellation</span>
                  <span className="font-bold text-slate-800">Free before match day</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate(`/booking/${venue.id}`)}
                className="w-full"
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Select Court & Time Slot
              </Button>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Safe & Secure simulated checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
