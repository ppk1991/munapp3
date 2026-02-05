
import React, { useState, useMemo } from 'react';
import { ChevronLeft, MapPin, ParkingCircle, Info, Building2, ExternalLink } from 'lucide-react';
import { FreeParkingLocation } from '../types';

interface FreeParkingViewProps {
  onBack: () => void;
  onNavigateToMap: (location: FreeParkingLocation) => void;
}

const FreeParkingView: React.FC<FreeParkingViewProps> = ({ onBack, onNavigateToMap }) => {
  const [selectedSector, setSelectedSector] = useState('Ciocana');
  
  const sectors = ['Centru', 'Ciocana', 'Botanica', 'Buiucani', 'Rîșcani'];

  const locations: FreeParkingLocation[] = useMemo(() => [
    // Ciocana / Bubuieci / Colonița
    { id: 'FP-C1', name: 'Mircea cel Bătrân Alley Public Spot', address: 'Bulevardul Mircea cel Bătrân, Ciocana', sector: 'Ciocana', spots: 45, status: 'Available' },
    { id: 'FP-C2', name: 'Ginta Latină Market Perimeter', address: 'Str. Ginta Latină 12', sector: 'Ciocana', spots: 20, status: 'Limited' },
    { id: 'FP-B1', name: 'Bubuieci Community Center Lot', address: 'Str. Centrală 1, Bubuieci', sector: 'Ciocana', spots: 30, status: 'Available', isSuburb: true },
    { id: 'FP-B2', name: 'Bubuieci School Zone', address: 'Str. Școlii, Bubuieci', sector: 'Ciocana', spots: 15, status: 'High Demand', isSuburb: true },
    { id: 'FP-COL1', name: 'Colonița Public Square', address: 'Str. Ștefan cel Mare, Colonița', sector: 'Ciocana', spots: 25, status: 'Available', isSuburb: true },

    // Centru / Codru
    { id: 'FP-CE1', name: 'National Library Rear Area', address: 'Str. 31 August 1989', sector: 'Centru', spots: 12, status: 'High Demand' },
    { id: 'FP-CE2', name: 'Valea Morilor Cascades Parking', address: 'Str. Grigore Alexandrescu', sector: 'Centru', spots: 60, status: 'Available' },
    { id: 'FP-COD1', name: 'Codru Municipal Hall Area', address: 'Str. Costiujeni, Codru', sector: 'Centru', spots: 35, status: 'Available', isSuburb: true },

    // Botanica / Sîngera / Băcioi
    { id: 'FP-BO1', name: 'Rose Valley Park Entrance', address: 'Str. Trandafirilor', sector: 'Botanica', spots: 40, status: 'Available' },
    { id: 'FP-BO2', name: 'Botanical Garden Peripheral', address: 'Str. Pădurii', sector: 'Botanica', spots: 100, status: 'Available' },
    { id: 'FP-SIN1', name: 'Sîngera Cultural Center', address: 'Str. 31 August, Sîngera', sector: 'Botanica', spots: 50, status: 'Available', isSuburb: true },
    { id: 'FP-BAC1', name: 'Băcioi Public Market', address: 'Str. Independenței, Băcioi', sector: 'Botanica', spots: 30, status: 'Limited', isSuburb: true },

    // Buiucani / Durlești / Ghidighici
    { id: 'FP-BU1', name: 'Dendrarium Side Parking', address: 'Str. Ion Creangă', sector: 'Buiucani', spots: 35, status: 'Limited' },
    { id: 'FP-BU2', name: 'Alunelul Park Front', address: 'Calea Ieșilor', sector: 'Buiucani', spots: 50, status: 'Available' },
    { id: 'FP-DUR1', name: 'Durlești Main Square', address: 'Str. Alexandru cel Bun, Durlești', sector: 'Buiucani', spots: 40, status: 'Available', isSuburb: true },
    { id: 'FP-GHI1', name: 'Ghidighici Beach Entrance', address: 'Str. Victoriei, Ghidighici', sector: 'Buiucani', spots: 120, status: 'Available', isSuburb: true },

    // Rîșcani / Stăuceni / Cricova
    { id: 'FP-R1', name: 'Afgan Park Perimeter', address: 'Str. Miron Costin', sector: 'Rîșcani', spots: 25, status: 'High Demand' },
    { id: 'FP-R2', name: 'Circus Peripheral Area', address: 'Calea Orheiului', sector: 'Rîșcani', spots: 80, status: 'Available' },
    { id: 'FP-STA1', name: 'Stăuceni Community Park', address: 'Str. Unirii, Stăuceni', sector: 'Rîșcani', spots: 35, status: 'Available', isSuburb: true },
    { id: 'FP-CRI1', name: 'Cricova Winery Public Lot', address: 'Str. Petru Ungureanu, Cricova', sector: 'Rîșcani', spots: 60, status: 'Limited', isSuburb: true },
  ], []);

  const filteredLocations = locations.filter(loc => loc.sector === selectedSector);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-600 bg-green-50';
      case 'Limited': return 'text-orange-600 bg-orange-50';
      case 'High Demand': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
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
        <h2 className="text-2xl font-bold text-gray-800">Free Parking</h2>
      </div>

      <div className="bg-blue-600 p-6 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <ParkingCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold leading-tight">Public Finder</h3>
            <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest">No-Cost Zones Chișinău</p>
          </div>
        </div>
        <p className="text-xs opacity-90 leading-relaxed font-medium">
          Find public parking spaces that do not require an MPay fee or residential permit across all sectors and suburbs.
        </p>
      </div>

      <div className="space-y-4">
        {/* Sector Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {sectors.map(sector => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap border-2 ${
                selectedSector === sector 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                  : 'bg-white border-gray-50 text-gray-400 hover:border-blue-100'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Locations List */}
        <div className="space-y-3">
          {filteredLocations.length > 0 ? (
            filteredLocations.map(loc => (
              <div key={loc.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group hover:border-blue-200 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{loc.sector}</span>
                    {loc.isSuburb && (
                      <span className="text-[8px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded uppercase tracking-tighter">Suburb / Nearby</span>
                    )}
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${getStatusColor(loc.status)}`}>
                    {loc.status}
                  </div>
                </div>
                
                <h4 className="font-bold text-gray-800 text-base">{loc.name}</h4>
                <div className="flex items-center gap-1.5 text-gray-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <p className="text-xs truncate">{loc.address}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase leading-none">Capacity</p>
                      <p className="text-sm font-bold text-gray-700">~{loc.spots} Spots</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onNavigateToMap(loc)}
                    className="flex items-center gap-1.5 text-blue-600 font-bold text-xs hover:underline"
                  >
                    Navigate <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
               <Info className="w-10 h-10 text-gray-300 mx-auto mb-2" />
               <p className="text-sm font-bold text-gray-400">No free zones listed for this sector yet.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
        <p className="text-[10px] text-slate-500 leading-relaxed text-center font-medium italic">
          Free parking availability is updated based on municipal data and community feedback. Suburbs are included within their respective administrative sectors.
        </p>
      </div>
    </div>
  );
};

export default FreeParkingView;
