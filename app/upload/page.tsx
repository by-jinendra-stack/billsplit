"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type BillItem = {
  id: string;
  name: string;
  price: string;
};

const SAMPLE_ITEMS: Omit<BillItem, "id">[] = [
  { name: "Burger", price: "250" },
  { name: "Fries", price: "120" },
  { name: "Coke", price: "80" },
];

function createItem(name = "", price = ""): BillItem {
  return { id: crypto.randomUUID(), name, price };
}

export default function UploadPage() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [items, setItems] = useState<BillItem[] | null>(null);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(image);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file?.type.startsWith("image/")) {
      setImage(file);
      setItems(null);
    }
  }

  function handleExtractItems() {
    setItems(SAMPLE_ITEMS.map((item) => createItem(item.name, item.price)));
  }

  function updateItem(id: string, field: "name" | "price", value: string) {
    setItems((prev) =>
      prev?.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ) ?? null,
    );
  }

  function addItem() {
    setItems((prev) => [...(prev ?? []), createItem()]);
  }

  function deleteItem(id: string) {
    setItems((prev) => prev?.filter((item) => item.id !== id) ?? null);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center bg-zinc-50 px-6 py-12 font-sans dark:bg-zinc-950 sm:py-16">
      <main className="flex w-full max-w-lg flex-col items-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Upload Bill
        </h1>

        <div className="mt-10 w-full">
          <label
            htmlFor="bill-image"
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-white px-6 py-10 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
          >
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Choose an image
            </span>
            <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              PNG, JPG, or WEBP
            </span>
            <input
              id="bill-image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>

          {image && (
            <p className="mt-3 truncate text-center text-sm text-zinc-500 dark:text-zinc-400">
              {image.name}
            </p>
          )}
        </div>

        {previewUrl && (
          <div className="mt-8 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Bill preview"
              className="max-h-96 w-full object-contain"
            />
          </div>
        )}

        <button
          type="button"
          disabled={!image}
          onClick={handleExtractItems}
          className="mt-10 w-full rounded-full bg-zinc-900 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto"
        >
          Extract Items
        </button>

        {items && (
          <section className="mt-12 w-full">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Extracted Items
            </h2>

            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, "name", e.target.value)}
                    placeholder="Item name"
                    className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(item.id, "price", e.target.value)
                    }
                    placeholder="0"
                    min="0"
                    className="w-20 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 sm:w-24"
                  />
                  <button
                    type="button"
                    onClick={() => deleteItem(item.id)}
                    aria-label={`Delete ${item.name || "item"}`}
                    className="shrink-0 rounded-lg px-2 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-red-500 dark:hover:bg-zinc-800"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={addItem}
              className="mt-4 w-full rounded-xl border border-dashed border-zinc-300 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:bg-white dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              + Add item
            </button>

            <button
              type="button"
              onClick={() => router.push("/share")}
              className="mt-8 w-full rounded-full bg-zinc-900 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Continue
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
