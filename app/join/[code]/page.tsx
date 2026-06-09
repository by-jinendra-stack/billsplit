"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinPage() {
  const router = useRouter();
  const params = useParams();
  const code = params.code as string;
  const [name, setName] = useState("");

  function handleJoin() {
    const trimmed = name.trim();
    if (!trimmed) return;
    router.push("/select-items");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-12 font-sans dark:bg-zinc-950 sm:py-16">
      <main className="w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Join Bill
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          You&apos;re joining bill{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {code}
          </span>
        </p>

        <div className="mt-10 text-left">
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
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600"
          />
        </div>

        <button
          type="button"
          onClick={handleJoin}
          disabled={!name.trim()}
          className="mt-8 w-full rounded-full bg-zinc-900 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Join
        </button>
      </main>
    </div>
  );
}
