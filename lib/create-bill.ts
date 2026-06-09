import { supabase } from "./supabase";
import type { BillItem, BillSettings } from "./types";

function generateShareCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function createBill(items: BillItem[], settings: BillSettings) {
  const shareCode = generateShareCode();

  const { data: bill, error: billError } = await supabase
    .from("bills")
    .insert({
      share_code: shareCode,
      participant_count: settings.numberOfParticipants,
      tax_amount: settings.taxAmount,
      service_charge: settings.serviceChargeAmount,
      apply_tax: settings.applyTaxToEveryone,
      apply_service_charge: settings.applyServiceChargeToEveryone,
    })
    .select()
    .single();

  if (billError) throw billError;

  const { data: insertedItems, error: itemsError } = await supabase
    .from("items")
    .insert(
      items.map((item) => ({
        bill_id: bill.id,
        name: item.name,
        price: item.price,
      })),
    )
    .select();

  if (itemsError) throw itemsError;

  return { bill, items: insertedItems, shareCode };
}
