import axios from "axios";
import type { Day2Data } from "@/types/day2";

export const fetchDay2Data = async (): Promise<Day2Data> => {
  try {
    const url = import.meta.env.VITE_DAY2_API;
    if (!url) throw new Error('VITE_DAY2_API is not defined');
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch Day2 data:', err);
    return { Day2: {} };
  }
};
