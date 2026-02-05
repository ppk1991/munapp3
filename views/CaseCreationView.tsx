
import React, { useState, useMemo, useRef } from 'react';
import { 
  ClipboardCheck, ArrowDown, CreditCard, CheckCircle2, 
  MapPin, School, Baby, X, RefreshCcw, Lock, 
  Scan, Camera, ShieldCheck, Landmark, Wallet, Stethoscope
} from 'lucide-react';
import { ServiceItem } from './ServicesView';

interface CaseCreationViewProps {
  service: ServiceItem;
  onConfirm: () => void;
}

interface Institution {
  id: string;
  name: string;
  address: string;
  sector: string;
  isSuburb?: boolean;
}

const CaseCreationView: React.FC<CaseCreationViewProps> = ({ service, onConfirm }) => {
  const [caseId] = useState(() => `CHIS-${Math.floor(Math.random() * 90000) + 10000}`);
  const [selectedSector, setSelectedSector] = useState('Centru');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('');
  const [childName, setChildName] = useState('');
  const [childEid, setChildEid] = useState('');
  
  // Benefit Specific Fields
  const [iban, setIban] = useState('');
  const [benefitType, setBenefitType] = useState('Standard');

  // ID Scanning State
  const [isScanning, setIsScanning] = useState(false);
  const [scannedIdData, setScannedIdData] = useState<string | null>(null);
  const [isProcessingScan, setIsProcessingScan] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isEducational = service.category === 'education';
  const isBenefit = service.category === 'social';
  const isHealth = service.category === 'health';
  const requiresIdScan = service.requiresIdScan;

  const sectors = ['Centru', 'Ciocana', 'Botanica', 'Buiucani', 'Rîșcani'];

  const institutions: Institution[] = useMemo(() => {
    const data: Institution[] = [
      // --- CENTRU ---
      { id: 'KG-46', name: 'Grădinița-creșă Nr. 46', address: 'Str. Vlaicu Pârcălab 15', sector: 'Centru' },
      { id: 'KG-23', name: 'Grădinița Nr. 23', address: 'Str. Mitropolit Varlaam 50', sector: 'Centru' },
      { id: 'KG-COD1', name: 'Grădinița "Codru"', address: 'Str. Costiujeni, Codru', sector: 'Centru', isSuburb: true },
      { id: 'SC-GA', name: 'Liceul Teoretic "Gheorghe Asachi"', address: 'Str. București 64', sector: 'Centru' },
      { id: 'SC-COD1', name: 'Liceul Teoretic "Codru"', address: 'Str. Sfîntul Ion, Codru', sector: 'Centru', isSuburb: true },

      // --- CIOCANA ---
      { id: 'KG-225', name: 'Grădinița-creșă Nr. 225', address: 'Str. Petru Zadnipru 14', sector: 'Ciocana' },
      { id: 'KG-B1', name: 'Grădinița Bubuieci Nr. 1', address: 'Str. Școlii 4, Bubuieci', sector: 'Ciocana', isSuburb: true },
      { id: 'SC-PZ', name: 'Liceul Teoretic "Petru Zadnipru"', address: 'Str. Maria Drăgan 2', sector: 'Ciocana' },
      { id: 'SC-TB', name: 'Liceul Teoretic "Toader Bubuiog"', address: 'Str. Ștefan cel Mare, Bubuieci', sector: 'Ciocana', isSuburb: true },

      // --- BOTANICA ---
      { id: 'KG-183', name: 'Grădinița-creșă Nr. 183', address: 'Str. Cuza Vodă 35', sector: 'Botanica' },
      { id: 'KG-S1', name: 'Grădinița Sîngera Nr. 1', address: 'Str. Chișinăului, Sîngera', sector: 'Botanica', isSuburb: true },
      { id: 'SC-GV', name: 'Liceul Teoretic "Grigore Vieru"', address: 'Str. Ștefan cel Mare, Băcioi', sector: 'Botanica', isSuburb: true },

      // --- BUIUCANI ---
      { id: 'KG-119', name: 'Grădinița-creșă Nr. 119', address: 'Str. Alba Iulia 2', sector: 'Buiucani' },
      { id: 'KG-DUR1', name: 'Grădinița "Ghiocel"', address: 'Str. Livezilor, Durlești', sector: 'Buiucani', isSuburb: true },
      { id: 'SC-HYP', name: 'Liceul Teoretic "Hyperion"', address: 'Str. Alexandru cel Bun, Durlești', sector: 'Buiucani', isSuburb: true },

      // --- RÎȘCANI ---
      { id: 'KG-100', name: 'Grădinița Nr. 100', address: 'Str. Kiev 12', sector: 'Rîșcani' },
      { id: 'KG-STA1', name: 'Grădinița Stăuceni', address: 'Str. Unirii, Stăuceni', sector: 'Rîșcani', isSuburb: true },
      { id: 'SC-DV', name: 'Liceul Teoretic "Dragoș Vodă"', address: 'Str. Stamati, Stăuceni', sector: 'Rîșcani', isSuburb: true },
    ];

    const typeFilter = service.title.includes('Kindergarten') ? 'KG' : 'SC';
    return data.filter(item => item.id.startsWith(typeFilter) && item.sector === selectedSector);
  }, [selectedSector, service.title]);

  const startScanning = async () => {
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera access failed", err);
      setTimeout(() => stopScanning("IDNP: 2004001992102"), 3000);
    }
  };

  const stopScanning = (idnp?: string) => {
    setIsProcessingScan(true);
    setTimeout(() => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setScannedIdData(idnp || "IDNP: 1234567890123");
      setIsProcessingScan(false);
      setIsScanning(false);
    }, 1500);
  };

  const cancelScanning = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsScanning(false);
  };

  const getAuthority = () => {
    if (isBenefit) return 'National House of Social Insurance (CNAS)';
    if (isHealth) return 'General Direction of Medical and Social Assistance';
    if (isEducational) return 'General Dept of Education (DGETS)';
    return 'Municipal Services Dispatch';
  };

  const canSubmit = (!isEducational || (selectedInstitution && childName && childEid)) && 
                     (!requiresIdScan || scannedIdData) &&
                     (!isBenefit || iban.length > 10);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Registration</h2>
          <p className="text-sm text-gray-500 mt-1">Requesting: <span className="text-blue-600 font-bold">{service.title}</span></p>
        </div>
        <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
          <Landmark className="w-6 h-6" />
        </div>
      </div>

      {/* ID SCAN MODULE */}
      {requiresIdScan && (
        <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm space-y-4">
           <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Scan className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-gray-800 uppercase tracking-widest">Personal ID Verification</p>
              </div>
              {scannedIdData && (
                <span className="flex items-center gap-1 text-[8px] font-black text-green-600 uppercase bg-green-50 px-2 py-1 rounded">
                   <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              )}
           </div>

           {!scannedIdData ? (
             <button 
              onClick={startScanning}
              className="w-full py-8 border-2 border-dashed border-amber-200 rounded-2xl flex flex-col items-center gap-2 hover:bg-amber-50/30 transition-all text-amber-600 bg-white"
             >
               <Camera className="w-8 h-8 opacity-40 mb-1" />
               <span className="text-xs font-bold uppercase tracking-wider">Scan Personal Identity Card</span>
               <span className="text-[9px] opacity-60 px-8 text-center leading-relaxed">Ensure your 13-digit IDNP is clearly visible in the frame.</span>
             </button>
           ) : (
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">IDNP Authenticated</p>
                  <p className="text-sm font-mono font-bold text-gray-700">{scannedIdData}</p>
                </div>
                <button onClick={() => setScannedIdData(null)} className="p-2 text-slate-400 hover:text-red-500">
                  <RefreshCcw className="w-4 h-4" />
                </button>
             </div>
           )}
        </div>
      )}

      {/* BENEFIT SPECIFIC FIELDS */}
      {isBenefit && (
        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
               <Wallet className="w-4 h-4" />
             </div>
             <p className="text-xs font-bold text-gray-800 uppercase tracking-widest">Payment & Type</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">IBAN for Payments</label>
              <input 
                type="text" 
                value={iban}
                onChange={(e) => setIban(e.target.value.toUpperCase())}
                placeholder="MD..."
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Application Sub-Type</label>
              <select 
                value={benefitType}
                onChange={(e) => setBenefitType(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm"
              >
                <option value="Standard">Standard Allowance</option>
                <option value="Social_Aid">Direct Social Aid</option>
                <option value="Seniority">Seniority (Pension)</option>
                <option value="Disability">Disability Allowance</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* HEALTH SPECIFIC FIELDS */}
      {isHealth && (
        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
               <Stethoscope className="w-4 h-4" />
             </div>
             <p className="text-xs font-bold text-gray-800 uppercase tracking-widest">Healthcare Assignment</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <p className="text-xs text-gray-600 font-medium">
              You are applying for medical service assignment at your territorial medical association. 
              The assigned CMF will be determined by your verified residential address.
            </p>
          </div>
        </div>
      )}

      {/* EDUCATIONAL FIELDS */}
      {isEducational && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                 {service.title.includes('Kindergarten') ? <Baby className="w-4 h-4" /> : <School className="w-4 h-4" />}
               </div>
               <p className="text-xs font-bold text-gray-800 uppercase tracking-widest">Child Profile</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <input 
                type="text" 
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Child's Full Name"
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm"
              />
              <input 
                type="text" 
                value={childEid}
                onChange={(e) => setChildEid(e.target.value)}
                placeholder="Birth Cert ID / IDNP"
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-mono"
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Location</p>
              <span className="text-[10px] font-bold text-blue-600">{selectedSector} Region</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
              {sectors.map(sector => (
                <button
                  key={sector}
                  onClick={() => { setSelectedSector(sector); setSelectedInstitution(''); }}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap border-2 ${
                    selectedSector === sector 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                      : 'bg-white border-gray-100 text-gray-400'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {institutions.map(inst => (
                <button
                  key={inst.id}
                  onClick={() => setSelectedInstitution(inst.id)}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all relative ${
                    selectedInstitution === inst.id ? 'border-blue-600 bg-blue-50/30' : 'border-gray-50 bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-gray-800 leading-none mb-1">{inst.name}</p>
                      <p className="text-[10px] text-gray-400">{inst.address}</p>
                    </div>
                    {inst.isSuburb && (
                      <span className="bg-blue-100 text-blue-700 text-[8px] font-black uppercase px-1 rounded">Suburb</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TRACKING INFO */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tracking ID</label>
            <div className="bg-gray-50 p-3 rounded-xl mt-1 font-mono text-sm text-gray-700 border border-gray-100">
              {caseId}
            </div>
          </div>
          <div className="text-right">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</label>
            <div className="mt-1 flex items-center justify-end gap-1 text-[10px] font-bold text-blue-600 uppercase">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> Pending
            </div>
          </div>
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Authority</label>
          <div className="bg-gray-50 p-3 rounded-xl mt-1 font-semibold text-xs text-gray-700 border border-gray-100">
            {getAuthority()}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center py-2">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 relative">
          <ClipboardCheck className="w-5 h-5" />
        </div>
        <ArrowDown className="w-4 h-4 text-gray-300 mt-2" />
      </div>

      <div className="space-y-4">
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
           <p className="text-[10px] text-slate-500 leading-relaxed text-center font-medium">
            {service.requiresIdScan 
              ? "This request requires encrypted ID verification. Your personal data is transmitted securely to the relevant authority for automated verification."
              : "Registration will be processed through the unified municipal ledger within 24-48 business hours."
            }
           </p>
        </div>

        <button 
          onClick={onConfirm}
          disabled={!canSubmit}
          className={`w-full py-4 text-white rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:bg-gray-300 ${service.isFree ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}
        >
          <CheckCircle2 className="w-5 h-5" />
          {isBenefit ? 'Apply for Benefit' : isHealth ? 'Confirm Assignment' : 'Complete Registration'}
        </button>
      </div>

      {/* ID SCANNER OVERLAY */}
      {isScanning && (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col">
          <div className="relative flex-1 flex items-center justify-center">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-44 border-2 border-white/40 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 border-[30px] border-black/40" />
                <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-blue-500 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-blue-500 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-blue-500 rounded-br-2xl" />
                <div className="absolute top-0 left-2 right-2 h-0.5 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] animate-[scan_2s_infinite_linear]" />
              </div>
            </div>
            <button onClick={cancelScanning} className="absolute top-8 right-8 p-3 bg-white/20 backdrop-blur-xl rounded-full text-white"><X className="w-6 h-6" /></button>
            <div className="absolute bottom-12 left-0 right-0 text-center px-8">
              <p className="text-white font-bold text-sm mb-6 drop-shadow-lg">Align your Personal ID Card within the frame</p>
              <button onClick={() => stopScanning()} className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center ${isProcessingScan ? 'bg-blue-600 animate-pulse' : 'bg-white/10'}`}>
                {isProcessingScan ? <RefreshCcw className="w-10 h-10 text-white animate-spin" /> : <div className="w-14 h-14 bg-white rounded-full" />}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
      `}</style>
    </div>
  );
};

export default CaseCreationView;
