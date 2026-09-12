import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Navigation, 
  Star, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight, 
  RotateCw,
  Award,
  Users
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';
import { Worker } from '../types';

export const SmartMatchingPage: React.FC = () => {
  const { 
    workers, 
    activeBooking, 
    setSelectedWorker, 
    navigateTo, 
    advanceBookingStatus 
  } = useWorkNest();

  const [isScanning, setIsScanning] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<string>('worker-ramesh-patil');

  // Top 3 matching candidates
  const candidates: Worker[] = [
    { ...workers[0], matchScore: 96 },
    { ...workers[1], matchScore: 92 },
    { ...workers[2], matchScore: 89 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirmCandidate = (worker: Worker) => {
    setSelectedWorker(worker);
    if (activeBooking) {
      advanceBookingStatus(activeBooking.id); // advances from confirmed to accepted
    }
    navigateTo('booking-tracking');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-coop-100 text-coop-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-coop-700" />
          <span>Equitable Cooperative Dispatch Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Smart Fair-Matching
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Unlike corporate apps that penalize workers with black-box algorithms, WorkNest balances proximity, skill certifications, and fair community work distribution.
        </p>
      </div>

      {/* Animated Radar Scanning State */}
      {isScanning ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200/90 shadow-sm flex flex-col items-center justify-center space-y-6">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full border-4 border-coop-200 animate-ping opacity-60" />
            <span className="absolute inset-4 rounded-full border-2 border-coop-400 animate-pulse" />
            <div className="w-16 h-16 rounded-full bg-coop-700 text-white flex items-center justify-center shadow-lg">
              <Navigation className="w-8 h-8 animate-spin-slow text-amberGold-300" />
            </div>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-slate-800">
              Scanning Nashik Co-op Cluster (Gangapur Road)...
            </h3>
            <p className="text-xs text-slate-500">
              Evaluating 8 certified electricians, checking ITI credentials & fair distribution weights...
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Transparent Matching Factors Callout */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-coop-700" />
              <span>Transparent Match Factors Evaluated for This Booking</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-400 text-[10px] block">Skill Precision</span>
                <strong className="text-slate-800 font-bold">98% Fit</strong>
                <span className="text-[10px] text-coop-700 block">ITI Electrical</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-400 text-[10px] block">Proximity</span>
                <strong className="text-slate-800 font-bold">1.2 km Away</strong>
                <span className="text-[10px] text-coop-700 block">~12 min arrival</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-emerald-800 text-[10px] block font-semibold">Fair Job Distribution</span>
                <strong className="text-emerald-950 font-bold">+15% Weight</strong>
                <span className="text-[10px] text-emerald-700 block">Equitable member share</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-400 text-[10px] block">Customer Rating</span>
                <strong className="text-slate-800 font-bold">4.94 ★</strong>
                <span className="text-[10px] text-coop-700 block">384 verified reviews</span>
              </div>
            </div>
          </div>

          {/* Top 3 Recommended Candidates */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Top 3 Verified Co-op Matches:
            </h3>

            {candidates.map((worker) => {
              const isSelected = selectedCandidate === worker.id;

              return (
                <div
                  key={worker.id}
                  onClick={() => setSelectedCandidate(worker.id)}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-coop-700 ring-2 ring-coop-200 shadow-md'
                      : 'border-slate-200/90 hover:border-coop-300 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="relative shrink-0">
                        <img
                          src={worker.avatar}
                          alt={worker.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white">
                          <ShieldCheck className="w-3 h-3" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-slate-900 text-base">{worker.name}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coop-100 text-coop-800">
                            {worker.verificationBadgeNumber}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-coop-800">{worker.skill}</p>
                        <p className="text-xs text-slate-500">
                          {worker.locality} • <strong className="text-slate-800">{worker.distanceKm} km away</strong> • {worker.jobsCompleted} completed jobs
                        </p>
                      </div>
                    </div>

                    {/* Match Score Badge & CTA */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 font-black text-xs">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{worker.matchScore}% Match</span>
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-xs font-bold text-slate-900">₹{worker.hourlyRate}/hr</span>
                        <span className="text-[10px] text-slate-400 block">88% direct pay</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 pt-2.5 border-t border-slate-100 leading-relaxed">
                    {worker.bio}
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                      <span className="flex items-center text-amberGold-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amberGold-400 text-amberGold-500 mr-0.5" />
                        {worker.rating}
                      </span>
                      <span>•</span>
                      <span>Clear Police Verification #POL-88</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConfirmCandidate(worker);
                      }}
                      className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${
                        isSelected
                          ? 'bg-coop-800 hover:bg-coop-900 text-white shadow-md'
                          : 'bg-slate-100 hover:bg-coop-50 text-slate-800 hover:text-coop-900'
                      }`}
                    >
                      <span>Select & Confirm Booking</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
