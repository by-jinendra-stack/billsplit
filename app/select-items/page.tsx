"use client";

import { PageCard, PageLayout } from "@/components/PageLayout";
import { TotalsCard } from "@/components/TotalsCard";
import { Button } from "@/components/ui/Button";
import { useBill } from "@/lib/bill-context";
import {
  formatCurrency,
  getServiceChargePerPerson,
  getTaxPerPerson,
} from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function SelectItemsPage() {
  const router = useRouter();
  const {
    items,
    settings,
    participantName,
    currentParticipantId,
    joinParticipant,
    saveParticipantSelection,
    participants,
  } = useBill();

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const activeParticipant = participants.find(
    (participant) => participant.id === currentParticipantId,
  );

  useEffect(() => {
    if (activeParticipant?.selectedItemIds.length) {
      setSelectedItems(new Set(activeParticipant.selectedItemIds));
    }
  }, [activeParticipant]);

  const taxShare = getTaxPerPerson(settings);
  const serviceChargeShare = getServiceChargePerPerson(settings);

  const selectedTotal = useMemo(
    () =>
      items
        .filter((item) => selectedItems.has(item.id))
        .reduce((sum, item) => sum + item.price, 0),
    [items, selectedItems],
  );

  function toggleItem(id: string) {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleContinue() {
    const participantId =
      currentParticipantId ??
      (participantName ? joinParticipant(participantName) : null);

    if (!participantId) return;

    saveParticipantSelection(
      participantId,
      Array.from(selectedItems),
      selectedTotal,
    );
    router.push("/results");
  }

  return (
    <PageLayout
      step="select"
      title="Select Items"
      subtitle="Choose the items you ordered"
    >
      <PageCard>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Your Items
        </h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3 transition-colors has-checked:border-zinc-400 has-checked:bg-white dark:border-zinc-800 dark:bg-zinc-800/50 dark:has-checked:border-zinc-600 dark:has-checked:bg-zinc-800">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.id)}
                  onChange={() => toggleItem(item.id)}
                  className="h-5 w-5 shrink-0 rounded border-zinc-300 accent-zinc-900 dark:border-zinc-600 dark:accent-zinc-50"
                />
                <span className="min-w-0 flex-1 font-medium text-zinc-900 dark:text-zinc-100">
                  {item.name}
                </span>
                <span className="shrink-0 text-zinc-600 dark:text-zinc-400">
                  {formatCurrency(item.price)}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </PageCard>

      {(settings.applyTaxToEveryone ||
        settings.applyServiceChargeToEveryone) && (
        <PageCard>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Applied To Everyone
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {settings.applyTaxToEveryone && (
              <li className="flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <span>Tax Share</span>
                <span className="font-medium">
                  {formatCurrency(taxShare)}
                </span>
              </li>
            )}
            {settings.applyServiceChargeToEveryone && (
              <li className="flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <span>Service Charge Share</span>
                <span className="font-medium">
                  {formatCurrency(serviceChargeShare)}
                </span>
              </li>
            )}
          </ul>
        </PageCard>
      )}

      <TotalsCard
        participantName={participantName || "Guest"}
        selectedTotal={selectedTotal}
        taxShare={taxShare}
        serviceChargeShare={serviceChargeShare}
        showTax={settings.applyTaxToEveryone}
        showServiceCharge={settings.applyServiceChargeToEveryone}
      />

      <Button onClick={handleContinue}>Continue</Button>
    </PageLayout>
  );
}
