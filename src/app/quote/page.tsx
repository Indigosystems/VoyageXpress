"use client";

import { useState } from "react";

type Service = "express" | "standard" | "freight";

const RATES: Record<Service, { base: number; perKg: number; label: string; days: string }> = {
  express: { base: 18, perKg: 2.4, label: "Express", days: "1–2 business days" },
  standard: { base: 9, perKg: 1.1, label: "Standard", days: "3–5 business days" },
  freight: { base: 45, perKg: 0.6, label: "Freight", days: "5–8 business days" },
};

export default function QuotePage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [service, setService] = useState<Service>("standard");
  const [quote, setQuote] = useState<number | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const kg = Math.max(0, parseFloat(weight) || 0);
    const r = RATES[service];
    // Simple, transparent demo pricing. Phase 2 replaces this with real rating.
    const price = r.base + kg * r.perKg;
    setQuote(Math.round(price * 100) / 100);
  }

  const inputCls =
    "mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-3xl font-bold tracking-tight">Get an instant quote</h1>
      <p className="mt-2 text-slate-600">
        Indicative pricing in seconds. Final rates confirmed at booking.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            From
            <input
              required
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Sydney, NSW"
              className={inputCls}
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            To
            <input
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Melbourne, VIC"
              className={inputCls}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Weight (kg)
            <input
              required
              type="number"
              min="0"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="12.5"
              className={inputCls}
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Service
            <select
              value={service}
              onChange={(e) => setService(e.target.value as Service)}
              className={inputCls}
            >
              <option value="express">Express (1–2 days)</option>
              <option value="standard">Standard (3–5 days)</option>
              <option value="freight">Freight (5–8 days)</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          Calculate quote
        </button>
      </form>

      {quote !== null && (
        <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-6">
          <div className="text-sm font-medium text-brand-700">
            {RATES[service].label} · {origin || "Origin"} → {destination || "Destination"}
          </div>
          <div className="mt-1 text-4xl font-bold text-brand-700">
            ${quote.toFixed(2)}
          </div>
          <div className="mt-1 text-sm text-slate-600">
            Estimated transit: {RATES[service].days}. Indicative only — GST and
            surcharges may apply.
          </div>
        </div>
      )}
    </div>
  );
}
