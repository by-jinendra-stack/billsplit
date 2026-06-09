"use client";

import { useEffect, useState } from "react";

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
    }
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
          className="mt-10 w-full rounded-full bg-zinc-900 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto"
        >
          Extract Items
        </button>
      </main>
    </div>
  );
}
