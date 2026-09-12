import React from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Users, 
  TrendingUp, 
  Vote, 
  AlertTriangle, 
  Check, 
  X, 
  ArrowRight, 
  Zap, 
  Award,
  Sparkles 
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';
import { CoOpSplitBadge } from '../components/common/CoOpSplitBadge';

export const CoOpModelPage: React.FC = () => {
  const { navigateTo } = useWorkNest();

  const comparisonRows = [
    {
      feature: 'Platform Take-Rate / Commission',
      corporate: '25% - 35% commission + hidden convenience fees',
      worknest: 'Only 7% transparent co-op operational cost',
      highlight: true
    },
    {
      feature: 'Worker Net Take-Home',
      corporate: 'Only ₹650 - ₹680 on a ₹1,000 bill',
      worknest: '₹880 guaranteed (88%) direct to UPI immediately',
      highlight: true
    },
    {
      feature: 'Legal Status & Ownership',
      corporate: 'Zero equity, disposable "independent contractor"',
      worknest: 'Equal voting co-op member with equity patronage shares',
      highlight: true
    },
    {
      feature: 'Health, Accident & Life Security',
      corporate: 'Zero health insurance or family hospital cover',
      worknest: '5% welfare pool provides ₹3,00,000 cashless family cover',
      highlight: true
    },
    {
      feature: 'Dispatch Algorithm Fairness',
      corporate: 'Black-box algorithms prioritize platform profit',
      worknest: 'Open algorithm with fair equitable work distribution',
      highlight: false
    },
    {
      feature: 'Taking Time Off / Resting',
      corporate: 'Algorithmic penalties, ranking drops, account lockouts',
      worknest: 'Total autonomy, zero penalties for blocking personal leave',
      highlight: false
    },
    {
      feature: 'Dispute Arbitration',
      corporate: 'Automated AI chatbots with zero right to appeal',
      worknest: 'Democratic peer council of fellow Nashik workers',
      highlight: false
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Manifesto Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-coop-100 text-coop-800 text-xs font-bold border border-coop-200">
          <Sparkles className="w-3.5 h-3.5 text-coop-700" />
          <span>The Cooperative Gig Revolution • Team COOP-X</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          How WorkNest Reclaims <br className="hidden sm:inline" />
          Fair Work for India
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
          In traditional gig apps, billions of rupees leave tier-2 cities like Nashik to fund corporate headquarters in Bangalore or Silicon Valley. WorkNest keeps <strong className="text-coop-800 font-bold">95% of every rupee in the local Nashik ecosystem</strong>.
        </p>
      </div>

      {/* The Visual Cooperative Split Engine */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Interactive Transparent Money Flow
          </h2>
          <p className="text-xs text-slate-500">
            Slide the bill to see how transparent mathematics replace predatory commissions.
          </p>
        </div>
        <CoOpSplitBadge initialAmount={1000} interactive={true} />
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-coop-800 bg-coop-100 px-2.5 py-0.5 rounded-full">
            Head-to-Head Comparison
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-2">
            WorkNest vs Corporate Gig Monopolies
          </h2>
          <p className="text-xs text-slate-500">
            Why household service professionals and conscious consumers are migrating to WorkNest.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3 w-1/3">Core Dimension</th>
                <th className="py-3 px-3 text-red-600 w-1/3">Corporate Gig Platforms</th>
                <th className="py-3 px-3 text-coop-800 w-1/3 font-black">WorkNest Cooperative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className={row.highlight ? 'bg-coop-50/30' : ''}>
                  <td className="py-3.5 px-3 font-bold text-slate-800">
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 text-[11px] leading-snug">
                    <div className="flex items-start space-x-1.5">
                      <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{row.corporate}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-emerald-950 font-bold text-[11px] leading-snug">
                    <div className="flex items-start space-x-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{row.worknest}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* The Democratic Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-coop-100 text-coop-800 flex items-center justify-center font-bold">
            <Vote className="w-6 h-6 text-coop-700" />
          </div>
          <h3 className="text-base font-bold text-slate-900">1 Worker = 1 Vote</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Platform governance is not controlled by venture capital boardrooms. Ramesh Patil, Sunita Jadhav, and all members vote directly on service fees and welfare budgets.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <HeartHandshake className="w-6 h-6 text-teal-700" />
          </div>
          <h3 className="text-base font-bold text-slate-900">5% Welfare Mutual</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            A self-sustaining social security net providing cashless family medical coverage, emergency monsoon hardship relief, and scholarships for worker children.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amberGold-100 text-amberGold-800 flex items-center justify-center font-bold">
            <Award className="w-6 h-6 text-amberGold-700" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Patronage Dividends</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            At the close of each financial year, remaining surplus in the cooperative reserve is returned directly to members proportional to their verified completed jobs.
          </p>
        </div>

      </div>

      {/* Call to Actions */}
      <div className="bg-gradient-to-r from-slate-900 via-coop-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">
            Ready to experience fair service delivery?
          </h3>
          <p className="text-xs text-slate-300">
            Book verified household help in Nashik or register as an artisan co-op partner.
          </p>
        </div>
        <div className="flex space-x-3 shrink-0">
          <button
            onClick={() => navigateTo('discovery')}
            className="px-5 py-2.5 bg-amberGold-500 hover:bg-amberGold-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition"
          >
            Find a Service Pro
          </button>
          <button
            onClick={() => navigateTo('admin-verification')}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition"
          >
            View Council Desk
          </button>
        </div>
      </div>

    </div>
  );
};
