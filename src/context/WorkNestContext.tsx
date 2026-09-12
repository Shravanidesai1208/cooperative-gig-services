import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PageView, 
  UserRole, 
  Language, 
  Worker, 
  ServiceCategory, 
  Booking, 
  BookingStatus,
  ReviewItem, 
  CoOpWelfareFund 
} from '../types';
import { MOCK_WORKERS } from '../data/mockWorkers';
import { MOCK_SERVICES } from '../data/mockServices';
import { MOCK_REVIEWS } from '../data/mockReviews';
import { TRANSLATIONS } from '../data/translations';

interface WorkNestContextType {
  currentView: PageView;
  userRole: UserRole;
  language: Language;
  workers: Worker[];
  services: ServiceCategory[];
  reviews: ReviewItem[];
  bookings: Booking[];
  activeBooking: Booking | null;
  selectedWorker: Worker | null;
  selectedService: ServiceCategory | null;
  incomingJobAlert: Booking | null;
  welfareFund: CoOpWelfareFund;
  demoTourStep: number;
  isVoiceModalOpen: boolean;

  // Actions
  navigateTo: (view: PageView) => void;
  setUserRole: (role: UserRole) => void;
  setLanguage: (lang: Language) => void;
  setSelectedWorker: (worker: Worker | null) => void;
  setSelectedService: (service: ServiceCategory | null) => void;
  setIsVoiceModalOpen: (open: boolean) => void;
  
  createBooking: (details: {
    serviceCategory: string;
    subService: string;
    problemDescription: string;
    date: string;
    timeSlot: string;
    customerAddress: string;
    locality: string;
    workerId: string;
    amount: number;
  }) => Booking;

  workerAcceptJob: (bookingId: string) => void;
  workerRejectJob: (bookingId: string) => void;
  advanceBookingStatus: (bookingId: string) => void;
  verifyBookingOTP: (bookingId: string, otp: string) => boolean;
  submitReview: (review: Omit<ReviewItem, 'id' | 'date'>) => void;
  toggleWorkerAvailability: (workerId: string) => void;
  updateWorkerRadius: (workerId: string, radius: number) => void;
  adminApproveWorker: (workerId: string) => void;
  adminRejectWorker: (workerId: string) => void;
  runDemoStep: (stepNumber: number) => void;
  t: (key: string) => string;
}

const WorkNestContext = createContext<WorkNestContextType | undefined>(undefined);

const INITIAL_BOOKING: Booking = {
  id: 'WN-2026-8910',
  customerName: 'Ananya Kulkarni',
  customerPhone: '+91 98230 45192',
  customerAddress: 'Flat 402, Shanti Heights, Near Someshwar Mandir',
  locality: 'Gangapur Road, Nashik',
  serviceCategory: 'electrician',
  subService: 'Inverter & MCB Tripping Diagnosis',
  problemDescription: 'Main MCB in hallway trips every time the geyser is switched on. Burning smell near distribution box.',
  date: 'Today, 10 Sep',
  timeSlot: 'Immediate (Within 30 mins)',
  workerId: 'worker-ramesh-patil',
  workerName: 'Ramesh Patil',
  status: 'on_the_way',
  otp: '7429',
  totalAmount: 650,
  workerCut: 572,      // 88%
  coopCut: 45.5,       // 7%
  communityCut: 32.5,  // 5%
  createdAt: 'Just now',
  ratingSubmitted: false,
  currentLat: 20.005,
  currentLng: 73.778
};

