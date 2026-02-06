import React, { useState } from 'react';
import { Fingerprint } from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
}

type LoginMethod = 'email' | 'phone';

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [method, setMethod] = useState<LoginMethod>('email');
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 max-w-md mx-auto">
      <div className="w-full text-center mb-8">
        <h1 className="text-xl font-bold text-gray-800 mb-6">eID Login</h1>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <p className="text-xs text-gray-500 mb-6 leading-relaxed px-4">
            Obtain a long term access token and to authenticate and protect eID data.
          </p>
          <button 
            onClick={handleAction}
            className="w-full py-3.5 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg active:scale-95"
          >
            Login with eID
          </button>
        </div>

        <div className="bg-yellow-100/80 p-6 rounded-3xl border border-yellow-200 text-left">
          <p className="text-[11px] text-yellow-900 leading-relaxed font-medium">
            The system environment supports multiple authentication methods including digital signatures, facial biometric recognition, and national identity cards. Ensure your eID is valid and recognized by the municipal identity provider to access sensitive services and payments securely. Authenticated sessions are encrypted end-to-end to protect personal data from unauthorized access.
          </p>
        </div>
      </div>

      <div className="w-full space-y-4 pt-8 border-t border-gray-200">
        <div className="flex bg-slate-200/50 p-1 rounded-xl">
          {(['email', 'phone'] as LoginMethod[]).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 py-2.5 text-[10px] font-black rounded-lg transition-all uppercase tracking-wider ${
                method === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleAction}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-100 text-gray-600 rounded-2xl font-bold text-xs hover:bg-gray-50 transition-all shadow-sm"
        >
          <Fingerprint className="w-4 h-4 text-blue-500" />
          Use Biometrics
        </button>
      </div>
    </div>
  );
};

export default LoginView;