import React, { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Mic, 
  Camera, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Zap, 
  AlertCircle, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';
import { NASHIK_LOCATIONS } from '../data/mockNashikLocations';
import { VoiceSearchModal } from '../components/common/VoiceSearchModal';
import { CoOpSplitBadge } from '../components/common/CoOpSplitBadge';

export const BookingFlowPage: React.FC = () => {
  const { 
    services, 
    selectedService, 
    setSelectedService, 
    workers, 
    selectedWorker, 
    navigateTo,
    createBooking,
    t,
    language 
  } = useWorkNest();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSubService, setSelectedSubService] = useState<string>(
    selectedService?.popularSubServices[0] || 'Switchboard & Socket Fix'
  );
  const [problemDescription, setProblemDescription] = useState<string>(
    'Main MCB in hallway trips every time the geyser is switched on. Burning smell near distribution box.'
  );
  const [hasUploadedPhoto, setHasUploadedPhoto] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>('Today, 10 Sep');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('Immediate (Within 30 mins)');
  const [selectedLocality, setSelectedLocality] = useState<string>('Gangapur Road, Nashik');
  const [flatAddress, setFlatAddress] = useState<string>('Flat 402, Shanti Heights, Near Someshwar Mandir');
  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);

  // Default active service
  const activeService = selectedService || services[0];
  const estimatedTotal = 650;

  const handleVoiceInput = (text: string) => {
    setProblemDescription(text);
  };

  const handleFinishBooking = () => {
    // Create booking in state
    createBooking({
      serviceCategory: activeService.category,
      subService: selectedSubService,
      problemDescription,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      customerAddress: flatAddress,
      locality: selectedLocality,
      workerId: selectedWorker ? selectedWorker.id : 'worker-ramesh-patil',
      amount: estimatedTotal
    });

    // Navigate to Smart Matching screen
    navigateTo('smart-matching');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Wizard Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-coop-800 uppercase tracking-wider">
            Step {currentStep} of 5
          </span>
          <span className="text-xs font-medium text-slate-500">
            {currentStep === 1 && 'Select Service'}
            {currentStep === 2 && 'Describe Fault & Voice'}
            {currentStep === 3 && 'Pick Schedule'}
            {currentStep === 4 && 'Confirm Location'}
            {currentStep === 5 && 'Co-op Split & Review'}
          </span>
        </div>

        <div className="h-2 rounded-full bg-slate-200 overflow-hidden flex">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`flex-1 transition-all duration-300 ${
                step <= currentStep ? 'bg-coop-700' : 'bg-transparent'
              } ${step < currentStep ? 'border-r-2 border-white' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Wizard Card Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        
        {/* STEP 1: Select Service & Sub-service */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                1. What service do you need today?
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Standardized diagnostic fees approved by the Nashik Worker Cooperative Council.
              </p>
            </div>

            {/* Main Service Category Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {services.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => {
                    setSelectedService(srv);
                    setSelectedSubService(srv.popularSubServices[0]);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition flex items-center space-x-3 ${
                    activeService.id === srv.id
                      ? 'border-coop-700 bg-coop-50/70 ring-2 ring-coop-200'
                      : 'border-slate-200 hover:border-coop-300'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                    activeService.id === srv.id ? 'bg-coop-700 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {srv.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-500">Starts ₹{srv.basePrice}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Sub-services list */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">
                Select Specific Problem / Sub-task:
              </label>
              <div className="space-y-2">
                {activeService.popularSubServices.map((sub, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSubService(sub)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition flex items-center justify-between ${
                      selectedSubService === sub
                        ? 'border-coop-700 bg-coop-50/60 text-coop-900 shadow-xs'
                        : 'border-slate-200 hover:border-coop-300 text-slate-700'
                    }`}
                  >
                    <span>{sub}</span>
                    {selectedSubService === sub && (
                      <Check className="w-4 h-4 text-coop-700 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Describe Problem & Voice Input */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                2. Describe the Fault (Voice or Text)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Helps your verified Nashik pro arrive prepared with the exact replacement spare parts.
              </p>
            </div>

            {/* Voice Input Prompt Pill */}
            <div className="bg-gradient-to-r from-coop-50 via-amberGold-50 to-coop-50 p-4 rounded-2xl border border-coop-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-coop-700 text-white flex items-center justify-center shrink-0">
                  <Mic className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">
                    Voice-First Multilingual Input
                  </strong>
                  <span className="text-xs text-slate-600">
                    बोलकर या लिहून सांगा — Marathi, Hindi, or English.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsVoiceOpen(true)}
                className="w-full sm:w-auto px-4 py-2 bg-coop-700 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center space-x-1 shrink-0"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Tap to Speak Fault</span>
              </button>
            </div>

            {/* Text description area */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Detailed Problem Notes:
              </label>
              <textarea
                rows={4}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Example: My kitchen tap is leaking water continuously and the pipe joint is rusted..."
                className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-hidden focus:border-coop-500 text-slate-800 font-medium"
              />
            </div>

            {/* Photo upload mock */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Attach Photo / Video of Issue (Optional):
              </label>
              <div className="flex items-center space-x-3">
                <div
                  onClick={() => setHasUploadedPhoto(!hasUploadedPhoto)}
                  className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition ${
                    hasUploadedPhoto
                      ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800'
                      : 'border-slate-300 hover:border-coop-400 bg-slate-50 text-slate-500'
                  }`}
                >
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-xs font-bold">
                    {hasUploadedPhoto ? 'Photo Attached (switchboard_spark.jpg)' : 'Upload Photo'}
                  </span>
                  <span className="text-[10px] text-slate-400">Tap to toggle mock image</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Date & Slot Selection */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                3. When should the pro arrive?
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose immediate dispatch or a convenient scheduled time slot in Nashik.
              </p>
            </div>

            {/* Date options */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">
                Select Date:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Today, 10 Sep', 'Tomorrow, 11 Sep', 'Fri, 12 Sep'].map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3.5 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center ${
                      selectedDate === date
                        ? 'border-coop-700 bg-coop-50 text-coop-900 ring-2 ring-coop-200'
                        : 'border-slate-200 hover:border-coop-300 text-slate-700'
                    }`}
                  >
                    <Calendar className="w-4 h-4 mb-1 text-coop-700" />
                    <span>{date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot options */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">
                Select Arrival Window:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { slot: 'Immediate (Within 30 mins)', tag: 'Urgent Pro Dispatch' },
                  { slot: 'Morning (09:00 AM - 12:00 PM)', tag: 'Early Slot' },
                  { slot: 'Afternoon (12:00 PM - 04:00 PM)', tag: 'Standard' },
                  { slot: 'Evening (04:00 PM - 07:30 PM)', tag: 'After Office' }
                ].map((item) => (
                  <button
                    key={item.slot}
                    onClick={() => setSelectedTimeSlot(item.slot)}
                    className={`p-3.5 rounded-2xl border text-xs text-left transition flex items-center justify-between ${
                      selectedTimeSlot === item.slot
                        ? 'border-coop-700 bg-coop-50 text-coop-900 ring-2 ring-coop-200 font-bold'
                        : 'border-slate-200 hover:border-coop-300 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-coop-700 shrink-0" />
                      <span>{item.slot}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                      {item.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Confirm Location */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                4. Confirm Service Address in Nashik
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Ensures the matched pro from the nearest cooperative cluster reaches on time.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Nashik Ward / Neighborhood:
                </label>
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden"
                >
                  {NASHIK_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={`${loc.name}, Nashik`}>
                      {loc.name} — Pincode: {loc.pincode}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Building / Flat No. & Landmark:
                </label>
                <input
                  type="text"
                  value={flatAddress}
                  onChange={(e) => setFlatAddress(e.target.value)}
                  placeholder="e.g. Flat 302, Sai Angan, Near Someshwar Mandir"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-hidden focus:border-coop-500"
                />
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>Cluster Located:</strong> Gangapur Road Cooperative Unit #1 has 4 certified electricians within 2.5 km.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Co-op Value Split & Confirmation Review */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-coop-100 text-coop-800 text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-coop-700" />
                <span>Final Review & Transparent Ledger</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                5. Transparent Cooperative Breakdown
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Every transaction on WorkNest empowers workers and strengthens Nashik's local economy.
              </p>
            </div>

            {/* Order Summary Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-800">{activeService.name} ({selectedSubService})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled:</span>
                <span className="font-semibold text-slate-800">{selectedDate} • {selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="font-semibold text-slate-800 truncate max-w-xs">{flatAddress}, {selectedLocality}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                <span>Estimated Customer Bill:</span>
                <span>₹{estimatedTotal}</span>
              </div>
            </div>

            {/* Visual 88 / 7 / 5 Split Card */}
            <CoOpSplitBadge initialAmount={estimatedTotal} interactive={false} compact={true} />

            <div className="p-3 bg-amberGold-50 border border-amberGold-200 rounded-xl text-xs text-amberGold-900 flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-amberGold-700 shrink-0 mt-0.5" />
              <span>
                <strong>Next Step:</strong> Smart Matching will rank verified pros based on skill, proximity, and equitable cooperative job distribution.
              </span>
            </div>
          </div>
        )}

        {/* Navigation Buttons Row */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={() => navigateTo('customer-dashboard')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          )}

          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2.5 rounded-xl bg-coop-800 hover:bg-coop-900 text-white text-xs font-bold shadow-md transition flex items-center space-x-1"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishBooking}
              className="px-6 py-2.5 rounded-xl bg-coop-800 hover:bg-coop-900 text-white text-xs font-bold shadow-md transition flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-amberGold-400" />
              <span>Proceed to AI Smart Match</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      <VoiceSearchModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onVoiceResult={handleVoiceInput}
      />

    </div>
  );
};
