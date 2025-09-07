import axios from 'axios';
import type { FactionData, RegistrationData } from '@/types/api';

const api = axios.create({
  timeout: 10000,
});

export const fetchFactionData = async (): Promise<FactionData> => {
  const response = await api.get(import.meta.env.VITE_FACTION_COUNT_API || '');
  return response.data;
};

export const fetchRegistrationData = async (): Promise<RegistrationData> => {
  const response = await api.get(import.meta.env.VITE_REG_COUNT_API || '');
  return response.data;
};