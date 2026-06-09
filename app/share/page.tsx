"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SHARE_CODE = "ABC123";
const SHARE_LINK = `localhost:3000/join/${SHARE_CODE}`;

export default function SharePage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(`http://${SHARE_LINK}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center bg-zinc-50 px-6 py-12 font-sans dark:bg-zinc-950 sm:py-16">
      <main className="w-full max-w-lg">
        <h1 className="text-center text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Share Bill
        </h1>

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              Share code
            </p>
            <p className="mt-2 text-3xl font-bold tracking-widest text-zinc-900 dark:text-zinc-50">
              {SHARE_CODE}
            </p>
          </div>

          <div className="mt-8 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <p className="text-sm font-medium text-zinc-500">Share link</p>
            <p className="mt-2 break-all rounded-lg bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {SHARE_LINK}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="mt-6 w-full rounded-full border border-zinc-300 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/join/${SHARE_CODE}`)}
          className="mt-8 w-full rounded-full bg-zinc-900 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Continue
        </button>
      </main>
    </div>
  );
}
