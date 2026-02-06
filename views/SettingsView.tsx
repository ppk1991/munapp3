
import React, { useState } from 'react';
import { ChevronLeft, Bell, Globe, Shield, Eye, Smartphone, ChevronRight, FileText, CreditCard, CalendarCheck, Check } from 'lucide-react';
import { Language } from '../types';

interface SettingsViewProps {
  onBack: () => void;
  language: Language;
  onSetLanguage: (lang: Language) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBack, language, onSetLanguage }) => {
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [showLangPicker, setShowLangPicker] = useState(false);
  
  // Detailed notification states
  const [caseUpdates, setCaseUpdates] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [appointmentConfirmations, setAppointmentConfirmations] = useState(true);

  const Toggle = ({ active, onToggle, disabled = false }: { active: boolean, onToggle: () => void, disabled?: boolean }) => (
    <button 
      onClick={onToggle}
      disabled={disabled}
      className={`w-12 h-6 rounded-full transition-colors relative ${disabled ? 'opacity-30 cursor-not-allowed' : ''} ${active ? 'bg-blue-600' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
    </button>
  );

  const languages: { code: Language, label: string, native: string }[] = [
    { code: 'ro', label: 'Romanian', native: 'Română' },
    { code: 'ru', label: 'Russian', native: 'Русский' },
    { code: 'en', label: 'English', native: 'English' }
  ];

  const currentLangLabel = languages.find(l => l.code === language)?.native || 'English';

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-2">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg -ml-2 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">App Preferences</p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            <button 
              onClick={() => setShowLangPicker(!showLangPicker)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-800">Language</p>
                  <p className="text-[10px] text-gray-400">{currentLangLabel}</p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-gray-300 transition-transform ${showLangPicker ? 'rotate-90' : ''}`} />
            </button>

            {showLangPicker && (
              <div className="bg-slate-50 p-2 space-y-1 animate-in slide-in-from-top-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSetLanguage(lang.code);
                      setShowLangPicker(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      language === lang.code ? 'bg-white shadow-sm' : 'hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-left">
                      <p className={`text-xs font-bold ${language === lang.code ? 'text-blue-600' : 'text-gray-700'}`}>{lang.native}</p>
                      <p className="text-[10px] text-gray-400">{lang.label}</p>
                    </div>
                    {language === lang.code && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Privacy & Security</p>
                  <p className="text-[10px] text-gray-400">Manage data sharing</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Appearance</p>
                  <p className="text-[10px] text-gray-400">Light / Dark / Auto</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </section>

        <section className="space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Security & Access</p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Biometric Login</p>
                  <p className="text-[10px] text-gray-400">FaceID or Fingerprint</p>
                </div>
              </div>
              <Toggle active={biometrics} onToggle={() => setBiometrics(!biometrics)} />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Master Notifications</p>
                  <p className="text-[10px] text-gray-400">Enable all app alerts</p>
                </div>
              </div>
              <Toggle active={notifications} onToggle={() => setNotifications(!notifications)} />
            </div>
          </div>
        </section>
      </div>

      <div className="text-center pt-4">
        <button className="text-xs font-bold text-blue-600 hover:underline">Reset All Preferences</button>
      </div>
    </div>
  );
};

export default SettingsView;
