export type BillItem = {
  id: string;
  name: string;
  price: number;
};

export type BillSettings = {
  numberOfParticipants: number;
  taxAmount: number;
  serviceChargeAmount: number;
  applyTaxToEveryone: boolean;
  applyServiceChargeToEveryone: boolean;
};

export type Participant = {
  id: string;
  name: string;
  selectedItemIds: string[];
  itemsTotal: number;
  taxShare: number;
  serviceChargeShare: number;
  grandTotal: number;
  hasCompletedSelection: boolean;
};

export type FlowStep =
  | "upload"
  | "review"
  | "settings"
  | "share"
  | "join"
  | "select"
  | "results";
