export type UserRole = 'player' | 'facility_owner' | 'admin';

export type SportType = string;

export interface User {
  id: string;
  name: string;
  fullName?: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  city: string;
  sportsPreferences: SportType[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
  activityScore: number;
  gamesPlayed: number;
  isVerified: boolean;
  isBanned: boolean;
  businessName?: string;
  createdAt: string;
}

export interface Facility {
  id: string | number;
  idStr?: string;
  ownerId: string;
  ownerName: string;
  name: string;
  venueName?: string;
  image?: string;
  imageUrl?: string;
  description: string;
  about?: string;
  sports: SportType[];
  venueType: 'indoor' | 'outdoor' | 'both' | 'Indoor' | 'Outdoor' | 'Indoor & Outdoor' | 'Premium' | 'Community';
  address: string;
  location?: string;
  area: string;
  city: string;
  pincode: string;
  lat: number;
  lng: number;
  rating: number;
  reviews?: number;
  reviewCount: number;
  pricePerHour?: number;
  startingPrice: number;
  topRated?: boolean;
  availableSlots?: number;
  availabilityText?: string;
  verified?: boolean;
  demoData?: boolean;
  amenities: string[];
  openingTime: string;
  closingTime: string;
  openingHours?: string;
  images: string[];
  verifiedBadge: boolean;
  status: 'approved' | 'pending' | 'rejected';
  approved?: boolean;
  rejectionReason?: string;
  courtCount: number;
  rules: string[];
  featured?: boolean;
  courts?: Court[];
  reviewsList?: Review[];
  createdAt: string;
}

export type Venue = Facility;

export interface Court {
  id: string;
  facilityId: string | number;
  name: string;
  sport: SportType;
  type?: string;
  pricePerHour: number;
  openingTime: string;
  closingTime: string;
  status: 'active' | 'maintenance' | 'inactive';
  availableSlots?: string[];
}

export type SlotStatus =
  | 'available'
  | 'booked'
  | 'in_progress'
  | 'completed'
  | 'past'
  | 'maintenance'
  | 'blocked'
  | 'cancelled'
  | 'reserved';

export interface TimeSlot {
  id: string;
  courtId?: string;
  facilityId?: string;
  date?: string;
  startTime: string;
  endTime: string;
  rawStart?: string;
  rawEnd?: string;
  price?: number;
  available?: boolean;
  status: SlotStatus;
  liveStatusLabel?: string;
  nextAvailableTime?: string;
  bookingId?: string;
  bookedBy?: string;
  blockReason?: string;
  blockId?: string;
}

export interface Booking {
  id: string; // e.g. QC-20260904-001
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  facilityId: string;
  facilityName: string;
  venueId?: string;
  venueName?: string;
  facilityImage: string;
  facilityAddress: string;
  courtId: string;
  courtName: string;
  sport: SportType;
  date: string;
  startTime: string;
  endTime: string;
  duration?: string;
  price?: number;
  courtPrice: number;
  platformFee: number;
  tax: number;
  discount: number;
  total?: number;
  totalAmount: number;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  liveStatus?: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  paymentStatus: 'successful' | 'refunded' | 'pending' | 'failed';
  paymentMethod?: string;
  paymentId: string;
  transactionId: string;
  qrCodeData: string;
  cancellationReason?: string;
  refundAmount?: number;
  isRated?: boolean;
  userRating?: number;
  reviewId?: string;
  ratedAt?: string;
  createdAt: string;
}

export interface MatchPlayer {
  userId: string;
  name: string;
  avatar: string;
  joinedAt: string;
  sharePaid: number;
}

export interface Match {
  id: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  sport: SportType;
  facilityId: string;
  facilityName: string;
  courtName: string;
  date: string;
  startTime: string;
  endTime: string;
  maxPlayers: number;
  playersJoined: MatchPlayer[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  description: string;
  totalCourtCost: number;
  entryFeePerPlayer: number;
  status: 'open' | 'almost_full' | 'full' | 'started' | 'completed' | 'cancelled';
  city: string;
  area: string;
  createdAt: string;
}

export interface ReviewCategoryRatings {
  facilityQuality?: number;
  cleanliness?: number;
  staffService?: number;
  courtQuality?: number;
  staff?: number;
  valueForMoney?: number;
}

export interface Review {
  id: string;
  bookingId: string;
  facilityId: string;
  facilityName: string;
  courtName?: string;
  sport?: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1 to 5 overall rating
  courtQuality?: number; // 1 to 5
  cleanliness?: number; // 1 to 5
  staffService?: number; // 1 to 5
  categories?: ReviewCategoryRatings;
  comment?: string;
  tags?: string[];
  verifiedBooking: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  roleTarget: 'all' | 'player' | 'facility_owner' | 'admin';
  title: string;
  message: string;
  type:
    | 'booking_confirmed'
    | 'game_reminder'
    | 'booking_cancelled'
    | 'refund_processed'
    | 'match_joined'
    | 'facility_submitted'
    | 'facility_approved'
    | 'facility_rejected'
    | 'report_received';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: 'facility' | 'user' | 'review';
  targetId: string;
  targetName: string;
  reason: string;
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  actionTaken?: string;
  createdAt: string;
}

export interface AdminAuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  target: string;
  description: string;
  timestamp: string;
}

export interface Sport {
  id: string;
  name: string;
  category: 'Indoor Sports' | 'Outdoor Sports';
  icon: string;
  image: string;
  description: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  stateCode: string;
  famousLocations: string[];
}
