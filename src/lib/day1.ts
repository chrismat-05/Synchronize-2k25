import axios from "axios";
import type { Day1Data } from "@/types/day1";

export const fetchDay1Data = async (): Promise<Day1Data> => {
  const response = await axios.get(import.meta.env.VITE_DAY1_API || "");
  return response.data;
};
