
import React, { useState } from 'react';
import { ChevronLeft, MessageCircle, Landmark, Building2, Send, Users, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface CivicTechViewProps {
  onBack: () => void;
  language: Language;
}

const CivicTechView: React.FC<CivicTechViewProps> = ({ onBack, language }) => {
  const [activeLevel, setActiveLevel] = useState<'suburb' | 'sector' | 'city'>('suburb');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const t = {
    en: {
      title: "Civic Dialogue",
      desc: "Direct channel with your municipal representatives.",
      suburb: "Bubuieci Mayoralty",
      sector: "Pretura Ciocana",
      city: "Chișinău Town Hall",
      placeholder: "Describe your proposal or report a local issue...",
      send: "Submit to Authority",
      success: "Message Sent Successfully",
      successDesc: "Your input has been registered with the selected administration level."
    },
    ro: {
      title: "Dialog Civic",
      desc: "Canal direct cu reprezentanții tăi municipali.",
      suburb: "Primăria Bubuieci",
      sector: "Pretura Ciocana",
      city: "Primăria Chișinău",
      placeholder: "Descrie propunerea ta sau raportează o problemă locală...",
      send: "Trimite către Autoritate",
      success: "Mesaj Trimis cu Succes",
      successDesc: "Contribuția ta a fost înregistrată la nivelul de administrare selectat."
    },
    ru: {
      title: "Гражданский Диалог",
      desc: "Прямой канал связи с вашими муниципальными представителями.",
      suburb: "Примэрия Бубуечь",
      sector: "Претура Чокана",
      city: "Примэрия Кишинёва",
      placeholder: "Опишите ваше предложение или сообщите о локальной проблеме...",
      send: "Отправить властям",
      success: "Сообщение успешно отправлено",
      successDesc: "Ваш запрос зарегистрирован на выбранном уровне управления."
    }
  }[language];

  const handleSend = () => {
    if (!message.trim()) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setMessage('');
      alert(t.success);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-20">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg -ml-2 transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
      </div>

      <div className="bg-indigo-600 p-6 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold leading-tight">CivicTech Interface</h3>
            <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest">{t.desc}</p>
          </div>
        </div>
      </div>

      <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
        <button 
          onClick={() => setActiveLevel('suburb')}
          className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${activeLevel === 'suburb' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
        >
          Suburb
        </button>
        <button 
          onClick={() => setActiveLevel('sector')}
          className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${activeLevel === 'sector' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
        >
          Sector
        </button>
        <button 
          onClick={() => setActiveLevel('city')}
          className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${activeLevel === 'city' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
        >
          Municipal
        </button>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            {activeLevel === 'suburb' ? <Users className="w-6 h-6" /> : activeLevel === 'sector' ? <Building2 className="w-6 h-6" /> : <Landmark className="w-6 h-6" />}
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Target Authority</p>
            <p className="text-sm font-black text-gray-800">
              {activeLevel === 'suburb' ? t.suburb : activeLevel === 'sector' ? t.sector : t.city}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <textarea 
            placeholder={t.placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 resize-none"
          />

          <button 
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {t.send}
          </button>
        </div>
      </div>

      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic">
          Citizens of Bubuieci (Ciocana Sector) are verified via eID. Your dialogue is authenticated and will be routed to the respective desk of the municipal administration.
        </p>
      </div>
    </div>
  );
};

export default CivicTechView;
