
import React, { useState } from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';

interface PaymentViewProps {
  onConfirm: (amount: string) => void;
  initialAmount?: string;
  initialDescription?: string;
}

const PaymentView: React.FC<PaymentViewProps> = ({ onConfirm, initialAmount, initialDescription }) => {
  const [amount, setAmount] = useState(initialAmount || '150.00');
  const [desc, setDesc] = useState(initialDescription || 'Service Fee for Municipal Registration');
  const [isPaid, setIsPaid] = useState(false);

  const handlePay = () => {
    setIsPaid(true);
    setTimeout(() => {
      onConfirm(amount);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Payment via MPay</h2>
        <p className="text-sm text-gray-500 mt-1">Citizens complete payments for taxes, utilities, parking, or fees through MPay.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Amount (MDL)</label>
          <input 
            type="text" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-xl text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Description</label>
          <textarea 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {isPaid ? (
          <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl flex items-center gap-3 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-sm">Payment confirmed! Generating receipt...</span>
          </div>
        ) : (
          <button 
            onClick={handlePay}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Pay with MPay
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <img src="https://picsum.photos/seed/mpay/100/40" alt="MPay Logo" className="opacity-50 grayscale" />
      </div>
    </div>
  );
};

export default PaymentView;
