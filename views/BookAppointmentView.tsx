
import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { ChevronLeft, Check, Calendar as CalendarIcon, Clock, MapPin, Baby, Home, GraduationCap, Leaf, Droplets, Info, Stethoscope, School } from 'lucide-react';

interface BookAppointmentViewProps {
  onConfirm: (apt: Appointment) => void;
  onBack: () => void;
  appointmentToEdit?: Appointment;
}

const BookAppointmentView: React.FC<BookAppointmentViewProps> = ({ onConfirm, onBack, appointmentToEdit }) => {
  const [step, setStep] = useState(appointmentToEdit ? 2 : 1);
  const [selectedService, setSelectedService] = useState(appointmentToEdit?.service || '');
  const [selectedDate, setSelectedDate] = useState(appointmentToEdit?.date || '');
  const [selectedTime, setSelectedTime] = useState(appointmentToEdit?.time || '');

  const services = [
    { title: "Center of Family Doctors (CMF)", icon: Stethoscope, location: "CMF Nr. 10, Ciocana", isFree: true },
    { title: "Kindergarten Registration", icon: Baby, location: "Municipal Education Dept", isFree: true },
    { title: "School Registration", icon: School, location: "District School Inspectorate", isFree: true },
    { title: "Pension Application", icon: GraduationCap, location: "CNAS Office, Str. George Coșbuc", isFree: true },
    { title: "Residence Change", icon: Home, location: "ASP Centru, Mihai Viteazul 11", isFree: false },
    { title: "Water Services", icon: Droplets, location: "Apă-Canal Office, Albișoara 38", isFree: false },
  ];

  const dates = [
    { label: 'Oct 28', value: 'Saturday, Oct 28' },
    { label: 'Oct 30', value: 'Monday, Oct 30' },
    { label: 'Oct 31', value: 'Tuesday, Oct 31' },
    { label: 'Nov 01', value: 'Wednesday, Nov 01' },
  ];

  const times = ['09:00 AM', '10:30 AM', '11:45 AM', '02:00 PM', '03:30 PM', '04:15 PM'];

  const selectedServiceData = services.find(s => s.title === selectedService);

  const handleConfirm = () => {
    const updatedApt: Appointment = {
      id: appointmentToEdit?.id || `APT-${Math.floor(Math.random() * 9000) + 1000}`,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      location: selectedServiceData?.location || appointmentToEdit?.location || 'Main Office',
      status: 'Upcoming'
    };
    onConfirm(updatedApt);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 px-2">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
            step >= s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
          }`}>
            {step > s ? <Check className="w-4 h-4" /> : s}
          </div>
          {s < 3 && (
            <div className={`h-0.5 flex-1 mx-2 transition-colors ${
              step > s ? 'bg-blue-600' : 'bg-gray-100'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-2">
        <button 
          onClick={step === 1 ? onBack : () => setStep(step - 1)}
          className="p-2 hover:bg-gray-100 rounded-lg -ml-2 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {appointmentToEdit ? 'Reschedule Appointment' : 'Book Appointment'}
        </h2>
      </div>

      {appointmentToEdit && step === 2 && (
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-blue-800">Rescheduling {appointmentToEdit.id}</p>
            <p className="text-[10px] text-blue-600">You are changing the date/time for your {selectedService} appointment.</p>
          </div>
        </div>
      )}

      {renderStepIndicator()}

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm font-bold text-gray-800 uppercase tracking-widest text-center">Select Service Category</p>
          <div className="space-y-2">
            {services.map((s) => (
              <button
                key={s.title}
                onClick={() => {
                  setSelectedService(s.title);
                  setStep(2);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group ${
                  selectedService === s.title ? 'border-blue-600 bg-blue-50/50' : 'border-gray-50 bg-white hover:border-blue-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-active:scale-90 ${
                  selectedService === s.title ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                }`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-800">{s.title}</p>
                    {s.isFree && (
                      <span className="text-[8px] font-black bg-green-100 text-green-700 px-1.5 py-0.5 rounded uppercase tracking-tighter">Free Service</span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase truncate">{s.location}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-bold text-gray-800 uppercase tracking-widest">Select Date</p>
            <div className="grid grid-cols-2 gap-2">
              {dates.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDate(d.value)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    selectedDate === d.value ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-50 bg-white'
                  }`}
                >
                  <p className="text-sm font-bold">{d.label}</p>
                  <p className="text-[10px] opacity-60">Available</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-bold text-gray-800 uppercase tracking-widest">Select Time</p>
            <div className="grid grid-cols-3 gap-2">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-3 px-1 rounded-lg text-xs font-bold border-2 transition-all text-center ${
                    selectedTime === t ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-50 bg-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!selectedDate || !selectedTime}
            onClick={() => setStep(3)}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:bg-gray-400 shadow-lg shadow-blue-200"
          >
            Review Details
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-8 -mt-8 opacity-50" />
            
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Service</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-gray-800">{selectedService}</p>
                {selectedServiceData?.isFree && (
                  <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase border border-green-100">Zero Fee</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <CalendarIcon className="w-3 h-3 text-blue-500" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                </div>
                <p className="text-sm font-semibold text-gray-700">{selectedDate}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3 h-3 text-blue-500" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</p>
                </div>
                <p className="text-sm font-semibold text-gray-700">{selectedTime}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="w-3 h-3 text-blue-500" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
              </div>
              <p className="text-sm font-semibold text-gray-700">
                {selectedServiceData?.location || appointmentToEdit?.location}
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${selectedServiceData?.isFree ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'}`}>
            <p className={`text-xs leading-relaxed font-medium ${selectedServiceData?.isFree ? 'text-green-800' : 'text-yellow-800'}`}>
              {selectedServiceData?.isFree 
                ? "This is a free social service. No payment is required for this appointment. Your confirmation will be registered immediately."
                : appointmentToEdit 
                  ? "Rescheduling will release your previous time slot and update your appointment in the ledger."
                  : "By confirming, this appointment will be linked to your eID account and a notification will be sent to the department."}
            </p>
          </div>

          <button
            onClick={handleConfirm}
            className={`w-full py-4 text-white rounded-xl font-bold text-lg transition-all shadow-lg ${selectedServiceData?.isFree ? 'bg-green-600 hover:bg-green-700 shadow-green-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}
          >
            {appointmentToEdit ? 'Confirm & Reschedule' : 'Confirm & Book'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookAppointmentView;
