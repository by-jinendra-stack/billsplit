"use client";

import { PageCard, PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useBill } from "@/lib/bill-context";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function ResultsPage() {
  const router = useRouter();
  const { items, settings, participants, resetBill } = useBill();

  const settledParticipants = participants.filter(
    (participant) => participant.hasCompletedSelection,
  );

  const totalBillAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items],
  );

  const joinedCount = participants.length;
  const totalParticipants = settings.numberOfParticipants;

  function handleCreateNewBill() {
    resetBill();
    router.push("/");
  }

  return (
    <PageLayout
      step="results"
      title="Results"
      subtitle="Bill summary and settlement"
    >
      <PageCard>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Bill Summary
        </h2>
        <ul className="mt-4 space-y-3">
          {settledParticipants.map((participant) => (
            <li
              key={participant.id}
              className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/50"
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {participant.name}
              </span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                {formatCurrency(participant.grandTotal)}
              </span>
            </li>
          ))}
        </ul>
      </PageCard>

      <Card className="space-y-3 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">
            Total Bill Amount
          </span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {formatCurrency(totalBillAmount)}
          </span>
        </div>
        {settings.applyTaxToEveryone && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Total Tax</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatCurrency(settings.taxAmount)}
            </span>
          </div>
        )}
        {settings.applyServiceChargeToEveryone && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">
              Total Service Charge
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatCurrency(settings.serviceChargeAmount)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">
            Number of Participants
          </span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {totalParticipants}
          </span>
        </div>
        <div className="border-t border-zinc-200 pt-3 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              Participants Joined
            </span>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {joinedCount} of {totalParticipants}
            </span>
          </div>
        </div>
      </Card>

      <Button onClick={handleCreateNewBill}>Create New Bill</Button>
    </PageLayout>
  );
}
