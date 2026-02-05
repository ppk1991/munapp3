
import React, { useState } from 'react';
import { AppView, ParkingZone } from '../types';
import { 
  ChevronLeft, LogOut, MapPin, ShieldCheck, CreditCard, ParkingCircle, 
  Settings, ChevronRight, History, CheckCircle2, Home, Stethoscope, 
  Plus, Building2, Info, Check, Trash2 
} from 'lucide-react';

interface UserProfileViewProps {
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  transportBalance: number;
  parkingZones: ParkingZone[];
  activeZoneId: string;
  onSetActiveZone: (id: string) => void;
  onAddZone: (zone: ParkingZone) => void;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ 
  onNavigate, onLogout, transportBalance, parkingZones, activeZoneId, onSetActiveZone, onAddZone 
}) => {
  const [showParkingDetails, setShowParkingDetails] = useState(false);
  const [isAddingZone, setIsAddingZone] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneSector, setNewZoneSector] = useState('Centru');

  const activeZone = parkingZones.find(z => z.id === activeZoneId);

  const handleAddZone = () => {
    if (!newZoneName.trim()) return;
    const zone: ParkingZone = {
      id: `zone-${Date.now()}`,
      name: newZoneName,
      sector: newZoneSector,
      address: 'Selectable via Maps',
      isSubsidized: newZoneSector === 'Ciocana', // Mock logic: subsidized only in Ciocana for this user
      rules: newZoneSector === 'Centru' ? 'Paid Zone (10 MDL/h)' : 'Residential Zone'
    };
    onAddZone(zone);
    setNewZoneName('');
    setIsAddingZone(false);
  };

  const parkingHistory = [
    { 
      id: "PK-882",
      zone: "Sector Ciocana", 
      location: "Str. Mihai Eminescu, 45",
      date: "Oct 25, 2023", 
      duration: "Full Day", 
      cost: "0.00 MDL",
      status: "Residential Permit"
    }
  ];

  return (
    <div className="space-y-6 pb-20 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate(AppView.DASHBOARD)}
            className="p-2 hover:bg-gray-100 rounded-lg -ml-2 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        </div>
        <button 
          onClick={() => onNavigate(AppView.SETTINGS)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl font-bold">
            JD
          </div>
          <div>
            <h3 className="text-xl font-bold">John Doe</h3>
            <div className="flex items-center gap-1.5 opacity-80 mt-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-medium">eID Verified Citizen</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <section className="space-y-3">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Municipal Identity</h4>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Residential Address</p>
                <p className="text-sm font-semibold text-gray-700 leading-tight">Str. Mihai Eminescu 45, Bubuieci, Sector Ciocana</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Medical Assignment</p>
                <p className="text-sm font-semibold text-gray-700">CMF Nr. 10 (Ciocana)</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Parking Accounts</h4>
            <button 
              onClick={() => setIsAddingZone(true)}
              className="text-[10px] font-black text-blue-600 flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3 h-3" /> Add Zone
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Active Zone Highlight */}
            <div className="p-4 bg-blue-50/50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ParkingCircle className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Active Selection</p>
                  <p className="text-sm font-bold text-gray-800">{activeZone?.name} ({activeZone?.sector})</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate(AppView.PARKING_MANAGEMENT)}
                className="p-2 bg-white border border-blue-100 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* List of Zones */}
            <div className="divide-y divide-gray-50">
              {parkingZones.map(zone => (
                <div key={zone.id} className="p-4 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${zone.id === activeZoneId ? 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]' : 'bg-gray-200'}`} />
                    <div>
                      <p className="text-xs font-bold text-gray-800">{zone.name}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{zone.sector} • {zone.isSubsidized ? 'Subsidized' : 'Standard'}</p>
                    </div>
                  </div>
                  {zone.id === activeZoneId ? (
                    <span className="text-[8px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded uppercase tracking-widest">Active</span>
                  ) : (
                    <button 
                      onClick={() => onSetActiveZone(zone.id)}
                      className="text-[10px] font-bold text-blue-600 hover:underline px-2 py-1"
                    >
                      Set Active
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Zone Inline Form */}
            {isAddingZone && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Add New Parking Zone</p>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    value={newZoneName}
                    onChange={(e) => setNewZoneName(e.target.value)}
                    placeholder="Zone Nickname (e.g. Gym, School)"
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <select 
                    value={newZoneSector}
                    onChange={(e) => setNewZoneSector(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Centru">Centru</option>
                    <option value="Ciocana">Ciocana</option>
                    <option value="Botanica">Botanica</option>
                    <option value="Buiucani">Buiucani</option>
                    <option value="Rîșcani">Rîșcani</option>
                  </select>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleAddZone}
                      className="flex-1 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs"
                    >
                      Save Zone
                    </button>
                    <button 
                      onClick={() => setIsAddingZone(false)}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-400 rounded-xl font-bold text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rules and History Collapsible */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Zone Rules</p>
              </div>
              <button 
                onClick={() => setShowParkingDetails(!showParkingDetails)}
                className="text-[10px] font-bold text-blue-600"
              >
                {showParkingDetails ? 'Hide History' : 'Show History'}
              </button>
            </div>
            
            <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
              {activeZone?.rules}
            </p>

            {showParkingDetails && (
              <div className="space-y-3 pt-2 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <History className="w-3 h-3" /> Recent Activity
                </div>
                {parkingHistory.map((item) => (
                  <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{item.location}</p>
                      <p className="text-[9px] text-slate-400">{item.date} • {item.duration}</p>
                    </div>
                    <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">#{item.id}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="space-y-3">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Financial Services</h4>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Transport Card</p>
                <p className="text-sm font-semibold text-gray-700 truncate">{transportBalance.toFixed(2)} MDL Balance</p>
              </div>
              <button 
                onClick={() => onNavigate(AppView.TOP_UP)}
                className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg uppercase hover:bg-blue-100 transition-colors"
              >
                Top Up
              </button>
            </div>
          </div>
        </section>
      </div>

      <button 
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 py-4 text-red-600 font-bold hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
      >
        <LogOut className="w-5 h-5" />
        Sign Out from eID
      </button>

      <div className="text-center">
        <p className="text-[10px] text-gray-400 font-medium">MUNAPP Chișinău • Version 2.2.0</p>
      </div>
    </div>
  );
};

export default UserProfileView;
