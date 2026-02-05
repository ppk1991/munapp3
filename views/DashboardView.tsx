
import React from 'react';
import { AppView } from '../types';
import { MapPin, Home, ParkingCircle, Calendar, ChevronRight, User as UserIcon, UserCircle, Zap, Plus, Droplets, Stethoscope, Ticket, Bell, Info } from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: AppView) => void;
  transportBalance: number;
  activeZoneName: string;
  activePass?: string | null;
  notifications?: string[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, transportBalance, activeZoneName, activePass, notifications = [] }) => {
  const profileItems = [
    { 
      icon: Home, 
      label: "Residential Address", 
      value: "Str. Mihai Eminescu 45, Bubuieci (Ciocana)" 
    },
    { 
      icon: UserIcon, 
      label: "Residence Status", 
      value: "Permanent Resident" 
    },
    { 
      icon: ParkingCircle, 
      label: "Parking Status", 
      value: `Active Zone: ${activeZoneName}`,
      clickable: true,
      target: AppView.PARKING_MANAGEMENT
    },
    { 
      icon: Stethoscope, 
      label: "Healthcare", 
      value: "Assigned to CMF Ciocana",
      clickable: true,
      target: AppView.BOOK_APPOINTMENT
    },
    { 
      icon: Calendar, 
      label: "Appointments", 
      value: "Tomorrow, 10:00 AM - City Hall", 
      clickable: true, 
      target: AppView.APPOINTMENTS 
    },
    { 
      icon: Droplets, 
      label: "Essential Utilities", 
      value: "Total Due: 2,621 MDL", 
      clickable: true, 
      target: AppView.UTILITIES,
      color: "text-orange-600"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">My Chișinău</h2>
        <button 
          onClick={() => onNavigate(AppView.PROFILE)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors text-blue-600"
        >
          <UserCircle className="w-8 h-8" />
        </button>
      </div>

      {/* Notifications Section */}
      {notifications.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Bell className="w-3 h-3 text-blue-600" /> Recent Alerts
            </p>
            <span className="bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">{notifications.length}</span>
          </div>
          <div className="space-y-2">
            {notifications.slice(0, 2).map((note, idx) => (
              <div key={idx} className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex gap-3 items-start animate-in slide-in-from-top-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-blue-900 leading-snug">{note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Digital Transport Card */}
      <div className="relative group perspective-1000">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-[2rem] p-6 text-white shadow-2xl shadow-blue-200 relative overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full -ml-10 -mb-10 blur-2xl" />
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-6">Transport Digital</p>
              <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-md shadow-inner flex items-center justify-center mb-6">
                <div className="w-8 h-px bg-yellow-900/20 my-1" />
              </div>
            </div>
            <div className="text-right">
              {activePass ? (
                <div className="bg-green-500 text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">Active Pass</div>
              ) : (
                <Zap className="w-6 h-6 text-blue-300 ml-auto" />
              )}
            </div>
          </div>

          <div className="mt-2 relative z-10 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Balance</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black tracking-tighter">{transportBalance.toFixed(2)}</p>
                <p className="text-sm font-bold opacity-80">MDL</p>
              </div>
            </div>
            {activePass && (
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Pass Type</p>
                <p className="text-lg font-black tracking-tight leading-none">{activePass}</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between items-end relative z-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Card Holder</p>
              <p className="text-xs font-bold tracking-wider">JOHN DOE • eID 098****</p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(AppView.TOP_UP);
              }}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-2xl transition-all active:scale-90 flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Tickets & Passes</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {profileItems.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => item.clickable && item.target && onNavigate(item.target as AppView)}
            className={`flex items-start gap-4 p-4 transition-colors ${item.clickable ? 'cursor-pointer hover:bg-blue-50/50 group' : ''}`}
          >
            <div className={`mt-1 transition-transform ${item.color || 'text-blue-500'} ${item.clickable ? 'group-hover:scale-110' : ''}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
              <p className="text-sm font-semibold text-gray-700">{item.value}</p>
            </div>
            {item.clickable && (
              <ChevronRight className="w-4 h-4 text-gray-300 self-center group-hover:text-blue-600" />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <p className="text-sm font-bold text-gray-800 px-1">Quick Actions</p>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onNavigate(AppView.UTILITIES)}
            className="bg-orange-600 text-white py-4 rounded-xl font-bold text-sm shadow-md hover:bg-orange-700 active:scale-95 transition-all"
          >
            Manage Bills
          </button>
          <button 
            onClick={() => onNavigate(AppView.SERVICES)}
            className="bg-blue-100 text-blue-700 py-4 rounded-xl font-bold text-sm hover:bg-blue-200 active:scale-95 transition-all"
          >
            Citizen Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
