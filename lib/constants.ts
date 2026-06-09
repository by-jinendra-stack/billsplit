import type { BillItem, BillSettings, Participant } from "./types";

export const SHARE_CODE = "ABC123";

export const DEFAULT_ITEMS: BillItem[] = [
  { id: "burger", name: "Burger", price: 250 },
  { id: "fries", name: "Fries", price: 120 },
  { id: "coke", name: "Coke", price: 80 },
];

export const DEFAULT_SETTINGS: BillSettings = {
  numberOfParticipants: 7,
  taxAmount: 140,
  serviceChargeAmount: 70,
  applyTaxToEveryone: true,
  applyServiceChargeToEveryone: true,
};

export const DEMO_PARTICIPANTS: Participant[] = [
  {
    id: "demo-amit",
    name: "Amit",
    selectedItemIds: ["burger", "coke"],
    itemsTotal: 330,
    taxShare: 20,
    serviceChargeShare: 10,
    grandTotal: 360,
    hasCompletedSelection: true,
  },
  {
    id: "demo-rahul",
    name: "Rahul",
    selectedItemIds: ["fries", "coke"],
    itemsTotal: 180,
    taxShare: 20,
    serviceChargeShare: 10,
    grandTotal: 210,
    hasCompletedSelection: true,
  },
  {
    id: "demo-priya",
    name: "Priya",
    selectedItemIds: ["burger", "fries"],
    itemsTotal: 260,
    taxShare: 20,
    serviceChargeShare: 10,
    grandTotal: 290,
    hasCompletedSelection: true,
  },
];
