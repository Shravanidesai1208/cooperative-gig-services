import React from 'react';
import { 
  Home, 
  Search, 
  Clock, 
  PieChart, 
  User, 
  Briefcase, 
  Bell, 
  Calendar, 
  DollarSign, 
  ShieldCheck 
} from 'lucide-react';
import { useWorkNest } from '../../context/WorkNestContext';

export const MobileNav: React.FC = () => {
  const { currentView, userRole, navigateTo, activeBooking } = useWorkNest();

  if (userRole === 'admin') {
    return null; // Admin uses top navigation
  }

  return (
    <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {userRole === 'customer' ? (
          <>
            <button
              onClick={() => navigateTo('customer-dashboard')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition ${
                currentView === 'customer-dashboard' || currentView === 'landing'
                  ? 'text-coop-800 font-bold'
                  : 'text-slate-500'
              }`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span>Explore</span>
            </button>

            <button
              onClick={() => navigateTo('discovery')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition ${
                currentView === 'discovery' ? 'text-coop-800 font-bold' : 'text-slate-500'
              }`}
            >
              <Search className="w-5 h-5 mb-0.5" />
              <span>Find Pros</span>
            </button>

            <button
              onClick={() => navigateTo('booking-tracking')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium relative transition ${
                currentView === 'booking-tracking' ? 'text-coop-800 font-bold' : 'text-slate-500'
              }`}
            >
              {activeBooking && activeBooking.status !== 'completed' && (
                <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-amberGold-500"></span>
              )}
              <Clock className="w-5 h-5 mb-0.5" />
              <span>Tracking</span>
            </button>

            <button
              onClick={() => navigateTo('coop-model')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition ${
                currentView === 'coop-model' ? 'text-coop-800 font-bold' : 'text-slate-500'
              }`}
            >
              <PieChart className="w-5 h-5 mb-0.5" />
              <span>Co-op Split</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigateTo('worker-dashboard')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition ${
                currentView === 'worker-dashboard' ? 'text-coop-800 font-bold' : 'text-slate-500'
              }`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigateTo('worker-requests')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium relative transition ${
                currentView === 'worker-requests' ? 'text-coop-800 font-bold' : 'text-slate-500'
              }`}
            >
              <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <Bell className="w-5 h-5 mb-0.5" />
              <span>Jobs</span>
            </button>

            <button
              onClick={() => navigateTo('worker-availability')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition ${
                currentView === 'worker-availability' ? 'text-coop-800 font-bold' : 'text-slate-500'
              }`}
            >
              <Calendar className="w-5 h-5 mb-0.5" />
              <span>Schedule</span>
            </button>

            <button
              onClick={() => navigateTo('worker-earnings')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition ${
                currentView === 'worker-earnings' ? 'text-coop-800 font-bold' : 'text-slate-500'
              }`}
            >
              <DollarSign className="w-5 h-5 mb-0.5" />
              <span>Earnings</span>
            </button>

            <button
              onClick={() => navigateTo('worker-profile')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition ${
                currentView === 'worker-profile' ? 'text-coop-800 font-bold' : 'text-slate-500'
              }`}
            >
              <User className="w-5 h-5 mb-0.5" />
              <span>Profile</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
