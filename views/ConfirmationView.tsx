
import React from 'react';
import { CheckCircle2, ChevronRight, FileText, Share2, Download, Home, Briefcase, Clock, MapPin, Landmark, Stethoscope } from 'lucide-react';

interface ConfirmationViewProps {
  title: string;
  description: string;
  amount?: string;
  id: string;
  type: 'payment' | 'service' | 'transfer';
  details?: {
    time?: string;
    office?: string;
    street?: string;
    doctor?: string;
  };
  onClose: () => void;
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({ title, description, amount, id, type, details, onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-6 animate-in zoom-in-95 duration-500 py-8">
      <div className="relative">
        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-25" />
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center relative z-10">
          <CheckCircle2 className="w-10 h-10" />
        </div>
      </div>

      <div className="text-center space-y-2 px-6">
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">{title}</h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">{description}</p>
      </div>

      {details && (
        <div className="w-full bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-100 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Landmark className="w-4 h-4 opacity-70" />
            <p className="text-[10px] font-black uppercase tracking-widest">Assignment Details</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[9px] font-bold uppercase opacity-60">Assigned Time</p>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <p className="text-sm font-bold">{details.time}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold uppercase opacity-60">Location / Office</p>
              <div className="flex items-center gap-2">
                <Landmark className="w-3.5 h-3.5" />
                <p className="text-sm font-bold">{details.office}</p>
              </div>
            </div>
            <div className="col-span-2 space-y-1 border-t border-white/10 pt-2">
              <p className="text-[9px] font-bold uppercase opacity-60">Street Address</p>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <p className="text-xs font-bold leading-tight">{details.street}</p>
              </div>
            </div>
            {details.doctor && (
              <div className="col-span-2 space-y-1 border-t border-white/10 pt-2">
                <p className="text-[9px] font-bold uppercase opacity-60">Assigned Professional</p>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <p className="text-sm font-bold">{details.doctor}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="w-full bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Ledger ID</p>
          <p className="text-xs font-mono font-bold text-gray-700">#{id}</p>
        </div>
        
        {amount && (
          <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Amount</p>
            <p className="text-base font-black text-blue-600">{amount} MDL</p>
          </div>
        )}

        <div className="flex justify-between items-center py-1.5">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Registered At</p>
          <p className="text-[10px] font-bold text-gray-700">{new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} Today</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 hover:bg-gray-100 transition-colors group">
          <Download className="w-4 h-4 opacity-60" />
          <span className="text-[10px] font-bold uppercase">Receipt</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 hover:bg-gray-100 transition-colors group">
          <Share2 className="w-4 h-4 opacity-60" />
          <span className="text-[10px] font-bold uppercase">Share</span>
        </button>
      </div>

      <div className="w-full space-y-3 pt-2">
        <button 
          onClick={onClose}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95"
        >
          <Home className="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ConfirmationView;
