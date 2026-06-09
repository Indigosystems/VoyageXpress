import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-slate-500">
            An owner-operated local courier covering {site.serviceArea}.
            Same-day runs, scheduled deliveries and small moves — handled by the
            people who own the business.
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
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brand-600">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-brand-600">
                {site.phone}
              </a>
            </li>
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
