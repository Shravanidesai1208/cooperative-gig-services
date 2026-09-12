import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  Star, 
  SlidersHorizontal, 
  Map, 
  List, 
  Clock, 
  Zap, 
  Wrench, 
  Award, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';
import { NashikMapMock } from '../components/common/NashikMapMock';
import { RatingStars } from '../components/common/RatingStars';
import { Worker } from '../types';

export const ServiceDiscoveryPage: React.FC = () => {
  const { 
    workers, 
    services, 
    navigateTo, 
    setSelectedWorker, 
    setSelectedService 
  } = useWorkNest();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [minRating, setMinRating] = useState<number>(4.0);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(true);
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [activeWorkerPin, setActiveWorkerPin] = useState<string | undefined>(workers[0]?.id);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  // Filter logic
  const filteredWorkers = workers.filter((worker) => {
    if (verifiedOnly && !worker.verified) return false;
    if (availableOnly && !worker.isAvailable) return false;
    if (selectedCategory !== 'all' && worker.skillKey !== selectedCategory) return false;
    if (worker.distanceKm > maxDistance) return false;
    if (worker.rating < minRating) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = worker.name.toLowerCase().includes(q);
      const matchSkill = worker.skill.toLowerCase().includes(q);
      const matchLoc = worker.locality.toLowerCase().includes(q);
      if (!matchName && !matchSkill && !matchLoc) return false;
    }
    return true;
  });

  const handleBookWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    const serviceMatch = services.find(s => s.category === worker.skillKey) || services[0];
    setSelectedService(serviceMatch);
    navigateTo('booking-flow');
  };

  const handleViewProfile = (worker: Worker) => {
    setSelectedWorker(worker);
    navigateTo('worker-profile');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Discover Verified Nashik Pros
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Browse verified co-op members across Gangapur Road, College Road, Panchavati & CIDCO.
          </p>
        </div>

        {/* Mobile View Toggle */}
        <div className="lg:hidden flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
          <button
            onClick={() => setMobileView('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition ${
              mobileView === 'list' ? 'bg-white text-coop-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List View</span>
          </button>
          <button
            onClick={() => setMobileView('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition ${
              mobileView === 'map' ? 'bg-white text-coop-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Nashik Map</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, skill, or Nashik locality..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-coop-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Category selector */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-hidden"
            >
              <option value="all">All Service Trades</option>
              <option value="electrician">Electricians</option>
              <option value="plumbing">Plumbing</option>
              <option value="cleaning">Deep Cleaning</option>
              <option value="carpentry">Carpentry</option>
              <option value="appliances">Appliances</option>
              <option value="painting">Painting</option>
            </select>

            {/* Distance Filter */}
            <select
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-hidden"
            >
              <option value={3}>Within 3 km</option>
              <option value={5}>Within 5 km</option>
              <option value={10}>Within 10 km (All Nashik)</option>
              <option value={20}>All Outer Suburbs</option>
            </select>

            {/* Minimum Rating */}
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-hidden"
            >
              <option value={4.0}>Rating: 4.0+ ★</option>
              <option value={4.5}>Rating: 4.5+ ★</option>
              <option value={4.8}>Top Rated: 4.8+ ★</option>
            </select>
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 gap-2">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 rounded text-coop-700 focus:ring-coop-500"
              />
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-coop-700" />
                <span>Verified Co-op Members Only</span>
              </span>
            </label>

            <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 rounded text-coop-700 focus:ring-coop-500"
              />
              <span>Available Right Now</span>
            </label>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredWorkers.length}</strong> matching pros
          </span>
        </div>
      </div>

      {/* Main Split Layout: List Cards + Nashik Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Workers List Column */}
        <div className={`lg:col-span-7 space-y-4 ${mobileView === 'map' ? 'hidden lg:block' : 'block'}`}>
          {filteredWorkers.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <p className="text-sm font-semibold text-slate-600">No workers match your current filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setMaxDistance(10);
                  setMinRating(4.0);
                  setVerifiedOnly(false);
                  setSearchQuery('');
                }}
                className="mt-3 text-xs text-coop-800 font-bold hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredWorkers.map((worker) => {
              const isSelected = activeWorkerPin === worker.id;
              return (
                <div
                  key={worker.id}
                  onClick={() => setActiveWorkerPin(worker.id)}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-coop-600 ring-2 ring-coop-200/80 shadow-md'
                      : 'border-slate-200/90 hover:border-coop-300 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start space-x-3.5">
                      <div className="relative shrink-0">
                        <img
                          src={worker.avatar}
                          alt={worker.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                        />
                        {worker.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white shadow-xs" title="Police & ITI Verified">
                            <ShieldCheck className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-slate-900 text-base">{worker.name}</h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coop-100 text-coop-800 border border-coop-200">
                            Co-op #{worker.verificationBadgeNumber.split('-').pop()}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-coop-800">{worker.skill}</p>
                        
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-0.5 text-slate-400" />
                            {worker.distanceKm} km away • {worker.locality.split(',')[0]}
                          </span>
                          <span>•</span>
                          <span>{worker.experienceYears} yrs exp</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-medium">{worker.jobsCompleted} completed</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 sm:self-center w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                      <div>
                        <div className="text-base font-extrabold text-slate-900">₹{worker.hourlyRate}<span className="text-xs font-normal text-slate-400">/hr</span></div>
                        <div className="text-[10px] text-emerald-700 font-medium">88% directly to pro</div>
                      </div>
                      <div className="mt-1">
                        <RatingStars rating={worker.rating} size="sm" showCount count={worker.reviewCount} />
                      </div>
                    </div>
                  </div>

                  {/* Bio snippet & credentials */}
                  <p className="text-xs text-slate-600 mt-3 pt-2.5 border-t border-slate-100 leading-relaxed line-clamp-2">
                    {worker.bio}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">Languages: {worker.languages.join(', ')}</span>
                      <span className={`px-2 py-0.5 rounded font-bold ${worker.isAvailable ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                        {worker.isAvailable ? '● Ready Now' : '○ Busy'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProfile(worker);
                        }}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
                      >
                        Credentials & Reviews
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookWorker(worker);
                        }}
                        className="px-4 py-1.5 rounded-xl bg-coop-800 hover:bg-coop-900 text-white text-xs font-bold shadow-xs transition flex items-center space-x-1"
                      >
                        <span>Book</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Interactive Map Column */}
        <div className={`lg:col-span-5 ${mobileView === 'list' ? 'hidden lg:block' : 'block'}`}>
          <div className="sticky top-20 space-y-3">
            <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-coop-700" />
                  <span>Nashik Pro Live Locations</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Click any pin to select</span>
              </div>
              <NashikMapMock
                workers={filteredWorkers}
                selectedWorkerId={activeWorkerPin}
                onSelectWorker={(worker) => setActiveWorkerPin(worker.id)}
                heightClass="h-[460px]"
              />
            </div>

            {/* Micro Cooperative Guarantee Pill */}
            <div className="bg-emerald-50 border border-emerald-200/80 p-3 rounded-xl text-xs text-emerald-900 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Cooperative Protection:</strong> Every booking is backed by Nashik Co-op dispute arbitration & warranty coverage.
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
