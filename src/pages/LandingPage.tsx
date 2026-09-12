import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Wrench, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  HeartHandshake, 
  MapPin, 
  Star, 
  Mic, 
  Award, 
  ChevronRight 
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';
import { CoOpSplitBadge } from '../components/common/CoOpSplitBadge';
import { VoiceSearchModal } from '../components/common/VoiceSearchModal';

export const LandingPage: React.FC = () => {
  const { 
    navigateTo, 
    services, 
    setSelectedService, 
    setUserRole, 
    t, 
    language 
  } = useWorkNest();

  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCategory = (service: typeof services[0]) => {
    setSelectedService(service);
    navigateTo('booking-flow');
  };

  const handleVoiceResult = (text: string, detectedService?: string) => {
    setSearchQuery(text);
    if (detectedService) {
      const match = services.find(s => s.category === detectedService);
      if (match) {
        setSelectedService(match);
        navigateTo('booking-flow');
        return;
      }
    }
    navigateTo('discovery');
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section with Indian Startup Palette */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:pb-20 bg-gradient-to-b from-coop-50/70 via-white to-surface-light border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            
            {/* Mission Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-coop-100 border border-coop-300/80 text-coop-900 text-xs font-bold tracking-wide shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coop-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-coop-600"></span>
              </span>
              <span>Built by COOP-X • Smart India Hackathon 2026</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none">
              Local help. <span className="text-coop-800 underline decoration-amberGold-400 decoration-wavy decoration-2">Fair work.</span> <br className="hidden sm:inline" />
              Stronger communities.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Connect with verified electricians, plumbers, cleaners & carpenters in <strong className="text-slate-800 font-semibold">Nashik</strong>. Every rupee empowers local worker-owners with an <strong className="text-coop-800 font-bold">88% direct earnings guarantee</strong>.
            </p>

            {/* Voice & Text Search Bar */}
            <div className="pt-2 max-w-2xl mx-auto">
              <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200 flex items-center space-x-2">
                <div className="pl-3 text-slate-400">
                  <MapPin className="w-5 h-5 text-coop-700" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Need repair in Gangapur Rd, College Rd? e.g. Fan fix, Tap leak..."
                  className="w-full text-xs sm:text-sm bg-transparent border-none focus:outline-hidden text-slate-800 placeholder-slate-400 font-medium"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigateTo('discovery');
                  }}
                />
                
                {/* Voice-First Mic Button */}
                <button
                  type="button"
                  onClick={() => setIsVoiceOpen(true)}
                  className="p-2.5 rounded-xl bg-coop-50 hover:bg-coop-100 text-coop-800 border border-coop-200 transition flex items-center space-x-1 shrink-0"
                  title="Speak your problem in Marathi/Hindi"
                >
                  <Mic className="w-4 h-4 text-coop-700 animate-pulse" />
                  <span className="text-[11px] font-bold hidden sm:inline">बोलून सांगा</span>
                </button>

                <button
                  onClick={() => navigateTo('discovery')}
                  className="px-4 sm:px-6 py-2.5 rounded-xl bg-coop-800 hover:bg-coop-900 text-white text-xs sm:text-sm font-bold shadow-md transition shrink-0 flex items-center space-x-1"
                >
                  <span>Find Pro</span>
                  <ArrowRight className="w-4 h-4 hidden sm:inline" />
                </button>
              </div>
              <div className="flex items-center justify-center space-x-3 mt-2 text-[11px] text-slate-500 font-medium">
                <span>Popular in Nashik:</span>
                <button onClick={() => { setSelectedService(services[0]); navigateTo('booking-flow'); }} className="text-coop-800 hover:underline">⚡ Switchboard spark</button>
                <span>•</span>
                <button onClick={() => { setSelectedService(services[1]); navigateTo('booking-flow'); }} className="text-coop-800 hover:underline">🔧 Geyser leakage</button>
                <span>•</span>
                <button onClick={() => { setSelectedService(services[2]); navigateTo('booking-flow'); }} className="text-coop-800 hover:underline">✨ 2BHK Deep Clean</button>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => { setSelectedService(services[0]); navigateTo('booking-flow'); }}
                className="px-5 py-2.5 rounded-xl bg-coop-800 text-white text-xs font-bold shadow-md hover:bg-coop-900 transition flex items-center space-x-2"
              >
                <Zap className="w-4 h-4 text-amberGold-400" />
                <span>Instant Electrician Booking</span>
              </button>
              <button
                onClick={() => { setUserRole('worker'); navigateTo('worker-dashboard'); }}
                className="px-5 py-2.5 rounded-xl bg-white text-slate-700 hover:text-coop-800 border border-slate-300 hover:border-coop-400 text-xs font-bold shadow-xs transition flex items-center space-x-1"
              >
                <span>Join Co-op as Pro (88% Earnings)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Real-time Community Metrics Ticker */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 text-center shadow-xs">
              <div className="text-2xl font-black text-slate-900">2,480+</div>
              <div className="text-xs text-slate-500 font-medium">Nashik Worker-Owners</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 text-center shadow-xs">
              <div className="text-2xl font-black text-coop-700">88.0%</div>
              <div className="text-xs text-slate-500 font-medium">Direct Worker Take-Home</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 text-center shadow-xs">
              <div className="text-2xl font-black text-slate-900">₹1.82 Cr</div>
              <div className="text-xs text-slate-500 font-medium">Equitably Distributed</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 text-center shadow-xs">
              <div className="text-2xl font-black text-amberGold-600">4.92 ★</div>
              <div className="text-xs text-slate-500 font-medium">Verified Customer Rating</div>
            </div>
          </div>

        </div>
      </section>

      {/* Service Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-coop-800 bg-coop-100 px-3 py-1 rounded-full">
              Standardized Co-op Fair Rates
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Essential Household Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fixed rate cards agreed democratically by the Nashik Worker Council. No dynamic surge pricing.
            </p>
          </div>
          <button
            onClick={() => navigateTo('discovery')}
            className="mt-3 md:mt-0 text-xs sm:text-sm font-bold text-coop-800 hover:text-coop-900 flex items-center space-x-1"
          >
            <span>View All 30+ Sub-services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleSelectCategory(service)}
              className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-coop-400 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-coop-50 group-hover:bg-coop-700 group-hover:text-white text-coop-800 transition flex items-center justify-center font-bold">
                    {service.category === 'electrician' && <Zap className="w-6 h-6" />}
                    {service.category === 'plumbing' && <Wrench className="w-6 h-6" />}
                    {service.category === 'cleaning' && <Sparkles className="w-6 h-6" />}
                    {service.category === 'carpentry' && <Award className="w-6 h-6" />}
                    {service.category === 'appliances' && <ShieldCheck className="w-6 h-6" />}
                    {service.category === 'painting' && <Star className="w-6 h-6" />}
                  </div>
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full">
                    Starts ₹{service.basePrice}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-coop-800 transition">
                  {language === 'mr' ? service.nameMr : language === 'hi' ? service.nameHi : service.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                  {service.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Common fixes:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.popularSubServices.slice(0, 3).map((sub, i) => (
                      <span key={i} className="text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200/60">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-coop-800 group-hover:text-coop-900">
                <span>Book Certified Pro</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cooperative Value Split Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-coop-900 via-coop-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          
          <div className="max-w-3xl mb-8 space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amberGold-400/20 text-amberGold-300 text-xs font-bold border border-amberGold-400/40">
              <Sparkles className="w-3.5 h-3.5 text-amberGold-400" />
              <span>The Core Differentiator of WorkNest</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Fair Worker Earnings. Full Transparency.
            </h2>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Traditional gig platforms treat service workers as expendable commodities, taking up to 35% commission. WorkNest flips the model: workers co-own the platform, govern the council, and receive 88% take-home on every service.
            </p>
          </div>

          <CoOpSplitBadge initialAmount={1000} interactive={true} />

        </div>
      </section>

      {/* 4-Step How WorkNest Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-coop-800 bg-coop-100 px-3 py-1 rounded-full">
            Simple & Transparent
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            How WorkNest Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Built for everyday Indian households with multilingual and voice-first convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-coop-700 text-white font-bold flex items-center justify-center mb-3 text-sm">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              Select or Speak
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pick your service or press the mic button to speak in Marathi, Hindi, or English. Upload photos of the fault if needed.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-coop-700 text-white font-bold flex items-center justify-center mb-3 text-sm">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              Fair Smart Matching
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our open algorithm matches based on proximity, verified skills, and equitable job distribution across co-op members.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-coop-700 text-white font-bold flex items-center justify-center mb-3 text-sm">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              Verified Pro & OTP
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track arrival on the Nashik map. Pro arrives with safety credentials. Service starts only after sharing your secure 4-digit OTP.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-coop-700 text-white font-bold flex items-center justify-center mb-3 text-sm">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              Direct Pay & Welfare
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pay via UPI. 88% lands directly in the worker’s bank account immediately, and 5% funds the worker family health pool.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Safety Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-coop-800 bg-coop-100 px-3 py-1 rounded-full">
                Zero Compromise On Trust
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                100% Verified Nashik Professionals
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Before any worker can accept a single job on WorkNest, they undergo thorough multi-stage verification reviewed by our local Co-op Verification Desk.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-coop-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-slate-900 block">Aadhaar KYC & Local Residence Check</strong>
                    <span className="text-xs text-slate-500">Government UIDAI validated identity and verified permanent address in Nashik district.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-coop-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-slate-900 block">Nashik Police Verification Record</strong>
                    <span className="text-xs text-slate-500">Official police character clearance certificate issued by Gangapur, Panchavati or CIDCO police stations.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-coop-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-slate-900 block">Government ITI & Skill India Trade Certificates</strong>
                    <span className="text-xs text-slate-500">Skill qualification validated by ITI instructors before issuing the digital verified badge.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-coop-100 flex items-center justify-center text-coop-800 font-bold">
                  <ShieldCheck className="w-7 h-7 text-coop-700" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">WorkNest Verified Member Badge</h4>
                  <span className="text-[11px] text-coop-700 font-semibold">Credential #NSK-COP-2024-0104</span>
                </div>
              </div>

              <div className="py-4 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Sample Pro:</span>
                  <span className="font-bold text-slate-800">Ramesh Patil (Master Electrician)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">ITI Registration:</span>
                  <span className="font-semibold text-slate-800">ITI-NSK-2013-0941</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Police Clearance:</span>
                  <span className="font-semibold text-emerald-700">Clear (POL-GANGAPUR-2024-88)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Co-op Welfare Status:</span>
                  <span className="font-semibold text-coop-800">Active (Family Insured ₹3L)</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('admin-verification')}
                className="w-full mt-2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1"
              >
                <span>Inspect Council Verification Process</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Modal trigger */}
      <VoiceSearchModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onVoiceResult={handleVoiceResult}
      />

    </div>
  );
};
