"use client";

import { testSupabaseConnection } from "@/lib/test-supabase-connection";
import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Upload bill image",
    description: "Snap or upload a photo of your receipt",
  },
  {
    number: "2",
    title: "Review extracted items",
    description: "Check and edit line items before splitting",
  },
  {
    number: "3",
    title: "Share with friends",
    description: "Send a link so everyone can claim their share",
  },
  {
    number: "4",
    title: "Split expenses",
    description: "See who owes what and settle up easily",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-zinc-950">
      <main className="flex w-full max-w-lg flex-col items-center text-center">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          BillSplit
        </h1>
        <p className="mt-4 max-w-sm text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Split restaurant and grocery bills in minutes
        </p>

        <Link
          href="/upload"
          className="mt-10 rounded-full bg-zinc-900 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Upload Bill
        </Link>

        <button
          type="button"
          onClick={() => void testSupabaseConnection()}
          className="mt-4 rounded-full border border-zinc-300 px-8 py-3.5 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Test Supabase
        </button>

        <section className="mt-16 w-full">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
            How it works
          </h2>
          <ol className="mt-6 space-y-5">
            {steps.map((step) => (
              <li
                key={step.number}
                className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-white p-4 text-left dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {step.number}
                </span>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
