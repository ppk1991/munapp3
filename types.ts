
export type Language = 'en' | 'ro' | 'ru';

export enum AppView {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  SERVICES = 'SERVICES',
  CASE_CREATION = 'CASE_CREATION',
  PAYMENT = 'PAYMENT',
  CASES_LEDGER = 'CASES_LEDGER',
  APPOINTMENTS = 'APPOINTMENTS',
  BOOK_APPOINTMENT = 'BOOK_APPOINTMENT',
  RESCHEDULE_APPOINTMENT = 'RESCHEDULE_APPOINTMENT',
  PROFILE = 'PROFILE',
  PARKING_MANAGEMENT = 'PARKING_MANAGEMENT',
  SETTINGS = 'SETTINGS',
  TOP_UP = 'TOP_UP',
  UTILITIES = 'UTILITIES',
  FREE_PARKING = 'FREE_PARKING',
  MAP = 'MAP',
  CONFIRMATION = 'CONFIRMATION',
  TRANSFER = 'TRANSFER',
  CIVIC_TECH = 'CIVIC_TECH',
  IMPORTANT_NUMBERS = 'IMPORTANT_NUMBERS'
}

export interface Case {
  id: string;
  date: string;
  title: string;
  status: 'Approved' | 'In Progress' | 'Completed' | 'Pending';
}

export interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  fullAddress?: string;
  instructions?: string;
}

export interface ParkingZone {
  id: string;
  name: string;
  sector: string;
  address: string;
  isSubsidized: boolean;
  rules: string;
}

export interface FreeParkingLocation {
  id: string;
  name: string;
  address: string;
  sector: string;
  spots: number;
  status: 'Available' | 'High Demand' | 'Limited';
  isSuburb?: boolean;
}

export interface UserProfile {
  name: string;
  eid: string;
  adminUnit: string;
  residenceStatus: string;
  transportCardBalance: number;
  activeParkingZoneId: string;
  parkingZones: ParkingZone[];
  appointmentsCount: number;
  activeTaxesCount: number;
}
