import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  Download, 
  ShieldCheck, 
  HeartHandshake, 
  Award, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';

export const WorkerEarningsPage: React.FC = () => {
  const { workers } = useWorkNest();
  const ramesh = workers[0];

  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('week');
  const [payoutModal, setPayoutModal] = useState(false);

  // Weekly earnings chart data
  const weekData = [
    { day: 'Mon', gross: 1600, net: 1408 },
    { day: 'Tue', gross: 2150, net: 1892 },
    { day: 'Wed', gross: 2400, net: 2112 },
    { day: 'Thu', gross: 1900, net: 1672 },
    { day: 'Fri', gross: 2100, net: 1848 },
    { day: 'Sat', gross: 2800, net: 2464 },
    { day: 'Sun', gross: 1200, net: 1056 },
  ];

  const maxNet = 2600;

  // Recent ledger entries
  const ledger = [
    {
      id: 'TXN-8812',
      date: 'Today, 10 Sep • 11:30 AM',
      customer: 'Ananya Kulkarni',
      service: 'Inverter & MCB Tripping Diagnosis',
      gross: 650,
      workerNet: 572,    // 88%
      coopCut: 45.5,     // 7%
      welfareCut: 32.5,  // 5%
      status: 'Paid via UPI'
    },
    {
      id: 'TXN-8790',
      date: 'Today, 10 Sep • 09:15 AM',
      customer: 'Dr. Vivek Joshi',
      service: 'Ceiling BLDC Fan Installation (x2)',
      gross: 1440,
      workerNet: 1267,
      coopCut: 100.8,
      welfareCut: 72,
      status: 'Paid via UPI'
    },
    {
      id: 'TXN-8742',
      date: 'Yesterday, 09 Sep',
      customer: 'Pooja Deshpande',
      service: 'Main Switchboard Repair',
      gross: 950,
      workerNet: 836,
      coopCut: 66.5,
      welfareCut: 47.5,
      status: 'Settled'
    },
    {
      id: 'TXN-8698',
      date: '08 Sep 2026',
      customer: 'Sunil Patil',
      service: 'Water Heater Power Socket Fitment',
      gross: 550,
      workerNet: 484,
      coopCut: 38.5,
      welfareCut: 27.5,
      status: 'Settled'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Instant Payout Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-coop-800 bg-coop-100 px-3 py-1 rounded-full">
              Nashik Co-op Financial Ledger
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Transparent Earnings & Dividends
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time direct UPI settlement. Zero deductions for commission algorithms.
          </p>
        </div>

        <button
          onClick={() => setPayoutModal(true)}
          className="px-6 py-3 bg-coop-800 hover:bg-coop-900 text-white font-bold text-xs rounded-2xl shadow-md transition flex items-center justify-center space-x-2 self-start sm:self-auto"
        >
          <ArrowUpRight className="w-4 h-4 text-amberGold-400" />
          <span>Instant UPI Payout (₹3,109 Balance)</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            This Week's Net Take-Home
          </span>
          <div className="text-3xl font-black text-slate-900">₹8,920</div>
          <p className="text-xs text-emerald-700 font-semibold flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            88.0% of all customer invoices
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Co-op Equity Shares & Dividend
          </span>
          <div className="text-3xl font-black text-amberGold-600">₹17,040</div>
          <p className="text-xs text-slate-500">
            142 shares held • Projected ₹120/share annual patronage surplus
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Your Contribution to Health Mutual
          </span>
          <div className="text-3xl font-black text-teal-700">₹510</div>
          <p className="text-xs text-teal-800 font-semibold">
            5% welfare pool • ₹3L cashless family health insurance
          </p>
        </div>
      </div>

      {/* Interactive Weekly Chart */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Weekly Income Trend (Mon - Sun)
            </h2>
            <p className="text-xs text-slate-500">
              Comparing Gross Customer Bill vs Worker Net 88% Take-Home.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="flex items-center space-x-1 font-medium text-slate-500">
              <span className="w-3 h-3 rounded-xs bg-slate-300" />
              <span>Gross Bill</span>
            </span>
            <span className="flex items-center space-x-1 font-bold text-emerald-800">
              <span className="w-3 h-3 rounded-xs bg-emerald-600" />
              <span>Net In Pocket (88%)</span>
            </span>
          </div>
        </div>

        {/* SVG / Flex Bar Chart */}
        <div className="h-48 flex items-end justify-between gap-2 pt-8 px-2 border-b border-slate-100">
          {weekData.map((item, i) => {
            const grossHeight = (item.gross / maxNet) * 100;
            const netHeight = (item.net / maxNet) * 100;

            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="text-[10px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  ₹{item.net}
                </div>
                <div className="w-full max-w-[36px] flex items-end justify-center gap-1 h-36">
                  {/* Gross Bar */}
                  <div
                    style={{ height: `${grossHeight}%` }}
                    className="w-1/2 bg-slate-200 rounded-t-sm transition-all group-hover:bg-slate-300"
                    title={`Gross: ₹${item.gross}`}
                  />
                  {/* Net Bar */}
                  <div
                    style={{ height: `${netHeight}%` }}
                    className="w-1/2 bg-emerald-600 rounded-t-sm transition-all group-hover:bg-emerald-700 shadow-xs"
                    title={`Net Worker Take: ₹${item.net}`}
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-500 mt-2">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparent Cooperative Distribution Ledger */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Job-By-Job Cooperative Split Ledger
            </h2>
            <p className="text-xs text-slate-500">
              Every single rupee accounted for transparently.
            </p>
          </div>
          <span className="text-xs font-bold text-coop-800 bg-coop-50 px-3 py-1 rounded-xl border border-coop-200">
            Open Audited Books
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-2">Job ID & Date</th>
                <th className="py-3 px-2">Customer & Service</th>
                <th className="py-3 px-2 text-right">Gross Total</th>
                <th className="py-3 px-2 text-right text-emerald-800">You Receive (88%)</th>
                <th className="py-3 px-2 text-right text-teal-800">Co-op Ops (7%)</th>
                <th className="py-3 px-2 text-right text-amberGold-800">Welfare (5%)</th>
                <th className="py-3 px-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ledger.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-2">
                    <span className="font-mono font-bold text-slate-800 block">{item.id}</span>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                  </td>
                  <td className="py-3.5 px-2">
                    <span className="font-bold text-slate-800 block">{item.customer}</span>
                    <span className="text-[10px] text-slate-500">{item.service}</span>
                  </td>
                  <td className="py-3.5 px-2 text-right font-bold text-slate-800">
                    ₹{item.gross}
                  </td>
                  <td className="py-3.5 px-2 text-right font-black text-emerald-700 text-sm">
                    ₹{item.workerNet}
                  </td>
                  <td className="py-3.5 px-2 text-right text-teal-700 font-medium">
                    ₹{item.coopCut}
                  </td>
                  <td className="py-3.5 px-2 text-right text-amberGold-700 font-medium">
                    ₹{item.welfareCut}
                  </td>
                  <td className="py-3.5 px-2 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulated Payout Modal */}
      {payoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Instant UPI Settlement</h3>
                <p className="text-xs text-slate-500">Nashik Co-op Instant Treasury Gateway</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Beneficiary:</span>
                <span className="font-bold text-slate-900">Ramesh Patil</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bank UPI ID:</span>
                <span className="font-mono font-bold text-slate-900">ramesh.patil@okhdfcbank</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-slate-200 font-bold">
                <span>Transfer Amount:</span>
                <span className="text-emerald-700">₹3,109.00</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setPayoutModal(false)}
                className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('₹3,109 transferred instantly to Ramesh Patil UPI account via NPCI UPI direct co-op transfer!');
                  setPayoutModal(false);
                }}
                className="flex-1 py-2 text-xs font-bold text-white bg-coop-800 rounded-xl hover:bg-coop-900 transition shadow-md"
              >
                Confirm Payout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
