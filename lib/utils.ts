import type { BillSettings } from "./types";

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function perPersonShare(total: number, participants: number): number {
  if (participants <= 0 || total <= 0) return 0;
  return Math.round(total / participants);
}

export function getTaxPerPerson(settings: BillSettings): number {
  if (!settings.applyTaxToEveryone) return 0;
  return perPersonShare(settings.taxAmount, settings.numberOfParticipants);
}

export function getServiceChargePerPerson(settings: BillSettings): number {
  if (!settings.applyServiceChargeToEveryone) return 0;
  return perPersonShare(
    settings.serviceChargeAmount,
    settings.numberOfParticipants,
  );
}

export function calculateParticipantTotals(
  itemsTotal: number,
  settings: BillSettings,
) {
  const taxShare = getTaxPerPerson(settings);
  const serviceChargeShare = getServiceChargePerPerson(settings);
  const grandTotal = itemsTotal + taxShare + serviceChargeShare;

  return { itemsTotal, taxShare, serviceChargeShare, grandTotal };
}
