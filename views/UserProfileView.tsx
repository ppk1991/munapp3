
import React, { useState } from 'react';
import { AppView, ParkingZone, Language } from '../types';
import { 
  ChevronLeft, LogOut, MapPin, ShieldCheck, CreditCard, ParkingCircle, 
  Settings, ChevronRight, History, CheckCircle2, Home, Stethoscope, 
  Plus, Building2, Info, Check, Trash2, Landmark, User, Fingerprint
} from 'lucide-react';

interface UserProfileViewProps {
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  transportBalance: number;
  parkingZones: ParkingZone[];
  activeZoneId: string;
  onSetActiveZone: (id: string) => void;
  onAddZone: (zone: ParkingZone) => void;
  language: Language;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ 
  onNavigate, onLogout, transportBalance, parkingZones, activeZoneId, onSetActiveZone, onAddZone, language 
}) => {
  const [showParkingDetails, setShowParkingDetails] = useState(false);
  const [isAddingZone, setIsAddingZone] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneSector, setNewZoneSector] = useState('Centru');

  const activeZone = parkingZones.find(z => z.id === activeZoneId);

  const t = {
    en: {
      profile: "My Profile",
      verified: "eID Verified Profile",
      munId: "Municipal Identity",
      idnp: "National ID (IDNP)",
      res: "Place of Residence",
      med: "Medical Assignment",
      parking: "Parking Accounts",
      active: "Active Selection",
      add: "Add Zone",
      fin: "Financial Services",
      card: "Transport Card",
      topup: "Top Up",
      signout: "Sign Out from Secure eID"
    },
    ro: {
      profile: "Profilul Meu",
      verified: "Profil Verificat eID",
      munId: "Identitate Municipală",
      idnp: "Cod Personal (IDNP)",
      res: "Locul de Reședință",
      med: "Asignare Medicală",
      parking: "Conturi Parcare",
      active: "Selecție Activă",
      add: "Adaugă Zonă",
      fin: "Servicii Financiare",
      card: "Card Transport",
      topup: "Alimentare",
      signout: "Deconectare Securizată eID"
    },
    ru: {
      profile: "Мой Профиль",
      verified: "Профиль подтвержден eID",
      munId: "Муниципальное удостоверение",
      idnp: "Личный код (IDNP)",
      res: "Место жительства",
      med: "Медицинское назначение",
      parking: "Парковочные аккаунты",
      active: "Активный выбор",
      add: "Добавить зону",
      fin: "Финансовые услуги",
      card: "Транспортная карта",
      topup: "Пополнить",
      signout: "Выйти из системы eID"
    }
  }[language];

  const handleAddZone = () => {
    if (!newZoneName.trim()) return;
    const zone: ParkingZone = {
      id: `zone-${Date.now()}`,
      name: newZoneName,
      sector: newZoneSector,
      address: 'Selectable via Maps',
      isSubsidized: newZoneSector === 'Ciocana',
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
          <h2 className="text-2xl font-bold text-gray-800">{t.profile}</h2>
        </div>
        <button 
          onClick={() => onNavigate(AppView.SETTINGS)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl font-bold border border-white/30">
              JD
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">{t.verified}</p>
              <h3 className="text-2xl font-black tracking-tight">John Doe</h3>
            </div>
          </div>
          <Fingerprint className="w-8 h-8 opacity-30" />
        </div>
      </div>

      <div className="space-y-6">
        <section className="space-y-3">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">{t.munId}</h4>
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            <div className="flex items-center gap-4 p-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">{t.idnp}</p>
                <p className="text-sm font-black text-gray-800 tracking-wider">2004001992102</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">{t.res}</p>
                <p className="text-sm font-bold text-gray-800 leading-tight">Str. Mihai Eminescu 45, Bubuieci, Sector Ciocana</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">{t.med}</p>
                <p className="text-sm font-bold text-gray-800">CMF Nr. 10 (Ciocana)</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{t.parking}</h4>
            <button 
              onClick={() => setIsAddingZone(true)}
              className="text-[10px] font-black text-blue-600 flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3 h-3" /> {t.add}
            </button>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 bg-blue-50/50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ParkingCircle className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{t.active}</p>
                  <p className="text-sm font-bold text-gray-800">{activeZone?.name} ({activeZone?.sector})</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate(AppView.PARKING_MANAGEMENT)}
                className="p-2 bg-white border border-blue-100 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">{t.fin}</h4>
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            <div className="flex items-center gap-4 p-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">{t.card}</p>
                <p className="text-sm font-bold text-gray-800 truncate">{transportBalance.toFixed(2)} MDL Balance</p>
              </div>
              <button 
                onClick={() => onNavigate(AppView.TOP_UP)}
                className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-xl uppercase hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
              >
                {t.topup}
              </button>
            </div>
          </div>
        </section>
      </div>

      <button 
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 py-5 text-red-600 font-black text-sm hover:bg-red-50 rounded-[2rem] transition-all border border-red-50"
      >
        <LogOut className="w-5 h-5" />
        {t.signout}
      </button>
    </div>
  );
};

export default UserProfileView;
