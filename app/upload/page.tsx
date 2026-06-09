"use client";

import { PageCard, PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/Button";
import { useBill } from "@/lib/bill-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UploadPage() {
  const router = useRouter();
  const { resetExtractedItems } = useBill();
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

  function handleExtractItems() {
    resetExtractedItems();
    router.push("/review-items");
  }

  return (
    <PageLayout
      step="upload"
      title="Upload Bill"
      subtitle="Snap or upload a photo of your receipt"
    >
      <PageCard>
        <label
          htmlFor="bill-image"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 px-6 py-10 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50"
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
      </PageCard>

      {previewUrl && (
        <PageCard className="overflow-hidden p-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Bill preview"
            className="max-h-80 w-full object-contain"
          />
        </PageCard>
      )}

      <Button disabled={!image} onClick={handleExtractItems}>
        Extract Items
      </Button>
    </PageLayout>
  );
}
