
import React, { useState } from 'react';
import { AppView, Appointment } from '../types';
import { Calendar, Clock, MapPin, MoreVertical, Plus, ChevronLeft, ChevronDown, ChevronUp, Info, Map } from 'lucide-react';

interface AppointmentsViewProps {
  appointments: Appointment[];
  onNavigate: (view: AppView) => void;
  onReschedule: (apt: Appointment) => void;
  onCancel: (id: string) => void;
}

const AppointmentsView: React.FC<AppointmentsViewProps> = ({ appointments, onNavigate, onReschedule, onCancel }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onNavigate(AppView.DASHBOARD)}
          className="p-2 hover:bg-gray-100 rounded-lg -ml-2 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
      </div>

      <div className="space-y-4">
        {appointments.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No appointments found</p>
          </div>
        ) : (
          appointments.map((apt) => {
            const isExpanded = expandedId === apt.id;
            return (
              <div 
                key={apt.id} 
                className={`bg-white rounded-2xl border ${apt.status === 'Upcoming' ? 'border-blue-100 shadow-sm' : apt.status === 'Cancelled' ? 'border-red-50 bg-red-50/20' : 'border-gray-100 opacity-80'} relative overflow-hidden transition-all`}
              >
                {apt.status === 'Upcoming' && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                )}
                {apt.status === 'Cancelled' && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-red-400"></div>
                )}
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{apt.id}</p>
                        {apt.status === 'Cancelled' && (
                          <span className="text-[8px] font-black text-red-500 uppercase bg-red-100 px-1 rounded">Cancelled</span>
                        )}
                      </div>
                      <h3 className={`text-base font-bold ${apt.status === 'Cancelled' ? 'text-gray-400 line-through' : 'text-gray-800'} leading-tight`}>{apt.service}</h3>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${apt.status === 'Cancelled' ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600'} flex items-center justify-center shrink-0`}>
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Date</p>
                        <p className="text-xs font-semibold text-gray-700 truncate">{apt.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${apt.status === 'Cancelled' ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600'} flex items-center justify-center shrink-0`}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Time</p>
                        <p className="text-xs font-semibold text-gray-700">{apt.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 col-span-2">
                      <div className={`w-8 h-8 rounded-lg ${apt.status === 'Cancelled' ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600'} flex items-center justify-center shrink-0`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Location</p>
                        <p className="text-xs font-semibold text-gray-700 truncate">{apt.location}</p>
                      </div>
                      <button 
                        onClick={() => toggleExpand(apt.id)}
                        className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                        title={isExpanded ? "Hide Details" : "Show Details"}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Section */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Map className="w-3 h-3 text-blue-400" />
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Address</p>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                          {apt.fullAddress || "No detailed address provided."}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Info className="w-3 h-3 text-blue-400" />
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Instructions</p>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed bg-blue-50/30 p-3 rounded-xl border border-blue-50">
                          {apt.instructions || "No specific instructions for this appointment."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {apt.status === 'Upcoming' && (
                    <div className="flex gap-2 mt-5">
                      <button 
                        onClick={() => onReschedule(apt)}
                        className="flex-1 py-2 text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100"
                      >
                        Reschedule
                      </button>
                      <button 
                        onClick={() => {
                          if(confirm('Are you sure you want to cancel this appointment?')) {
                            onCancel(apt.id);
                          }
                        }}
                        className="flex-1 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <button 
        onClick={() => onNavigate(AppView.BOOK_APPOINTMENT)}
        className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 mt-2"
      >
        <Plus className="w-5 h-5" />
        Book New Appointment
      </button>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
        <p className="text-xs text-blue-800 leading-relaxed font-medium">
          Note: Please arrive 10 minutes before your scheduled time. Bring your eID and any relevant digital documents ready in the MUNAPP ledger.
        </p>
      </div>
    </div>
  );
};

export default AppointmentsView;
