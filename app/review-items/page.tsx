"use client";

import { PageCard, PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/Button";
import { useBill } from "@/lib/bill-context";
import { useRouter } from "next/navigation";

export default function ReviewItemsPage() {
  const router = useRouter();
  const { items, updateItem, addItem, deleteItem } = useBill();

  return (
    <PageLayout
      step="review"
      title="Review Items"
      subtitle="Check and edit line items before splitting"
    >
      <PageCard>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Extracted Items
        </h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50"
            >
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(item.id, "name", e.target.value)}
                placeholder="Item name"
                className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
              <input
                type="number"
                value={item.price || ""}
                onChange={(e) => updateItem(item.id, "price", e.target.value)}
                placeholder="0"
                min="0"
                className="w-20 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 sm:w-24"
              />
              <button
                type="button"
                onClick={() => deleteItem(item.id)}
                aria-label={`Delete ${item.name || "item"}`}
                className="shrink-0 rounded-lg px-2 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-red-500 dark:hover:bg-zinc-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={addItem}
          className="mt-4 w-full rounded-xl border border-dashed border-zinc-300 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50"
        >
          + Add item
        </button>
      </PageCard>

      <Button onClick={() => router.push("/bill-settings")}>Continue</Button>
    </PageLayout>
  );
}
