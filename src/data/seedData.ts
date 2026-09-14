import { VENUES_DATASET } from './venues';
import {
  User,
  Facility,
  Court,
  Booking,
  Match,
  Review,
  Notification,
  Report,
  AdminAuditLog,
} from '../types';

export const SEED_USERS: User[] = [
  {
    id: 'usr_player_1',
    name: 'Krish Patel',
    email: 'krish@quickcourt.com',
    phone: '+91 98765 43210',
    role: 'player',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    city: 'Bengaluru',
    sportsPreferences: ['Badminton', 'Tennis', 'Football'],
    skillLevel: 'Intermediate',
    activityScore: 88,
    gamesPlayed: 24,
    isVerified: true,
    isBanned: false,
    createdAt: '2026-06-15T10:30:00Z',
  },
  {
    id: 'usr_owner_1',
    name: 'Rajesh Sharma',
    email: 'rajesh@apexarena.com',
    phone: '+91 98112 34567',
    role: 'facility_owner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    city: 'Bengaluru',
    businessName: 'Smash & Apex Sports Hub',
    sportsPreferences: ['Badminton', 'Tennis'],
    skillLevel: 'Advanced',
    activityScore: 45,
    gamesPlayed: 10,
    isVerified: true,
    isBanned: false,
    createdAt: '2026-05-10T08:00:00Z',
  },
  {
    id: 'usr_admin_1',
    name: 'Priya Verma',
    email: 'admin@quickcourt.com',
    phone: '+91 99001 88223',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    city: 'Bengaluru',
    sportsPreferences: ['Badminton', 'Basketball'],
    skillLevel: 'Intermediate',
    activityScore: 92,
    gamesPlayed: 30,
    isVerified: true,
    isBanned: false,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'usr_player_2',
    name: 'Rohan Deshmukh',
    email: 'rohan@gmail.com',
    phone: '+91 98220 11223',
    role: 'player',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    city: 'Bengaluru',
    sportsPreferences: ['Badminton', 'Football'],
    skillLevel: 'Intermediate',
    activityScore: 76,
    gamesPlayed: 18,
    isVerified: true,
    isBanned: false,
    createdAt: '2026-07-01T12:00:00Z',
  },
  {
    id: 'usr_player_3',
    name: 'Ananya Roy',
    email: 'ananya@gmail.com',
    phone: '+91 99334 55667',
    role: 'player',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    city: 'Bengaluru',
    sportsPreferences: ['Tennis', 'Pickleball'],
    skillLevel: 'Advanced',
    activityScore: 84,
    gamesPlayed: 21,
    isVerified: true,
    isBanned: false,
    createdAt: '2026-07-15T09:30:00Z',
  },
  {
    id: 'usr_player_4',
    name: 'Kabir Mehta',
    email: 'kabir@gmail.com',
    phone: '+91 98711 22334',
    role: 'player',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    city: 'Bengaluru',
    sportsPreferences: ['Football', 'Cricket'],
    skillLevel: 'Intermediate',
    activityScore: 68,
    gamesPlayed: 14,
    isVerified: true,
    isBanned: false,
    createdAt: '2026-08-01T14:15:00Z',
  }
];


export const SPORTS = [
  {
    "id": "Badminton",
    "name": "Badminton",
    "category": "Racket Sports",
    "icon": "default",
    "image": "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop",
    "description": "Badminton courts and facilities"
  },
  {
    "id": "Football",
    "name": "Football",
    "category": "Outdoor Sports",
    "icon": "default",
    "image": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
    "description": "Football turf and grounds"
  },
  {
    "id": "Cricket",
    "name": "Cricket",
    "category": "Outdoor Sports",
    "icon": "default",
    "image": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop",
    "description": "Box cricket and cricket grounds"
  },
  {
    "id": "Tennis",
    "name": "Tennis",
    "category": "Racket Sports",
    "icon": "default",
    "image": "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800&auto=format&fit=crop",
    "description": "Lawn tennis courts"
  },
  {
    "id": "Basketball",
    "name": "Basketball",
    "category": "Indoor & Outdoor",
    "icon": "default",
    "image": "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop",
    "description": "Basketball courts"
  },
  {
    "id": "Pickleball",
    "name": "Pickleball",
    "category": "Racket Sports",
    "icon": "default",
    "image": "https://images.unsplash.com/photo-1611255894596-10d477e8140a?q=80&w=800&auto=format&fit=crop",
    "description": "Pickleball courts"
  }
];

