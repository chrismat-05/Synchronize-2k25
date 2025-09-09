// TypeScript type for Day1 API response
export interface Day1EventEntry {
  type: "Team" | "Individual";
  registered: number | null;
  participated: number | null;
  selectedNextRound: number | null;
}

export interface Day1Event {
  [teamOrIndivId: string]: Day1EventEntry;
}

export interface Day1Data {
  Day1: {
    [eventName: string]: Day1Event;
  };
}
