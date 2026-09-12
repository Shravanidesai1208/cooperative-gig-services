import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Check, 
  X, 
  AlertTriangle, 
  DollarSign, 
  Sparkles, 
  Navigation,
  ArrowRight
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';
import { CoOpSplitBadge } from '../components/common/CoOpSplitBadge';

export const WorkerJobRequestsPage: React.FC = () => {
  const { 
    bookings, 
    workerAcceptJob, 
    workerRejectJob, 
    navigateTo, 
    activeBooking 
  } = useWorkNest();

  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [acceptedToast, setAcceptedToast] = useState<boolean>(false);

  // Use the active booking or first available booking
  const incomingJob = activeBooking || bookings[0];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleAccept = (bookingId: string) => {
    workerAcceptJob(bookingId);
    setAcceptedToast(true);
    setTimeout(() => {
      navigateTo('booking-tracking');
    }, 1200);
  };

  const handleReject = (bookingId: string) => {
    workerRejectJob(bookingId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Live Dispatch Radar (Nashik Cluster #1)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Incoming Job Requests
          </h1>
        </div>

        <span className="text-xs text-slate-500 font-medium bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          No algorithmic penalties for declining
        </span>
      </div>

      {/* Acceptance Success Toast */}
      {acceptedToast && (
        <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-white text-emerald-700 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-sm">Job Accepted Successfully!</h4>
              <p className="text-xs text-emerald-100">Navigating to customer live route and OTP verification...</p>
            </div>
          </div>
        </div>
      )}

      {/* Incoming Job Card */}
      {incomingJob && incomingJob.status !== 'cancelled' ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/80 shadow-xl relative overflow-hidden space-y-6">
          
          {/* Top Bar with Urgent Countdown Timer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider animate-pulse">
                ⚡ New Request Alert
              </span>
              <span className="text-xs font-mono text-slate-500 font-semibold">#{incomingJob.id}</span>
            </div>

            {/* Countdown timer pill */}
            <div className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-mono font-bold">
              <Clock className="w-4 h-4 text-amberGold-400" />
              <span>Time to respond: <strong className="text-amberGold-300">{timeLeft}s</strong></span>
            </div>
          </div>

          {/* Customer & Problem Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Service Required:</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {incomingJob.subService}
                </h3>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-coop-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">{incomingJob.customerName}</span>
                    <p className="text-slate-600">{incomingJob.customerAddress}</p>
                    <span className="text-[11px] text-coop-800 font-semibold">
                      Distance: ~1.2 km from your location (Gangapur Road)
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Problem Description:</span>
                <p className="text-xs text-slate-700 mt-1 bg-amberGold-50/50 p-3 rounded-xl border border-amberGold-200/60 leading-relaxed italic">
                  "{incomingJob.problemDescription}"
                </p>
              </div>
            </div>

            {/* Transparent Earning Split Breakdown for Worker */}
            <div className="space-y-3">
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                  Guaranteed Take-Home Pay (88%)
                </span>
                <div className="text-3xl font-black text-emerald-700">
                  ₹{incomingJob.workerCut}
                </div>
                <div className="text-xs text-slate-600 pt-1 border-t border-emerald-200/70 space-y-1">
                  <div className="flex justify-between">
                    <span>Customer Bill:</span>
                    <span className="font-bold text-slate-900">₹{incomingJob.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-teal-800">
                    <span>Co-op Operations (7%):</span>
                    <span>₹{incomingJob.coopCut}</span>
                  </div>
                  <div className="flex justify-between text-amberGold-800">
                    <span>Your Welfare Mutual Fund (5%):</span>
                    <span>₹{incomingJob.communityCut}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <strong>Schedule:</strong> {incomingJob.date} • {incomingJob.timeSlot}
              </div>
            </div>
          </div>

          {/* Accept / Decline Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => handleReject(incomingJob.id)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition flex items-center justify-center space-x-1"
            >
              <X className="w-4 h-4" />
              <span>Decline Job (No Penalty)</span>
            </button>

            <button
              onClick={() => handleAccept(incomingJob.id)}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-coop-800 hover:bg-coop-900 text-white font-black text-sm shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2 animate-pulse"
            >
              <Check className="w-5 h-5 text-amberGold-400" />
              <span>Accept Job & Start Route (₹{incomingJob.workerCut})</span>
            </button>
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
          <div className="w-16 h-16 rounded-full bg-coop-50 text-coop-700 mx-auto flex items-center justify-center">
            <Bell className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No New Requests Pending</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You are online. When a customer in Gangapur Road or College Road requests an electrician, it will chime here with a 45s countdown.
          </p>
          <button
            onClick={() => navigateTo('worker-dashboard')}
            className="mt-2 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition"
          >
            Back to Dashboard
          </button>
        </div>
      )}

    </div>
  );
};
