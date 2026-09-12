export type Language = 'en' | 'hi' | 'mr';

export type UserRole = 'customer' | 'worker' | 'admin';

export type PageView =
  | 'landing'
  | 'customer-dashboard'
  | 'discovery'
  | 'booking-flow'
  | 'smart-matching'
  | 'booking-tracking'
  | 'worker-profile'
  | 'worker-dashboard'
  | 'worker-requests'
  | 'worker-availability'
  | 'worker-earnings'
  | 'ratings-reviews'
  | 'coop-model'
  | 'admin-verification';

export interface ServiceCategory {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  category: 'electrician' | 'plumbing' | 'cleaning' | 'carpentry' | 'appliances' | 'painting';
  icon: string;
  description: string;
  basePrice: number;
  popularSubServices: string[];
}

export interface WorkerDocument {
  name: string;
  type: string;
  verified: boolean;
  docNumber: string;
  verifiedDate?: string;
}

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  skill: string;
  skillKey: 'electrician' | 'plumbing' | 'cleaning' | 'carpentry' | 'appliances' | 'painting';
  experienceYears: number;
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  hourlyRate: number;
  baseFare: number;
  distanceKm: number;
  locality: string;
  bio: string;
  phone: string;
  languages: string[];
  isAvailable: boolean;
  workingHours: { start: string; end: string };
  serviceRadiusKm: number;
  blockedDates: string[];
  verified: boolean;
  verificationBadgeNumber: string;
  verificationStatus: 'verified' | 'pending' | 'under_review' | 'rejected';
  documents: WorkerDocument[];
  coOpEquityShares: number;
  coOpJoinDate: string;
  insuranceActive: boolean;
  matchScore?: number;
}

export type BookingStatus =
  | 'confirmed'
  | 'accepted'
  | 'on_the_way'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  locality: string;
  serviceCategory: string;
  subService: string;
  problemDescription: string;
  voiceNoteSimulated?: boolean;
  date: string;
  timeSlot: string;
  workerId: string;
  workerName: string;
  status: BookingStatus;
  otp: string;
  totalAmount: number;
  workerCut: number;       // 88%
  coopCut: number;         // 7%
  communityCut: number;    // 5%
  createdAt: string;
  ratingSubmitted?: boolean;
  currentLat?: number;
  currentLng?: number;
}

export interface ReviewItem {
  id: string;
  workerId: string;
  customerName: string;
  customerLocality: string;
  rating: number;
  date: string;
  comment: string;
  service: string;
  tags: string[];
  categories: {
    professionalism: number;
    quality: number;
    timeliness: number;
    communication: number;
  };
}

export interface CoOpWelfareFund {
  totalBalance: number;
  monthlyDisbursed: number;
  activeBeneficiaries: number;
  pensionPoolBalance: number;
  recentClaims: {
    id: string;
    workerName: string;
    type: string;
    amount: number;
    date: string;
    status: 'Approved' | 'Processing';
  }[];
}