export const CITIES = [
  {
    "id": "Ahmedabad",
    "name": "Ahmedabad",
    "state": "Gujarat",
    "stateCode": "GJ",
    "famousLocations": [
      "Bodakdev",
      "Navrangpura",
      "Satellite",
      "Prahlad Nagar",
      "SG Highway",
      "Vastrapur"
    ]
  },
  {
    "id": "Mumbai",
    "name": "Mumbai",
    "state": "Maharashtra",
    "stateCode": "MH",
    "famousLocations": [
      "Andheri West",
      "Bandra West",
      "Juhu",
      "Powai",
      "Lower Parel",
      "Borivali",
      "Goregaon"
    ]
  },
  {
    "id": "Pune",
    "name": "Pune",
    "state": "Maharashtra",
    "stateCode": "MH",
    "famousLocations": [
      "Kothrud",
      "Baner",
      "Viman Nagar",
      "Koregaon Park",
      "Hinjawadi",
      "Wakad",
      "Aundh"
    ]
  },
  {
    "id": "Bengaluru",
    "name": "Bengaluru",
    "state": "Karnataka",
    "stateCode": "KA",
    "famousLocations": [
      "Koramangala",
      "Indiranagar",
      "HSR Layout",
      "Whitefield",
      "JP Nagar",
      "Marathahalli",
      "Jayanagar"
    ]
  },
  {
    "id": "Delhi",
    "name": "Delhi",
    "state": "Delhi NCR",
    "stateCode": "DL",
    "famousLocations": [
      "Connaught Place",
      "Vasant Kunj",
      "Dwarka",
      "Saket",
      "Hauz Khas",
      "Rohini"
    ]
  },
  {
    "id": "Hyderabad",
    "name": "Hyderabad",
    "state": "Telangana",
    "stateCode": "TS",
    "famousLocations": [
      "Gachibowli",
      "Madhapur",
      "Jubilee Hills",
      "Banjara Hills",
      "Kondapur",
      "Hitec City"
    ]
  },
  {
    "id": "Chennai",
    "name": "Chennai",
    "state": "Tamil Nadu",
    "stateCode": "TN",
    "famousLocations": [
      "Adyar",
      "Anna Nagar",
      "T. Nagar",
      "Velachery",
      "Nungambakkam",
      "OMR",
      "Besant Nagar"
    ]
  },
  {
    "id": "Kolkata",
    "name": "Kolkata",
    "state": "West Bengal",
    "stateCode": "WB",
    "famousLocations": [
      "Salt Lake",
      "Park Street",
      "New Town",
      "Ballygunge",
      "Alipore",
      "Dum Dum"
    ]
  }
];

export const SEED_FACILITIES: Facility[] = VENUES_DATASET;

