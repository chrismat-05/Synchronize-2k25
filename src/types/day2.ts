export interface Day2EventEntry {
  type: "Team" | "Individual";
  registered: number | null;
  participated: number | null;
  selectedNextRound: number | null;
  selectedFinalRound: number | null;
}

export interface Day2Event {
  [teamOrIndivId: string]: Day2EventEntry;
}

export interface Day2Data {
  Day2: {
    [eventName: string]: Day2Event;
  };
}
