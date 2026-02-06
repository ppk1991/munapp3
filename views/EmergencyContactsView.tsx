
import React from 'react';
import { ChevronLeft, Phone, Zap, Droplets, Flame, ShieldAlert, HeartPulse, Lightbulb, Trash2, Info } from 'lucide-react';
import { Language } from '../types';

interface EmergencyContactsViewProps {
  onBack: () => void;
  language: Language;
}

const EmergencyContactsView: React.FC<EmergencyContactsViewProps> = ({ onBack, language }) => {
  const t = {
    en: {
      title: "Municipal Contacts",
      desc: "Emergency and utility assistance numbers.",
      call: "Call Now",
      emergency: "Universal Emergency",
      gas: "Gas Emergency",
      water: "Water & Sewerage",
      light: "Public Lighting",
      electricity: "Premier Energy",
      trash: "Sanitation Service"
    },
    ro: {
      title: "Contacte Utile",
      desc: "Numere de urgență și asistență utilități.",
      call: "Apelează",
      emergency: "Urgență Universală",
      gas: "Urgență Gaze",
      water: "Apă și Canalizare",
      light: "Iluminat Public",
      electricity: "Premier Energy",
      trash: "Servicii Salubritate"
    },
    ru: {
      title: "Важные Номера",
      desc: "Номера экстренных и коммунальных служб.",
      call: "Позвонить",
      emergency: "Единая служба помощи",
      gas: "Аварийная служба газа",
      water: "Водоканал и канализация",
      light: "Уличное освещение",
      electricity: "Электросети",
      trash: "Служба вывоза мусора"
    }
  }[language];

  const contacts = [
    { name: t.emergency, number: "112", icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50" },
    { name: t.gas, number: "904", icon: Flame, color: "text-orange-600", bg: "bg-orange-50" },
    { name: t.water, number: "022-256-666", icon: Droplets, color: "text-blue-600", bg: "bg-blue-50" },
    { name: t.light, number: "022-222-127", icon: Lightbulb, color: "text-yellow-600", bg: "bg-yellow-50" },
    { name: t.electricity, number: "022-431-111", icon: Zap, color: "text-indigo-600", bg: "bg-indigo-50" },
    { name: t.trash, number: "022-747-520", icon: Trash2, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const handleCall = (num: string) => {
    window.open(`tel:${num.replace(/-/g, '')}`);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-20">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg -ml-2 transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
      </div>

      <div className="bg-red-600 p-6 rounded-[2.5rem] text-white shadow-xl shadow-red-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold leading-tight">24/7 Assistance</h3>
            <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest">{t.desc}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {contacts.map((c, i) => (
          <button 
            key={i}
            onClick={() => handleCall(c.number)}
            className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-red-200 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${c.bg} ${c.color} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform`}>
                <c.icon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-gray-800">{c.name}</p>
                <p className={`text-lg font-black tracking-tighter ${c.color}`}>{c.number}</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
              <Phone className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>

      <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[10px] text-blue-700 leading-relaxed font-medium italic">
          Dispatchers are available 24/7 for Chișinău and suburbs. For eID related technical support, please use the Civic Dialogue interface.
        </p>
      </div>
    </div>
  );
};

export default EmergencyContactsView;
