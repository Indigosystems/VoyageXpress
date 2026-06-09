// Core domain types for VoyageXpress logistics.

export type ShipmentStatus =
  | "booked"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "exception";

export interface TrackingEvent {
  status: ShipmentStatus;
  location: string;
  /** ISO-8601 timestamp */
  timestamp: string;
  note?: string;
}

export interface Shipment {
  /** Public tracking number, e.g. "VX-4821-7390" */
  trackingNumber: string;
  service: "express" | "standard" | "freight";
  origin: string;
  destination: string;
  status: ShipmentStatus;
  /** ISO date the parcel is estimated to arrive */
  estimatedDelivery: string;
  weightKg: number;
  pieces: number;
  events: TrackingEvent[];
}

export const STATUS_LABELS: Record<ShipmentStatus, string> = {
  booked: "Booked",
  picked_up: "Picked up",
  in_transit: "In transit",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  exception: "Exception",
};
