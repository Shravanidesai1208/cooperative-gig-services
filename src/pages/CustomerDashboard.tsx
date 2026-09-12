import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Mic, 
  ShieldCheck, 
  Star, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  HeartHandshake, 
  Zap, 
  Wrench, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';
import { NASHIK_LOCATIONS } from '../data/mockNashikLocations';
import { VoiceSearchModal } from '../components/common/VoiceSearchModal';
import { RatingStars } from '../components/common/RatingStars';
import { Worker } from '../types';

export const CustomerDashboard: React.FC = () => {
  const { 
    navigateTo, 
    workers, 
    services, 
    setSelectedWorker, 
    setSelectedService, 
    activeBooking,
    language, 
    t 
  } = useWorkNest();

  const [selectedLocality, setSelectedLocality] = useState('Gangapur Road, Nashik');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  const handleBookWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    const serviceMatch = services.find(s => s.category === worker.skillKey) || services[0];
    setSelectedService(serviceMatch);
    navigateTo('booking-flow');
  };

  const handleViewWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    navigateTo('worker-profile');
  };

  const handleVoiceResult = (text: string, detectedCategory?: string) => {
    setSearchQuery(text);
    if (detectedCategory) {
      const match = services.find(s => s.category === detectedCategory);
      if (match) {
        setSelectedService(match);
        navigateTo('booking-flow');
        return;
      }
    }
    navigateTo('discovery');
  };

  // Filter available verified nearby workers
  const nearbyWorkers = workers.filter(w => w.verified).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Header & Locality Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-coop-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{t('customerGreeting')}, Ananya Kulkarni</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Find Trusted Help Near You
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            100% verified Nashik co-op members ready for dispatch.
          </p>
        </div>

        {/* Location Selector */}
        <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <MapPin className="w-4 h-4 text-coop-700 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Your Locality:</span>
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-hidden cursor-pointer"
            >
              {NASHIK_LOCATIONS.map((loc) => (
                <option key={loc.id} value={`${loc.name}, Nashik`}>
                  {loc.name} ({loc.pincode})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Ongoing Booking Banner (if any) */}
      {activeBooking && activeBooking.status !== 'completed' && (
        <div className="bg-gradient-to-r from-emerald-900 to-coop-900 text-white p-5 rounded-2xl shadow-md border border-emerald-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-amberGold-300 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amberGold-400 text-slate-950">
                  Active Booking
                </span>
                <span className="text-xs text-slate-300 font-mono">#{activeBooking.id}</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {activeBooking.subService} • <span className="text-emerald-300 capitalize">{activeBooking.status.replace('_', ' ')}</span>
              </h3>
              <p className="text-xs text-slate-300">
                Assigned Pro: <strong className="text-white">{activeBooking.workerName}</strong> | Secure OTP: <strong className="text-amberGold-300 font-mono text-sm">{activeBooking.otp}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('booking-tracking')}
            className="w-full sm:w-auto px-5 py-2.5 bg-amberGold-500 hover:bg-amberGold-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-1 shrink-0"
          >
            <span>Track Pro Live on Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search Bar with Voice Feature */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200/90 flex items-center space-x-2">
        <div className="pl-3 text-slate-400">
          <Search className="w-5 h-5 text-coop-700" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full text-xs sm:text-sm bg-transparent border-none focus:outline-hidden text-slate-800 placeholder-slate-400 font-medium"
          onKeyDown={(e) => {
            if (e.key === 'Enter') navigateTo('discovery');
          }}
        />
        <button
          onClick={() => setIsVoiceOpen(true)}
          className="p-2.5 rounded-xl bg-coop-50 hover:bg-coop-100 text-coop-800 border border-coop-200 transition flex items-center space-x-1 shrink-0"
          title="Speak your problem in Marathi/Hindi"
        >
          <Mic className="w-4 h-4 text-coop-700 animate-pulse" />
          <span className="text-[11px] font-bold hidden sm:inline">बोलून सांगा</span>
        </button>
        <button
          onClick={() => navigateTo('discovery')}
          className="px-5 py-2.5 bg-coop-800 hover:bg-coop-900 text-white text-xs font-bold rounded-xl shadow-xs transition"
        >
          Search
        </button>
      </div>

      {/* Quick Service Categories Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Select a Service Category
          </h2>
          <button
            onClick={() => navigateTo('discovery')}
            className="text-xs font-bold text-coop-800 hover:text-coop-900 flex items-center space-x-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {services.map((srv) => (
            <button
              key={srv.id}
              onClick={() => {
                setSelectedService(srv);
                navigateTo('booking-flow');
              }}
              className="p-4 rounded-2xl bg-white hover:bg-coop-50/50 border border-slate-200/80 hover:border-coop-400 shadow-xs transition flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-coop-50 group-hover:bg-coop-700 group-hover:text-white text-coop-800 transition flex items-center justify-center mb-2 font-bold">
                {srv.category === 'electrician' && <Zap className="w-6 h-6" />}
                {srv.category === 'plumbing' && <Wrench className="w-6 h-6" />}
                {srv.category === 'cleaning' && <Sparkles className="w-6 h-6" />}
                {srv.category === 'carpentry' && <Award className="w-6 h-6" />}
                {srv.category === 'appliances' && <ShieldCheck className="w-6 h-6" />}
                {srv.category === 'painting' && <Star className="w-6 h-6" />}
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-coop-900">
                {language === 'mr' ? srv.nameMr : language === 'hi' ? srv.nameHi : srv.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">Starts ₹{srv.basePrice}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Nearby Verified Pros Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Nearby Verified Co-op Members
            </h2>
            <p className="text-xs text-slate-500">
              Within 3 km of {selectedLocality} • Police cleared & ITI certified
            </p>
          </div>
          <button
            onClick={() => navigateTo('discovery')}
            className="text-xs font-bold text-coop-800 hover:text-coop-900 flex items-center space-x-1"
          >
            <span>Explore Map</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nearbyWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white" title="Verified Badge">
                      <ShieldCheck className="w-3 h-3" />
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    worker.isAvailable
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {worker.isAvailable ? 'Available Now' : 'Busy'}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-1">
                    <span>{worker.name}</span>
                  </h3>
                  <p className="text-xs text-coop-800 font-medium line-clamp-1">{worker.skill}</p>
                  <p className="text-[11px] text-slate-400 flex items-center mt-0.5">
                    <MapPin className="w-3 h-3 mr-0.5" />
                    <span>{worker.distanceKm} km away • {worker.locality.split(',')[0]}</span>
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <RatingStars rating={worker.rating} size="sm" showCount count={worker.reviewCount} />
                  <span className="font-bold text-slate-900">₹{worker.hourlyRate}/hr</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex space-x-2">
                <button
                  onClick={() => handleViewWorker(worker)}
                  className="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition"
                >
                  Profile
                </button>
                <button
                  onClick={() => handleBookWorker(worker)}
                  className="flex-1 py-1.5 bg-coop-800 hover:bg-coop-900 text-white text-xs font-bold rounded-xl shadow-xs transition"
                >
                  Book Pro
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Welfare Impact Callout */}
      <div className="bg-gradient-to-r from-coop-50 to-teal-50 border border-coop-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-coop-700 text-white flex items-center justify-center shrink-0 shadow-md">
            <HeartHandshake className="w-7 h-7 text-amberGold-300" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-coop-800 uppercase tracking-wider bg-coop-100 px-2 py-0.5 rounded-full">
              Your Community Impact in Nashik
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Your bookings funded 2 worker health checkups this month
            </h3>
            <p className="text-xs text-slate-600">
              5% of every payment directly supports the Nashik Workers Mutual Emergency Fund, providing safety, medical, and educational aid without relying on charity.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigateTo('coop-model')}
          className="px-4 py-2 bg-white text-coop-800 font-bold text-xs rounded-xl border border-coop-300 hover:bg-coop-100/60 shadow-xs transition whitespace-nowrap shrink-0"
        >
          Explore Welfare Pool
        </button>
      </div>

      <VoiceSearchModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onVoiceResult={handleVoiceResult}
      />

    </div>
  );
};
