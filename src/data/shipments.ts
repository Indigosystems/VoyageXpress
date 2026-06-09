import type { Shipment } from "@/lib/types";

// Mock shipment data so the app runs standalone (no database required yet).
// Phase 2 will replace this module with Supabase queries behind the same shape.
export const SHIPMENTS: Shipment[] = [
  {
    trackingNumber: "VX-4821-7390",
    service: "express",
    origin: "Sydney, NSW",
    destination: "Melbourne, VIC",
    status: "in_transit",
    estimatedDelivery: "2026-06-11",
    weightKg: 12.5,
    pieces: 2,
    events: [
      { status: "booked", location: "Sydney, NSW", timestamp: "2026-06-08T09:14:00+10:00" },
      { status: "picked_up", location: "Sydney, NSW", timestamp: "2026-06-08T14:02:00+10:00", note: "Collected from sender" },
      { status: "in_transit", location: "Goulburn, NSW", timestamp: "2026-06-09T03:40:00+10:00", note: "Departed sort facility" },
    ],
  },
  {
    trackingNumber: "VX-1029-5567",
    service: "standard",
    origin: "Brisbane, QLD",
    destination: "Perth, WA",
    status: "out_for_delivery",
    estimatedDelivery: "2026-06-09",
    weightKg: 3.2,
    pieces: 1,
    events: [
      { status: "booked", location: "Brisbane, QLD", timestamp: "2026-06-05T11:00:00+10:00" },
      { status: "picked_up", location: "Brisbane, QLD", timestamp: "2026-06-05T16:20:00+10:00" },
      { status: "in_transit", location: "Adelaide, SA", timestamp: "2026-06-07T22:10:00+09:30" },
      { status: "in_transit", location: "Kalgoorlie, WA", timestamp: "2026-06-09T05:05:00+08:00" },
      { status: "out_for_delivery", location: "Perth, WA", timestamp: "2026-06-09T07:30:00+08:00", note: "On vehicle for delivery" },
    ],
  },
  {
    trackingNumber: "VX-7765-1188",
    service: "freight",
    origin: "Auckland, NZ",
    destination: "Sydney, NSW",
    status: "delivered",
    estimatedDelivery: "2026-06-06",
    weightKg: 480,
    pieces: 6,
    events: [
      { status: "booked", location: "Auckland, NZ", timestamp: "2026-06-02T08:00:00+12:00" },
      { status: "picked_up", location: "Auckland, NZ", timestamp: "2026-06-02T13:45:00+12:00" },
      { status: "in_transit", location: "Auckland Port, NZ", timestamp: "2026-06-03T06:00:00+12:00", note: "Loaded for ocean freight" },
      { status: "in_transit", location: "Port Botany, NSW", timestamp: "2026-06-05T19:30:00+10:00", note: "Cleared customs" },
      { status: "out_for_delivery", location: "Sydney, NSW", timestamp: "2026-06-06T08:15:00+10:00" },
      { status: "delivered", location: "Sydney, NSW", timestamp: "2026-06-06T11:48:00+10:00", note: "Signed by J. Okafor" },
    ],
  },
];

export function findShipment(trackingNumber: string): Shipment | undefined {
  const normalized = trackingNumber.trim().toUpperCase();
  return SHIPMENTS.find((s) => s.trackingNumber.toUpperCase() === normalized);
}
