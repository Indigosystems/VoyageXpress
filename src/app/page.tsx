import Link from "next/link";
import { TrackForm } from "@/components/TrackForm";

const SERVICES = [
  {
    title: "Express parcels",
    desc: "Next-day delivery for time-critical packages across metro Australia.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Standard freight",
    desc: "Cost-effective road and rail for pallets and bulky consignments.",
    icon: "M3 13h2l1 5h12l1-5h2M5 13V6h11l3 4v3M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z",
  },
  {
    title: "Ocean & air",
    desc: "International freight forwarding with customs clearance handled end to end.",
    icon: "M3 17l4-4 4 2 7-7M3 21h18",
  },
];

const STATS = [
  { value: "2.4M+", label: "Shipments delivered" },
  { value: "98.7%", label: "On-time rate" },
  { value: "120+", label: "Destinations" },
  { value: "24/7", label: "AI tracking support" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 to-brand-800 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_top_right,white,transparent_55%)]" />
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live network across AU & the Pacific
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Logistics, delivered with certainty.
            </h1>
            <p className="mt-5 text-lg text-brand-100">
              VoyageXpress moves your freight, parcels and fleet — with
              real-time tracking and an AI assistant that always knows where
              your shipment is.
            </p>

            <div className="mt-8 rounded-2xl bg-white/10 p-3 backdrop-blur ring-1 ring-white/15">
              <TrackForm size="lg" />
              <p className="mt-2 px-1 text-xs text-brand-100">
                Track any shipment instantly — no login required.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
              >
                Get an instant quote
              </Link>
              <Link
                href="/services"
                className="rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-brand-600">{s.value}</div>
              <div className="mt-1 text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">
            One network for every shipment
          </h2>
          <p className="mt-3 text-slate-600">
            From a single envelope to a full container, VoyageXpress carries it
            on the right mode at the right price.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-brand-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={service.icon} />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI agent teaser */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              Meet Vex
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Your AI logistics assistant
            </h2>
            <p className="mt-3 text-slate-600">
              Ask Vex anything — &ldquo;Where&rsquo;s VX-4821-7390?&rdquo;,
              &ldquo;Quote a pallet Sydney to Perth&rdquo;, or &ldquo;Book a
              pickup tomorrow&rdquo;. Powered by Claude, Vex reads your live
              shipment data and gets things done. <em>(Coming in Phase 4.)</em>
            </p>
            <Link
              href="/track"
              className="mt-6 inline-flex rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Try live tracking
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-3 text-sm">
              <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-brand-600 px-4 py-2 text-white">
                Where is VX-4821-7390?
              </div>
              <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-2 text-slate-700">
                It&rsquo;s in transit near Goulburn, NSW — departed the sort
                facility this morning and is on track to reach Melbourne by
                Thu 11 Jun. Want me to text you when it&rsquo;s out for delivery?
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