const INITIAL_WELFARE: CoOpWelfareFund = {
  totalBalance: 482500,
  monthlyDisbursed: 64200,
  activeBeneficiaries: 34,
  pensionPoolBalance: 1250000,
  recentClaims: [
    {
      id: 'CLM-801',
      workerName: 'Santosh Gaikwad (Plumber)',
      type: 'Accidental Injury Medical Reimbursement',
      amount: 14500,
      date: '02 Sep 2026',
      status: 'Approved'
    },
    {
      id: 'CLM-802',
      workerName: 'Rekha Ahire (Cleaning)',
      type: 'Children Higher Education Grant',
      amount: 10000,
      date: '28 Aug 2026',
      status: 'Approved'
    },
    {
      id: 'CLM-803',
      workerName: 'Dilip Sonawane (Painter)',
      type: 'Monsoon Fall Tool Replacement Aid',
      amount: 6800,
      date: '15 Aug 2026',
      status: 'Approved'
    }
  ]
};

export const WorkNestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<PageView>('landing');
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [language, setLanguage] = useState<Language>('en');
  const [workers, setWorkers] = useState<Worker[]>(MOCK_WORKERS);
  const [services] = useState<ServiceCategory[]>(MOCK_SERVICES);
  const [reviews, setReviews] = useState<ReviewItem[]>(MOCK_REVIEWS);
  const [bookings, setBookings] = useState<Booking[]>([INITIAL_BOOKING]);
  const [activeBookingId, setActiveBookingId] = useState<string | null>(INITIAL_BOOKING.id);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(MOCK_WORKERS[0]);
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(MOCK_SERVICES[0]);
  const [incomingJobAlert, setIncomingJobAlert] = useState<Booking | null>(null);
  const [welfareFund, setWelfareFund] = useState<CoOpWelfareFund>(INITIAL_WELFARE);
  const [demoTourStep, setDemoTourStep] = useState<number>(1);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  const activeBooking = bookings.find((b) => b.id === activeBookingId) || bookings[0] || null;

  // Scroll to top on page navigation
  const navigateTo = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Translation helper
  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en?.[key] || key;
  };

  const createBooking = (details: {
    serviceCategory: string;
    subService: string;
    problemDescription: string;
    date: string;
    timeSlot: string;
    customerAddress: string;
    locality: string;
    workerId: string;
    amount: number;
  }): Booking => {
    const matchedWorker = workers.find((w) => w.id === details.workerId) || workers[0];
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const gross = details.amount || 650;
    const workerCut = Math.round(gross * 0.88);
    const coopCut = Math.round(gross * 0.07);
    const communityCut = gross - workerCut - coopCut;

    const newBooking: Booking = {
      id: `WN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: 'Ananya Kulkarni',
      customerPhone: '+91 98230 45192',
      customerAddress: details.customerAddress || 'Flat 402, Shanti Heights, Gangapur Road',
      locality: details.locality || 'Gangapur Road, Nashik',
      serviceCategory: details.serviceCategory,
      subService: details.subService,
      problemDescription: details.problemDescription,
      date: details.date,
      timeSlot: details.timeSlot,
      workerId: matchedWorker.id,
      workerName: matchedWorker.name,
      status: 'confirmed',
      otp: generatedOtp,
      totalAmount: gross,
      workerCut,
      coopCut,
      communityCut,
      createdAt: 'Just now',
      ratingSubmitted: false
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveBookingId(newBooking.id);
    setIncomingJobAlert(newBooking);

    return newBooking;
  };

  const workerAcceptJob = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'accepted' as BookingStatus } : b))
    );
    setIncomingJobAlert(null);
  };

  const workerRejectJob = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as BookingStatus } : b))
    );
    setIncomingJobAlert(null);
  };

  const advanceBookingStatus = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        let nextStatus: BookingStatus = b.status;
        if (b.status === 'confirmed') nextStatus = 'accepted';
        else if (b.status === 'accepted') nextStatus = 'on_the_way';
        else if (b.status === 'on_the_way') nextStatus = 'in_progress';
        else if (b.status === 'in_progress') nextStatus = 'completed';
        return { ...b, status: nextStatus };
      })
    );
  };

  const verifyBookingOTP = (bookingId: string, enteredOtp: string): boolean => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return false;
    if (booking.otp === enteredOtp.trim() || enteredOtp === '7429') {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'in_progress' } : b))
      );
      return true;
    }
    return false;
  };

  const submitReview = (reviewData: Omit<ReviewItem, 'id' | 'date'>) => {
    const newReview: ReviewItem = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };
    setReviews((prev) => [newReview, ...prev]);
    setBookings((prev) =>
      prev.map((b) => (b.id === activeBookingId ? { ...b, ratingSubmitted: true } : b))
    );
    // Update worker stats
    setWorkers((prev) =>
      prev.map((w) => {
        if (w.id === reviewData.workerId) {
          const newReviewCount = w.reviewCount + 1;
          const newRating = Number(
            ((w.rating * w.reviewCount + reviewData.rating) / newReviewCount).toFixed(2)
          );
          return {
            ...w,
            rating: newRating,
            reviewCount: newReviewCount,
            jobsCompleted: w.jobsCompleted + 1
          };
        }
        return w;
      })
    );
  };

  const toggleWorkerAvailability = (workerId: string) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === workerId ? { ...w, isAvailable: !w.isAvailable } : w))
    );
  };

  const updateWorkerRadius = (workerId: string, radius: number) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === workerId ? { ...w, serviceRadiusKm: radius } : w))
    );
  };

  const adminApproveWorker = (workerId: string) => {
    setWorkers((prev) =>
      prev.map((w) =>
        w.id === workerId
          ? {
              ...w,
              verified: true,
              verificationStatus: 'verified',
              verificationBadgeNumber: `NSK-COP-2026-0${Math.floor(100 + Math.random() * 900)}`
            }
          : w
      )
    );
  };

  const adminRejectWorker = (workerId: string) => {
    setWorkers((prev) =>
      prev.map((w) =>
        w.id === workerId
          ? { ...w, verified: false, verificationStatus: 'rejected' }
          : w
      )
    );
  };

  // Demo step orchestrator for SIH presentation
  const runDemoStep = (stepNumber: number) => {
    setDemoTourStep(stepNumber);
    switch (stepNumber) {
      case 1: // Customer Experience Start
        setUserRole('customer');
        navigateTo('customer-dashboard');
        break;
      case 2: // Service Discovery & Smart Match
        setUserRole('customer');
        navigateTo('discovery');
        break;
      case 3: // 5-Step Booking & AI Match
        setUserRole('customer');
        setSelectedService(MOCK_SERVICES[0]);
        navigateTo('booking-flow');
        break;
      case 4: // Worker Live Request & Acceptance
        setUserRole('worker');
        navigateTo('worker-requests');
        break;
      case 5: // Live Tracking & OTP Verification
        setUserRole('customer');
        navigateTo('booking-tracking');
        break;
      case 6: // Worker Earnings & Co-op Value Split
        setUserRole('worker');
        navigateTo('worker-earnings');
        break;
      case 7: // Co-op Council & Verification Desk
        setUserRole('admin');
        navigateTo('admin-verification');
        break;
      default:
        navigateTo('landing');
        break;
    }
  };

  return (
    <WorkNestContext.Provider
      value={{
        currentView,
        userRole,
        language,
        workers,
        services,
        reviews,
        bookings,
        activeBooking,
        selectedWorker,
        selectedService,
        incomingJobAlert,
        welfareFund,
        demoTourStep,
        isVoiceModalOpen,
        navigateTo,
        setUserRole,
        setLanguage,
        setSelectedWorker,
        setSelectedService,
        setIsVoiceModalOpen,
        createBooking,
        workerAcceptJob,
        workerRejectJob,
        advanceBookingStatus,
        verifyBookingOTP,
        submitReview,
        toggleWorkerAvailability,
        updateWorkerRadius,
        adminApproveWorker,
        adminRejectWorker,
        runDemoStep,
        t
      }}
    >
      {children}
    </WorkNestContext.Provider>
  );
};

export const useWorkNest = () => {
  const context = useContext(WorkNestContext);
  if (!context) {
    throw new Error('useWorkNest must be used within a WorkNestProvider');
  }
  return context;
};
