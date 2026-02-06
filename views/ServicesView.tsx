
import React, { useState } from 'react';
import { ChevronRight, Baby, Home, GraduationCap, Leaf, Droplets, Search, ParkingCircle, Bus, School, Heart } from 'lucide-react';

export interface ServiceItem {
  title: string;
  desc: string;
  icon: React.ElementType;
  isFree: boolean;
  requiresIdScan?: boolean;
  category?: 'education' | 'social' | 'utility' | 'health';
}

interface ServicesViewProps {
  onServiceSelect: (service: ServiceItem) => void;
}

const ServicesView: React.FC<ServicesViewProps> = ({ onServiceSelect }) => {
  const [selected, setSelected] = useState<ServiceItem | null>(null);
  const [search, setSearch] = useState('');

  const services: ServiceItem[] = [
    { title: "Free Parking Finder", desc: "Find no-cost public parking zones", icon: ParkingCircle, isFree: true, category: 'utility' },
    { title: "Transport Pass", desc: "Purchase tickets and monthly passes", icon: Bus, isFree: false, category: 'utility' },
    { title: "Kindergarten Enrollment", desc: "Register child for municipal kindergarten", icon: Baby, isFree: true, category: 'education' },
    { title: "School Registration", desc: "Enroll students in primary or secondary schools", icon: School, isFree: true, category: 'education' },
    { title: "Pension Application", desc: "Apply for state pension or social benefits", icon: GraduationCap, isFree: true, requiresIdScan: true, category: 'social' },
    { title: "Welfare & Social Support", desc: "Financial aid for vulnerable groups", icon: Heart, isFree: true, category: 'social' },
    { title: "Residence Change", desc: "Update your residential address", icon: Home, isFree: false, category: 'utility' },
    { title: "Water and Sanitation Services", desc: "Manage your water and sewage services", icon: Droplets, isFree: false, category: 'utility' },
  ];

  const filtered = services.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 pb-32 h-full relative">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">Municipal Service Selection</h2>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Chișinău e-Governance Portal</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search for a service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-[1.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 shadow-sm"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((service, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(service)}
            className={`w-full flex items-center gap-4 p-5 rounded-[2rem] border transition-all text-left group ${
              selected?.title === service.title ? 'border-blue-500 bg-blue-50/30 shadow-sm' : 'bg-white border-gray-100'
            }`}
          >
            <div className={`w-10 h-10 ${service.isFree ? 'text-emerald-500' : 'text-blue-500'} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
              <service.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-800 leading-tight">{service.title}</p>
                {service.isFree && (
                  <span className="text-[8px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase tracking-tighter">Free</span>
                )}
              </div>
              <p className="text-[10px] text-gray-400 font-bold mt-1 tracking-tight">{service.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        ))}
      </div>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-6">
        <button 
          onClick={() => selected && onServiceSelect(selected)}
          disabled={!selected}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl active:scale-95 disabled:opacity-50 disabled:bg-slate-300"
        >
          {selected?.isFree ? 'Confirm Free Service' : 'Proceed to Registration'}
        </button>
      </div>
    </div>
  );
};

export default ServicesView;
