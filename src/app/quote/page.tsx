"use client";

import { useState } from "react";
import {
  SERVICES,
  SIZES,
  calculateQuote,
  type Service,
  type Size,
  type QuoteResult,
} from "@/lib/pricing";

export default function QuotePage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [service, setService] = useState<Service>("same_day");
  const [size, setSize] = useState<Size>("small");
  const [quote, setQuote] = useState<QuoteResult | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setQuote(calculateQuote(service, size));
  }

  const inputCls =
    "mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-3xl font-bold tracking-tight">Pricing calculator</h1>
      <p className="mt-2 text-slate-600">
        A rough price in seconds. We&rsquo;ll confirm the final cost when you
        book — no surprises. Prefer to just ask? Chat to{" "}
        <span className="font-semibold text-accent-600">Meep&nbsp;Meep</span> in
        the bottom corner.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Pickup suburb
            <input
              required
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. CBD"
              className={inputCls}
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Drop-off suburb
            <input
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Maple Town"
              className={inputCls}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            What are we carrying?
            <select
              value={size}
              onChange={(e) => setSize(e.target.value as Size)}
              className={inputCls}
            >
              {(Object.keys(SIZES) as Size[]).map((k) => (
                <option key={k} value={k}>
                  {SIZES[k].label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Service
            <select
              value={service}
              onChange={(e) => setService(e.target.value as Service)}
              className={inputCls}
            >
              {(Object.keys(SERVICES) as Service[]).map((k) => (
                <option key={k} value={k}>
                  {SERVICES[k].label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          Estimate my price
        </button>
      </form>

      {quote && (
        <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-6">
          <div className="text-sm font-medium text-brand-700">
            {quote.serviceLabel} · {origin || "Pickup"} → {destination || "Drop-off"}
          </div>
          <div className="mt-1 text-4xl font-bold text-brand-700">
            from ${quote.price.toFixed(2)}
          </div>
          <div className="mt-1 text-sm text-slate-600">
            {quote.eta}. Indicative only — distance and timing may adjust the
            final price, which we&rsquo;ll confirm before you book.
          </div>
        </div>
      )}
    </div>
  );
}