export const SEED_COURTS: Court[] = [
  {
    "id": "court_1_1",
    "facilityId": 1,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_1_2",
    "facilityId": 1,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_2_1",
    "facilityId": 2,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_2_2",
    "facilityId": 2,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_3_1",
    "facilityId": 3,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_3_2",
    "facilityId": 3,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_4_1",
    "facilityId": 4,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_4_2",
    "facilityId": 4,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_5_1",
    "facilityId": 5,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_5_2",
    "facilityId": 5,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_6_1",
    "facilityId": 6,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_6_2",
    "facilityId": 6,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_7_1",
    "facilityId": 7,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_7_2",
    "facilityId": 7,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_8_1",
    "facilityId": 8,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_8_2",
    "facilityId": 8,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_9_1",
    "facilityId": 9,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_9_2",
    "facilityId": 9,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_10_1",
    "facilityId": 10,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_10_2",
    "facilityId": 10,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_11_1",
    "facilityId": 11,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_11_2",
    "facilityId": 11,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_12_1",
    "facilityId": 12,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_12_2",
    "facilityId": 12,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_13_1",
    "facilityId": 13,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_13_2",
    "facilityId": 13,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_14_1",
    "facilityId": 14,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_14_2",
    "facilityId": 14,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_15_1",
    "facilityId": 15,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_15_2",
    "facilityId": 15,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_16_1",
    "facilityId": 16,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_16_2",
    "facilityId": 16,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_17_1",
    "facilityId": 17,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_17_2",
    "facilityId": 17,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_18_1",
    "facilityId": 18,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_18_2",
    "facilityId": 18,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_19_1",
    "facilityId": 19,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_19_2",
    "facilityId": 19,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_20_1",
    "facilityId": 20,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_20_2",
    "facilityId": 20,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_21_1",
    "facilityId": 21,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_21_2",
    "facilityId": 21,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_22_1",
    "facilityId": 22,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_22_2",
    "facilityId": 22,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_23_1",
    "facilityId": 23,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_23_2",
    "facilityId": 23,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_24_1",
    "facilityId": 24,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_24_2",
    "facilityId": 24,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_25_1",
    "facilityId": 25,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_25_2",
    "facilityId": 25,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_26_1",
    "facilityId": 26,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_26_2",
    "facilityId": 26,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_27_1",
    "facilityId": 27,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_27_2",
    "facilityId": 27,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_28_1",
    "facilityId": 28,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_28_2",
    "facilityId": 28,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_29_1",
    "facilityId": 29,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_29_2",
    "facilityId": 29,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_30_1",
    "facilityId": 30,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_30_2",
    "facilityId": 30,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_31_1",
    "facilityId": 31,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_31_2",
    "facilityId": 31,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_32_1",
    "facilityId": 32,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_32_2",
    "facilityId": 32,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_33_1",
    "facilityId": 33,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_33_2",
    "facilityId": 33,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_34_1",
    "facilityId": 34,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_34_2",
    "facilityId": 34,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_35_1",
    "facilityId": 35,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_35_2",
    "facilityId": 35,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_36_1",
    "facilityId": 36,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_36_2",
    "facilityId": 36,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_37_1",
    "facilityId": 37,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_37_2",
    "facilityId": 37,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_38_1",
    "facilityId": 38,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_38_2",
    "facilityId": 38,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_39_1",
    "facilityId": 39,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_39_2",
    "facilityId": 39,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_40_1",
    "facilityId": 40,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_40_2",
    "facilityId": 40,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_41_1",
    "facilityId": 41,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_41_2",
    "facilityId": 41,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_42_1",
    "facilityId": 42,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_42_2",
    "facilityId": 42,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_43_1",
    "facilityId": 43,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_43_2",
    "facilityId": 43,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_44_1",
    "facilityId": 44,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_44_2",
    "facilityId": 44,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_45_1",
    "facilityId": 45,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_45_2",
    "facilityId": 45,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_46_1",
    "facilityId": 46,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_46_2",
    "facilityId": 46,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_47_1",
    "facilityId": 47,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_47_2",
    "facilityId": 47,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_48_1",
    "facilityId": 48,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_48_2",
    "facilityId": 48,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_49_1",
    "facilityId": 49,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_49_2",
    "facilityId": 49,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_50_1",
    "facilityId": 50,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_50_2",
    "facilityId": 50,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_51_1",
    "facilityId": 51,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_51_2",
    "facilityId": 51,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_52_1",
    "facilityId": 52,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_52_2",
    "facilityId": 52,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_53_1",
    "facilityId": 53,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_53_2",
    "facilityId": 53,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_54_1",
    "facilityId": 54,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_54_2",
    "facilityId": 54,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_55_1",
    "facilityId": 55,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_55_2",
    "facilityId": 55,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_56_1",
    "facilityId": 56,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_56_2",
    "facilityId": 56,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_57_1",
    "facilityId": 57,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_57_2",
    "facilityId": 57,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_58_1",
    "facilityId": 58,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_58_2",
    "facilityId": 58,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_59_1",
    "facilityId": 59,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_59_2",
    "facilityId": 59,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_60_1",
    "facilityId": 60,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_60_2",
    "facilityId": 60,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_61_1",
    "facilityId": 61,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_61_2",
    "facilityId": 61,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_62_1",
    "facilityId": 62,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_62_2",
    "facilityId": 62,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_63_1",
    "facilityId": 63,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_63_2",
    "facilityId": 63,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_64_1",
    "facilityId": 64,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_64_2",
    "facilityId": 64,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_65_1",
    "facilityId": 65,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_65_2",
    "facilityId": 65,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_66_1",
    "facilityId": 66,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_66_2",
    "facilityId": 66,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_67_1",
    "facilityId": 67,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_67_2",
    "facilityId": 67,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_68_1",
    "facilityId": 68,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_68_2",
    "facilityId": 68,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_69_1",
    "facilityId": 69,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_69_2",
    "facilityId": 69,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_70_1",
    "facilityId": 70,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_70_2",
    "facilityId": 70,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_71_1",
    "facilityId": 71,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_71_2",
    "facilityId": 71,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_72_1",
    "facilityId": 72,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_72_2",
    "facilityId": 72,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_73_1",
    "facilityId": 73,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_73_2",
    "facilityId": 73,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_74_1",
    "facilityId": 74,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_74_2",
    "facilityId": 74,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_75_1",
    "facilityId": 75,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_75_2",
    "facilityId": 75,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_76_1",
    "facilityId": 76,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_76_2",
    "facilityId": 76,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_77_1",
    "facilityId": 77,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_77_2",
    "facilityId": 77,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_78_1",
    "facilityId": 78,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_78_2",
    "facilityId": 78,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_79_1",
    "facilityId": 79,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_79_2",
    "facilityId": 79,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_80_1",
    "facilityId": 80,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_80_2",
    "facilityId": 80,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_81_1",
    "facilityId": 81,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_81_2",
    "facilityId": 81,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_82_1",
    "facilityId": 82,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_82_2",
    "facilityId": 82,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_83_1",
    "facilityId": 83,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_83_2",
    "facilityId": 83,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_84_1",
    "facilityId": 84,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_84_2",
    "facilityId": 84,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_85_1",
    "facilityId": 85,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_85_2",
    "facilityId": 85,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_86_1",
    "facilityId": 86,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_86_2",
    "facilityId": 86,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_87_1",
    "facilityId": 87,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_87_2",
    "facilityId": 87,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_88_1",
    "facilityId": 88,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_88_2",
    "facilityId": 88,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_89_1",
    "facilityId": 89,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_89_2",
    "facilityId": 89,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_90_1",
    "facilityId": 90,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_90_2",
    "facilityId": 90,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_91_1",
    "facilityId": 91,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_91_2",
    "facilityId": 91,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_92_1",
    "facilityId": 92,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_92_2",
    "facilityId": 92,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_93_1",
    "facilityId": 93,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_93_2",
    "facilityId": 93,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_94_1",
    "facilityId": 94,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_94_2",
    "facilityId": 94,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_95_1",
    "facilityId": 95,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_95_2",
    "facilityId": 95,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_96_1",
    "facilityId": 96,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_96_2",
    "facilityId": 96,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_97_1",
    "facilityId": 97,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_97_2",
    "facilityId": 97,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_98_1",
    "facilityId": 98,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_98_2",
    "facilityId": 98,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_99_1",
    "facilityId": 99,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_99_2",
    "facilityId": 99,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_100_1",
    "facilityId": 100,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_100_2",
    "facilityId": 100,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_101_1",
    "facilityId": 101,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_101_2",
    "facilityId": 101,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_102_1",
    "facilityId": 102,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_102_2",
    "facilityId": 102,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_103_1",
    "facilityId": 103,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_103_2",
    "facilityId": 103,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_104_1",
    "facilityId": 104,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_104_2",
    "facilityId": 104,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_105_1",
    "facilityId": 105,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_105_2",
    "facilityId": 105,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_106_1",
    "facilityId": 106,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_106_2",
    "facilityId": 106,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_107_1",
    "facilityId": 107,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_107_2",
    "facilityId": 107,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_108_1",
    "facilityId": 108,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_108_2",
    "facilityId": 108,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_109_1",
    "facilityId": 109,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_109_2",
    "facilityId": 109,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_110_1",
    "facilityId": 110,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_110_2",
    "facilityId": 110,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_111_1",
    "facilityId": 111,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_111_2",
    "facilityId": 111,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_112_1",
    "facilityId": 112,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_112_2",
    "facilityId": 112,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_113_1",
    "facilityId": 113,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_113_2",
    "facilityId": 113,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_114_1",
    "facilityId": 114,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_114_2",
    "facilityId": 114,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_115_1",
    "facilityId": 115,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_115_2",
    "facilityId": 115,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_116_1",
    "facilityId": 116,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_116_2",
    "facilityId": 116,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_117_1",
    "facilityId": 117,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_117_2",
    "facilityId": 117,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_118_1",
    "facilityId": 118,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_118_2",
    "facilityId": 118,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_119_1",
    "facilityId": 119,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_119_2",
    "facilityId": 119,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_120_1",
    "facilityId": 120,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_120_2",
    "facilityId": 120,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_121_1",
    "facilityId": 121,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_121_2",
    "facilityId": 121,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_122_1",
    "facilityId": 122,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_122_2",
    "facilityId": 122,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_123_1",
    "facilityId": 123,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_123_2",
    "facilityId": 123,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_124_1",
    "facilityId": 124,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_124_2",
    "facilityId": 124,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_125_1",
    "facilityId": 125,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_125_2",
    "facilityId": 125,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_126_1",
    "facilityId": 126,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_126_2",
    "facilityId": 126,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_127_1",
    "facilityId": 127,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_127_2",
    "facilityId": 127,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_128_1",
    "facilityId": 128,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_128_2",
    "facilityId": 128,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_129_1",
    "facilityId": 129,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_129_2",
    "facilityId": 129,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_130_1",
    "facilityId": 130,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_130_2",
    "facilityId": 130,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_131_1",
    "facilityId": 131,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_131_2",
    "facilityId": 131,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_132_1",
    "facilityId": 132,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_132_2",
    "facilityId": 132,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_133_1",
    "facilityId": 133,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_133_2",
    "facilityId": 133,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_134_1",
    "facilityId": 134,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_134_2",
    "facilityId": 134,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_135_1",
    "facilityId": 135,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_135_2",
    "facilityId": 135,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_136_1",
    "facilityId": 136,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_136_2",
    "facilityId": 136,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_137_1",
    "facilityId": 137,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_137_2",
    "facilityId": 137,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_138_1",
    "facilityId": 138,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_138_2",
    "facilityId": 138,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_139_1",
    "facilityId": 139,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_139_2",
    "facilityId": 139,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_140_1",
    "facilityId": 140,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_140_2",
    "facilityId": 140,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_141_1",
    "facilityId": 141,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_141_2",
    "facilityId": 141,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_142_1",
    "facilityId": 142,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_142_2",
    "facilityId": 142,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_143_1",
    "facilityId": 143,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_143_2",
    "facilityId": 143,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_144_1",
    "facilityId": 144,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_144_2",
    "facilityId": 144,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_145_1",
    "facilityId": 145,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_145_2",
    "facilityId": 145,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_146_1",
    "facilityId": 146,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_146_2",
    "facilityId": 146,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_147_1",
    "facilityId": 147,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_147_2",
    "facilityId": 147,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_148_1",
    "facilityId": 148,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_148_2",
    "facilityId": 148,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_149_1",
    "facilityId": 149,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_149_2",
    "facilityId": 149,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_150_1",
    "facilityId": 150,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_150_2",
    "facilityId": 150,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_151_1",
    "facilityId": 151,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_151_2",
    "facilityId": 151,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_152_1",
    "facilityId": 152,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_152_2",
    "facilityId": 152,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_153_1",
    "facilityId": 153,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_153_2",
    "facilityId": 153,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_154_1",
    "facilityId": 154,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_154_2",
    "facilityId": 154,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_155_1",
    "facilityId": 155,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_155_2",
    "facilityId": 155,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_156_1",
    "facilityId": 156,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_156_2",
    "facilityId": 156,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_157_1",
    "facilityId": 157,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_157_2",
    "facilityId": 157,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_158_1",
    "facilityId": 158,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_158_2",
    "facilityId": 158,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_159_1",
    "facilityId": 159,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_159_2",
    "facilityId": 159,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_160_1",
    "facilityId": 160,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_160_2",
    "facilityId": 160,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_161_1",
    "facilityId": 161,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_161_2",
    "facilityId": 161,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_162_1",
    "facilityId": 162,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_162_2",
    "facilityId": 162,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_163_1",
    "facilityId": 163,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_163_2",
    "facilityId": 163,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_164_1",
    "facilityId": 164,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_164_2",
    "facilityId": 164,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_165_1",
    "facilityId": 165,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_165_2",
    "facilityId": 165,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_166_1",
    "facilityId": 166,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_166_2",
    "facilityId": 166,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_167_1",
    "facilityId": 167,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_167_2",
    "facilityId": 167,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_168_1",
    "facilityId": 168,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_168_2",
    "facilityId": 168,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_169_1",
    "facilityId": 169,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_169_2",
    "facilityId": 169,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_170_1",
    "facilityId": 170,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_170_2",
    "facilityId": 170,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_171_1",
    "facilityId": 171,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_171_2",
    "facilityId": 171,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_172_1",
    "facilityId": 172,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_172_2",
    "facilityId": 172,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_173_1",
    "facilityId": 173,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_173_2",
    "facilityId": 173,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_174_1",
    "facilityId": 174,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_174_2",
    "facilityId": 174,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_175_1",
    "facilityId": 175,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_175_2",
    "facilityId": 175,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_176_1",
    "facilityId": 176,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_176_2",
    "facilityId": 176,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_177_1",
    "facilityId": 177,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_177_2",
    "facilityId": 177,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_178_1",
    "facilityId": 178,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_178_2",
    "facilityId": 178,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_179_1",
    "facilityId": 179,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_179_2",
    "facilityId": 179,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_180_1",
    "facilityId": 180,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_180_2",
    "facilityId": 180,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_181_1",
    "facilityId": 181,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_181_2",
    "facilityId": 181,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_182_1",
    "facilityId": 182,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_182_2",
    "facilityId": 182,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_183_1",
    "facilityId": 183,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_183_2",
    "facilityId": 183,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_184_1",
    "facilityId": 184,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_184_2",
    "facilityId": 184,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_185_1",
    "facilityId": 185,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_185_2",
    "facilityId": 185,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_186_1",
    "facilityId": 186,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_186_2",
    "facilityId": 186,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_187_1",
    "facilityId": 187,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_187_2",
    "facilityId": 187,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_188_1",
    "facilityId": 188,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_188_2",
    "facilityId": 188,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_189_1",
    "facilityId": 189,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_189_2",
    "facilityId": 189,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_190_1",
    "facilityId": 190,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_190_2",
    "facilityId": 190,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_191_1",
    "facilityId": 191,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_191_2",
    "facilityId": 191,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_192_1",
    "facilityId": 192,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_192_2",
    "facilityId": 192,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_193_1",
    "facilityId": 193,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_193_2",
    "facilityId": 193,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_194_1",
    "facilityId": 194,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_194_2",
    "facilityId": 194,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_195_1",
    "facilityId": 195,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_195_2",
    "facilityId": 195,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_196_1",
    "facilityId": 196,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_196_2",
    "facilityId": 196,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_197_1",
    "facilityId": 197,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_197_2",
    "facilityId": 197,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_198_1",
    "facilityId": 198,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_198_2",
    "facilityId": 198,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_199_1",
    "facilityId": 199,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_199_2",
    "facilityId": 199,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_200_1",
    "facilityId": 200,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_200_2",
    "facilityId": 200,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_201_1",
    "facilityId": 201,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_201_2",
    "facilityId": 201,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_202_1",
    "facilityId": 202,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_202_2",
    "facilityId": 202,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_203_1",
    "facilityId": 203,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_203_2",
    "facilityId": 203,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_204_1",
    "facilityId": 204,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_204_2",
    "facilityId": 204,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_205_1",
    "facilityId": 205,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_205_2",
    "facilityId": 205,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_206_1",
    "facilityId": 206,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_206_2",
    "facilityId": 206,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_207_1",
    "facilityId": 207,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_207_2",
    "facilityId": 207,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_208_1",
    "facilityId": 208,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_208_2",
    "facilityId": 208,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_209_1",
    "facilityId": 209,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_209_2",
    "facilityId": 209,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_210_1",
    "facilityId": 210,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_210_2",
    "facilityId": 210,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_211_1",
    "facilityId": 211,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_211_2",
    "facilityId": 211,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_212_1",
    "facilityId": 212,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_212_2",
    "facilityId": 212,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_213_1",
    "facilityId": 213,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_213_2",
    "facilityId": 213,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_214_1",
    "facilityId": 214,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_214_2",
    "facilityId": 214,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_215_1",
    "facilityId": 215,
    "name": "Court 1 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_215_2",
    "facilityId": 215,
    "name": "Court 2 (Badminton)",
    "sport": "Badminton",
    "type": "Indoor & Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_216_1",
    "facilityId": 216,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_216_2",
    "facilityId": 216,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_217_1",
    "facilityId": 217,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_217_2",
    "facilityId": 217,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1250,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_218_1",
    "facilityId": 218,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_218_2",
    "facilityId": 218,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 1650,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_219_1",
    "facilityId": 219,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_219_2",
    "facilityId": 219,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Outdoor",
    "pricePerHour": 2100,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_220_1",
    "facilityId": 220,
    "name": "Court 1 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_220_2",
    "facilityId": 220,
    "name": "Court 2 (Football)",
    "sport": "Football",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2500,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_221_1",
    "facilityId": 221,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_221_2",
    "facilityId": 221,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_222_1",
    "facilityId": 222,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_222_2",
    "facilityId": 222,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1350,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_223_1",
    "facilityId": 223,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_223_2",
    "facilityId": 223,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 1900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_224_1",
    "facilityId": 224,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_224_2",
    "facilityId": 224,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Indoor & Outdoor",
    "pricePerHour": 2450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_225_1",
    "facilityId": 225,
    "name": "Court 1 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_225_2",
    "facilityId": 225,
    "name": "Court 2 (Cricket)",
    "sport": "Cricket",
    "type": "Outdoor",
    "pricePerHour": 3000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_226_1",
    "facilityId": 226,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_226_2",
    "facilityId": 226,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_227_1",
    "facilityId": 227,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_227_2",
    "facilityId": 227,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor",
    "pricePerHour": 550,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_228_1",
    "facilityId": 228,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_228_2",
    "facilityId": 228,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 700,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_229_1",
    "facilityId": 229,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_229_2",
    "facilityId": 229,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Indoor & Outdoor",
    "pricePerHour": 850,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_230_1",
    "facilityId": 230,
    "name": "Court 1 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_230_2",
    "facilityId": 230,
    "name": "Court 2 (Tennis)",
    "sport": "Tennis",
    "type": "Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_231_1",
    "facilityId": 231,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_231_2",
    "facilityId": 231,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 400,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_232_1",
    "facilityId": 232,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_232_2",
    "facilityId": 232,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_233_1",
    "facilityId": 233,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_233_2",
    "facilityId": 233,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor",
    "pricePerHour": 800,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_234_1",
    "facilityId": 234,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_234_2",
    "facilityId": 234,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 1000,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_235_1",
    "facilityId": 235,
    "name": "Court 1 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_235_2",
    "facilityId": 235,
    "name": "Court 2 (Basketball)",
    "sport": "Basketball",
    "type": "Outdoor",
    "pricePerHour": 1200,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_236_1",
    "facilityId": 236,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_236_2",
    "facilityId": 236,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 300,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_237_1",
    "facilityId": 237,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_237_2",
    "facilityId": 237,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 450,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_238_1",
    "facilityId": 238,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_238_2",
    "facilityId": 238,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor & Outdoor",
    "pricePerHour": 600,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_239_1",
    "facilityId": 239,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_239_2",
    "facilityId": 239,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Indoor",
    "pricePerHour": 750,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_240_1",
    "facilityId": 240,
    "name": "Court 1 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  },
  {
    "id": "court_240_2",
    "facilityId": 240,
    "name": "Court 2 (Pickleball)",
    "sport": "Pickleball",
    "type": "Outdoor",
    "pricePerHour": 900,
    "openingTime": "06:00",
    "closingTime": "23:00",
    "status": "active",
    "availableSlots": [
      "07:00 AM",
      "08:00 AM",
      "09:00 AM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM"
    ]
  }
];

export const SEED_BOOKINGS: Booking[] = [
  {
    id: 'QC-20260904-001',
    userId: 'usr_player_1',
    userName: 'Krish Patel',
    userEmail: 'krish@quickcourt.com',
    userPhone: '+91 98765 43210',
    facilityId: 'fac_1',
    facilityName: 'Smash Arena Indiranagar',
    facilityImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&auto=format&fit=crop&q=80',
    facilityAddress: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru',
    courtId: 'crt_1_3',
    courtName: 'Court 3 (Synthetic Pro)',
    sport: 'Badminton',
    date: '2026-09-04',
    startTime: '19:00',
    endTime: '20:00',
    courtPrice: 400,
    platformFee: 30,
    tax: 20,
    discount: 0,
    totalAmount: 450,
    status: 'confirmed',
    paymentStatus: 'successful',
    paymentId: 'pay_sim_98213871',
    transactionId: 'TXN-QC-882194',
    qrCodeData: 'QC-PASS|QC-20260904-001|usr_player_1|fac_1|crt_1_3|2026-09-04|19:00-20:00',
    createdAt: '2026-09-04T01:30:00Z',
  },
  {
    id: 'QC-20260902-044',
    userId: 'usr_player_1',
    userName: 'Krish Patel',
    userEmail: 'krish@quickcourt.com',
    userPhone: '+91 98765 43210',
    facilityId: 'fac_2',
    facilityName: 'Apex Turf & Box Cricket Arena',
    facilityImage: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=900&auto=format&fit=crop&q=80',
    facilityAddress: 'Sarjapur Main Road, Bellandur, Bengaluru',
    courtId: 'crt_2_1',
    courtName: 'Main Football Turf A (5v5)',
    sport: 'Football',
    date: '2026-09-02',
    startTime: '20:00',
    endTime: '21:00',
    courtPrice: 1100,
    platformFee: 50,
    tax: 55,
    discount: 100,
    totalAmount: 1105,
    status: 'completed',
    paymentStatus: 'successful',
    paymentId: 'pay_sim_77192019',
    transactionId: 'TXN-QC-661209',
    qrCodeData: 'QC-PASS|QC-20260902-044|usr_player_1|fac_2|crt_2_1|2026-09-02|20:00-21:00',
    createdAt: '2026-09-01T15:20:00Z',
  }
];

export const SEED_MATCHES: Match[] = [
  {
    id: 'mat_1',
    hostId: 'usr_player_2',
    hostName: 'Rohan Deshmukh',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    sport: 'Badminton',
    facilityId: 'fac_1',
    facilityName: 'Smash Arena Indiranagar',
    courtName: 'Court 1 (Yonex Mat - Center)',
    date: '2026-09-04',
    startTime: '19:00',
    endTime: '20:00',
    maxPlayers: 4,
    playersJoined: [
      { userId: 'usr_player_2', name: 'Rohan Deshmukh', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', joinedAt: '2026-09-03T18:00:00Z', sharePaid: 100 },
      { userId: 'usr_player_3', name: 'Ananya Roy', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', joinedAt: '2026-09-03T19:30:00Z', sharePaid: 100 },
      { userId: 'usr_player_4', name: 'Kabir Mehta', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', joinedAt: '2026-09-04T00:15:00Z', sharePaid: 100 }
    ],
    skillLevel: 'Intermediate',
    description: 'Looking for 1 more player for competitive yet fun doubles badminton! Yonex Mavis 350 shuttles provided.',
    totalCourtCost: 400,
    entryFeePerPlayer: 100,
    status: 'almost_full',
    city: 'Bengaluru',
    area: 'Indiranagar',
    createdAt: '2026-09-03T18:00:00Z',
  },
  {
    id: 'mat_2',
    hostId: 'usr_player_4',
    hostName: 'Kabir Mehta',
    hostAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    sport: 'Football',
    facilityId: 'fac_2',
    facilityName: 'Apex Turf & Box Cricket Arena',
    courtName: 'Main Football Turf A (5v5)',
    date: '2026-09-04',
    startTime: '21:00',
    endTime: '22:00',
    maxPlayers: 10,
    playersJoined: [
      { userId: 'usr_player_4', name: 'Kabir Mehta', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', joinedAt: '2026-09-03T10:00:00Z', sharePaid: 120 },
      { userId: 'usr_player_2', name: 'Rohan Deshmukh', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', joinedAt: '2026-09-03T11:00:00Z', sharePaid: 120 },
      { userId: 'usr_sim_5', name: 'Vikram Seth', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', joinedAt: '2026-09-03T14:00:00Z', sharePaid: 120 },
      { userId: 'usr_sim_6', name: 'Dev Sharma', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', joinedAt: '2026-09-03T16:00:00Z', sharePaid: 120 },
      { userId: 'usr_sim_7', name: 'Aditya Rao', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', joinedAt: '2026-09-03T17:00:00Z', sharePaid: 120 },
      { userId: 'usr_sim_8', name: 'Siddharth Nair', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', joinedAt: '2026-09-03T19:00:00Z', sharePaid: 120 },
      { userId: 'usr_sim_9', name: 'Kunal Joshi', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', joinedAt: '2026-09-03T20:00:00Z', sharePaid: 120 }
    ],
    skillLevel: 'Intermediate',
    description: 'Casual Friday 5v5 turf football game under the lights. Clean passes, no sliding tackles. Bibs and water available!',
    totalCourtCost: 1200,
    entryFeePerPlayer: 120,
    status: 'open',
    city: 'Bengaluru',
    area: 'Sarjapur Road',
    createdAt: '2026-09-03T10:00:00Z',
  },
  {
    id: 'mat_3',
    hostId: 'usr_player_3',
    hostName: 'Ananya Roy',
    hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    sport: 'Tennis',
    facilityId: 'fac_3',
    facilityName: 'Vantage Tennis & Pickleball Club',
    courtName: 'Centre Tennis Court (Acrylic)',
    date: '2026-09-05',
    startTime: '07:00',
    endTime: '08:00',
    maxPlayers: 2,
    playersJoined: [
      { userId: 'usr_player_3', name: 'Ananya Roy', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', joinedAt: '2026-09-03T21:00:00Z', sharePaid: 300 }
    ],
    skillLevel: 'Advanced',
    description: 'Morning singles rally and set match. NTRP 4.0+ preferred. Fresh Wilson balls provided.',
    totalCourtCost: 600,
    entryFeePerPlayer: 300,
    status: 'open',
    city: 'Bengaluru',
    area: 'Koramangala',
    createdAt: '2026-09-03T21:00:00Z',
  }
];

export const SEED_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    bookingId: 'QC-20260902-044',
    facilityId: 'fac_1',
    facilityName: 'Smash Arena Indiranagar',
    userId: 'usr_player_1',
    userName: 'Krish Patel',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    categories: {
      facilityQuality: 5,
      cleanliness: 5,
      staff: 5,
      courtQuality: 5,
      valueForMoney: 4
    },
    comment: 'Exceptional synthetic badminton courts! The lighting has zero glare, changing rooms are spotless, and the staff is super courteous. Easily the best court in Indiranagar.',
    verifiedBooking: true,
    createdAt: '2026-09-03T10:30:00Z',
  },
  {
    id: 'rev_2',
    bookingId: 'QC-20260828-112',
    facilityId: 'fac_2',
    facilityName: 'Apex Turf & Box Cricket Arena',
    userId: 'usr_player_4',
    userName: 'Kabir Mehta',
    userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    categories: {
      facilityQuality: 5,
      cleanliness: 4,
      staff: 5,
      courtQuality: 5,
      valueForMoney: 5
    },
    comment: 'The 50mm rubber infill turf cushions knees really well during rapid turns. Floodlights are bright and even. Great parking space too.',
    verifiedBooking: true,
    createdAt: '2026-08-29T08:00:00Z',
  }
];

export const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    userId: 'usr_player_1',
    roleTarget: 'player',
    title: '🎉 Booking Confirmed!',
    message: 'Your slot at Smash Arena Indiranagar (Court 3) on 04 Sep 2026 (7:00 PM - 8:00 PM) is confirmed.',
    type: 'booking_confirmed',
    read: false,
    timestamp: '2026-09-04T01:30:00Z',
    link: '/my-bookings',
  },
  {
    id: 'notif_2',
    userId: 'usr_owner_1',
    roleTarget: 'facility_owner',
    title: '🏸 New Booking Received',
    message: 'Krish Patel booked Court 3 at Smash Arena for 04 Sep 2026, 7:00 PM. ₹450 received.',
    type: 'booking_confirmed',
    read: false,
    timestamp: '2026-09-04T01:30:00Z',
    link: '/owner/bookings',
  },
  {
    id: 'notif_3',
    userId: 'usr_admin_1',
    roleTarget: 'admin',
    title: '🏢 New Facility Pending Review',
    message: 'Rajesh Sharma submitted "Skyline Sports Deck" for admin verification and approval.',
    type: 'facility_submitted',
    read: false,
    timestamp: '2026-09-02T16:20:00Z',
    link: '/admin/facilities',
  }
];

export const SEED_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'log_1',
    adminId: 'usr_admin_1',
    adminName: 'Priya Verma',
    action: 'Facility Approved',
    target: 'Smash Arena Indiranagar (fac_1)',
    description: 'Verified business permits, court safety certifications, and insurance. Approved for public listing.',
    timestamp: '2026-03-11T11:00:00Z',
  },
  {
    id: 'log_2',
    adminId: 'usr_admin_1',
    adminName: 'Priya Verma',
    action: 'Facility Approved',
    target: 'Apex Turf & Box Cricket Arena (fac_2)',
    description: 'Site inspection completed. Verified turf quality and emergency exits.',
    timestamp: '2026-04-13T14:30:00Z',
  },
  {
    id: 'log_3',
    adminId: 'usr_admin_1',
    adminName: 'Priya Verma',
    action: 'Facility Approved',
    target: 'Vantage Tennis & Pickleball Club (fac_3)',
    description: 'Approved new sports category (Pickleball) and verified coach credentials.',
    timestamp: '2026-05-02T10:15:00Z',
  }
];

export const SEED_REPORTS: Report[] = [
  {
    id: 'rep_1',
    reporterId: 'usr_player_4',
    reporterName: 'Kabir Mehta',
    targetType: 'facility',
    targetId: 'fac_4',
    targetName: 'Hoops & Spike Indoor Complex',
    reason: 'Water dispenser was empty for 2 hours during evening matches.',
    details: 'Facility staff took longer than expected to refill drinking water. Otherwise court was good.',
    status: 'resolved',
    actionTaken: 'Contacted owner Rajesh Sharma. Secondary backup dispenser installed.',
    createdAt: '2026-08-20T19:00:00Z',
  }
];
