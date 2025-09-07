export interface FactionData {
  overall: Record<string, number>;
  perFaction: Record<string, Record<string, number>>;
  _last_updated: string;
}

export interface RegistrationData {
  [eventName: string]: number;
}

export interface EventInfo {
  name: string;
  displayName: string;
  logo: string;
  registrationUrl: string;
}