
import React from 'react';
import { AppView, Language } from '../types';
import { Landmark, UserCircle, Calendar, ParkingCircle, ChevronRight, User, Zap, Ticket, Droplets, Flame, Thermometer, ArrowRight, Building, Bell, MessageSquare, Phone } from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: AppView) => void;
  transportBalance: number;
  activeZoneName: string;
  activePass?: string | null;
  notifications?: string[];
  nextAppointmentLabel?: string;
  language: Language;
}

const DashboardView: React.FC<DashboardViewProps> = ({ 
  onNavigate, 
  transportBalance, 
  activeZoneName, 
  activePass,
  notifications = [],
  nextAppointmentLabel = "No Appointments",
  language
}) => {
  const t = {
    en: {
      welcome: "Welcome, John Doe",
      dashboard: "My Chișinău Dashboard",
      bills: "Bills & Utilities",
      manage: "Manage All",
      taxBtn: "Consolidated Tax Payment",
      aptBtn: "Book New Appointment",
      resUnit: "Residential Unit",
      resStatus: "Residence Status",
      taxId: "Taxpayer ID (IDNP)",
      parking: "Parking Status",
      apts: "Appointments",
      update: "Municipal Update",
      view: "View",
      funds: "Add Funds",
      civic: "Civic Dialogue",
      contacts: "Important Numbers"
    },
    ro: {
      welcome: "Bine ai venit, John Doe",
      dashboard: "Panou Chișinău",
      bills: "Facturi și Utilități",
      manage: "Gestionați Tot",
      taxBtn: "Plată Fiscală Consolidată",
      aptBtn: "Programare Nouă",
      resUnit: "Unitate Rezidențială",
      resStatus: "Statut Rezidență",
      taxId: "Cod Personal (IDNP)",
      parking: "Statut Parcare",
      apts: "Programări",
      update: "Actualizare Municipală",
      view: "Vezi",
      funds: "Alimentare",
      civic: "Dialog Civic",
      contacts: "Numere Utile"
    },
    ru: {
      welcome: "Добро пожаловать, Джон Доу",
      dashboard: "Панель управления Кишинёва",
      bills: "Счета и Услуги",
      manage: "Управлять всем",
      taxBtn: "Консолидированный Налоговый Платеж",
      aptBtn: "Новая запись",
      resUnit: "Жилая единица",
      resStatus: "Статус проживания",
      taxId: "Личный код (IDNP)",
      parking: "Статус парковки",
      apts: "Записи",
      update: "Муниципальное обновление",
      view: "Смотреть",
      funds: "Пополнить",
      civic: "Гражданский диалог",
      contacts: "Важные номера"
    }
  }[language];

  const profileItems = [
    { icon: User, label: t.resUnit, value: "Bubuieci, Chisinau" },
    { icon: UserCircle, label: t.resStatus, value: "Permanent Resident" },
    { icon: Landmark, label: t.taxId, value: "2004001992102", clickable: true, target: AppView.PROFILE },
    { icon: ParkingCircle, label: t.parking, value: `Active: ${activeZoneName}`, clickable: true, target: AppView.PARKING_MANAGEMENT },
    { icon: Calendar, label: t.apts, value: nextAppointmentLabel, clickable: true, target: AppView.APPOINTMENTS }
  ];

  const utilityQuickPay = [
    { icon: Zap, label: "Elec", color: "text-yellow-600", bg: "bg-yellow-50", pending: true },
    { icon: Droplets, label: "Water", color: "text-blue-600", bg: "bg-blue-50", pending: false },
    { icon: Flame, label: "Gas", color: "text-orange-600", bg: "bg-orange-50", pending: true },
    { icon: Thermometer, label: "Heat", color: "text-red-600", bg: "bg-red-50", pending: true },
    { icon: Building, label: "Housing", color: "text-slate-600", bg: "bg-slate-50", pending: true },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col">
            <h2 className="text-2xl font-black text-gray-800 leading-none">{t.welcome}</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{t.dashboard}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate(AppView.CASES_LEDGER)}
            className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 relative"
          >
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            )}
          </button>
          <button 
            onClick={() => onNavigate(AppView.PROFILE)}
            className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100"
          >
            <UserCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Civic Engagement Quick Links */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => onNavigate(AppView.CIVIC_TECH)}
          className="bg-indigo-600 p-4 rounded-3xl text-white shadow-lg shadow-indigo-100 flex items-center gap-3 transition-transform active:scale-95"
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold leading-tight text-left">{t.civic}</p>
        </button>
        <button 
          onClick={() => onNavigate(AppView.IMPORTANT_NUMBERS)}
          className="bg-red-600 p-4 rounded-3xl text-white shadow-lg shadow-red-100 flex items-center gap-3 transition-transform active:scale-95"
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold leading-tight text-left">{t.contacts}</p>
        </button>
      </div>

      {/* Notifications Alert */}
      {notifications.length > 0 && (
        <div className="bg-blue-600 rounded-[2rem] p-5 text-white shadow-xl shadow-blue-100 animate-in slide-in-from-top-4">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-[9px] font-black uppercase tracking-widest opacity-80 mb-0.5">{t.update}</p>
              <p className="text-xs font-bold leading-tight line-clamp-2">{notifications[0]}</p>
            </div>
            <button 
              onClick={() => onNavigate(AppView.CASES_LEDGER)}
              className="text-[10px] font-black bg-white/20 px-3 py-1.5 rounded-xl uppercase backdrop-blur-md hover:bg-white/30 transition-all"
            >
              {t.view}
            </button>
          </div>
        </div>
      )}

      {/* Digital Transport Card */}
      <div className="relative group">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-blue-200 relative overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-6">Transport Digital</p>
              <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-lg shadow-inner mb-6 border border-white/10" />
            </div>
            {activePass && (
               <div className="bg-green-500 text-[8px] font-black px-2.5 py-1 rounded-xl uppercase tracking-widest relative z-10 shadow-lg shadow-green-900/20">Active Pass</div>
            )}
          </div>

          <div className="mt-2 relative z-10 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Wallet Balance</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black tracking-tighter">{transportBalance.toFixed(2)}</p>
                <p className="text-sm font-bold opacity-80 uppercase">Mdl</p>
              </div>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onNavigate(AppView.TOP_UP); }}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3.5 rounded-2xl transition-all active:scale-90 flex items-center gap-2 border border-white/10"
            >
              <Ticket className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">{t.funds}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between px-1">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{t.bills}</p>
          <button onClick={() => onNavigate(AppView.UTILITIES)} className="text-[10px] font-black text-blue-600 uppercase flex items-center gap-1 hover:underline">{t.manage} <ArrowRight className="w-3 h-3" /></button>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {utilityQuickPay.map((util, i) => (
            <button key={i} onClick={() => onNavigate(AppView.UTILITIES)} className="flex flex-col items-center gap-2 group active:scale-95 transition-all">
              <div className={`w-12 h-12 ${util.bg} ${util.color} rounded-2xl flex items-center justify-center relative shadow-sm border border-transparent group-hover:border-current/10 transition-colors`}>
                <util.icon className="w-5 h-5" />
                {util.pending && <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-4 border-white rounded-full" />}
              </div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">{util.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
        {profileItems.map((item, idx) => (
          <div key={idx} onClick={() => item.clickable && item.target && onNavigate(item.target as AppView)} className={`flex items-center gap-4 p-5 transition-colors ${item.clickable ? 'cursor-pointer hover:bg-blue-50/50 group' : ''}`}>
            <div className="text-blue-500 shrink-0"><item.icon className="w-5 h-5" /></div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">{item.label}</p>
              <p className="text-sm font-bold text-gray-700 truncate">{item.value}</p>
            </div>
            {item.clickable && <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex flex-col gap-3">
          <button onClick={() => onNavigate(AppView.UTILITIES)} className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black text-sm shadow-xl shadow-blue-100 flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all">
            <Landmark className="w-5 h-5" /> {t.taxBtn}
          </button>
          <button onClick={() => onNavigate(AppView.BOOK_APPOINTMENT)} className="w-full bg-gray-50 text-gray-700 py-5 rounded-[1.5rem] font-black text-sm border border-gray-100 hover:bg-gray-100 active:scale-95 transition-all">{t.aptBtn}</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
