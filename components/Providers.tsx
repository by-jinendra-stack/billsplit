"use client";

import { BillProvider } from "@/lib/bill-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <BillProvider>{children}</BillProvider>;
}
