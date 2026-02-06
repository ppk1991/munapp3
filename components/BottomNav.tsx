
import React from 'react';
import { Home, Briefcase, Bell, User } from 'lucide-react';
import { AppView, Language } from '../types';

interface BottomNavProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  language: Language;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate, language }) => {
  const t = {
    en: { home: 'Home', services: 'Services', cases: 'Cases', profile: 'Profile' },
    ro: { home: 'Acasă', services: 'Servicii', cases: 'Dosare', profile: 'Profil' },
    ru: { home: 'Главная', services: 'Услуги', cases: 'Дела', profile: 'Профиль' }
  }[language];

  const tabs = [
    { icon: Home, label: t.home, view: AppView.DASHBOARD },
    { icon: Briefcase, label: t.services, view: AppView.SERVICES },
    { icon: Bell, label: t.cases, view: AppView.CASES_LEDGER },
    { icon: User, label: t.profile, view: AppView.PROFILE },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 flex justify-around py-3 px-2 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      {tabs.map((tab) => {
        const isActive = activeView === tab.view;
        return (
          <button
            key={tab.label}
            onClick={() => onNavigate(tab.view)}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              isActive ? 'text-blue-600 scale-110' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <tab.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
