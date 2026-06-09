import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — VoyageXpress",
  description:
    "Express parcels, standard freight, ocean & air forwarding, and managed fleet logistics from VoyageXpress.",
};

const SERVICES = [
  {
    title: "Express parcels",
    desc: "Next-day and same-day delivery for time-critical packages across metropolitan Australia, with priority handling and signature on delivery.",
    points: ["Next-day metro", "Live ETA tracking", "Proof of delivery"],
  },
  {
    title: "Standard freight",
    desc: "Cost-effective road and rail movement for pallets, cartons and bulky consignments, with flexible pickup windows.",
    points: ["Pallet & LTL", "Road + rail network", "Liftgate options"],
  },
  {
    title: "Ocean & air freight",
    desc: "International forwarding with customs clearance handled end to end — from a single carton to full container loads.",
    points: ["FCL & LCL", "Customs brokerage", "Door-to-door"],
  },
  {
    title: "Managed fleet",
    desc: "Dedicated vehicles and drivers for recurring routes, with a real-time ops dashboard and SLA reporting.",
    points: ["Dedicated runs", "Driver app", "SLA dashboards"],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Services</h1>
        <p className="mt-3 text-lg text-slate-600">
          One partner for every leg of the journey — pick a mode below or get an
          instant quote.
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
        <h2 className="text-2xl font-bold">Not sure which service you need?</h2>
        <p className="mt-2 max-w-xl text-brand-100">
          Tell us where it&rsquo;s going and what you&rsquo;re shipping — we&rsquo;ll
          recommend the best mode and price.
        </p>
        <Link
          href="/quote"
          className="mt-5 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
        >
          Get an instant quote
        </Link>
      </div>
    </div>
  );
}
