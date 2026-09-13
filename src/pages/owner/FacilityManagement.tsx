import React, { useState, useEffect } from 'react';
import {
  Building2,
  MapPin,
  Sparkles,
  Upload,
  Trash2,
  Star,
  CheckCircle2,
  ExternalLink,
  Plus,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { facilityService } from '../../services/facilityService';
import { Facility, SportType } from '../../types';

export interface FacilityManagementProps {
  onNavigate: (route: string) => void;
  onShowToast?: (type: 'success' | 'warning' | 'error' | 'info', title: string, msg?: string) => void;
}

export const FacilityManagement: React.FC<FacilityManagementProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const { user } = useAuth();
  const [facility, setFacility] = useState<Facility>(() =>
    facilityService.getOwnerFacility(user?.id || 'usr_owner_1')
  );

  // Form State
  const [name, setName] = useState(facility.name);
  const [description, setDescription] = useState(facility.description || '');
  const [venueType, setVenueType] = useState(facility.venueType || 'Indoor');
  const [address, setAddress] = useState(facility.address || '');
  const [area, setArea] = useState(facility.area || '');
  const [city, setCity] = useState(facility.city || 'Ahmedabad');
  const [pincode, setPincode] = useState(facility.pincode || '380015');
  const [startingPrice, setStartingPrice] = useState(facility.startingPrice || 450);
  const [openingTime, setOpeningTime] = useState(facility.openingTime || '06:00');
  const [closingTime, setClosingTime] = useState(facility.closingTime || '23:00');

  // Sports
  const [selectedSports, setSelectedSports] = useState<SportType[]>(
    facility.sports || ['Badminton', 'Tennis']
  );

  // Amenities
  const [amenities, setAmenities] = useState<string[]>(
    facility.amenities || [
      'Parking',
      'Changing Rooms',
      'Washrooms',
      'Drinking Water',
      'Wi-Fi',
      'Equipment Rental',
      'LED Lighting',
    ]
  );
  const [customAmenity, setCustomAmenity] = useState('');

  // Photos
  const [images, setImages] = useState<string[]>(
    facility.images || [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=900&auto=format&fit=crop&q=80',
    ]
  );
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fac = facilityService.getOwnerFacility(user?.id || 'usr_owner_1');
    setFacility(fac);
    setName(fac.name);
    setDescription(fac.description);
    setVenueType(fac.venueType);
    setAddress(fac.address);
    setArea(fac.area);
    setCity(fac.city);
    setPincode(fac.pincode);
    setStartingPrice(fac.startingPrice);
    setOpeningTime(fac.openingTime);
    setClosingTime(fac.closingTime);
    setSelectedSports(fac.sports);
    setAmenities(fac.amenities);
    setImages(fac.images);
  }, [user?.id]);

  const allSports: SportType[] = [
    'Badminton',
    'Football',
    'Cricket',
    'Tennis',
    'Basketball',
    'Pickleball',
    'Volleyball',
    'Table Tennis',
  ];

  const standardAmenities = [
    'Parking',
    'Changing Rooms',
    'Washrooms',
    'Drinking Water',
    'Wi-Fi',
    'Equipment Rental',
    'Lighting',
    'Seating Area',
    'Cafe',
    'First Aid',
    'Locker',
    'Shower',
  ];

  const toggleSport = (sport: SportType) => {
    if (selectedSports.includes(sport)) {
      if (selectedSports.length > 1) {
        setSelectedSports(selectedSports.filter((s) => s !== sport));
      }
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleAddCustomAmenity = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAmenity.trim() && !amenities.includes(customAmenity.trim())) {
      setAmenities([...amenities, customAmenity.trim()]);
      setCustomAmenity('');
    }
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleDeleteImage = (index: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, idx) => idx !== index));
    }
  };

  const handleSetPrimaryImage = (index: number) => {
    const target = images[index];
    const rest = images.filter((_, idx) => idx !== index);
    setImages([target, ...rest]);
  };

  const handleSaveFacility = async () => {
    setIsSaving(true);
    try {
      const updated = await facilityService.updateFacility(facility.id, {
        name,
        description,
        venueType,
        address,
        area,
        city,
        pincode,
        startingPrice: Number(startingPrice),
        openingTime,
        closingTime,
        sports: selectedSports,
        amenities,
        images,
      });
      setFacility(updated);
      if (onShowToast) {
        onShowToast('success', 'Facility Updated', 'Facility details updated successfully.');
      }
    } catch (err: any) {
      if (onShowToast) {
        onShowToast('error', 'Update Failed', err.message || 'Unable to save changes.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <OwnerLayout
      currentRoute="/owner/facility"
      onNavigate={onNavigate}
      pageTitle="Facility Information"
    >
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Header with Approval Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">
                Facility Management
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Approved ✓</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Manage your venue profile, location, supported sports, amenities, and player-facing gallery.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              <span>Preview Venue</span>
            </button>

            <button
              onClick={handleSaveFacility}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>

        {/* 1. Basic Information Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-base font-bold font-display text-slate-900 pb-2 border-b border-slate-100">
            Venue Profile & Coordinates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Facility Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Smash Arena Sports Club"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Venue Classification
              </label>
              <select
                value={venueType}
                onChange={(e) => setVenueType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white text-xs"
              >
                <option value="Indoor">Indoor Facility</option>
                <option value="Outdoor">Outdoor Facility</option>
                <option value="Premium">Premium Multi-Sport Club</option>
                <option value="Community">Community Arena</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 100 Feet Road, HAL 2nd Stage, Indiranagar"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Area / Locality
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Bodakdev / Indiranagar"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white text-xs"
              >
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi-NCR">Delhi-NCR</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Starting Rate (₹/hr)
                </label>
                <input
                  type="number"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Opening Time
                </label>
                <input
                  type="text"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Closing Time
                </label>
                <input
                  type="text"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white text-xs"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Facility Overview & Surface Highlights
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description for visiting players..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* 2. Sports Supported */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold font-display text-slate-900">
              Sports Supported
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select all sports disciplines available at your facility
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {allSports.map((sport) => {
              const isSelected = selectedSports.includes(sport);
              return (
                <button
                  type="button"
                  key={sport}
                  onClick={() => toggleSport(sport)}
                  className={`p-3 rounded-xl border text-left font-semibold text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{sport}</span>
                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Amenities */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold font-display text-slate-900">
              Facility Amenities & Services
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Highlight conveniences provided to visiting players and teams
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {standardAmenities.map((amenity) => {
              const isSelected = amenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {isSelected && '✓ '}
                  {amenity}
                </button>
              );
            })}
          </div>

          {/* Add custom amenity */}
          <form onSubmit={handleAddCustomAmenity} className="flex gap-2 max-w-md pt-2">
            <input
              type="text"
              value={customAmenity}
              onChange={(e) => setCustomAmenity(e.target.value)}
              placeholder="Add custom amenity (e.g. Steam Room)..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shrink-0"
            >
              Add
            </button>
          </form>
        </div>

        {/* 4. Facility Photo Upload & Gallery */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-display text-slate-900">
                Facility Photos & High-Res Gallery
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                The primary photo appears on search cards and player discovery lists
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {images.length} Photos
            </span>
          </div>

          {/* Image Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden border border-slate-200 group bg-slate-100 aspect-video"
              >
                <img
                  src={img}
                  alt={`Facility photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {idx === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
                    Primary Cover
                  </span>
                )}

                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {idx !== 0 && (
                    <button
                      onClick={() => handleSetPrimaryImage(idx)}
                      className="px-2.5 py-1 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-xs hover:bg-slate-50"
                    >
                      Set Primary
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteImage(idx)}
                    className="p-1.5 bg-rose-600 text-white rounded-lg text-xs hover:bg-rose-700 shadow-xs"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Image by URL / mock upload */}
          <form onSubmit={handleAddImage} className="flex gap-2 max-w-xl pt-2">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Paste high-res image URL (Unsplash or image hosting)..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Add Image</span>
            </button>
          </form>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
          <button
            onClick={() => onNavigate('/owner/dashboard')}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveFacility}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Facility Profile'}</span>
          </button>
        </div>
      </div>

      {/* Facility Preview Modal (Resembles Player Single Venue page) */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Player Live Preview
              </span>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Close ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={images[0]}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-display text-slate-900">
                      {name}
                    </h2>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {area}, {city}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-emerald-600 font-display">
                      ₹{startingPrice}
                    </span>
                    <span className="text-xs text-slate-400 block">/ hour</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 block mb-2">
                    Available Sports
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSports.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 block mb-2">
                    Key Amenities
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {amenities.map((a) => (
                      <span
                        key={a}
                        className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        ✓ {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </OwnerLayout>
  );
};
