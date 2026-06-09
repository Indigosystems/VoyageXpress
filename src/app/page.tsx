import Link from "next/link";
import { TrackForm } from "@/components/TrackForm";
import { site } from "@/lib/site";

const SERVICES = [
  {
    title: "Same-day courier",
    desc: "Urgent point-to-point runs across the city — booked in the morning, delivered the same day.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Scheduled delivery",
    desc: "Pick a day and time that suits you. We collect and deliver on the dot.",
    icon: "M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z",
  },
  {
    title: "Regular business runs",
    desc: "Recurring drops for local businesses — same friendly faces, every run.",
    icon: "M3 13h2l1 5h12l1-5h2M5 13V6h11l3 4v3M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z",
  },
  {
    title: "Small local moves",
    desc: "A few items, a marketplace pickup, or a small office shuffle — up to a van load.",
    icon: "M3 7h13v8H3zM16 10h3l2 3v2h-5M6 19a1 1 0 100-2 1 1 0 000 2zm12 0a1 1 0 100-2 1 1 0 000 2z",
  },
];

const VALUES = [
  { value: "Owner-run", label: "You deal with us directly — not a call centre" },
  { value: "Same-day", label: "Urgent city runs when you need them" },
  { value: "City + regional", label: "Local knowledge, regional reach" },
  { value: "Live tracking", label: "Know where your delivery is, in real time" },
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
              Owner-operated · {site.serviceArea}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Your delivery, handled by the people who own the business.
            </h1>
            <p className="mt-5 text-lg text-brand-100">
              VoyageXpress is a local, owner-operated courier covering{" "}
              {site.serviceArea}. Same-day runs, scheduled deliveries and small
              moves — {site.capacity.toLowerCase()}. You book, we drive, you
              track it live.
            </p>

            <div className="mt-8 rounded-2xl bg-white/10 p-3 backdrop-blur ring-1 ring-white/15">
              <TrackForm size="lg" />
              <p className="mt-2 px-1 text-xs text-brand-100">
                Track your delivery instantly — no login required.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
              >
                Get a quick quote
              </Link>
              <Link
                href="/services"
                className="rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                See what we do
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.value}>
              <div className="text-xl font-bold text-brand-600">{v.value}</div>
              <div className="mt-1 text-sm text-slate-500">{v.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">
            What we can carry for you
          </h2>
          <p className="mt-3 text-slate-600">
            {site.capacity}. If two people can lift it, chances are we can move
            it — just ask.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* The personal touch */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent-600">
              The two of us
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              A real local business — not a faceless network
            </h2>
            <p className="mt-3 text-slate-600">
              We&rsquo;re a husband-and-wife team. When you call, you talk to one
              of us. When your parcel goes out, one of us is driving it. That&rsquo;s
              the kind of care a big courier can&rsquo;t give you — and it&rsquo;s
              why our customers stick with us.
            </p>
            <Link
              href="/quote"
              className="mt-6 inline-flex rounded-lg bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-700"
            >
              Get a quick quote
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-3 text-sm">
              <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-brand-600 px-4 py-2 text-white">
                Can you grab a parcel from the CBD this arvo?
              </div>
              <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-2 text-slate-700">
                Absolutely — I can swing by around 2pm and have it across town by
                4. I&rsquo;ll send you a live tracking link once it&rsquo;s on board. 👍
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
