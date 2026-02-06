
import React, { useState } from 'react';
import { ChevronLeft, CreditCard, Apple, Wallet, CheckCircle2, Zap, Bus, Ticket, Info, ShoppingBag, AlertCircle, Send, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

interface TopUpViewProps {
  onBack: () => void;
  onConfirm: (amount: string) => void;
  onPurchase: (product: { name: string, price: number }) => void;
  currentBalance: number;
  onNavigateToTransfer: () => void;
}

const TopUpView: React.FC<TopUpViewProps> = ({ onBack, onConfirm, onPurchase, currentBalance, onNavigateToTransfer }) => {
  const [activeTab, setActiveTab] = useState<'balance' | 'products' | 'transfer'>('products');
  const [amount, setAmount] = useState('100');
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'selection' | 'card_entry'>('selection');

  const quickAmounts = ['50', '100', '200', '500'];

  const products = [
    { id: 'rtec-monthly', name: 'RTEC Monthly Pass', operator: 'RTEC (Trolleybus)', price: 234, icon: Zap, desc: 'Unlimited trips on all trolleybus lines.' },
    { id: 'pua-monthly', name: 'PUA Monthly Pass', operator: 'PUA (Bus)', price: 234, icon: Bus, desc: 'Unlimited trips on all municipal buses.' }
  ];

  const handleTopUpConfirm = () => {
    setIsProcessing(true);
    const finalAmount = customAmount || amount;
    
    // Simulate payment processing with bank
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm(finalAmount);
    }, 2200);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-20">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg -ml-2 transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Digital Wallet</h2>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-1 leading-none">Your Available Balance</p>
            <p className="text-3xl font-black">{currentBalance.toFixed(2)} MDL</p>
          </div>
          <div className="flex items-center gap-2 mb-1">
             <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Wallet className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button onClick={() => { setActiveTab('products'); setStep('selection'); }} className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${activeTab === 'products' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Tickets</button>
        <button onClick={() => { setActiveTab('balance'); setStep('selection'); }} className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${activeTab === 'balance' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Add Funds</button>
        <button onClick={onNavigateToTransfer} className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all text-slate-500`}>Transfer</button>
      </div>

      {activeTab === 'products' && (
        <div className="space-y-4">
          <p className="text-sm font-bold text-gray-800 px-1">Available Transport Passes</p>
          <div className="space-y-3">
            {products.map((prod) => (
              <button
                key={prod.id}
                onClick={() => onPurchase({ name: prod.name, price: prod.price })}
                className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 text-left hover:border-blue-200 transition-all group active:scale-[0.98]"
              >
                <div className={`w-12 h-12 ${prod.operator.includes('RTEC') ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'} rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                  <prod.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-bold text-gray-800">{prod.name}</p>
                    <p className="text-sm font-black text-blue-600">{prod.price} MDL</p>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{prod.operator}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'balance' && step === 'selection' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-4">
            <p className="text-sm font-bold text-gray-800 px-1 text-center">Select Amount to Add</p>
            <div className="grid grid-cols-2 gap-3">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setAmount(amt); setCustomAmount(''); }}
                  className={`py-4 rounded-2xl text-lg font-black transition-all border-2 ${
                    amount === amt && !customAmount ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-[1.02]' : 'bg-white border-gray-100 text-gray-500'
                  }`}
                >
                  {amt} <span className="text-[10px]">MDL</span>
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Other Amount (MDL)"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setAmount(''); }}
              className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-center text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <button
            disabled={!amount && !customAmount}
            onClick={() => setStep('card_entry')}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95"
          >
            Continue to Bank Card
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {activeTab === 'balance' && step === 'card_entry' && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
               <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                 <CreditCard className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-xs font-bold text-gray-800">Secure Bank Portal</p>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">MPay / Vicoriabank Link</p>
               </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Card Number</label>
                <input type="text" placeholder="4567 •••• •••• 9921" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-mono font-bold text-gray-700 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-mono font-bold text-gray-700 focus:outline-none" />
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">CVV</label>
                  <input type="password" placeholder="•••" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-mono font-bold text-gray-700 focus:outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="text-[10px] font-bold text-emerald-800 leading-tight">
                Encrypted via municipal security layer. Bank credentials are not stored in MUNAPP.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setStep('selection')}
              className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold text-sm"
            >
              Back
            </button>
            <button
              onClick={handleTopUpConfirm}
              disabled={isProcessing}
              className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Authorize {customAmount || amount} MDL
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopUpView;
