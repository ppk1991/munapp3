
import React, { useState } from 'react';
import { CreditCard, Wallet, ShieldCheck, ChevronRight, CheckCircle2, Landmark, AlertCircle } from 'lucide-react';

interface PaymentViewProps {
  onConfirm: (amount: string, useWallet: boolean) => void;
  initialAmount?: string;
  initialDescription?: string;
  currentWalletBalance: number;
}

const PaymentView: React.FC<PaymentViewProps> = ({ 
  onConfirm, 
  initialAmount, 
  initialDescription,
  currentWalletBalance 
}) => {
  const [amount, setAmount] = useState(initialAmount || '150.00');
  const [desc, setDesc] = useState(initialDescription || 'Service Fee for Municipal Registration');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'card'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const amountNum = parseFloat(amount);
  const hasInsufficientFunds = paymentMethod === 'wallet' && currentWalletBalance < amountNum;

  const handlePay = () => {
    if (hasInsufficientFunds) return;
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm(amount, paymentMethod === 'wallet');
    }, 1800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-md mx-auto">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <div className="bg-blue-600 px-4 py-1.5 rounded-xl flex items-center gap-2">
             <Landmark className="w-4 h-4 text-white" />
             <span className="text-[10px] font-black text-white tracking-widest">MPay GATEWAY</span>
          </div>
        </div>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">Consolidated Payment</h2>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Transaction Security: 256-bit AES</p>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Payment for</label>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-700 leading-relaxed">{desc}</p>
          </div>
        </div>

        <div className="flex justify-between items-end bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
          <div>
            <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Total Amount Due</p>
            <p className="text-4xl font-black text-blue-600 tracking-tighter">{amount}</p>
          </div>
          <p className="text-sm font-black text-blue-400 mb-1">MDL</p>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Choose Payment Method</label>
          
          <button 
            onClick={() => setPaymentMethod('wallet')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
              paymentMethod === 'wallet' ? 'border-blue-600 bg-blue-50/20' : 'border-gray-50 bg-white hover:border-blue-100'
            }`}
          >
            <div className="flex items-center gap-3 text-left">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'wallet' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">MUNAPP Wallet</p>
                <p className={`text-[10px] font-bold ${currentWalletBalance < amountNum ? 'text-red-500' : 'text-gray-400'}`}>
                  Balance: {currentWalletBalance.toFixed(2)} MDL
                </p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'wallet' ? 'border-blue-600' : 'border-gray-200'}`}>
              {paymentMethod === 'wallet' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
            </div>
          </button>

          <button 
            onClick={() => setPaymentMethod('card')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
              paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/20' : 'border-gray-50 bg-white hover:border-blue-100'
            }`}
          >
            <div className="flex items-center gap-3 text-left">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Bank Card</p>
                <p className="text-[10px] text-gray-400 font-bold">MPay External Gateway</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-blue-600' : 'border-gray-200'}`}>
              {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
            </div>
          </button>
        </div>
      </div>

      {hasInsufficientFunds && (
        <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-3 animate-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-[10px] font-bold text-red-600 uppercase tracking-tight">
            Insufficient funds in MUNAPP Wallet. Please top up or use an external card.
          </p>
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
        <p className="text-[9px] text-gray-500 font-medium leading-relaxed italic">
          Transactions are authorized via your verified eID session. No data is stored outside the municipal encrypted vault.
        </p>
      </div>

      <button 
        onClick={handlePay}
        disabled={isProcessing || hasInsufficientFunds}
        className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:bg-slate-300 flex items-center justify-center gap-3"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Connecting to MPay...
          </>
        ) : (
          <>
            <ShieldCheck className="w-5 h-5" />
            Confirm Payment
          </>
        )}
      </button>
    </div>
  );
};

export default PaymentView;
