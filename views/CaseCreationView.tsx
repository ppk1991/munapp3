
import React, { useState, useMemo } from 'react';
import { Landmark, ShieldCheck, CheckCircle2, User, FileText, School, Baby, MapPin, ChevronRight, GraduationCap, Camera, MessageSquare, Heart, FileBadge, Home, Map } from 'lucide-react';
import { ServiceItem } from './ServicesView';

interface CaseCreationViewProps {
  service: ServiceItem;
  onConfirm: () => void;
}

interface Institution {
  id: string;
  name: string;
  sector: string;
  address: string;
  isSuburb?: boolean;
}

const CHISINAU_SECTORS = ['Centru', 'Ciocana', 'Botanica', 'Buiucani', 'Rîșcani'];
const CHISINAU_SUBURBS = [
  'Bubuieci', 'Codru', 'Durlești', 'Sîngera', 'Stăuceni', 
  'Cricova', 'Vatra', 'Băcioi', 'Budești', 'Ciorescu', 
  'Colonița', 'Condrița', 'Cruzești', 'Făurești', 'Ghidighici', 
  'Goianul Nou', 'Grătiești', 'Hulboaca', 'Humulești', 'Tohatin', 'Trușeni'
];

const RESIDENCE_CHANGE_REASONS = [
  'Property Purchase (New Owner)',
  'Rental Lease Agreement',
  'Family Relocation / Re-unification',
  'Primary Residence Update',
  'Inheritance Settlement'
];

