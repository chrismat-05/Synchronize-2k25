import axios from "axios";
import type { Day4Data } from "@/types/day4";

export const fetchDay4Data = async (): Promise<Day4Data> => {
  try {
    const url = import.meta.env.VITE_DAY4_API;
    if (!url) throw new Error('VITE_DAY4_API is not defined');
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error('Failed to fetch Day4 data:', err);
  return { Day4: { Round3: {} } };
  }
};
