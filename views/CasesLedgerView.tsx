import React from 'react';
import { ChevronRight, Menu } from 'lucide-react';

const CasesLedgerView: React.FC = () => {
  const cases = [
    { id: "F12345", date: "2023-10-26", title: "Application for Parking Permit", status: "Approved", color: "text-green-600 bg-green-50" },
    { id: "F12344", date: "2023-09-15", title: "Feedback for Public Bus Performance", status: "In Progress", color: "text-orange-600 bg-orange-50" },
    { id: "F12343", date: "2023-08-01", title: "Child Registration", status: "Completed", color: "text-emerald-600 bg-emerald-50" },
    { id: "F12342", date: "2023-07-20", title: "Residence Change Notification", status: "Completed", color: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-black text-gray-800">My Cases Ledger</h2>
        <Menu className="w-6 h-6 text-gray-600" />
      </div>

      <div className="space-y-4">
        {cases.map((c, idx) => (
          <div 
            key={idx}
            className="bg-white p-5 rounded-3xl border border-gray-50 shadow-sm flex items-center justify-between group hover:border-blue-100 transition-all cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Case #{c.id}</p>
                <p className="text-[10px] font-bold text-gray-300">{c.date}</p>
              </div>
              <h3 className="text-xs font-black text-gray-700 truncate pr-4">{c.title}</h3>
              <div className="mt-4 flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${c.color}`}>
                  Status: {c.status}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CasesLedgerView;