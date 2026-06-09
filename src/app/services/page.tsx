import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — VoyageXpress",
  description:
    "Same-day courier, scheduled delivery, regular business runs and small local moves — owner-operated, city and regional.",
};

const SERVICES = [
  {
    title: "Same-day courier",
    desc: "Need something across town today? Book in the morning and we'll collect and deliver the same day, with a live tracking link so you always know where it is.",
    points: ["Urgent point-to-point", "Live tracking", "Same-day"],
  },
  {
    title: "Scheduled delivery",
    desc: "Pick a day and a time window that suits you. We turn up when we say we will and deliver on the dot — no all-day waiting around.",
    points: ["Book a time", "Reliable windows", "City + regional"],
  },
  {
    title: "Regular business runs",
    desc: "Recurring pickups and drops for local businesses — daily, weekly, or whatever rhythm works. Same friendly faces every run, building a routine you can count on.",
    points: ["Recurring runs", "Account billing", "The same drivers"],
  },
  {
    title: "Small local moves",
    desc: "A few items, a marketplace buy, or a small office shuffle. If it fits in a van and two people can lift it, we'll move it carefully and get it there in one piece.",
    points: ["Up to a van load", "Careful handling", "By arrangement"],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">What we do</h1>
        <p className="mt-3 text-lg text-slate-600">
          An owner-operated courier covering {site.serviceArea}. {site.capacity}
          {" "}— pick a service below or ask us for a quick quote.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {SERVICES.map((s) => (
          <div key={s.title} className="rounded-2xl border border-slate-200 p-7">
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <p className="mt-2 text-slate-600">{s.desc}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.points.map((p) => (
                <li
                  key={p}
                  className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-brand-600 px-8 py-10 text-white">
        <h2 className="text-2xl font-bold">Not sure if we can help?</h2>
        <p className="mt-2 max-w-xl text-brand-100">
          Just ask. Tell us what you&rsquo;ve got and where it needs to go, and
          we&rsquo;ll let you know straight away — and what it&rsquo;ll cost.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/quote"
            className="inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            Get a quick quote
          </Link>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="inline-flex rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
