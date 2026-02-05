
import React, { useState } from 'react';
import { AppView, Appointment, ParkingZone, FreeParkingLocation } from './types';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import ServicesView, { ServiceItem } from './views/ServicesView';
import CaseCreationView from './views/CaseCreationView';
import PaymentView from './views/PaymentView';
import CasesLedgerView from './views/CasesLedgerView';
import AppointmentsView from './views/AppointmentsView';
import BookAppointmentView from './views/BookAppointmentView';
import UserProfileView from './views/UserProfileView';
import ParkingManagementView from './views/ParkingManagementView';
import SettingsView from './views/SettingsView';
import TopUpView from './views/TopUpView';
import TransferView from './views/TransferView';
import ConfirmationView from './views/ConfirmationView';
import UtilityPaymentView from './views/UtilityPaymentView';
import FreeParkingView from './views/FreeParkingView';
import MapView from './views/MapView';
import BottomNav from './components/BottomNav';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [reschedulingAppointment, setReschedulingAppointment] = useState<Appointment | null>(null);
  const [walletBalance, setWalletBalance] = useState<number>(500);
  const [activeTransportProduct, setActiveTransportProduct] = useState<string | null>(null);
  const [selectedParkingLocation, setSelectedParkingLocation] = useState<FreeParkingLocation | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  
  // Confirmation state
  const [lastConfirmation, setLastConfirmation] = useState<{
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
    }
  } | null>(null);

  // Parking Zones State
  const [parkingZones, setParkingZones] = useState<ParkingZone[]>([
    { 
      id: 'home-zone', 
      name: 'Home', 
      sector: 'Ciocana', 
      address: 'Str. Mihai Eminescu 45', 
      isSubsidized: true,
      rules: 'Free residential parking for eID verified citizens.'
    },
    { 
      id: 'work-zone', 
      name: 'Work', 
      sector: 'Centru', 
      address: 'Str. Ștefan cel Mare 202', 
      isSubsidized: false,
      rules: 'Standard rate: 10 MDL/hour. Work permit required.'
    }
  ]);
  const [activeParkingZoneId, setActiveParkingZoneId] = useState<string>('home-zone');

  const activeZone = parkingZones.find(z => z.id === activeParkingZoneId) || parkingZones[0];

  // State for dynamic payments (Utilities, Fees)
  const [pendingPayment, setPendingPayment] = useState<{ amount: string, description: string, isProductPurchase?: boolean, productName?: string } | null>(null);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'APT-9921',
      service: 'Property Registration Inquiry',
      date: 'Tomorrow, Oct 27',
      time: '10:00 AM',
      location: 'Chisinau City Hall, Room 302',
      fullAddress: 'Vlaicu Pârcălab St 83, Chișinău 2012, Moldova',
      instructions: 'Please bring your original property deed and a valid eID. Go to the 3rd floor, turn right after the elevator.',
      status: 'Upcoming'
    }
  ]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView(AppView.DASHBOARD);
  };

  const handleServiceSelect = (service: ServiceItem) => {
    if (service.title === "Free Parking Finder") {
      setCurrentView(AppView.FREE_PARKING);
    } else if (service.title === "Transport Pass") {
      setCurrentView(AppView.TOP_UP);
    } else {
      setSelectedService(service);
      setCurrentView(AppView.CASE_CREATION);
    }
  };

  const handleCaseConfirm = () => {
    if (selectedService?.isFree) {
      let details = undefined;
      
      // Simulate backend generating specific assignment details
      if (selectedService.category === 'health') {
        details = {
          time: "11:30 AM",
          office: "Cabinet 204",
          street: "Str. Kiev 3",
          doctor: "Dr. Elena Ionescu"
        };
        setNotifications(prev => [`Doctor assigned: ${details.doctor} at ${details.time}`, ...prev]);
      } else if (selectedService.category === 'education') {
        details = {
          time: "09:00 AM (Monday)",
          office: "Secretariat / Room 1",
          street: "Selected Institution Address"
        };
        setNotifications(prev => [`School intake scheduled for ${details.time}`, ...prev]);
      }

      setLastConfirmation({
        title: "Registration Complete",
        description: `Your request for ${selectedService.title} has been confirmed. See assignment details below.`,
        id: `SRV-${Math.floor(Math.random() * 90000) + 10000}`,
        type: 'service',
        details
      });
      setCurrentView(AppView.CONFIRMATION);
    } else {
      setPendingPayment({
        amount: "150.00",
        description: `Service Registration Fee: ${selectedService?.title}`
      });
      setCurrentView(AppView.PAYMENT);
    }
  };

  const handleUtilityPay = (amount: number, description: string) => {
    setPendingPayment({
      amount: amount.toFixed(2),
      description
    });
    setCurrentView(AppView.PAYMENT);
  };

  const handlePaymentConfirm = (amountValue?: string) => {
    const finalAmount = amountValue || pendingPayment?.amount || "0";
    
    if (currentView === AppView.TOP_UP || pendingPayment?.isProductPurchase) {
      if (pendingPayment?.isProductPurchase) {
        setActiveTransportProduct(pendingPayment.productName || null);
        setLastConfirmation({
          title: "Pass Purchased",
          description: `You have successfully purchased: ${pendingPayment.productName}. It is now active on your digital identity.`,
          amount: finalAmount,
          id: `TRN-${Math.floor(Math.random() * 90000) + 10000}`,
          type: 'payment'
        });
      } else {
        const topUpValue = parseFloat(finalAmount);
        setWalletBalance(prev => prev + topUpValue);
        setLastConfirmation({
          title: "Wallet Topped Up",
          description: `Your MUNAPP Wallet balance has been updated. New balance: ${(walletBalance + topUpValue).toFixed(2)} MDL.`,
          amount: finalAmount,
          id: `WAL-${Math.floor(Math.random() * 90000) + 10000}`,
          type: 'payment'
        });
      }
      setPendingPayment(null);
      setCurrentView(AppView.CONFIRMATION);
    } else {
      setLastConfirmation({
        title: "Payment Successful",
        description: `Transaction completed for: ${pendingPayment?.description || "Municipal Service"}.`,
        amount: finalAmount,
        id: `MPAY-${Math.floor(Math.random() * 90000) + 10000}`,
        type: 'payment'
      });
      setPendingPayment(null);
      setCurrentView(AppView.CONFIRMATION);
    }
  };

  const handleTransferConfirm = (amount: string, recipient: string) => {
    const amountNum = parseFloat(amount);
    setWalletBalance(prev => prev - amountNum);
    setLastConfirmation({
      title: "Transfer Sent",
      description: `You have successfully transferred ${amount} MDL to ${recipient}.`,
      amount,
      id: `XFR-${Math.floor(Math.random() * 90000) + 10000}`,
      type: 'transfer'
    });
    setCurrentView(AppView.CONFIRMATION);
  };

  const handlePurchaseProduct = (product: { name: string, price: number }) => {
    setPendingPayment({
      amount: product.price.toString(),
      description: `Purchase: ${product.name}`,
      isProductPurchase: true,
      productName: product.name
    });
    setCurrentView(AppView.PAYMENT);
  };

  const handleBookAppointment = (newApt: Appointment) => {
    if (reschedulingAppointment) {
      setAppointments(prev => prev.map(a => a.id === reschedulingAppointment.id ? newApt : a));
      setReschedulingAppointment(null);
    } else {
      setAppointments([newApt, ...appointments]);
    }
    setCurrentView(AppView.APPOINTMENTS);
  };

  const handleRescheduleStart = (apt: Appointment) => {
    setReschedulingAppointment(apt);
    setCurrentView(AppView.RESCHEDULE_APPOINTMENT);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
  };

  const handleNavigateToMap = (location: FreeParkingLocation) => {
    setSelectedParkingLocation(location);
    setCurrentView(AppView.MAP);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView(AppView.LOGIN);
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto bg-white shadow-xl relative">
      <Header title="MUNAPP" showMenu={currentView !== AppView.LOGIN} />
      
      <main className="p-4">
        {currentView === AppView.DASHBOARD && (
          <DashboardView 
            onNavigate={setCurrentView} 
            transportBalance={walletBalance} 
            activeZoneName={`${activeZone.name} (${activeZone.sector})`}
            activePass={activeTransportProduct}
            notifications={notifications}
          />
        )}
        {currentView === AppView.SERVICES && (
          <ServicesView onServiceSelect={handleServiceSelect} />
        )}
        {currentView === AppView.FREE_PARKING && (
          <FreeParkingView 
            onBack={() => setCurrentView(AppView.SERVICES)} 
            onNavigateToMap={handleNavigateToMap}
          />
        )}
        {currentView === AppView.MAP && selectedParkingLocation && (
          <MapView 
            location={selectedParkingLocation} 
            onBack={() => setCurrentView(AppView.FREE_PARKING)} 
          />
        )}
        {currentView === AppView.UTILITIES && (
          <UtilityPaymentView 
            onBack={() => setCurrentView(AppView.DASHBOARD)} 
            onPay={handleUtilityPay}
          />
        )}
        {currentView === AppView.CASE_CREATION && (
          <CaseCreationView 
            service={selectedService || { title: "General Request", isFree: true, desc: "", icon: () => null }} 
            onConfirm={handleCaseConfirm} 
          />
        )}
        {currentView === AppView.PAYMENT && (
          <PaymentView 
            initialAmount={pendingPayment?.amount} 
            initialDescription={pendingPayment?.description}
            onConfirm={handlePaymentConfirm} 
          />
        )}
        {currentView === AppView.TOP_UP && (
          <TopUpView 
            onBack={() => setCurrentView(AppView.DASHBOARD)} 
            onConfirm={handlePaymentConfirm} 
            onPurchase={handlePurchaseProduct}
            currentBalance={walletBalance}
            onNavigateToTransfer={() => setCurrentView(AppView.TRANSFER)}
          />
        )}
        {currentView === AppView.TRANSFER && (
          <TransferView 
            onBack={() => setCurrentView(AppView.TOP_UP)} 
            onConfirm={handleTransferConfirm}
            currentBalance={walletBalance}
          />
        )}
        {currentView === AppView.CONFIRMATION && lastConfirmation && (
          <ConfirmationView 
            {...lastConfirmation}
            onClose={() => {
              setLastConfirmation(null);
              setCurrentView(AppView.DASHBOARD);
            }}
          />
        )}
        {currentView === AppView.CASES_LEDGER && (
          <CasesLedgerView />
        )}
        {currentView === AppView.APPOINTMENTS && (
          <AppointmentsView 
            appointments={appointments} 
            onNavigate={setCurrentView}
            onReschedule={handleRescheduleStart}
            onCancel={handleCancelAppointment}
          />
        )}
        {(currentView === AppView.BOOK_APPOINTMENT || currentView === AppView.RESCHEDULE_APPOINTMENT) && (
          <BookAppointmentView 
            appointmentToEdit={reschedulingAppointment || undefined}
            onConfirm={handleBookAppointment} 
            onBack={() => {
              setReschedulingAppointment(null);
              setCurrentView(AppView.APPOINTMENTS);
            }} 
          />
        )}
        {currentView === AppView.PROFILE && (
          <UserProfileView 
            onNavigate={setCurrentView} 
            onLogout={handleLogout} 
            transportBalance={walletBalance}
            parkingZones={parkingZones}
            activeZoneId={activeParkingZoneId}
            onSetActiveZone={setActiveParkingZoneId}
            onAddZone={(zone) => setParkingZones([...parkingZones, zone])}
          />
        )}
        {currentView === AppView.PARKING_MANAGEMENT && (
          <ParkingManagementView 
            onBack={() => setCurrentView(AppView.PROFILE)}
            activeZone={activeZone}
          />
        )}
        {currentView === AppView.SETTINGS && (
          <SettingsView onBack={() => setCurrentView(AppView.PROFILE)} />
        )}
      </main>

      <BottomNav 
        activeView={currentView} 
        onNavigate={setCurrentView} 
      />
    </div>
  );
};

export default App;
