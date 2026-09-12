import React from 'react';
import { 
  Briefcase, 
  DollarSign, 
  Star, 
  Clock, 
  CheckCircle2, 
  Bell, 
  Calendar, 
  ShieldCheck, 
  HeartHandshake, 
  ArrowRight, 
  TrendingUp, 
  Award,
  Vote
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';

export const WorkerDashboardPage: React.FC = () => {
  const { 
    workers, 
    activeBooking, 
    navigateTo, 
    toggleWorkerAvailability,
    t,
    language 
  } = useWorkNest();

  const ramesh = workers[0]; // Primary worker demo

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner & Online Toggle */}
      <div className="bg-gradient-to-r from-coop-900 via-coop-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={ramesh.avatar}
              alt={ramesh.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-slate-900">
              <ShieldCheck className="w-3 h-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amberGold-400">
                Nashik Electricians Co-op Cluster #1
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono">
                {ramesh.verificationBadgeNumber}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
              सुप्रभात, {ramesh.name}!
            </h1>
            <p className="text-xs text-slate-300">
              Co-op Founding Partner • Equal Democratic Ownership
            </p>
          </div>
        </div>

        {/* Availability Online/Offline Pill Toggle */}
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center space-x-4">
          <div>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider block font-bold">
              Dispatch State:
            </span>
            <strong className={`text-xs font-bold ${ramesh.isAvailable ? 'text-emerald-300' : 'text-slate-300'}`}>
              {ramesh.isAvailable ? '● Available for Instant Requests' : '○ Taking a Rest Break'}
            </strong>
          </div>
          <button
            onClick={() => toggleWorkerAvailability(ramesh.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              ramesh.isAvailable
                ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
          >
            {ramesh.isAvailable ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Today's Take-Home</span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹1,840</div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            88% net to UPI • 2 jobs done
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Weekly Payout</span>
            <TrendingUp className="w-5 h-5 text-coop-700" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹8,920</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            +₹2,100 vs corporate apps
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Co-op Equity Value</span>
            <Award className="w-5 h-5 text-amberGold-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹17,040</div>
          <div className="text-[11px] text-amberGold-700 font-medium mt-1">
            142 shares • Annual dividend
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Member Rating</span>
            <Star className="w-5 h-5 text-amberGold-500 fill-amberGold-400" />
          </div>
          <div className="text-2xl font-black text-slate-900">{ramesh.rating} ★</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            384 reviews • 628 total jobs
          </div>
        </div>

      </div>

      {/* Active Job Alert / Live Requests Teaser */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-coop-700" />
            <h2 className="text-base font-bold text-slate-900">
              Incoming Job Requests & Assigned Tasks
            </h2>
          </div>
          <button
            onClick={() => navigateTo('worker-requests')}
            className="text-xs font-bold text-coop-800 hover:text-coop-900 flex items-center space-x-1"
          >
            <span>Open Job Radar Screen</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {activeBooking ? (
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white uppercase">
                  Current Active Dispatch
                </span>
                <span className="text-xs font-mono font-bold text-slate-700">#{activeBooking.id}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-1">
                {activeBooking.subService}
              </h3>
              <p className="text-xs text-slate-600">
                Customer: <strong className="text-slate-900">{activeBooking.customerName}</strong> ({activeBooking.locality})
              </p>
              <p className="text-xs text-emerald-800 font-bold mt-1">
                Your Direct Take-Home: ₹{activeBooking.workerCut} (88%)
              </p>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={() => navigateTo('booking-tracking')}
                className="w-full sm:w-auto px-4 py-2 bg-coop-800 hover:bg-coop-900 text-white text-xs font-bold rounded-xl shadow-xs transition"
              >
                Navigate & View OTP
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl">
            No active jobs at this moment. You are online and ready to receive instant alerts!
          </div>
        )}
      </div>

      {/* Grid: Co-op Democracy & Welfare Mutual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Active Democratic Proposal Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-coop-800 font-bold text-sm">
              <Vote className="w-5 h-5 text-coop-700" />
              <span>Co-op Democratic Governance (Active Vote)</span>
            </div>
            <span className="text-[10px] font-bold bg-amberGold-100 text-amberGold-800 px-2 py-0.5 rounded-full">
              Voting Open
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900">
              Proposal #2026-08: Monsoon Safety Gear Allowance
            </h4>
            <p className="text-slate-600">
              Allocate ₹45,000 from the Welfare Pool to purchase certified anti-skid boots and insulated 1000V screwdrivers for all 42 Nashik electricians.
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 text-[11px]">Your Vote: 1 Member = 1 Vote</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => alert('Vote recorded: YES for Proposal #2026-08!')}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs"
                >
                  Vote YES
                </button>
                <button
                  onClick={() => alert('Vote recorded: NO for Proposal #2026-08')}
                  className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg text-xs"
                >
                  Vote NO
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Welfare Mutual Pool Status */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-coop-800 font-bold text-sm">
            <HeartHandshake className="w-5 h-5 text-coop-700" />
            <span>Family Health & Mutual Fund</span>
          </div>

          <div className="p-4 rounded-2xl bg-coop-50/70 border border-coop-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Nashik Emergency Treasury:</span>
              <span className="font-bold text-slate-900">₹4,82,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Your Family Cashless Coverage:</span>
              <span className="font-bold text-emerald-700">₹3,00,000 Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Children Education Aid:</span>
              <span className="font-bold text-coop-800">Eligible (2 Children)</span>
            </div>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-coop-200/60">
              Funded automatically by the 5% community welfare contribution on every customer invoice.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
