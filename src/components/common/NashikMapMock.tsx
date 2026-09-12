import React, { useState } from 'react';
import { MapPin, Navigation, ShieldCheck, Star, Zap, Phone } from 'lucide-react';
import { NASHIK_LOCATIONS } from '../../data/mockNashikLocations';
import { Worker } from '../../types';

interface NashikMapMockProps {
  workers?: Worker[];
  selectedWorkerId?: string;
  onSelectWorker?: (worker: Worker) => void;
  showRoute?: boolean;
  userLocationName?: string;
  heightClass?: string;
}

export const NashikMapMock: React.FC<NashikMapMockProps> = ({
  workers = [],
  selectedWorkerId,
  onSelectWorker,
  showRoute = false,
  userLocationName = 'Gangapur Road, Nashik',
  heightClass = 'h-[380px] sm:h-[450px]'
}) => {
  const [hoveredWorker, setHoveredWorker] = useState<Worker | null>(null);

  // Approximate relative coordinates for workers on SVG canvas (0-100 scale)
  const workerCoords: Record<string, { x: number; y: number }> = {
    'worker-ramesh-patil': { x: 34, y: 38 },
    'worker-sunita-jadhav': { x: 37, y: 52 },
    'worker-sachin-shinde': { x: 60, y: 33 },
    'worker-prakash-gaikwad': { x: 53, y: 67 },
    'worker-vikram-deshmukh': { x: 44, y: 45 },
    'worker-dilip-sonawane': { x: 39, y: 64 },
    'worker-kavita-more': { x: 49, y: 57 },
    'worker-vijay-kale': { x: 26, y: 50 },
  };

  // Customer destination point (Gangapur Road)
  const customerLoc = { x: 32, y: 34 };
  // Worker starting point (Canada Corner / Sharanpur)
  const workerStartLoc = { x: 48, y: 46 };

  return (
    <div className={`relative w-full ${heightClass} bg-[#eaf1e8] rounded-2xl overflow-hidden border border-slate-200 shadow-inner select-none`}>
      {/* Background SVG Canvas */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          {/* River gradient */}
          <linearGradient id="godavariGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe" />
            <stop offset="50%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>

          {/* Route path gradient */}
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Nashik Greens & Suburb zones */}
        <rect x="0" y="0" width="100" height="100" fill="#f4f7f2" />
        <path d="M 5 15 Q 25 10 35 30 T 15 60 Z" fill="#e2ede0" opacity="0.6" />
        <path d="M 50 10 Q 75 5 85 25 T 70 50 Z" fill="#e2ede0" opacity="0.6" />
        <path d="M 20 65 Q 40 70 50 90 T 20 95 Z" fill="#e2ede0" opacity="0.5" />

        {/* Godavari River Flow through Nashik */}
        <path
          d="M 5 28 Q 22 34 35 33 T 55 35 T 70 32 T 95 40"
          fill="none"
          stroke="url(#godavariGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Secondary River branch / Goda Ghat */}
        <path
          d="M 55 35 Q 60 45 68 55 T 85 62"
          fill="none"
          stroke="url(#godavariGrad)"
          strokeWidth="1.8"
          strokeDasharray="1,1"
          opacity="0.7"
        />

        {/* Major Arterial Roads of Nashik */}
        {/* Gangapur Road */}
        <path d="M 10 32 L 50 46" stroke="#cbd5e1" strokeWidth="1.6" />
        {/* College Road */}
        <path d="M 28 50 L 52 46" stroke="#cbd5e1" strokeWidth="1.4" />
        {/* Trimbak Road */}
        <path d="M 12 70 L 48 55" stroke="#cbd5e1" strokeWidth="1.5" />
        {/* Mumbai-Agra NH3 Expressway */}
        <path d="M 75 5 L 65 50 L 45 95" stroke="#e2e8f0" strokeWidth="2.4" strokeDasharray="3,2" />
        {/* Old Agra Road */}
        <path d="M 35 80 L 50 46 L 70 30" stroke="#cbd5e1" strokeWidth="1.6" />

        {/* Service Radius Circle if worker selected */}
        {selectedWorkerId && workerCoords[selectedWorkerId] && (
          <circle
            cx={workerCoords[selectedWorkerId].x}
            cy={workerCoords[selectedWorkerId].y}
            r="16"
            fill="#15803d"
            fillOpacity="0.08"
            stroke="#16a34a"
            strokeWidth="0.5"
            strokeDasharray="1.5,1.5"
          />
        )}

        {/* Live Route Polyline if tracking mode */}
        {showRoute && (
          <>
            <path
              d={`M ${workerStartLoc.x} ${workerStartLoc.y} Q 40 44 ${customerLoc.x} ${customerLoc.y}`}
              fill="none"
              stroke="url(#routeGrad)"
              strokeWidth="2"
              strokeDasharray="2.5,1.5"
              className="animate-pulse"
            />
            {/* Live Moving Worker Node on Route */}
            <circle cx="39" cy="40" r="2" fill="#15803d">
              <animate attributeName="r" values="1.8;2.5;1.8" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>

      {/* Neighborhood Labels on Map */}
      {NASHIK_LOCATIONS.map((loc) => (
        <div
          key={loc.id}
          style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center"
        >
          <span className="text-[10px] font-bold text-slate-700/80 bg-white/70 px-1.5 py-0.5 rounded shadow-xs backdrop-blur-xs border border-slate-200/50">
            {loc.name}
          </span>
        </div>
      ))}

      {/* Customer Location Pin (Target) */}
      <div
        style={{ left: `${customerLoc.x}%`, top: `${customerLoc.y}%` }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer"
      >
        <span className="text-[9px] font-extrabold text-white bg-slate-900 px-2 py-0.5 rounded-full shadow-md whitespace-nowrap mb-0.5">
          Your Home (Gangapur Rd)
        </span>
        <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-white shadow-lg animate-bounce">
          <MapPin className="w-3.5 h-3.5 text-amberGold-400" />
        </div>
      </div>

      {/* Worker Pins */}
      {workers.map((worker) => {
        const coords = workerCoords[worker.id] || { x: 50, y: 50 };
        const isSelected = selectedWorkerId === worker.id;

        return (
          <div
            key={worker.id}
            style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-transform ${
              isSelected ? 'scale-125 z-40' : 'hover:scale-115'
            }`}
            onClick={() => onSelectWorker && onSelectWorker(worker)}
            onMouseEnter={() => setHoveredWorker(worker)}
            onMouseLeave={() => setHoveredWorker(null)}
          >
            <div className="relative cursor-pointer">
              {/* Pulsing beacon */}
              <span className={`absolute -inset-1 rounded-full ${worker.isAvailable ? 'bg-emerald-400' : 'bg-slate-400'} opacity-75 animate-ping`} />

              {/* Worker Pin Avatar / Icon */}
              <div className={`relative w-8 h-8 rounded-full overflow-hidden border-2 shadow-md ${
                isSelected 
                  ? 'border-amberGold-500 ring-4 ring-amberGold-300/50' 
                  : worker.isAvailable 
                    ? 'border-emerald-600' 
                    : 'border-slate-400 grayscale'
              } bg-white flex items-center justify-center`}>
                <img src={worker.avatar} alt={worker.name} className="w-full h-full object-cover" />
              </div>

              {/* Verified small tick */}
              {worker.verified && (
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center border border-white">
                  <ShieldCheck className="w-2.5 h-2.5" />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Hovered Worker Mini Tooltip Card */}
      {hoveredWorker && (
        <div
          style={{
            left: `${Math.min(78, Math.max(22, (workerCoords[hoveredWorker.id]?.x || 50)))}%`,
            top: `${Math.max(12, (workerCoords[hoveredWorker.id]?.y || 50) - 18)}%`
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-50 bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-xl border border-slate-200 text-xs w-48 pointer-events-none transition-all"
        >
          <div className="flex items-center space-x-2">
            <img src={hoveredWorker.avatar} alt={hoveredWorker.name} className="w-7 h-7 rounded-full object-cover" />
            <div>
              <div className="font-bold text-slate-900 flex items-center space-x-1">
                <span>{hoveredWorker.name}</span>
                {hoveredWorker.verified && <ShieldCheck className="w-3 h-3 text-coop-700" />}
              </div>
              <span className="text-[10px] text-slate-500 block truncate">{hoveredWorker.skill}</span>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
            <span className="text-amberGold-600 font-bold flex items-center">
              <Star className="w-3 h-3 fill-amberGold-500 text-amberGold-500 mr-0.5" />
              {hoveredWorker.rating}
            </span>
            <span className="text-slate-500">{hoveredWorker.distanceKm} km away</span>
            <span className="font-bold text-coop-800">₹{hoveredWorker.hourlyRate}/hr</span>
          </div>
        </div>
      )}

      {/* Map Overlay Controls / Watermark */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-2 text-xs">
        <Navigation className="w-3.5 h-3.5 text-coop-700" />
        <span className="font-bold text-slate-800">Nashik Co-op Service Grid</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-[10px] text-slate-500">Live GPS Active</span>
      </div>

      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200 text-[10px] text-slate-600 flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Online Pro</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
          <span>Offline</span>
        </div>
      </div>
    </div>
  );
};
