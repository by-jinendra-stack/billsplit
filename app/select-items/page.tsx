"use client";

import { useState } from "react";

type BillItem = {
  id: string;
  name: string;
  price: number;
};

type SharedItem = {
  id: string;
  name: string;
};

const SAMPLE_ITEMS: BillItem[] = [
  { id: "burger", name: "Burger", price: 250 },
  { id: "fries", name: "Fries", price: 120 },
  { id: "coke", name: "Coke", price: 80 },
];

const SHARED_ITEMS: SharedItem[] = [
  { id: "tax", name: "Tax" },
  { id: "service-charge", name: "Service Charge" },
];

export default function SelectItemsPage() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectedShared, setSelectedShared] = useState<Set<string>>(new Set());

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

  function toggleShared(id: string) {
    setSelectedShared((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center bg-zinc-50 px-6 py-12 font-sans dark:bg-zinc-950 sm:py-16">
      <main className="w-full max-w-lg">
        <h1 className="text-center text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Select Items
        </h1>
        <p className="mt-3 text-center text-zinc-600 dark:text-zinc-400">
          Choose the items you ordered
        </p>

        <ul className="mt-10 space-y-3">
          {SAMPLE_ITEMS.map((item) => (
            <li key={item.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-colors has-checked:border-zinc-400 has-checked:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:has-checked:border-zinc-600 dark:has-checked:bg-zinc-800">
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
                  ₹{item.price}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Shared Items
          </h2>
          <ul className="mt-4 space-y-3">
            {SHARED_ITEMS.map((item) => (
              <li key={item.id}>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-colors has-checked:border-zinc-400 has-checked:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:has-checked:border-zinc-600 dark:has-checked:bg-zinc-800">
                  <input
                    type="checkbox"
                    checked={selectedShared.has(item.id)}
                    onChange={() => toggleShared(item.id)}
                    className="h-5 w-5 shrink-0 rounded border-zinc-300 accent-zinc-900 dark:border-zinc-600 dark:accent-zinc-50"
                  />
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {item.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <button
          type="button"
          className="mt-10 w-full rounded-full bg-zinc-900 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Continue
        </button>
      </main>
    </div>
  );
}
