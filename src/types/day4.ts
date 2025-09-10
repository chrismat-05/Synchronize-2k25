export interface Day4EventEntry {
  type: "Team" | "Individual";
  registered: number | null;
  participated: number | null;
  selectedNextRound: number | null;
}

export interface Day4Data {
  Day4: {
    Round3: {
      [eventName: string]: Day4EventEntry;
    };
  };
}
