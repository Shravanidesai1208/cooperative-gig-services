import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Check, 
  Plus, 
  Trash2, 
  AlertCircle 
} from 'lucide-react';
import { useWorkNest } from '../context/WorkNestContext';

export const WorkerAvailabilityPage: React.FC = () => {
  const { 
    workers, 
    toggleWorkerAvailability, 
    updateWorkerRadius, 
    bookings 
  } = useWorkNest();

  const ramesh = workers[0];
  const [startTime, setStartTime] = useState(ramesh.workingHours.start);
  const [endTime, setEndTime] = useState(ramesh.workingHours.end);
  const [radius, setRadius] = useState(ramesh.serviceRadiusKm);
  const [blockedDates, setBlockedDates] = useState<string[]>([
    '2026-09-17 (Anant Chaturdashi Festival)',
    '2026-09-24 (Family Day)'
  ]);
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [savedToast, setSavedToast] = useState(false);

  const handleAddBlockedDate = () => {
    if (!newBlockedDate.trim()) return;
    setBlockedDates(prev => [...prev, newBlockedDate.trim()]);
    setNewBlockedDate('');
  };

  const handleRemoveBlockedDate = (index: number) => {
    setBlockedDates(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveSettings = () => {
    updateWorkerRadius(ramesh.id, radius);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Work Schedule & Service Radius
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            You decide your hours and travel boundaries. Co-op workers are never penalized for resting or blocking leave.
          </p>
        </div>

        {savedToast && (
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-xl animate-in fade-in">
            ✓ Preferences Updated
          </span>
        )}
      </div>

      {/* Main Settings Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        
        {/* Instant Dispatch Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div>
            <strong className="text-sm font-bold text-slate-900 block">
              Accept Instant Doorstep Dispatches
            </strong>
            <span className="text-xs text-slate-500">
              Turn off if you are traveling, on another job, or resting.
            </span>
          </div>

          <button
            onClick={() => toggleWorkerAvailability(ramesh.id)}
            className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${
              ramesh.isAvailable ? 'bg-emerald-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                ramesh.isAvailable ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Working Hours */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
            Daily Working Hours (Gangapur Road Hub)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] text-slate-500 block mb-1">Start Time:</span>
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                <Clock className="w-4 h-4 text-coop-700" />
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-800 focus:outline-hidden w-full"
                />
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 block mb-1">End Time:</span>
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                <Clock className="w-4 h-4 text-coop-700" />
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-800 focus:outline-hidden w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Service Radius Slider */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Maximum Service Radius (Nashik Coverage)
            </label>
            <span className="text-xs font-black text-coop-800 bg-coop-100 px-2.5 py-0.5 rounded-full">
              {radius} km Radius
            </span>
          </div>

          <input
            type="range"
            min="2"
            max="15"
            step="1"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-coop-700"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
            <span>2 km (Local neighborhood only)</span>
            <span>8 km (City core)</span>
            <span>15 km (Includes Satpur & Suburbs)</span>
          </div>
        </div>

        {/* Blocked Dates / Festival Leave */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Block Dates / Leave Calendar
            </label>
            <p className="text-xs text-slate-500 mt-0.5">
              WorkNest never reduces your search rank or fines you for taking days off.
            </p>
          </div>

          <div className="space-y-2">
            {blockedDates.map((date, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              >
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-coop-700" />
                  <span className="font-semibold text-slate-800">{date}</span>
                </div>
                <button
                  onClick={() => handleRemoveBlockedDate(idx)}
                  className="text-slate-400 hover:text-red-600 p-1"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add custom blocked date */}
          <div className="flex space-x-2 pt-1">
            <input
              type="text"
              value={newBlockedDate}
              onChange={(e) => setNewBlockedDate(e.target.value)}
              placeholder="e.g. 2026-10-02 (Gandhi Jayanti / Personal Leave)"
              className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden"
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddBlockedDate(); }}
            />
            <button
              onClick={handleAddBlockedDate}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Date</span>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-2.5 bg-coop-800 hover:bg-coop-900 text-white text-xs font-bold rounded-xl shadow-md transition"
          >
            Save Availability Preferences
          </button>
        </div>

      </div>

    </div>
  );
};
