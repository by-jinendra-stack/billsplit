import { supabase } from "./supabase";

/** Temporary — remove after verifying Supabase connection. */
export async function testSupabaseConnection() {
  const { data, error } = await supabase
    .from("bills")
    .insert({
      share_code: "TEST123",
      participant_count: 1,
      tax_amount: 0,
      service_charge: 0,
      apply_tax: true,
      apply_service_charge: true,
    })
    .select();

  if (error) {
    console.error("Supabase connection test failed:");
    console.error("error:", error);
    console.error("JSON.stringify(error, null, 2):", JSON.stringify(error, null, 2));
    console.error("error.message:", error.message);
    console.error("error.code:", error.code);
    console.error("error.details:", error.details);
    console.error("error.hint:", error.hint);
    return { success: false as const, error };
  }

  console.log("Supabase connection test succeeded:", data);
  return { success: true as const, data };
}
