import React from 'react';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  FileCheck, 
  Phone, 
  CheckCircle2, 
  Briefcase, 
  Users, 
  ChevronRight, 
  Calendar 
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';
import { RatingStars } from '../components/common/RatingStars';
import { MOCK_REVIEWS } from '../data/mockReviews';

export const WorkerProfilePage: React.FC = () => {
  const { 
    selectedWorker, 
    workers, 
    navigateTo, 
    setSelectedService, 
    services 
  } = useWorkNest();

  const worker = selectedWorker || workers[0];
  const workerReviews = MOCK_REVIEWS.filter(r => r.workerId === worker.id);

  const handleBookNow = () => {
    const serviceMatch = services.find(s => s.category === worker.skillKey) || services[0];
    setSelectedService(serviceMatch);
    navigateTo('booking-flow');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Worker Hero Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs relative overflow-hidden">
        
        {/* Background co-op watermark */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-coop-50 rounded-full blur-3xl opacity-60 -mr-20 -mt-20 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-slate-200 shadow-md"
              />
              {worker.verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center border-4 border-white shadow-sm" title="Nashik Police & Skill Verified">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">{worker.name}</h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-coop-100 text-coop-800 border border-coop-200">
                  Co-op #{worker.verificationBadgeNumber}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amberGold-100 text-amberGold-800">
                  {worker.coOpEquityShares} Equity Shares
                </span>
              </div>

              <p className="text-sm font-semibold text-coop-800">{worker.skill}</p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {worker.locality}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {worker.workingHours.start} - {worker.workingHours.end}
                </span>
                <span className="flex items-center">
                  <Briefcase className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {worker.experienceYears} Years Experience
                </span>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <RatingStars rating={worker.rating} size="sm" showCount count={worker.reviewCount} />
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-emerald-700 font-bold">{worker.jobsCompleted} jobs completed</span>
              </div>
            </div>
          </div>

          {/* Pricing & Booking CTA */}
          <div className="sm:text-right w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex sm:flex-col justify-between items-center sm:items-end">
            <div>
              <div className="text-2xl font-black text-slate-900">₹{worker.hourlyRate}<span className="text-xs font-normal text-slate-400">/hr</span></div>
              <span className="text-[11px] text-emerald-700 font-bold block">88% direct worker pay</span>
            </div>
            <button
              onClick={handleBookNow}
              className="mt-2 px-6 py-2.5 bg-coop-800 hover:bg-coop-900 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-1"
            >
              <span>Book {worker.name.split(' ')[0]}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
            About the Professional
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {worker.bio}
          </p>
        </div>
      </div>

      {/* Grid: Verified Credentials & Documents + Service Coverage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Verified Credentials */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-coop-700" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Co-op Verified Credentials
            </h2>
          </div>

          <div className="space-y-3">
            {worker.documents.map((doc, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{doc.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{doc.docNumber}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {doc.verified ? 'Verified ✓' : 'In Review'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Co-op Membership & Health Mutual Cover */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-coop-700" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Cooperative Standing
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-coop-50/70 border border-coop-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Member Since:</span>
              <span className="font-bold text-slate-900">{worker.coOpJoinDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Co-op Equity Shares:</span>
              <span className="font-bold text-coop-800">{worker.coOpEquityShares} Shares (₹{worker.coOpEquityShares * 120} Value)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Family Health Mutual Cover:</span>
              <span className="font-bold text-emerald-700">Active (Up to ₹3,00,000)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Service Coverage Radius:</span>
              <span className="font-bold text-slate-800">{worker.serviceRadiusKm} km around {worker.locality.split(',')[0]}</span>
            </div>
          </div>

          <div className="p-3 bg-amberGold-50 border border-amberGold-200 rounded-xl text-xs text-amberGold-900">
            <strong>Democratic Voice:</strong> As a full co-op member, {worker.name} has equal voting power on pricing policies, platform features, and welfare spending.
          </div>
        </div>

      </div>

      {/* Customer Reviews Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Customer Feedback & Reviews
            </h2>
            <p className="text-xs text-slate-500">
              Real reviews from verified Nashik households.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-slate-900">{worker.rating} ★</div>
            <span className="text-[10px] text-slate-400">Based on {worker.reviewCount} jobs</span>
          </div>
        </div>

        <div className="space-y-4">
          {workerReviews.map((rev) => (
            <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xs text-slate-900">{rev.customerName}</span>
                  <span className="text-[10px] text-slate-400">({rev.customerLocality})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RatingStars rating={rev.rating} size="sm" />
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                "{rev.comment}"
              </p>

              <div className="flex flex-wrap gap-1 pt-1">
                {rev.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
