import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Briefcase, 
  Layers, 
  Globe, 
  MapPin, 
  Menu, 
  X, 
  Clock, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useWorkNest } from '../../context/WorkNestContext';
import { UserRole, Language } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    userRole, 
    language, 
    navigateTo, 
    setUserRole, 
    setLanguage, 
    activeBooking,
    t 
  } = useWorkNest();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    if (newRole === 'customer') navigateTo('customer-dashboard');
    else if (newRole === 'worker') navigateTo('worker-dashboard');
    else if (newRole === 'admin') navigateTo('admin-verification');
  };

  const navLinks = [
    { label: 'Home', view: 'landing', roles: ['customer', 'worker', 'admin'] },
    { label: 'Find Pros', view: 'discovery', roles: ['customer'] },
    { label: 'Co-op Model', view: 'coop-model', roles: ['customer', 'worker', 'admin'] },
    { label: 'My Bookings', view: 'booking-tracking', roles: ['customer'] },
    { label: 'Job Requests', view: 'worker-requests', roles: ['worker'] },
    { label: 'My Availability', view: 'worker-availability', roles: ['worker'] },
    { label: 'My Earnings', view: 'worker-earnings', roles: ['worker'] },
    { label: 'Verification Desk', view: 'admin-verification', roles: ['admin'] },
  ];

  const visibleLinks = navLinks.filter(link => link.roles.includes(userRole));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & COOP-X Badge */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coop-700 to-coop-900 flex items-center justify-center text-white shadow-md shadow-coop-900/20">
              <ShieldCheck className="w-6 h-6 text-coop-300" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">Work<span className="text-coop-700">Nest</span></span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amberGold-100 text-amberGold-700 border border-amberGold-300">
                  COOP-X
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Nashik Workers Cooperative
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {visibleLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigateTo(link.view as any)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  currentView === link.view
                    ? 'bg-coop-50 text-coop-800 font-semibold border border-coop-200/60 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Controls: Role Switcher Pill + Language + Location */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Active booking live pulse (if customer has ongoing booking) */}
            {userRole === 'customer' && activeBooking && activeBooking.status !== 'completed' && (
              <button
                onClick={() => navigateTo('booking-tracking')}
                className="hidden lg:flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amberGold-50 border border-amberGold-300 text-amberGold-800 text-xs font-medium hover:bg-amberGold-100 transition animate-pulse"
              >
                <span className="w-2 h-2 rounded-full bg-amberGold-500 animate-ping"></span>
                <span>Pro {activeBooking.status === 'on_the_way' ? 'On The Way' : 'Active'}</span>
              </button>
            )}

            {/* Role Switcher Pill (Crucial for SIH MVP Demo) */}
            <div className="bg-slate-100 p-0.5 rounded-xl border border-slate-200 flex items-center text-xs font-medium">
              <button
                onClick={() => handleRoleChange('customer')}
                className={`px-2.5 py-1.5 rounded-lg flex items-center space-x-1 transition ${
                  userRole === 'customer'
                    ? 'bg-white text-coop-900 font-bold shadow-xs border border-slate-200/50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View as Customer"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Customer</span>
              </button>

              <button
                onClick={() => handleRoleChange('worker')}
                className={`px-2.5 py-1.5 rounded-lg flex items-center space-x-1 transition ${
                  userRole === 'worker'
                    ? 'bg-coop-700 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View as Ramesh Patil (Worker Pro)"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Worker Pro</span>
              </button>

              <button
                onClick={() => handleRoleChange('admin')}
                className={`px-2.5 py-1.5 rounded-lg flex items-center space-x-1 transition ${
                  userRole === 'admin'
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View as Co-op Council Admin"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Co-op Council</span>
              </button>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <Globe className="w-3.5 h-3.5 text-coop-700" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 text-xs">
                  <button
                    onClick={() => { setLanguage('en'); setIsLangOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-coop-50 flex items-center justify-between ${language === 'en' ? 'font-bold text-coop-800' : 'text-slate-700'}`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="text-coop-700">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('mr'); setIsLangOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-coop-50 flex items-center justify-between ${language === 'mr' ? 'font-bold text-coop-800' : 'text-slate-700'}`}
                  >
                    <span>मराठी (Nashik)</span>
                    {language === 'mr' && <span className="text-coop-700">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setIsLangOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-coop-50 flex items-center justify-between ${language === 'hi' ? 'font-bold text-coop-800' : 'text-slate-700'}`}
                  >
                    <span>हिंदी</span>
                    {language === 'hi' && <span className="text-coop-700">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 space-y-1">
            {visibleLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  navigateTo(link.view as any);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                  currentView === link.view
                    ? 'bg-coop-50 text-coop-800 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
