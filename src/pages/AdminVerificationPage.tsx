import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Users, 
  HeartHandshake, 
  DollarSign, 
  FileText, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';
import { Worker } from '../types';

export const AdminVerificationPage: React.FC = () => {
  const { 
    workers, 
    adminApproveWorker, 
    adminRejectWorker, 
    welfareFund 
  } = useWorkNest();

  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'under_review' | 'verified' | 'rejected'>('all');
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>(
    workers.find(w => w.verificationStatus === 'under_review')?.id || workers[0]?.id
  );
  const [actionSuccess, setActionSuccess] = useState<string>('');

  const filteredWorkers = workers.filter(w => {
    if (filterStatus === 'all') return true;
    return w.verificationStatus === filterStatus;
  });

  const selectedWorker = workers.find(w => w.id === selectedWorkerId) || workers[0];

  const handleApprove = (workerId: string) => {
    adminApproveWorker(workerId);
    setActionSuccess(`Worker ${selectedWorker.name} has been approved and issued Co-op Verified Badge!`);
    setTimeout(() => setActionSuccess(''), 3000);
  };

  const handleReject = (workerId: string) => {
    adminRejectWorker(workerId);
    setActionSuccess(`Worker application for ${selectedWorker.name} has been rejected.`);
    setTimeout(() => setActionSuccess(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-coop-800 bg-coop-100 px-3 py-1 rounded-full">
              Nashik District Co-op Secretariat
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Council Verification & Welfare Treasury
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Review onboarding artisan credentials, inspect police clearance records, and audit welfare fund disbursements.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold self-start md:self-auto">
          <span className="px-3 py-1 text-slate-700">Council Session #48</span>
          <span className="px-3 py-1 bg-white text-emerald-800 rounded-xl shadow-xs border border-slate-200/50">
            ● Quorum Met (7/7 Council Members)
          </span>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-between shadow-md animate-in fade-in">
          <span>{actionSuccess}</span>
          <button onClick={() => setActionSuccess('')} className="text-white/80 hover:text-white">✕</button>
        </div>
      )}

      {/* Co-op Welfare Fund Treasury Overview Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Treasury Balance</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{welfareFund.totalBalance.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block">
            Backed by 5% platform allocations
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Disbursed This Month</span>
            <HeartHandshake className="w-4 h-4 text-coop-700" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{welfareFund.monthlyDisbursed.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-500 font-medium block">
            Medical, hardship & tool aid
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Beneficiaries</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {welfareFund.activeBeneficiaries} Families
          </div>
          <span className="text-[10px] text-slate-500 font-medium block">
            Covered under mutual health pact
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Long-Term Pension Pool</span>
            <ShieldCheck className="w-4 h-4 text-amberGold-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{welfareFund.pensionPoolBalance.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-amberGold-700 font-bold block">
            Member retirement safety pool
          </span>
        </div>
      </div>

      {/* Main Split: Worker Verification Queue + Document Inspector Modal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Verification Queue (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Member Applications ({filteredWorkers.length})
              </h3>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {(['all', 'under_review', 'pending', 'verified'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 rounded-xl font-bold capitalize transition ${
                    filterStatus === st
                      ? 'bg-coop-800 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Applicants List */}
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredWorkers.map((w) => {
                const isSelected = selectedWorkerId === w.id;

                return (
                  <div
                    key={w.id}
                    onClick={() => setSelectedWorkerId(w.id)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-coop-700 bg-coop-50/70 ring-2 ring-coop-200 shadow-xs'
                        : 'border-slate-200 hover:border-coop-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={w.avatar}
                        alt={w.name}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{w.name}</h4>
                        <span className="text-[11px] text-coop-800 font-semibold block">{w.skill}</span>
                        <span className="text-[10px] text-slate-400">{w.locality.split(',')[0]}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        w.verificationStatus === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : w.verificationStatus === 'under_review'
                          ? 'bg-amberGold-100 text-amberGold-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {w.verificationStatus.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        {w.documents.filter(d => d.verified).length}/{w.documents.length} Docs Clear
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Detailed Document Inspection Deck (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
            
            {/* Applicant Profile Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedWorker.avatar}
                  alt={selectedWorker.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 shadow-xs"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-black text-slate-900">{selectedWorker.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                      selectedWorker.verificationStatus === 'verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amberGold-100 text-amberGold-800'
                    }`}>
                      Status: {selectedWorker.verificationStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-coop-800">{selectedWorker.skill}</p>
                  <p className="text-xs text-slate-500">
                    Phone: <strong className="text-slate-800">{selectedWorker.phone}</strong> • {selectedWorker.locality}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Verification ID:</span>
                <span className="text-xs font-mono font-bold text-slate-800">{selectedWorker.verificationBadgeNumber}</span>
              </div>
            </div>

            {/* Document Checklist Inspector */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Submitted Documents & Statutory Checks
              </h4>

              <div className="space-y-3">
                {selectedWorker.documents.map((doc, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                        doc.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amberGold-100 text-amberGold-800'
                      }`}>
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">{doc.name}</h5>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                          <span>Doc #{doc.docNumber}</span>
                          <span>•</span>
                          <span>{doc.verifiedDate || 'Pending review'}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      doc.verified
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amberGold-100 text-amberGold-800 border border-amberGold-200'
                    }`}>
                      {doc.verified ? 'Verified Clear ✓' : 'Awaiting Audit'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Police Verification & Trade Background */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5 text-xs text-emerald-950">
              <strong className="block font-bold">Nashik Police Station Verification Check:</strong>
              <p className="text-[11px] text-emerald-900">
                Applicant residence verified in Nashik jurisdiction. Criminal record cross-check complete with no adverse remarks found in district station log.
              </p>
            </div>

            {/* Council Decision Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => handleReject(selectedWorker.id)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold transition flex items-center justify-center space-x-1"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Application</span>
              </button>

              <div className="flex space-x-2 w-full sm:w-auto">
                <button
                  onClick={() => alert(`Requested re-upload of updated license certificate from ${selectedWorker.name}`)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  Request Re-upload
                </button>
                <button
                  onClick={() => handleApprove(selectedWorker.id)}
                  className="flex-1 sm:flex-initial px-6 py-2.5 bg-coop-800 hover:bg-coop-900 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-amberGold-400" />
                  <span>Approve & Issue Co-op Badge</span>
                </button>
              </div>
            </div>

          </div>

          {/* Recent Welfare Claims Disbursed Ledger */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Recent Welfare Claims Audited & Disbursed
            </h4>

            <div className="space-y-2">
              {welfareFund.recentClaims.map((claim) => (
                <div key={claim.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">{claim.workerName}</span>
                    <span className="text-[11px] text-slate-500">{claim.type} • {claim.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-emerald-700 text-sm block">₹{claim.amount.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] font-bold text-coop-800 bg-coop-100 px-2 py-0.5 rounded-full">
                      {claim.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
