import { TrackForm } from "@/components/TrackForm";
import { findShipment } from "@/data/shipments";
import { SERVICE_LABELS, STATUS_LABELS, type ShipmentStatus } from "@/lib/types";

const STATUS_STYLE: Record<ShipmentStatus, string> = {
  booked: "bg-slate-100 text-slate-700",
  picked_up: "bg-sky-100 text-sky-700",
  in_transit: "bg-amber-100 text-amber-700",
  out_for_delivery: "bg-indigo-100 text-indigo-700",
  delivered: "bg-emerald-100 text-emerald-700",
  exception: "bg-rose-100 text-rose-700",
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", { dateStyle: "full" });
}

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ number?: string }>;
}) {
  const { number } = await searchParams;
  const shipment = number ? findShipment(number) : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold tracking-tight">Track a shipment</h1>
      <p className="mt-2 text-slate-600">
        Enter your VoyageXpress tracking number to see live status.
      </p>

      <div className="mt-6">
        <TrackForm defaultValue={number ?? ""} />
      </div>

      {number && !shipment && (
        <div className="mt-10 rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
          <p className="font-semibold">No shipment found for &ldquo;{number}&rdquo;.</p>
          <p className="mt-1 text-sm">
            Check the number and try again. Demo numbers: VX-4821-7390,
            VX-1029-5567, VX-7765-1188.
          </p>
        </div>
      )}

      {shipment && (
        <div className="mt-10 space-y-8">
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-sm text-slate-500">Tracking number</div>
                <div className="text-xl font-semibold">{shipment.trackingNumber}</div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${STATUS_STYLE[shipment.status]}`}
              >
                {STATUS_LABELS[shipment.status]}
              </span>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-slate-500">From</dt>
                <dd className="mt-0.5 font-medium">{shipment.origin}</dd>
              </div>
              <div>
                <dt className="text-slate-500">To</dt>
                <dd className="mt-0.5 font-medium">{shipment.destination}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Service</dt>
                <dd className="mt-0.5 font-medium">{SERVICE_LABELS[shipment.service]}</dd>
              </div>
              <div>
                <dt className="text-slate-500">
                  {shipment.status === "delivered" ? "Delivered" : "Est. delivery"}
                </dt>
                <dd className="mt-0.5 font-medium">{formatDate(shipment.estimatedDelivery)}</dd>
              </div>
            </dl>
            <div className="mt-4 text-sm text-slate-500">
              {shipment.pieces} {shipment.pieces === 1 ? "piece" : "pieces"} ·{" "}
              {shipment.weightKg} kg
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold">Tracking history</h2>
            <ol className="mt-5 space-y-5">
              {[...shipment.events].reverse().map((event, i) => (
                <li key={`${event.timestamp}-${i}`} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`mt-1 h-3 w-3 rounded-full ${i === 0 ? "bg-brand-600" : "bg-slate-300"}`}
                    />
                    {i < shipment.events.length - 1 && (
                      <span className="mt-1 w-px flex-1 bg-slate-200" />
                    )}
                  </div>
                  <div className="pb-1">
                    <div className="font-medium">{STATUS_LABELS[event.status]}</div>
                    <div className="text-sm text-slate-500">{event.location}</div>
                    {event.note && (
                      <div className="text-sm text-slate-500">{event.note}</div>
                    )}
                    <div className="mt-0.5 text-xs text-slate-400">
                      {formatDateTime(event.timestamp)}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
