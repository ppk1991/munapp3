
import React, { useState } from 'react';
import { ChevronLeft, Vote, ShieldCheck, CheckCircle2, Info, Users, Clock, ArrowRight } from 'lucide-react';

interface VotingViewProps {
  onBack: () => void;
}

const VotingView: React.FC<VotingViewProps> = ({ onBack }) => {
  const [voted, setVoted] = useState<string | null>(null);
  const [signing, setSigning] = useState(false);

  const activeInitiatives = [
    {
      id: 'VOTE-001',
      title: 'Ciocana Sector: Mircea cel Bătrân Alley Extension',
      description: 'Public consultation for the extension of the main pedestrian alley and modernization of green spaces and leisure areas along the boulevard.',
      sector: 'Sector Ciocana',
      expiry: '3 days left',
      participation: '18,200 citizens',
      votersGoal: 25000
    },
    {
      id: 'VOTE-002',
      title: 'Bubuieci Suburb: School Connectivity',
      description: 'Fiber-optic infrastructure expansion for local educational centers in Bubuieci and adjacent residential areas.',
      sector: 'Suburb Bubuieci',
      expiry: '5 days left',
      participation: '4,100 citizens',
      votersGoal: 5000
    }
  ];

  const handleVote = (id: string) => {
    setSigning(true);
    // Simulate eID digital signature
    setTimeout(() => {
      setSigning(false);
      setVoted(id);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg -ml-2 transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Digital Democracy</h2>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[2rem] text-center">
        <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-100">
          <Vote className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-indigo-900 leading-tight">Your Voice Matters</h3>
        <p className="text-xs text-indigo-600 font-medium mt-1">Chișinău eID-Verified Voting Platform</p>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
          <Clock className="w-3 h-3" /> Local Referendums (Bubuieci / Ciocana)
        </p>

        {activeInitiatives.map((item) => (
          <div key={item.id} className={`bg-white rounded-2xl border transition-all p-5 space-y-4 ${
            voted === item.id ? 'border-green-200 bg-green-50/20' : 'border-slate-100'
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[8px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-widest">{item.sector}</span>
                <h4 className="font-bold text-gray-800 mt-1">{item.title}</h4>
              </div>
              <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap">{item.expiry}</span>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Users className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase">{item.participation}</span>
                </div>
                <span className="text-[10px] font-bold text-indigo-600">{Math.round((parseInt(item.participation.replace(',', '')) / item.votersGoal) * 100)}% Participation</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-1000" 
                  style={{ width: `${(parseInt(item.participation.replace(',', '')) / item.votersGoal) * 100}%` }}
                />
              </div>
            </div>

            {voted === item.id ? (
              <div className="flex items-center justify-center gap-2 text-green-600 bg-green-100/50 py-3 rounded-xl font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Vote Recorded & Signed
              </div>
            ) : (
              <button 
                onClick={() => handleVote(item.id)}
                disabled={signing}
                className="w-full py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {signing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin" />
                    Digitally Signing...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Sign Vote with eID
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-50 p-4 rounded-xl flex gap-3 items-start">
        <span className="p-1.5 bg-white rounded-lg border border-slate-100">
           <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        </span>
        <p className="text-[9px] text-slate-500 leading-relaxed italic">
          Initiatives are filtered by your residential unit (Bubuieci). Once signed with eID, votes are immutable and verified via the municipal blockchain.
        </p>
      </div>
    </div>
  );
};

export default VotingView;
