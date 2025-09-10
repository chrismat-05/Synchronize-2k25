import axios from "axios";
import type { Day3Data } from "@/types/day3";

export const fetchDay3Data = async (): Promise<Day3Data> => {
  try {
    const url = import.meta.env.VITE_DAY3_API;
    if (!url) throw new Error('VITE_DAY3_API is not defined');
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch Day3 data:', err);
  return { Day3: { Round2: {} } };
  }
};
