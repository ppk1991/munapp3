
import React from 'react';
import { ChevronRight, Baby, GraduationCap, Droplets, Stethoscope, School, HeartHandshake, Bus, Thermometer, Zap, Flame, Building, Receipt, ParkingCircle, Coins, HandHeart, Users } from 'lucide-react';

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
  const utilityDeliverables: ServiceItem[] = [
    { title: "Free Parking Finder", desc: "Locate no-cost parking spots in the city", icon: ParkingCircle, isFree: true, category: 'utility' },
    { title: "Water & Sewerage", desc: "Apă-Canal connection & metering", icon: Droplets, isFree: false, category: 'utility' },
    { title: "Centralized Heating", desc: "Termoelectrica service management", icon: Thermometer, isFree: false, category: 'utility' },
    { title: "Natural Gas", desc: "Moldovagaz residential supply", icon: Flame, isFree: false, category: 'utility' },
    { title: "Electricity Supply", desc: "Premier Energy residential contract", icon: Zap, isFree: false, category: 'utility' },
    { title: "Housing Stock", desc: "Block maintenance & repairs (Î.M.G.F.L.)", icon: Building, isFree: false, category: 'utility' },
    { title: "Local Taxes", desc: "Property, land, and sanitation taxes", icon: Receipt, isFree: false, category: 'utility' },
    { title: "Transport Pass", desc: "Monthly municipal transit pass", icon: Bus, isFree: false, category: 'utility' },
  ];

  const socialAndHealthServices: ServiceItem[] = [
    { title: "Pensions & Allowances", desc: "Old-age, disability, or survivor pensions", icon: Coins, isFree: true, requiresIdScan: true, category: 'social' },
    { title: "Social Benefits", desc: "Aid for low-income families and children", icon: HandHeart, isFree: true, requiresIdScan: true, category: 'social' },
    { title: "Cold Season Subsidies", desc: "Energy compensation and heating aid", icon: HeartHandshake, isFree: true, requiresIdScan: true, category: 'social' },
    { title: "Kindergarten Registration", desc: "Enroll child in municipal nursery", icon: Baby, isFree: true, category: 'education' },
    { title: "School Registration", desc: "Enroll student in local school", icon: School, isFree: true, category: 'education' },
    { title: "Family Doctor Center (CMF)", desc: "Primary healthcare assignment", icon: Stethoscope, isFree: true, category: 'health' },
    { title: "Vulnerable Groups Support", desc: "Specific aid for seniors and persons with disabilities", icon: Users, isFree: true, requiresIdScan: true, category: 'social' },
  ];

  const ServiceButton: React.FC<{ service: ServiceItem }> = ({ service }) => (
    <button
      onClick={() => onServiceSelect(service)}
      className="w-full flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all text-left active:scale-[0.98]"
    >
      <div className={`w-12 h-12 ${service.isFree ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'} rounded-xl flex items-center justify-center shrink-0`}>
        <service.icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-bold text-gray-800 truncate">{service.title}</p>
          {service.requiresIdScan && (
            <span className="text-[7px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter bg-amber-100 text-amber-700 whitespace-nowrap">ID Scan Required</span>
          )}
        </div>
        <p className="text-xs text-gray-500 line-clamp-1">{service.desc}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300" />
    </button>
  );

  return (
    <div className="space-y-6 pb-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Citizen Services</h2>
        <p className="text-sm text-gray-500 mt-1">Direct access to municipal and national benefits.</p>
      </div>

      <div className="space-y-6">
        <section>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Social Benefits & Pensions</p>
          <div className="space-y-2">
            {socialAndHealthServices.map((service, idx) => (
              <ServiceButton key={idx} service={service} />
            ))}
          </div>
        </section>

        <section>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Utilities & Housing</p>
          <div className="space-y-2">
            {utilityDeliverables.map((service, idx) => (
              <ServiceButton key={idx} service={service} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesView;
