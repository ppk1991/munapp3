
import React, { useState } from 'react';
import { ShieldCheck, Fingerprint, Mail, Phone, Smartphone, Lock, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
}

type LoginMethod = 'eid' | 'email' | 'phone';

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [method, setMethod] = useState<LoginMethod>('eid');
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = () => {
    setIsLoading(true);
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  const renderMethodIcon = () => {
    switch (method) {
      case 'eid': return <ShieldCheck className="w-10 h-10" />;
      case 'email': return <Mail className="w-10 h-10" />;
      case 'phone': return <Smartphone className="w-10 h-10" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-50 max-w-md mx-auto relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-50 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-50" />

      <div className="w-full max-w-sm relative z-10 text-center">
        <div className={`w-20 h-20 mx-auto bg-white text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-100/50 transition-all duration-500 transform ${isLoading ? 'scale-90 opacity-50' : 'scale-100'}`}>
          {renderMethodIcon()}
        </div>
        
        <h1 className="text-4xl font-black text-blue-600 mb-1 tracking-tight">MUNAPP</h1>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-10">Chișinău Digital</p>

        {/* Method Selector */}
        <div className="bg-slate-200/50 p-1 rounded-2xl flex mb-8">
          {(['eid', 'email', 'phone'] as LoginMethod[]).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 uppercase tracking-wider ${
                method === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {m === 'eid' ? 'eID' : m}
            </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-white/50 space-y-5">
          {method === 'eid' && (
            <div className="space-y-4 py-2">
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Log in using your official electronic identity to access all municipal services securely.
              </p>
              <button 
                onClick={handleAction}
                disabled={isLoading}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? 'Authenticating...' : 'Sign in with eID'}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          )}

          {method === 'email' && (
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <button 
                onClick={handleAction}
                disabled={isLoading}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Login'}
              </button>
            </div>
          )}

          {method === 'phone' && (
            <div className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <div className="flex items-center">
                  <span className="absolute left-12 text-sm font-bold text-slate-600">+373</span>
                  <input 
                    type="tel" 
                    placeholder="Phone Number"
                    className="w-full pl-24 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-medium px-1">
                A verification code (OTP) will be sent to your number via SMS.
              </p>
              <button 
                onClick={handleAction}
                disabled={isLoading}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? 'Sending OTP...' : 'Get Verification Code'}
              </button>
            </div>
          )}

          <div className="pt-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-slate-100 flex-1" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Fast Access</span>
              <div className="h-px bg-slate-100 flex-1" />
            </div>
            
            <button 
              onClick={handleAction}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl border-2 border-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all group"
            >
              <Fingerprint className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
              Use Biometrics
            </button>
          </div>
        </div>

        <div className="mt-8 bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50">
          <p className="text-[10px] text-blue-800 leading-relaxed font-medium">
            By signing in, you agree to MUNAPP's terms of data sharing. Your identity is automatically linked to your administrative unit and taxpayer profile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
