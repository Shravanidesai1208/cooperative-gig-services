import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Heart, 
  Sparkles, 
  ThumbsUp, 
  MessageSquare, 
  Award,
  ChevronRight
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';
import { RatingStars } from '../components/common/RatingStars';

export const RatingsReviewsPage: React.FC = () => {
  const { 
    activeBooking, 
    workers, 
    reviews, 
    submitReview, 
    navigateTo, 
    userRole 
  } = useWorkNest();

  const [rating, setRating] = useState<number>(5);
  const [professionalism, setProfessionalism] = useState<number>(5);
  const [quality, setQuality] = useState<number>(5);
  const [timeliness, setTimeliness] = useState<number>(5);
  const [communication, setCommunication] = useState<number>(5);
  const [comment, setComment] = useState<string>(
    'Ramesh Patil arrived exactly on time in Gangapur Road. Diagnosed the burning switchboard in 5 minutes and replaced it with genuine Havells parts. Very respectful and clean work!'
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Punctual',
    'Expert Diagnostics',
    'Clean Work',
    'Transparent Price'
  ]);
  const [tipAmount, setTipAmount] = useState<number>(50);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const booking = activeBooking;
  const worker = workers.find(w => w.id === booking?.workerId) || workers[0];

  const availableTags = [
    'Punctual',
    'Expert Diagnostics',
    'Clean Work',
    'Transparent Price',
    'Polite & Respectful',
    'Brought Genuine Parts',
    'Co-op Hero'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview({
      workerId: worker.id,
      customerName: booking?.customerName || 'Ananya Kulkarni',
      customerLocality: booking?.locality || 'Gangapur Road, Nashik',
      rating,
      comment,
      service: `${booking?.serviceCategory || 'Electrician'} - ${booking?.subService || 'MCB Tripping'}`,
      tags: selectedTags,
      categories: {
        professionalism,
        quality,
        timeliness,
        communication
      }
    });
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-coop-100 text-coop-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-coop-700" />
          <span>Community Quality & Accountability</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Service Feedback & Ratings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Your feedback strengthens our cooperative federation and directly determines worker patronage bonus distribution.
        </p>
      </div>

      {isSubmitted ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md text-center space-y-4 max-w-xl mx-auto animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Thank You, Ananya!
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your 5-star review has been published to <strong className="text-slate-900">{worker.name}</strong>'s public profile and logged in the Nashik Co-op registry. ₹{tipAmount} tip has been transferred directly to his UPI.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={() => navigateTo('customer-dashboard')}
              className="w-full sm:w-auto px-5 py-2.5 bg-coop-800 hover:bg-coop-900 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => navigateTo('worker-profile')}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
            >
              View Updated Worker Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          
          {/* Worker summary header */}
          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <img
              src={worker.avatar}
              alt={worker.name}
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-bold text-slate-900 text-base">{worker.name}</h3>
                <ShieldCheck className="w-4 h-4 text-coop-700" />
              </div>
              <p className="text-xs text-coop-800 font-medium">{worker.skill}</p>
              <p className="text-[11px] text-slate-500">Service: {booking?.subService || 'Switchboard Diagnosis'}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Overall Star Rating */}
            <div className="text-center space-y-2 py-3 border-y border-slate-100">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Overall Experience Rating
              </label>
              <div className="flex justify-center">
                <RatingStars
                  rating={rating}
                  size="lg"
                  interactive={true}
                  onChange={(newVal) => setRating(newVal)}
                />
              </div>
              <span className="text-xs font-bold text-amberGold-600 block">
                {rating === 5 && 'Excellent • Cooperative Model Hero!'}
                {rating === 4 && 'Very Good • Highly Recommended'}
                {rating <= 3 && 'Needs Improvement'}
              </span>
            </div>

            {/* Categorical Breakdown */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Category Ratings:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="font-medium text-slate-700">Punctuality & Timing:</span>
                  <RatingStars rating={timeliness} size="sm" interactive onChange={setTimeliness} />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="font-medium text-slate-700">Technical Skill Quality:</span>
                  <RatingStars rating={quality} size="sm" interactive onChange={setQuality} />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="font-medium text-slate-700">Cleanliness & Safety:</span>
                  <RatingStars rating={professionalism} size="sm" interactive onChange={setProfessionalism} />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <span className="font-medium text-slate-700">Politeness & Honesty:</span>
                  <RatingStars rating={communication} size="sm" interactive onChange={setCommunication} />
                </div>
              </div>
            </div>

            {/* Quick Recognition Tags */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                What did {worker.name.split(' ')[0]} do best?
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                        active
                          ? 'bg-coop-800 text-white font-bold shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {active ? '✓ ' : '+ '} {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Review Comment */}
            <div>
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-1">
                Detailed Feedback (Public Review):
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-hidden font-medium"
              />
            </div>

            {/* Voluntary Worker Tip */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-950 block">
                  Add a 100% Direct Worker Tip:
                </span>
                <span className="text-[11px] text-emerald-800">
                  0% platform deduction. Transferred straight to {worker.name}.
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {[0, 50, 100, 200].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTipAmount(amt)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      tipAmount === amt
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                    }`}
                  >
                    {amt === 0 ? 'No tip' : `+₹${amt}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-coop-800 hover:bg-coop-900 text-white font-black text-xs rounded-xl shadow-md transition"
              >
                Submit Review & Close Service
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
