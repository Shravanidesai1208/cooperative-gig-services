import React from 'react';
import { ShieldCheck, Heart, Users, Award, MapPin, Phone, ExternalLink } from 'lucide-react';
import { useWorkNest } from '../../context/WorkNestContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useWorkNest();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-coop-700 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5 text-coop-300" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Work<span className="text-coop-400">Nest</span></span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amberGold-400/20 text-amberGold-300 border border-amberGold-500/30">
                COOP-X
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's first democratic, worker-owned digital service cooperative. Connecting Nashik households with verified professionals while ensuring 88% direct earnings.
            </p>
            <div className="flex items-center space-x-2 text-xs text-coop-300 font-medium">
              <Users className="w-4 h-4 text-coop-400" />
              <span>2,480+ Nashik Worker-Owners</span>
            </div>
          </div>

          {/* Transparent Model */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">The Cooperative Edge</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coop-400"></span>
                <span>88% Direct Worker Take-Home</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coop-400"></span>
                <span>5% Community Health & Pension Pool</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coop-400"></span>
                <span>Democratic 1 Worker = 1 Vote System</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coop-400"></span>
                <span>Zero Exploitative Commission Algorithms</span>
              </li>
            </ul>
          </div>

          {/* Quick Hubs in Nashik */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Nashik Service Clusters</h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-400">
              <span>• Gangapur Road</span>
              <span>• College Road</span>
              <span>• Mahatma Nagar</span>
              <span>• Panchavati</span>
              <span>• Indira Nagar</span>
              <span>• Govind Nagar</span>
              <span>• CIDCO Nashik</span>
              <span>• Satpur Industrial</span>
            </div>
          </div>

          {/* Hackathon Credentials & Helpline */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">SIH 2026 Prototype</h4>
            <p className="text-xs text-slate-400">
              Built for <strong className="text-slate-200">Smart India Hackathon 2026</strong> under the Cooperative Economy & Social Impact track.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs space-y-1">
              <div className="flex items-center space-x-2 text-amberGold-300 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Nashik Co-op Central Secretariat</span>
              </div>
              <p className="text-[11px] text-slate-400">Sharanpur Rd, Canada Corner, Nashik 422002</p>
              <p className="text-[11px] text-coop-400">Co-op Helpline: 1800-2026-COOPX</p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 WorkNest Cooperative Federation Ltd. (Reg. No: MH/NSK/COOP/2026/89). All worker rights reserved.</p>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigateTo('coop-model')} className="hover:text-coop-400 transition">
              Cooperative Charter
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('admin-verification')} className="hover:text-coop-400 transition">
              Verification Standards
            </button>
            <span>•</span>
            <span className="text-slate-400 flex items-center">
              Crafted with <Heart className="w-3.5 h-3.5 mx-1 text-red-500 fill-red-500" /> by Team COOP-X
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
