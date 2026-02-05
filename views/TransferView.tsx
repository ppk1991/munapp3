
import React, { useState } from 'react';
import { ChevronLeft, Send, Search, Users, ShieldCheck, Info, Wallet, ArrowRight } from 'lucide-react';

interface TransferViewProps {
  onBack: () => void;
  onConfirm: (amount: string, recipient: string) => void;
  currentBalance: number;
}

const TransferView: React.FC<TransferViewProps> = ({ onBack, onConfirm, currentBalance }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedRecipient, setVerifiedRecipient] = useState<string | null>(null);

  const handleVerify = () => {
    if (!recipient) return;
    setIsVerifying(true);
    // Simulation of checking the eID in the municipal database
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedRecipient(recipient.length > 5 ? "ALEXANDRU M. (Verified eID)" : "Recipient ID Valid");
    }, 1200);
  };

  const handleTransfer = () => {
    if (!amount || !recipient || parseFloat(amount) > currentBalance) return;
    onConfirm(amount, verifiedRecipient || recipient);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-2">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg -ml-2 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Transfer Funds</h2>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-1 leading-none">Your Available Balance</p>
        <p className="text-3xl font-black">{currentBalance.toFixed(2)} <span className="text-sm font-bold opacity-70">MDL</span></p>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Recipient Information</p>
            <button className="text-[10px] font-bold text-blue-600 flex items-center gap-1">
              <Users className="w-3 h-3" /> Recent
            </button>
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="eID / IDNP or Phone Number"
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                setVerifiedRecipient(null);
              }}
              className="w-full pl-4 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button 
              onClick={handleVerify}
              disabled={isVerifying || !recipient}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl disabled:opacity-30 transition-all hover:bg-blue-700"
            >
              {isVerifying ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
            </button>
          </div>

          {verifiedRecipient && (
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">{verifiedRecipient}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Amount to Transfer</p>
          <div className="relative">
            <input 
              type="number" 
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-2xl font-black text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">MDL</span>
          </div>
          {parseFloat(amount) > currentBalance && (
            <p className="text-[10px] text-red-500 font-bold px-1 italic">Insufficient funds in your wallet.</p>
          )}
        </div>

        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
            Internal transfers within MUNAPP are free. Recipients can use transferred funds to pay for any municipal service or withdraw to a linked bank card.
          </p>
        </div>

        <button 
          onClick={handleTransfer}
          disabled={!amount || !verifiedRecipient || parseFloat(amount) > currentBalance}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
          Send Transfer
        </button>
      </div>
    </div>
  );
};

export default TransferView;
