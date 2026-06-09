// Single source of truth for pricing — used by the /quote calculator page AND
// by Meep Meep's get_quote tool, so the chatbot and the page never disagree.
// Phase 2 will swap this flat model for real distance-based rating.

export type Service = "same_day" | "scheduled" | "regular";
export type Size = "satchel" | "small" | "large" | "van";

export const SERVICES: Record<Service, { base: number; label: string; eta: string }> = {
  same_day: { base: 25, label: "Same-day courier", eta: "Delivered today" },
  scheduled: { base: 15, label: "Scheduled delivery", eta: "On your chosen day" },
  regular: { base: 12, label: "Regular run (per drop)", eta: "On your run schedule" },
};

export const SIZES: Record<Size, { surcharge: number; label: string }> = {
  satchel: { surcharge: 0, label: "Satchel / documents" },
  small: { surcharge: 5, label: "Small parcel (up to 5 kg)" },
  large: { surcharge: 12, label: "Large box (up to 30 kg)" },
  van: { surcharge: 40, label: "Up to a small van load" },
};

export interface QuoteResult {
  price: number;
  service: Service;
  size: Size;
  serviceLabel: string;
  sizeLabel: string;
  eta: string;
}

export function calculateQuote(service: Service, size: Size): QuoteResult {
  const svc = SERVICES[service];
  const sz = SIZES[size];
  return {
    price: svc.base + sz.surcharge,
    service,
    size,
    serviceLabel: svc.label,
    sizeLabel: sz.label,
    eta: svc.eta,
  };
}