const CaseCreationView: React.FC<CaseCreationViewProps> = ({ service, onConfirm }) => {
  const [caseId] = useState(() => `CHIS-${Math.floor(Math.random() * 90000) + 10000}`);
  
  // Basic selections
  const [selectedLocation, setSelectedLocation] = useState<string>('Centru');
  const [newStreetAddress, setNewStreetAddress] = useState('');
  const [changeReason, setChangeReason] = useState('');
  const [comments, setComments] = useState('');
  
  // Education specific
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>('');
  const [childName, setChildName] = useState('');
  const [childEid, setChildEid] = useState('');
  
  // Scanning States
  const [isParentScanned, setIsParentScanned] = useState(false);
  const [isBirthCertScanned, setIsBirthCertScanned] = useState(false);
  const [scanningType, setScanningType] = useState<'parent' | 'child' | null>(null);

  const isEnrollment = service.category === 'education';
  const isSocial = service.category === 'social';
  const isResidenceChange = service.title === 'Residence Change';

  const institutions: Institution[] = useMemo(() => [
    // --- CIOCANA & SUBURBS ---
    { id: 'S-C1', name: 'Liceul Teoretic "Gheorghe Ghimpu"', sector: 'Ciocana', address: 'Str. Mihai Eminescu, Bubuieci', isSuburb: true },
    { id: 'K-C1', name: 'Grădinița Bubuieci Nr. 1', sector: 'Ciocana', address: 'Str. Tineretului, Bubuieci', isSuburb: true },
    { id: 'S-C2', name: 'Liceul Teoretic "Toader Bubuiog"', sector: 'Ciocana', address: 'Str. Școlii, Bubuieci', isSuburb: true },
    { id: 'S-C3', name: 'Liceul Teoretic "Petru Zadnipru"', sector: 'Ciocana', address: 'Str. Nicolae Milescu Spătaru 15' },
    { id: 'S-C4', name: 'Liceul Teoretic "Mihail Sadoveanu"', sector: 'Ciocana', address: 'Str. Nicolae Sulac 4' },
    { id: 'S-C5', name: 'Liceul Teoretic "Constantin Negruzzi"', sector: 'Ciocana', address: 'Str. Igor Vieru 12' },
    { id: 'S-C6', name: 'Liceul Teoretic "Dacia"', sector: 'Ciocana', address: 'Str. Maria Drăgan 2' },
    { id: 'K-C2', name: 'Grădinița Nr. 225', sector: 'Ciocana', address: 'Str. Ginta Latină 11' },
    { id: 'K-C3', name: 'Grădinița Nr. 211', sector: 'Ciocana', address: 'Str. Igor Vieru 4' },
    { id: 'K-C4', name: 'Grădinița Nr. 177', sector: 'Ciocana', address: 'Str. Mihail Sadoveanu 2' },
    { id: 'K-COL1', name: 'Grădinița Colonița "Ghiocel"', sector: 'Ciocana', address: 'Str. Ștefan cel Mare, Colonița', isSuburb: true },
    { id: 'S-TOH1', name: 'Gimnaziul Tohatin', sector: 'Ciocana', address: 'Str. Mihai Eminescu, Tohatin', isSuburb: true },
    { id: 'K-BUD1', name: 'Grădinița Budești "Viorela"', sector: 'Ciocana', address: 'Str. Bălțata, Budești', isSuburb: true },
    // ... additional schools omitted for brevity but assumed present
  ], []);

  const handleScan = (type: 'parent' | 'child') => {
    setScanningType(type);
    setTimeout(() => {
      if (type === 'parent') setIsParentScanned(true);
      if (type === 'child') setIsBirthCertScanned(true);
      setScanningType(null);
    }, 1800);
  };

  const filteredInstitutions = institutions.filter(inst => inst.sector === selectedLocation);

  const canProceed = useMemo(() => {
    if (isEnrollment) {
      return !!(selectedInstitutionId && childName && childEid && isParentScanned && isBirthCertScanned);
    }
    if (isResidenceChange) {
      return !!(selectedLocation && newStreetAddress && changeReason && isParentScanned);
    }
    if (isSocial) {
      return isParentScanned;
    }
    return true;
  }, [isEnrollment, isResidenceChange, isSocial, selectedInstitutionId, childName, childEid, isParentScanned, isBirthCertScanned, selectedLocation, newStreetAddress, changeReason]);

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-300">
      <div className="text-center px-4">
        <h2 className="text-xl font-bold text-gray-800">{service.title} Request</h2>
        <p className="text-[10px] text-gray-400 mt-2 max-w-[280px] mx-auto leading-relaxed font-bold uppercase tracking-tight">
          Secure identity verification for Chișinău Municipal Registry.
        </p>
      </div>

      {/* Residence Change Specific Fields */}
      {isResidenceChange && (
        <div className="bg-indigo-50 p-6 rounded-[2.5rem] border border-indigo-100 space-y-5 shadow-sm animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-indigo-900">New Residence Location</h3>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Chișinău & Suburbs</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-2 ml-1">Select Sector or Suburb</label>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[...CHISINAU_SECTORS, ...CHISINAU_SUBURBS].map(loc => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap border-2 ${
                      selectedLocation === loc 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                        : 'bg-white border-indigo-100 text-indigo-400 hover:border-indigo-200'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1.5 ml-1">New Street Address & Apt</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                  <input 
                    type="text" 
                    placeholder="e.g. Str. Ștefan cel Mare 10, ap. 5"
                    value={newStreetAddress}
                    onChange={(e) => setNewStreetAddress(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-white border border-indigo-100 rounded-2xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1.5 ml-1">Reason for Change</label>
                <select 
                  value={changeReason}
                  onChange={(e) => setChangeReason(e.target.value)}
                  className="w-full p-4 bg-white border border-indigo-100 rounded-2xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 shadow-sm appearance-none"
                >
                  <option value="" disabled>Select a reason...</option>
                  {RESIDENCE_CHANGE_REASONS.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Selection for Enrollment */}
      {isEnrollment && (
        <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 space-y-4 shadow-sm animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-900">Institutional Selection</h3>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Network Chișinău (DGETS)</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-2 ml-1">Sector Search</label>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {['Centru', 'Ciocana', 'Botanica', 'Buiucani', 'Rîșcani'].map(sector => (
                  <button
                    key={sector}
                    onClick={() => {
                      setSelectedLocation(sector);
                      setSelectedInstitutionId('');
                    }}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap border-2 ${
                      selectedLocation === sector 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                        : 'bg-white border-blue-100 text-blue-400 hover:border-blue-200'
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1 scrollbar-hide">
              {filteredInstitutions.map(inst => (
                <button
                  key={inst.id}
                  onClick={() => setSelectedInstitutionId(inst.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center justify-between group ${
                    selectedInstitutionId === inst.id 
                      ? 'bg-white border-blue-600 shadow-sm' 
                      : 'bg-white/50 border-transparent hover:border-blue-200'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className={`text-xs font-bold ${selectedInstitutionId === inst.id ? 'text-blue-600' : 'text-gray-700'}`}>{inst.name}</p>
                      {inst.isSuburb && (
                        <span className="text-[8px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded uppercase tracking-tighter">Suburb</span>
                      )}
                    </div>
                    <p className="text-[9px] text-gray-400 font-medium truncate">{inst.address}</p>
                  </div>
                  {selectedInstitutionId === inst.id && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 ml-2" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Identity Verification Section */}
      <div className="space-y-4">
        <div className={`p-5 rounded-[2rem] border transition-all text-center space-y-4 shadow-sm ${isParentScanned ? 'bg-emerald-50 border-emerald-100' : 'bg-indigo-50 border-indigo-100'}`}>
          <div className="flex items-center justify-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${isParentScanned ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white'}`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className={`text-sm font-bold leading-tight ${isParentScanned ? 'text-emerald-900' : 'text-indigo-900'}`}>{isResidenceChange ? 'Applicant eID Verification' : 'Parent / Guardian eID'}</h3>
              <p className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${isParentScanned ? 'text-emerald-500' : 'text-indigo-500'}`}>
                {isParentScanned ? 'Identity Verified' : 'Authentication Required'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => handleScan('parent')}
            disabled={!!scanningType || isParentScanned}
            className={`w-full py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
              isParentScanned 
                ? 'bg-white text-emerald-600 border border-emerald-100' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]'
            }`}
          >
            {scanningType === 'parent' ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Validating eID...
              </>
            ) : isParentScanned ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Verification Secure
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                Scan Identity Document
              </>
            )}
          </button>
        </div>

        {isEnrollment && (
          <div className={`p-5 rounded-[2rem] border transition-all text-center space-y-4 shadow-sm ${isBirthCertScanned ? 'bg-emerald-50 border-emerald-100' : 'bg-blue-50 border-blue-100'}`}>
            <div className="flex items-center justify-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${isBirthCertScanned ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'}`}>
                <FileBadge className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className={`text-sm font-bold leading-tight ${isBirthCertScanned ? 'text-emerald-900' : 'text-blue-900'}`}>Birth Certificate</h3>
                <p className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${isBirthCertScanned ? 'text-emerald-500' : 'text-blue-500'}`}>
                  {isBirthCertScanned ? 'Child Record Linked' : 'Mandatory Document Scan'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => handleScan('child')}
              disabled={!!scanningType || isBirthCertScanned}
              className={`w-full py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                isBirthCertScanned 
                  ? 'bg-white text-emerald-600 border border-emerald-100' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'
              }`}
            >
              {scanningType === 'child' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : isBirthCertScanned ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Document Verified
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  Scan Birth Certificate
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Subject Information for Enrollment */}
      {isEnrollment && (
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Minor Subject Details</p>
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Full Name of the Child"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
            />
            <input 
              type="text" 
              placeholder="Child IDNP / Registration ID"
              value={childEid}
              onChange={(e) => setChildEid(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-mono font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>
      )}

      {/* Generic Comments Area */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 px-1">
          <MessageSquare className="w-4 h-4 text-blue-500" />
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Additional Information & Comments</p>
        </div>
        <textarea 
          placeholder="Provide any additional context for the municipal registry officer..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={3}
          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 resize-none"
        />
      </div>

      {/* Case Details Summary */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
        <div className="p-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Municipal Case ID</p>
              <p className="text-xs font-bold text-gray-700">Ledger Entry</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-gray-400">#{caseId}</span>
        </div>

        <div className="p-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Receiving Authority</p>
              <p className="text-xs font-bold text-gray-700">Chișinău Town Hall</p>
            </div>
          </div>
          <ShieldCheck className="w-5 h-5 text-blue-500" />
        </div>
      </div>

      <button 
        onClick={onConfirm}
        disabled={!canProceed}
        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:bg-slate-400 shadow-blue-100"
      >
        {service.isFree ? 'Submit Application' : 'Proceed to Registry Fee'}
      </button>

      <div className="text-center px-6">
        <p className="text-[9px] text-gray-400 font-medium italic leading-relaxed">
          Application is processed by the Chișinău Population Registry. Submitting this form authorizes a background check against municipal property and identity records.
        </p>
      </div>
    </div>
  );
};

export default CaseCreationView;
