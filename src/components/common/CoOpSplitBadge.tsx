import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, Zap, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';

interface CoOpSplitBadgeProps {
  initialAmount?: number;
  interactive?: boolean;
  compact?: boolean;
}

export const CoOpSplitBadge: React.FC<CoOpSplitBadgeProps> = ({ 
  initialAmount = 1000, 
  interactive = true, 
  compact = false 
}) => {
  const [amount, setAmount] = useState<number>(initialAmount);

  const workerShare = Math.round(amount * 0.88);
  const coopShare = Math.round(amount * 0.07);
  const welfareShare = amount - workerShare - coopShare; // 5%

  // Corporate platform comparison (e.g. 30% commission + hidden fee)
  const corporateWorkerShare = Math.round(amount * 0.68);
  const corporatePlatformTake = Math.round(amount * 0.32);
  const workerGain = workerShare - corporateWorkerShare;

  if (compact) {
    return (
      <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-3 text-xs">
        <div className="flex items-center justify-between font-bold text-emerald-950 mb-1.5">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Co-op Split on ₹{amount}</span>
          </span>
          <span className="text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full text-[10px]">
            88% to Worker
          </span>
        </div>
        <div className="flex h-2.5 rounded-full overflow-hidden mb-2 bg-slate-200">
          <div style={{ width: '88%' }} className="bg-emerald-600" title="Worker 88%" />
          <div style={{ width: '7%' }} className="bg-teal-700" title="Co-op Tech 7%" />
          <div style={{ width: '5%' }} className="bg-amberGold-500" title="Community Welfare 5%" />
        </div>
        <div className="grid grid-cols-3 gap-1 text-[11px] text-slate-600">
          <div>
            <span className="block font-semibold text-emerald-800">₹{workerShare}</span>
            <span className="text-[10px] text-slate-500">Worker (88%)</span>
          </div>
          <div>
            <span className="block font-semibold text-teal-800">₹{coopShare}</span>
            <span className="text-[10px] text-slate-500">Co-op Ops (7%)</span>
          </div>
          <div>
            <span className="block font-semibold text-amberGold-700">₹{welfareShare}</span>
            <span className="text-[10px] text-slate-500">Welfare (5%)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-coop-100 text-coop-800 text-xs font-bold uppercase tracking-wider">
              100% Transparent Economics
            </span>
            <span className="text-xs text-slate-500 font-medium">Model vs Corporate Gig Giants</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Where Does Your Money Go?
          </h3>
        </div>

        {interactive && (
          <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-medium">Service Bill:</span>
            <span className="text-base font-bold text-slate-900">₹{amount}</span>
          </div>
        )}
      </div>

      {interactive && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span>₹300 (Small repair)</span>
            <span className="text-coop-800 font-bold">Slide to test: ₹{amount}</span>
            <span>₹5,000 (Full renovation)</span>
          </div>
          <input
            type="range"
            min="300"
            max="5000"
            step="50"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-coop-700"
          />
        </div>
      )}

      {/* Visual Multi-Segment Distribution Bar */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-emerald-800">Worker Direct (88%)</span>
          <span className="text-teal-800">Co-op Ops (7%)</span>
          <span className="text-amberGold-700">Welfare & Pension (5%)</span>
        </div>
        <div className="h-4 rounded-xl overflow-hidden flex shadow-inner bg-slate-100 p-0.5 border border-slate-200">
          <div 
            style={{ width: '88%' }} 
            className="bg-emerald-600 rounded-l-lg transition-all duration-300 flex items-center justify-center text-[10px] text-white font-bold"
          >
            ₹{workerShare} (88%)
          </div>
          <div 
            style={{ width: '7%' }} 
            className="bg-teal-700 transition-all duration-300 flex items-center justify-center text-[10px] text-white font-bold"
            title={`Co-op Reserve: ₹${coopShare}`}
          />
          <div 
            style={{ width: '5%' }} 
            className="bg-amberGold-500 rounded-r-lg transition-all duration-300 flex items-center justify-center text-[10px] text-white font-bold"
            title={`Community Welfare: ₹${welfareShare}`}
          />
        </div>
      </div>

      {/* Detail Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
          <div className="flex items-center space-x-2 text-emerald-800 mb-1">
            <Zap className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold uppercase tracking-wider">Worker-Owner</span>
          </div>
          <div className="text-xl font-extrabold text-emerald-950">₹{workerShare}</div>
          <p className="text-[11px] text-emerald-800 mt-1">
            Directly to pro bank account via UPI. No withheld payments, no algorithmic fines.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200/80">
          <div className="flex items-center space-x-2 text-teal-800 mb-1">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-bold uppercase tracking-wider">Co-op Servers & Ops</span>
          </div>
          <div className="text-xl font-extrabold text-teal-950">₹{coopShare}</div>
          <p className="text-[11px] text-teal-800 mt-1">
            Pays for open-source tech, SMS/OTP gateways, customer support, and Nashik tool depot.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-amberGold-50/70 border border-amberGold-200/80">
          <div className="flex items-center space-x-2 text-amberGold-800 mb-1">
            <HeartHandshake className="w-4 h-4 text-amberGold-700" />
            <span className="text-xs font-bold uppercase tracking-wider">Worker Welfare Pool</span>
          </div>
          <div className="text-xl font-extrabold text-amberGold-950">₹{welfareShare}</div>
          <p className="text-[11px] text-amberGold-800 mt-1">
            Family health insurance, monsoon hardship allowance, and worker children scholarships.
          </p>
        </div>
      </div>

      {/* Comparison Callout vs Corporate Gig Apps */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-bold uppercase tracking-wide border border-red-500/30">
              Corporate Gig Comparison
            </span>
            <span className="text-xs text-slate-400">On a standard ₹{amount} job</span>
          </div>
          <p className="text-xs text-slate-300">
            Corporate apps pay the worker only <strong className="text-white">₹{corporateWorkerShare}</strong> while pocketing <strong className="text-red-400">₹{corporatePlatformTake} (32%)</strong> in commissions and fees.
          </p>
        </div>
        <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-xl px-4 py-2 text-center shrink-0">
          <div className="text-[11px] text-emerald-300 font-medium">Worker earns extra</div>
          <div className="text-lg font-bold text-emerald-400">+₹{workerGain} with WorkNest</div>
        </div>
      </div>
    </div>
  );
};
