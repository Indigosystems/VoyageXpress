"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function TrackForm({
  size = "md",
  defaultValue = "",
}: {
  size?: "md" | "lg";
  defaultValue?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    router.push(`/track?number=${encodeURIComponent(trimmed)}`);
  }

  const pad = size === "lg" ? "py-4 text-base" : "py-3 text-sm";

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
      <input
        type="text"
        inputMode="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter tracking number (try VX-4821-7390)"
        aria-label="Tracking number"
        className={`flex-1 rounded-lg border border-slate-300 px-4 ${pad} text-ink shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200`}
      />
      <button
        type="submit"
        className={`rounded-lg bg-brand-600 px-6 font-semibold text-white shadow-sm transition hover:bg-brand-700 ${pad}`}
      >
        Track
      </button>
    </form>
  );
}
