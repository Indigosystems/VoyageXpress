import Link from "next/link";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-slate-500">
            Freight, parcel and fleet logistics across Australia and the
            Pacific. Real-time tracking, instant quotes, and an AI assistant
            that actually knows where your shipment is.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link href="/services" className="hover:text-brand-600">Services</Link></li>
            <li><Link href="/track" className="hover:text-brand-600">Track a shipment</Link></li>
            <li><Link href="/quote" className="hover:text-brand-600">Get a quote</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Get in touch</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li>support@voyagexpress.example</li>
            <li>1800 VOYAGE</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-400">
          © {new Date().getFullYear()} VoyageXpress. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
