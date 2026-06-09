import type { Shipment } from "@/lib/types";

// Mock shipment data so the app runs standalone (no database required yet).
// Phase 2 will replace this module with Supabase queries behind the same shape.
// Jobs reflect a two-person, city + regional operation: parcels and light
// loads up to a small van.
export const SHIPMENTS: Shipment[] = [
  {
    trackingNumber: "VX-4821-7390",
    service: "same_day",
    origin: "CBD",
    destination: "Riverside Industrial Park",
    status: "in_transit",
    estimatedDelivery: "2026-06-09",
    weightKg: 8.5,
    pieces: 2,
    events: [
      { status: "booked", location: "CBD", timestamp: "2026-06-09T08:14:00+10:00", note: "Same-day pickup booked" },
      { status: "picked_up", location: "CBD", timestamp: "2026-06-09T09:02:00+10:00", note: "Collected from sender" },
      { status: "in_transit", location: "Northbridge", timestamp: "2026-06-09T09:40:00+10:00", note: "On board, heading across town" },
    ],
  },
  {
    trackingNumber: "VX-1029-5567",
    service: "scheduled",
    origin: "Greenfield Nursery",
    destination: "Maple Town (regional)",
    status: "out_for_delivery",
    estimatedDelivery: "2026-06-09",
    weightKg: 22,
    pieces: 4,
    events: [
      { status: "booked", location: "Greenfield Nursery", timestamp: "2026-06-08T15:00:00+10:00", note: "Scheduled for Tue AM" },
      { status: "picked_up", location: "Greenfield Nursery", timestamp: "2026-06-09T07:20:00+10:00" },
      { status: "in_transit", location: "Highway 11", timestamp: "2026-06-09T08:05:00+10:00", note: "On the regional run" },
      { status: "out_for_delivery", location: "Maple Town", timestamp: "2026-06-09T09:30:00+10:00", note: "Out for delivery" },
    ],
  },
  {
    trackingNumber: "VX-7765-1188",
    service: "move",
    origin: "Eastside Apartments",
    destination: "Hilltop Estate",
    status: "delivered",
    estimatedDelivery: "2026-06-07",
    weightKg: 95,
    pieces: 7,
    events: [
      { status: "booked", location: "Eastside Apartments", timestamp: "2026-06-06T18:00:00+10:00", note: "Small move — a few items by van" },
      { status: "picked_up", location: "Eastside Apartments", timestamp: "2026-06-07T08:30:00+10:00", note: "Loaded the van" },
      { status: "in_transit", location: "Across town", timestamp: "2026-06-07T09:15:00+10:00" },
      { status: "delivered", location: "Hilltop Estate", timestamp: "2026-06-07T10:48:00+10:00", note: "Unloaded and signed by the customer" },
    ],
  },
];

export function findShipment(trackingNumber: string): Shipment | undefined {
  const normalized = trackingNumber.trim().toUpperCase();
  return SHIPMENTS.find((s) => s.trackingNumber.toUpperCase() === normalized);
}
