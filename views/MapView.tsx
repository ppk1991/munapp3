
import React, { useEffect, useState } from 'react';
import { ChevronLeft, MapPin, Navigation, ExternalLink, Info, Building2 } from 'lucide-react';
import { FreeParkingLocation } from '../types';

interface MapViewProps {
  location: FreeParkingLocation;
  onBack: () => void;
}

const MapView: React.FC<MapViewProps> = ({ location, onBack }) => {
  const [distance, setDistance] = useState<string | null>(null);

  useEffect(() => {
    // Mocking distance calculation based on geolocation permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Simulation of calculation
          const mockDistances = ['1.2 km', '3.5 km', '0.8 km', '5.1 km'];
          setDistance(mockDistances[Math.floor(Math.random() * mockDistances.length)]);
        },
        () => setDistance('N/A')
      );
    }
  }, []);

  const openInGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(`${location.address}, Chișinău, Moldova`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_REAL_KEY&q=${encodeURIComponent(location.address + ', Chișinău, Moldova')}`;
  // Using a visual placeholder since we don't have a real API key for the embed in this environment, 
  // but the structure is ready for it.
  const mapPlaceholderUrl = `https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000`;

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col -m-4 bg-gray-100 animate-in fade-in duration-300 relative overflow-hidden">
      {/* Header Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <button 
          onClick={onBack}
          className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 text-gray-800 hover:bg-white transition-all active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Map Implementation */}
      <div className="flex-1 relative overflow-hidden">
        {/* Real mapping integration would use a proper library like Leaflet or Google Maps JS SDK here */}
        <div className="absolute inset-0 bg-slate-200 flex flex-col items-center justify-center">
            <img 
                src={mapPlaceholderUrl} 
                alt="Map Background" 
                className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            
            {/* Animated Location Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25" />
                    <div className="w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center relative z-20 border-2 border-blue-500">
                        <MapPin className="w-6 h-6 text-blue-600 fill-current" />
                    </div>
                </div>
                <div className="mt-3 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-xl border border-white/50 text-blue-800 text-[10px] font-black uppercase tracking-widest">
                    Parking Destination
                </div>
            </div>
        </div>
      </div>

      {/* Bottom Floating Info Card */}
      <div className="px-4 pb-4 animate-in slide-in-from-bottom-10 duration-500">
        <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl shadow-black/10 border border-slate-100 space-y-5">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase tracking-widest">{location.sector}</span>
                        {location.isSuburb && (
                            <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-widest">Suburb</span>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{location.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1.5">
                        <MapPin className="w-3 h-3 text-slate-400" /> {location.address}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Distance</p>
                    <p className="text-lg font-black text-blue-600">{distance || 'Calculating...'}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-white text-slate-400 flex items-center justify-center shadow-sm">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Estimated</p>
                        <p className="text-sm font-bold text-slate-800">{location.spots} Spots</p>
                    </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                    <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm ${
                        location.status === 'Available' ? 'text-green-500' : 'text-orange-500'
                    }`}>
                        <Info className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                        <p className={`text-sm font-bold ${
                            location.status === 'Available' ? 'text-green-600' : 'text-orange-600'
                        }`}>{location.status}</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button 
                    onClick={openInGoogleMaps}
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95"
                >
                    <Navigation className="w-5 h-5" />
                    Get Directions
                </button>
                <button 
                    onClick={openInGoogleMaps}
                    className="flex-1 py-4 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl font-bold flex items-center justify-center hover:bg-slate-50 transition-all active:scale-95"
                >
                    <ExternalLink className="w-5 h-5" />
                </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center font-medium italic leading-relaxed">
                Navigation will open in your default maps provider for real-time traffic updates and GPS routing.
            </p>
        </div>
      </div>
    </div>
  );
};

export default MapView;
