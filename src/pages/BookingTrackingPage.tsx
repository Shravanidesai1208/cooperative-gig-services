import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Navigation, 
  AlertCircle, 
  KeyRound, 
  Star, 
  Sparkles, 
  X, 
  Send 
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';
import { NashikMapMock } from '../components/common/NashikMapMock';
import { CoOpSplitBadge } from '../components/common/CoOpSplitBadge';
import { BookingStatus } from '../types';

export const BookingTrackingPage: React.FC = () => {
  const { 
    activeBooking, 
    advanceBookingStatus, 
    verifyBookingOTP, 
    navigateTo, 
    workers, 
    t 
  } = useWorkNest();

  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'worker', text: 'Namaste Ananya ji! I have taken the tools and spare Havells 16A MCB. Leaving Canada Corner now.', time: '10:14 AM' },
    { sender: 'customer', text: 'Thank you Ramesh ji. Flat 402, lift is working.', time: '10:16 AM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const booking = activeBooking;
  const worker = workers.find(w => w.id === booking?.workerId) || workers[0];

  if (!booking) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">No active bookings found</h2>
        <p className="text-xs text-slate-500 mt-1">Book a certified Nashik pro to start live tracking.</p>
        <button
          onClick={() => navigateTo('customer-dashboard')}
          className="mt-4 px-4 py-2 bg-coop-800 text-white rounded-xl text-xs font-bold"
        >
          Explore Services
        </button>
      </div>
    );
  }

  const stages: { key: BookingStatus; label: string; time: string }[] = [
    { key: 'confirmed', label: 'Order Confirmed', time: '10:10 AM' },
    { key: 'accepted', label: 'Pro Accepted', time: '10:12 AM' },
    { key: 'on_the_way', label: 'On The Way (Canada Corner)', time: '10:15 AM' },
    { key: 'in_progress', label: 'Work In Progress', time: '10:28 AM' },
    { key: 'completed', label: 'Service Completed', time: '11:15 AM' },
  ];

  const getStageIndex = (status: BookingStatus) => {
    return stages.findIndex(s => s.key === status);
  };

  const currentIndex = getStageIndex(booking.status);

  const handleVerifyOtp = () => {
    if (!enteredOtp) return;
    const ok = verifyBookingOTP(booking.id, enteredOtp);
    if (ok) {
      setOtpSuccess(true);
      setOtpError('');
    } else {
      setOtpError('Invalid OTP. Use the 4-digit code shown above (e.g. 7429).');
    }
  };

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { sender: 'customer', text: inputMsg, time: 'Just now' }
    ]);
    setInputMsg('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Page Title & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              #{booking.id}
            </span>
            <span className="text-xs font-bold text-coop-800">
              {booking.serviceCategory.toUpperCase()} • {booking.subService}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Live Service Tracking
          </h1>
        </div>

        {/* Demo Advance Control Button */}
        <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <span className="text-[10px] text-slate-500 font-semibold hidden md:inline">Demo Step:</span>
          {booking.status !== 'completed' ? (
            <button
              onClick={() => advanceBookingStatus(booking.id)}
              className="px-3.5 py-1.5 bg-coop-800 hover:bg-coop-900 text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center space-x-1"
            >
              <span>Advance Status (Next Step)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => navigateTo('ratings-reviews')}
              className="px-3.5 py-1.5 bg-amberGold-500 hover:bg-amberGold-600 text-slate-950 text-xs font-bold rounded-lg shadow-xs transition flex items-center space-x-1"
            >
              <Star className="w-3.5 h-3.5 fill-slate-950" />
              <span>Leave Rating & Review</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div className="relative flex flex-col md:flex-row justify-between gap-4 md:gap-0">
          {stages.map((stage, i) => {
            const isDone = i <= currentIndex;
            const isCurrent = i === currentIndex;

            return (
              <div key={stage.key} className="flex md:flex-col items-center space-x-3 md:space-x-0 relative z-10 flex-1 text-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition ${
                  isDone 
                    ? 'bg-coop-700 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                } ${isCurrent ? 'ring-4 ring-coop-200 animate-pulse' : ''}`}>
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <div className="text-left md:text-center mt-0 md:mt-2">
                  <div className={`text-xs font-bold ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                    {stage.label}
                  </div>
                  <div className="text-[10px] text-slate-400">{stage.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Live Route Map + Assigned Pro Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Live Route Map (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-slate-800">
                  Worker GPS Route (Nashik Transit)
                </span>
              </div>
              <span className="text-xs font-bold text-coop-800 bg-coop-50 px-2.5 py-1 rounded-full border border-coop-200">
                ETA: ~7 mins away
              </span>
            </div>

            <NashikMapMock
              workers={[worker]}
              selectedWorkerId={worker.id}
              showRoute={true}
              userLocationName="Gangapur Road, Nashik"
              heightClass="h-[340px]"
            />
          </div>

          {/* Secure 4-Digit Arrival OTP Banner */}
          <div className="bg-gradient-to-r from-amberGold-500 to-amberGold-600 text-slate-950 p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-slate-950 text-amberGold-400 flex items-center justify-center shrink-0 shadow-xs">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-900 block">
                  Secure Doorstep Start OTP
                </span>
                <p className="text-xs font-medium text-slate-900">
                  Share this OTP with {worker.name} when he arrives at your door.
                </p>
              </div>
            </div>

            {/* OTP Code Display */}
            <div className="bg-slate-950 text-white px-5 py-2.5 rounded-xl border border-slate-800 text-center shrink-0">
              <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Your OTP</div>
              <div className="text-2xl font-mono font-black text-amberGold-400 tracking-wider">
                {booking.otp}
              </div>
            </div>
          </div>

          {/* Verification input simulation (to demonstrate pro arrival) */}
          {booking.status === 'on_the_way' && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">
                Simulate Worker Pro Arrival (Enter OTP to start job):
              </span>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  maxLength={4}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder={`Enter ${booking.otp}`}
                  className="w-32 p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-center font-bold focus:outline-hidden"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 bg-coop-800 hover:bg-coop-900 text-white text-xs font-bold rounded-xl shadow-xs transition"
                >
                  Verify OTP & Start Job
                </button>
              </div>
              {otpError && <p className="text-[11px] text-red-600 font-medium">{otpError}</p>}
              {otpSuccess && <p className="text-[11px] text-emerald-700 font-bold">✓ OTP Verified! Ramesh has begun electrical inspection.</p>}
            </div>
          )}
        </div>

        {/* Assigned Worker Info & In-App Contact (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Worker Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-start space-x-3.5">
              <div className="relative">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-bold text-slate-900 text-base">{worker.name}</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-coop-100 text-coop-800">
                    Co-op Pro
                  </span>
                </div>
                <p className="text-xs text-coop-800 font-medium">{worker.skill}</p>
                <p className="text-[11px] text-slate-500">
                  Nashik Badge: <strong className="text-slate-700 font-mono">{worker.verificationBadgeNumber}</strong>
                </p>
                <div className="flex items-center space-x-1 text-xs text-amberGold-600 font-bold pt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amberGold-400 text-amberGold-500" />
                  <span>{worker.rating} (384 reviews)</span>
                </div>
              </div>
            </div>

            {/* Vehicle & Security */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle:</span>
                <span className="font-bold text-slate-800">MH-15-AB-4021 (Hero Splendor)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Police Clearance:</span>
                <span className="font-semibold text-emerald-700">Verified Clear</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Spoken Languages:</span>
                <span className="font-medium text-slate-800">Marathi, Hindi, English</span>
              </div>
            </div>

            {/* Action Buttons: Simulated Call / Chat */}
            <div className="flex space-x-2 pt-1">
              <button
                onClick={() => alert(`Calling ${worker.name} at ${worker.phone} (Simulated Direct Dial)`)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1"
              >
                <Phone className="w-3.5 h-3.5 text-coop-700" />
                <span>Call Pro</span>
              </button>

              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="flex-1 py-2 bg-coop-800 hover:bg-coop-900 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center space-x-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>In-App Chat</span>
              </button>
            </div>

            {/* In-App Simulated Chat Window */}
            {isChatOpen && (
              <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50 space-y-2 mt-3 animate-in fade-in">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200 text-xs font-bold text-slate-700">
                  <span>Direct Chat with Ramesh Patil</span>
                  <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="h-36 overflow-y-auto space-y-2 p-1 text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-xl max-w-[85%] ${
                        msg.sender === 'customer'
                          ? 'ml-auto bg-coop-700 text-white rounded-br-none'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-2xs'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className={`text-[9px] block mt-0.5 text-right ${msg.sender === 'customer' ? 'text-coop-200' : 'text-slate-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quick replies */}
                <div className="flex gap-1 overflow-x-auto py-1">
                  {['I am at home', 'Please ring bell #402', 'Please bring 16A switch'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setChatMessages(prev => [...prev, { sender: 'customer', text: preset, time: 'Just now' }]);
                      }}
                      className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[10px] text-slate-600 whitespace-nowrap hover:bg-coop-50"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div className="flex space-x-1 pt-1">
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    placeholder="Type message in Marathi/English..."
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-xl focus:outline-hidden"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-coop-800 text-white rounded-xl hover:bg-coop-900"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cooperative Bill Split Breakdown */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Payment & Fair Split Receipt
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Gross Service Total:</span>
                <span className="font-bold text-slate-900">₹{booking.totalAmount}</span>
              </div>
              <div className="flex justify-between text-emerald-800">
                <span>Direct Worker Pay (88%):</span>
                <span className="font-bold">₹{booking.workerCut}</span>
              </div>
              <div className="flex justify-between text-teal-800">
                <span>Co-op Operations & Servers (7%):</span>
                <span>₹{booking.coopCut}</span>
              </div>
              <div className="flex justify-between text-amberGold-800">
                <span>Community Emergency Welfare Pool (5%):</span>
                <span>₹{booking.communityCut}</span>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Payment Mode: Direct UPI</span>
              <span className="text-emerald-700 font-bold">100% Transparent</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
