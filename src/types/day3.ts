export interface Day3EventEntry {
  type: "Team" | "Individual";
  registered: number | null;
  participated: number | null;
  selectedNextRound: number | null;
}

export interface Day3Data {
  Day3: {
    Round2: {
      [eventName: string]: Day3EventEntry;
    };
  };
}
