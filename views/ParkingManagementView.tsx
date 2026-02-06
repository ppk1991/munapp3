
import React from 'react';
import { ChevronLeft, ParkingCircle, Clock, MapPin, History, ShieldCheck, AlertCircle } from 'lucide-react';
import { ParkingZone } from '../types';

interface ParkingManagementViewProps {
  onBack: () => void;
  activeZone: ParkingZone;
}

const ParkingManagementView: React.FC<ParkingManagementViewProps> = ({ onBack, activeZone }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-2">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg -ml-2 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Zone Management</h2>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <ParkingCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Active Zone</p>
            <h3 className="text-xl font-bold">{activeZone.name}</h3>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 opacity-70" />
              <div>
                <p className="text-[9px] font-bold uppercase opacity-60">Location Context</p>
                <p className="text-sm font-bold">{activeZone.sector} Sector</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
               <p className="text-[9px] font-bold uppercase opacity-60 mb-1">Status</p>
               <div className="flex items-center gap-1.5">
                 <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                 <span className="text-sm font-bold">Authorized</span>
               </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
               <p className="text-[9px] font-bold uppercase opacity-60 mb-1">Pricing</p>
               <p className="text-sm font-bold">{activeZone.isSubsidized ? 'Subsidized' : 'Standard Rate'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Enforcement Rules</p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed font-medium">
          {activeZone.rules}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-bold text-gray-800 px-1">Management Actions</p>
        <div className="grid grid-cols-1">
          <button className="flex items-center justify-center gap-2 p-5 bg-white border border-gray-100 rounded-3xl font-bold text-gray-700 hover:border-blue-200 transition-all active:scale-95 shadow-sm">
            <History className="w-4 h-4 text-blue-500" />
            View Session History & Fines
          </button>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
        <p className="text-[10px] text-slate-500 font-medium italic">
          Zones are verified against your eID residence and employment data. Switch active zones in your Profile settings to update enforcement rules.
        </p>
      </div>
    </div>
  );
};

export default ParkingManagementView;
