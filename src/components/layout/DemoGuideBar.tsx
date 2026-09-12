import React, { useState } from 'react';
import { 
  Compass, 
  ChevronRight, 
  UserCheck, 
  MapPin, 
  Sparkles, 
  BellRing, 
  Radio, 
  PieChart, 
  ShieldCheck, 
  Eye, 
  Minimize2, 
  Maximize2 
} from 'lucide-react';
import { useWorkNest } from '../../context/WorkNestContext';

export const DemoGuideBar: React.FC = () => {
  const { 
    navigateTo, 
    setUserRole, 
    setSelectedService, 
    services, 
    advanceBookingStatus, 
    activeBooking 
  } = useWorkNest();
  const [isMinimized, setIsMinimized] = useState(false);

  const steps = [
    {
      num: 1,
      title: 'Customer Home',
      desc: 'Browse categories & local co-op metrics',
      action: () => {
        setUserRole('customer');
        navigateTo('customer-dashboard');
      }
    },
    {
      num: 2,
      title: 'Discovery & Map',
      desc: 'Filter verified pros across Nashik',
      action: () => {
        setUserRole('customer');
        navigateTo('discovery');
      }
    },
    {
      num: 3,
      title: '5-Step Booking',
      desc: 'Voice-first problem input + time slot',
      action: () => {
        setUserRole('customer');
        setSelectedService(services[0]);
        navigateTo('booking-flow');
      }
    },
    {
      num: 4,
      title: 'Smart Matching',
      desc: 'Fair equitable work dispatch radar',
      action: () => {
        setUserRole('customer');
        navigateTo('smart-matching');
      }
    },
    {
      num: 5,
      title: 'Worker Request Alert',
      desc: 'Ramesh Patil receives & accepts live job',
      action: () => {
        setUserRole('worker');
        navigateTo('worker-requests');
      }
    },
    {
      num: 6,
      title: 'Live Tracking & OTP',
      desc: 'Real-time GPS route, 4-digit OTP & chat',
      action: () => {
        setUserRole('customer');
        navigateTo('booking-tracking');
      }
    },
    {
      num: 7,
      title: 'Co-op Value Split',
      desc: '88% Worker / 7% Co-op / 5% Welfare Fund',
      action: () => {
        setUserRole('worker');
        navigateTo('worker-earnings');
      }
    },
    {
      num: 8,
      title: 'Council Verification',
      desc: 'Police clearance & ITI certificates desk',
      action: () => {
        setUserRole('admin');
        navigateTo('admin-verification');
      }
    }
  ];

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center space-x-2 px-3 py-2 bg-slate-900 text-white rounded-full shadow-xl border border-amberGold-400 text-xs font-bold hover:bg-slate-800 transition"
        >
          <Sparkles className="w-4 h-4 text-amberGold-400" />
          <span>SIH 2026 Demo Flow</span>
          <Maximize2 className="w-3.5 h-3.5 ml-1 text-slate-400" />
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="SIH 2026 Jury Interactive Demo Tour" className="bg-gradient-to-r from-slate-950 via-slate-900 to-coop-950 text-white border-b border-slate-800 text-xs py-2 px-3 relative z-30 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amberGold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amberGold-500"></span>
          </span>
          <span className="font-bold text-amberGold-400 tracking-wide uppercase text-[11px]">
            SIH 2026 Jury Interactive Demo Tour:
          </span>
          <span className="text-slate-300 hidden xl:inline text-[11px]">
            Follow the 2-minute golden path from household booking to cooperative distribution
          </span>
        </div>

        {/* Step buttons row */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1 max-w-full no-scrollbar">
          {steps.map((step) => (
            <button
              key={step.num}
              onClick={step.action}
              title={step.desc}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-coop-800 text-slate-200 hover:text-white border border-slate-700 hover:border-coop-400 transition text-[11px] whitespace-nowrap font-medium"
            >
              <span className="w-4 h-4 rounded-full bg-amberGold-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                {step.num}
              </span>
              <span>{step.title}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsMinimized(true)}
          className="text-slate-400 hover:text-white p-1 ml-1"
          title="Minimize Demo Toolbar"
        >
          <Minimize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
