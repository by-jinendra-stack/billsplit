"use client";

import { PageCard, PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/Button";
import { SHARE_CODE } from "@/lib/constants";
import { useBill } from "@/lib/bill-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SHARE_LINK = `localhost:3000/join/${SHARE_CODE}`;

export default function SharePage() {
  const router = useRouter();
  const { participants, settings } = useBill();
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const joinedCount = participants.length;
  const totalParticipants = settings.numberOfParticipants;
  const waitingCount = Math.max(0, totalParticipants - joinedCount);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(`http://${SHARE_LINK}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }

  return (
    <PageLayout
      step="share"
      title="Share Bill"
      subtitle="Send this link so friends can join and select their items"
    >
      <PageCard>
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Share code
          </p>
          <p className="mt-2 text-3xl font-bold tracking-widest text-zinc-900 dark:text-zinc-50">
            {SHARE_CODE}
          </p>
        </div>

        <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <p className="text-sm font-medium text-zinc-500">Share link</p>
          <p className="mt-2 break-all rounded-lg bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {SHARE_LINK}
          </p>
        </div>

        <div className="mt-4 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={handleCopyLink}>
            {copied ? "Copied!" : "Copy Link"}
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={handleRefresh}
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </PageCard>

      <PageCard>
        <p className="text-sm font-medium text-zinc-500">
          Participants Joined
        </p>
        <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {joinedCount} / {totalParticipants}
        </p>

        <ul className="mt-4 space-y-2">
          {participants.map((participant) => (
            <li
              key={participant.id}
              className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"
            >
              <span className="text-emerald-600 dark:text-emerald-400">✓</span>
              <span className="font-medium">{participant.name}</span>
            </li>
          ))}
        </ul>

        {waitingCount > 0 && (
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Waiting for {waitingCount} more participant
            {waitingCount === 1 ? "" : "s"}...
          </p>
        )}
      </PageCard>

      <Button onClick={() => router.push(`/join/${SHARE_CODE}`)}>
        Continue
      </Button>
    </PageLayout>
  );
}
