export type UserRole = 'player' | 'facility_owner' | 'admin';

export type SportType =
  | 'Badminton'
  | 'Football'
  | 'Cricket'
  | 'Tennis'
  | 'Basketball'
  | 'Table Tennis'
  | 'Pickleball'
  | 'Volleyball'
  | 'Squash';

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
  id: string;
  ownerId: string;
  ownerName: string;
  name: string;
  description: string;
  about?: string;
  sports: SportType[];
  venueType: 'indoor' | 'outdoor' | 'both' | 'Indoor' | 'Outdoor' | 'Premium' | 'Community';
  address: string;
  location?: string;
  area: string;
  city: string;
  pincode: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  startingPrice: number;
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
  reviews?: Review[];
  createdAt: string;
}

export type Venue = Facility;

export interface Court {
  id: string;
  facilityId: string;
  name: string;
  sport: SportType;
  type?: string;
  pricePerHour: number;
  openingTime: string;
  closingTime: string;
  status: 'active' | 'maintenance' | 'inactive';
  availableSlots?: string[];
}

export type SlotStatus = 'available' | 'booked' | 'reserved' | 'maintenance' | 'blocked';

export interface TimeSlot {
  id: string;
  courtId: string;
  facilityId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  status: SlotStatus;
  bookingId?: string;
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
  status: 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'successful' | 'refunded' | 'pending' | 'failed';
  paymentId: string;
  transactionId: string;
  qrCodeData: string;
  cancellationReason?: string;
  refundAmount?: number;
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
  facilityQuality: number;
  cleanliness: number;
  staff: number;
  courtQuality: number;
  valueForMoney: number;
}

export interface Review {
  id: string;
  bookingId: string;
  facilityId: string;
  facilityName: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  categories: ReviewCategoryRatings;
  comment: string;
  verifiedBooking: boolean;
  createdAt: string;
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
