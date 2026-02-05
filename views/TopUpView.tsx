
import React, { useState } from 'react';
import { ChevronLeft, CreditCard, Apple, Wallet, CheckCircle2, Zap, Bus, Ticket, Info, ShoppingBag, AlertCircle, Send, ArrowRight } from 'lucide-react';

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
  const [isSuccess, setIsSuccess] = useState(false);

  const quickAmounts = ['50', '100', '200', '500'];

  const products = [
    { 
      id: 'rtec-monthly', 
      name: 'RTEC Monthly Pass', 
      operator: 'RTEC (Trolleybus)', 
      price: 234, 
      icon: Zap, 
      desc: 'Unlimited trips on all trolleybus lines in Chișinău.' 
    },
    { 
      id: 'pua-monthly', 
      name: 'PUA Monthly Pass', 
      operator: 'PUA (Bus)', 
      price: 234, 
      icon: Bus, 
      desc: 'Unlimited trips on all municipal bus lines (urban & suburban).' 
    },
    { 
      id: 'rtec-single', 
      name: 'RTEC Single Ticket', 
      operator: 'RTEC (Trolleybus)', 
      price: 6, 
      icon: Ticket, 
      desc: 'Valid for one trip on any RTEC Trolleybus.' 
    },
    { 
      id: 'pua-single', 
      name: 'PUA Single Ticket', 
      operator: 'PUA (Bus)', 
      price: 6, 
      icon: Ticket, 
      desc: 'Valid for one trip on any PUA Municipal Bus.' 
    }
  ];

  const handleTopUp = () => {
    setIsProcessing(true);
    const finalAmount = customAmount || amount;
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirm(finalAmount);
      }, 1500);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-in zoom-in-95 duration-300">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Purchase Successful!</h2>
        <p className="text-gray-500 text-center px-8">Your digital MUNAPP wallet has been updated. You can view your active services and balance on the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-2">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg -ml-2 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Digital Wallet</h2>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-1">Total Available Balance</p>
            <p className="text-3xl font-black">{currentBalance.toFixed(2)} MDL</p>
          </div>
          <div className="flex items-center gap-2 mb-1">
             <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Wallet className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button 
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${activeTab === 'products' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
        >
          Tickets
        </button>
        <button 
          onClick={() => setActiveTab('balance')}
          className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${activeTab === 'balance' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
        >
          Add Funds
        </button>
        <button 
          onClick={() => {
            setActiveTab('transfer');
            onNavigateToTransfer();
          }}
          className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${activeTab === 'transfer' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
        >
          Transfer
        </button>
      </div>

      {activeTab === 'products' ? (
        <div className="space-y-4">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-amber-800 font-bold uppercase tracking-widest mb-1">Non-Integrated System Notice</p>
              <p className="text-[10px] text-amber-800 font-medium leading-relaxed">
                Chișinău utilizes separate operators. RTEC tickets are NOT valid on PUA buses, and vice versa. Please ensure you buy the correct ticket for your vehicle.
              </p>
            </div>
          </div>

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
                    <p className="text-sm font-black text-blue-600">{prod.price} <span className="text-[10px] font-bold text-gray-400">MDL</span></p>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{prod.operator}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{prod.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : activeTab === 'balance' ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-4">
            <p className="text-sm font-bold text-gray-800 px-1">Select Amount</p>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                    amount === amt && !customAmount ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-gray-100 text-gray-600 hover:border-blue-200'
                  }`}
                >
                  {amt}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <input
                type="number"
                placeholder="Custom amount (MDL)"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount('');
                }}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 uppercase">MDL</span>
            </div>
          </div>

          <button
            onClick={handleTopUp}
            disabled={isProcessing || (!amount && !customAmount)}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5" />
                Confirm Top Up
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <Send className="w-8 h-8" />
            </div>
            <p className="text-gray-500 text-sm font-medium">Navigating to Transfer Interface...</p>
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-3 h-3 text-gray-400" />
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Helpful Info</p>
        </div>
        <p className="text-[10px] text-gray-500 leading-relaxed italic">
          Funds in your MUNAPP wallet can be used for any municipal service, utilities, or transfers to other eID holders. Transport tickets are automatically activated on boarding.
        </p>
      </div>
    </div>
  );
};

export default TopUpView;
