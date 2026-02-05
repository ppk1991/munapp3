
import React, { useState } from 'react';
import { 
  ChevronLeft, Zap, Droplets, Thermometer, CreditCard, 
  CheckCircle2, AlertCircle, Flame, Building, Receipt, 
  Trash2, AlertTriangle, Circle 
} from 'lucide-react';

interface UtilityBill {
  id: string;
  provider: string;
  type: string;
  amount: number;
  dueDate: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  isOverdue?: boolean;
}

interface UtilityPaymentViewProps {
  onBack: () => void;
  onPay: (amount: number, description: string) => void;
}

const UtilityPaymentView: React.FC<UtilityPaymentViewProps> = ({ onBack, onPay }) => {
  const [selectedUtilities, setSelectedUtilities] = useState<string[]>([]);
  
  const utilities: UtilityBill[] = [
    { 
      id: 'heat', 
      provider: 'Termoelectrica', 
      type: 'Centralized Heating', 
      amount: 1200.00, 
      dueDate: 'Oct 20', 
      icon: Thermometer, 
      color: 'text-red-600',
      bg: 'bg-red-50',
      isOverdue: true
    },
    { 
      id: 'elec', 
      provider: 'Premier Energy', 
      type: 'Electricity', 
      amount: 450.20, 
      dueDate: 'Nov 05', 
      icon: Zap, 
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    },
    { 
      id: 'water', 
      provider: 'Apă-Canal Chișinău', 
      type: 'Water & Sewerage', 
      amount: 185.30, 
      dueDate: 'Nov 02', 
      icon: Droplets, 
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    { 
      id: 'gas', 
      provider: 'Moldovagaz', 
      type: 'Natural Gas', 
      amount: 390.50, 
      dueDate: 'Nov 02', 
      icon: Flame, 
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    { 
      id: 'housing', 
      provider: 'Infocom / Î.M.G.F.L.', 
      type: 'Housing Stock & Maintenance', 
      amount: 210.00, 
      dueDate: 'Oct 31', 
      icon: Building, 
      color: 'text-slate-600',
      bg: 'bg-slate-50'
    },
    { 
      id: 'sanitation', 
      provider: 'Regia Autosalubritate', 
      type: 'Sanitation Tax', 
      amount: 30.00, 
      dueDate: 'Oct 31', 
      icon: Trash2, 
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    { 
      id: 'tax', 
      provider: 'Direcția Impozite', 
      type: 'Local Property Tax', 
      amount: 155.00, 
      dueDate: 'Nov 15', 
      icon: Receipt, 
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
  ];

  const toggleUtility = (id: string) => {
    setSelectedUtilities(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedUtilities.length === utilities.length) {
      setSelectedUtilities([]);
    } else {
      setSelectedUtilities(utilities.map(u => u.id));
    }
  };

  const totalSelected = utilities
    .filter(u => selectedUtilities.includes(u.id))
    .reduce((sum, u) => sum + u.amount, 0);

  const handleProceedToPayment = () => {
    const selectedProviders = utilities
      .filter(u => selectedUtilities.includes(u.id))
      .map(u => u.provider)
      .join(', ');
    onPay(totalSelected, `Consolidated Utility Payment for: ${selectedProviders}`);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg -ml-2 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Utility Bills</h2>
        </div>
        <button 
          onClick={selectAll}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          {selectedUtilities.length === utilities.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-orange-900">Overdue Payments Detected</p>
          <p className="text-xs text-orange-700 leading-relaxed">
            One or more bills have passed their due date. Pay promptly to avoid service interruptions or late fees.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {utilities.map((u) => (
          <button
            key={u.id}
            onClick={() => toggleUtility(u.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
              selectedUtilities.includes(u.id) 
                ? 'border-blue-600 bg-white shadow-md scale-[1.01]' 
                : 'border-transparent bg-white shadow-sm hover:border-blue-100'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl ${u.bg} ${u.color} flex items-center justify-center shrink-0`}>
              <u.icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter truncate">{u.provider}</p>
                {u.isOverdue && (
                  <span className="text-[8px] font-black text-white bg-red-500 px-1.5 py-0.5 rounded uppercase tracking-tighter">Overdue</span>
                )}
              </div>
              <p className="text-sm font-bold text-gray-800 truncate">{u.type}</p>
              <p className="text-[10px] text-gray-500 font-medium">Due: {u.dueDate}</p>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
              <p className="text-base font-black text-gray-900">{u.amount.toFixed(2)} <span className="text-[10px] text-gray-400">MDL</span></p>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedUtilities.includes(u.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-200'
              }`}>
                {selectedUtilities.includes(u.id) ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-100" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedUtilities.length > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-4 animate-in slide-in-from-bottom-6 duration-300">
          <div className="bg-white p-5 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-4">
            <div className="flex justify-between items-center px-2">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Items Selected: {selectedUtilities.length}</p>
                <p className="text-xs font-bold text-slate-600">Total Payable Amount</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-blue-600">{totalSelected.toFixed(2)}</span>
                <span className="text-xs font-bold text-slate-400 ml-1">MDL</span>
              </div>
            </div>
            <button 
              onClick={handleProceedToPayment}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95"
            >
              <CreditCard className="w-5 h-5" />
              Pay via MPay Gateway
            </button>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-8">
        <p className="text-[10px] text-blue-800 leading-relaxed font-medium italic text-center">
          Consolidated billing is updated every 24 hours. Payments via MPay are reflected in the municipal ledger instantly.
        </p>
      </div>
    </div>
  );
};

export default UtilityPaymentView;
