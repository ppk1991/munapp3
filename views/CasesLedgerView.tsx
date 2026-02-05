
import React from 'react';
import { ChevronRight, Filter } from 'lucide-react';

const CasesLedgerView: React.FC = () => {
  const cases = [
    { id: "12345", date: "2023-10-26", title: "Transport Pass Renewal", status: "Approved", color: "bg-green-100 text-green-700" },
    { id: "12344", date: "2023-09-15", title: "Mircea cel Bătrân Alley Rehabilitation Feedback", status: "In Progress", color: "bg-blue-100 text-blue-700" },
    { id: "12343", date: "2023-08-01", title: "Kindergarten Waitlist Confirmation", status: "Completed", color: "bg-gray-100 text-gray-700" },
    { id: "12342", date: "2023-07-20", title: "Subsidized Heating Application", status: "Completed", color: "bg-gray-100 text-gray-700" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Municipal Ledger</h2>
        <button className="p-2 text-gray-400 hover:text-blue-600">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {cases.map((c, idx) => (
          <div 
            key={idx}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Service #{c.id}</span>
              <span className="text-xs text-gray-400 font-medium">{c.date}</span>
            </div>
            <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{c.title}</h3>
            <div className="flex items-center justify-between mt-4">
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${c.color}`}>
                Status: {c.status}
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-xl">
        <p className="text-xs text-blue-700 leading-relaxed italic text-center">
          History of direct deliverables and social services linked to your municipal eID.
        </p>
      </div>
    </div>
  );
};

export default CasesLedgerView;
