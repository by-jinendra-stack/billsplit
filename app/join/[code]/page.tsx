"use client";

import { PageCard, PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/Button";
import { useBill } from "@/lib/bill-context";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinPage() {
  const router = useRouter();
  const params = useParams();
  const code = params.code as string;
  const { joinParticipant } = useBill();
  const [name, setName] = useState("");

  function handleJoin() {
    const trimmed = name.trim();
    if (!trimmed) return;
    joinParticipant(trimmed);
    router.push("/select-items");
  }

  return (
    <PageLayout
      step="join"
      title="Join Bill"
      subtitle={`You're joining bill ${code}`}
    >
      <PageCard>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Your name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        />
      </PageCard>

      <Button disabled={!name.trim()} onClick={handleJoin}>
        Join
      </Button>
    </PageLayout>
  );
}
