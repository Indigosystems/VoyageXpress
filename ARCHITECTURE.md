# VoyageXpress — Architecture & Roadmap

VoyageXpress is a logistics & shipping platform. This repo houses three
surfaces that share one codebase:

1. **Marketing website** — public pages (landing, services, tracking, quotes).
2. **The app** — authenticated customer portal + operations dashboard.
3. **The AI agent ("Vex")** — a Claude-powered assistant that tracks shipments,
   generates quotes, and books pickups by calling tools wired to live data.

## Stack

| Layer            | Choice                                    | Why |
|------------------|-------------------------------------------|-----|
| Website + App    | Next.js 15 (App Router) + TypeScript + Tailwind | One framework for public pages and the logged-in app; fast, great SEO. |
| Database + Auth  | Supabase (Postgres + Auth + Storage)      | Relational data fits logistics; built-in auth, row-level security, file storage for PODs. |
| AI Agent         | Claude API (`claude-opus-4-8` / `claude-sonnet-4-6`) + tool use | Reads live shipment data and takes actions through defined tools. |
| Hosting          | Vercel                                    | Zero-config Next.js deploys with per-branch preview URLs. |

## Brand

Palette derives from the "VE highway" logo (deep navy), with a dark-red accent
and a blue highlight. Defined as Tailwind colors in `tailwind.config.ts`:

- `brand` — deep navy (primary)
- `accent` — dark red (calls to action / highlights)
- `azure` — blue (links / accents)

## Project layout

```
src/
  app/                 # routes (App Router)
    page.tsx           # landing page
    track/page.tsx     # shipment tracking + results
    services/page.tsx  # services overview
    quote/page.tsx     # instant quote estimator
  components/          # shared UI (header, footer, logo, forms)
  data/                # mock data (Phase 1); replaced by Supabase in Phase 2
  lib/                 # domain types and helpers
```

## Data model (planned — Phase 2)

`customers` · `shipments` (origin, destination, status, ETA, weight, pieces) ·
`tracking_events` (timestamped status history) · `vehicles` · `drivers` ·
`quotes` · `invoices`

The current mock shape in `src/lib/types.ts` and `src/data/shipments.ts` mirrors
the eventual `shipments` + `tracking_events` tables, so the swap to Supabase is
a data-layer change behind the same interfaces.

## Roadmap

- **Phase 1 — Foundation (done):** Next.js + Tailwind scaffold; landing,
  services, tracking (mock), and quote pages; brand system from the logo.
- **Phase 2 — Data + tracking:** Supabase schema; real shipment lookup; quote
  rating engine.
- **Phase 3 — App:** auth; customer portal (create/track/invoices/POD); ops
  dashboard (manage shipments, assign drivers/vehicles, update status).
- **Phase 4 — Agent "Vex":** Claude integration with tracking / quote / booking
  tools backed by Supabase.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Runs standalone with mock data — no external services required yet.
Demo tracking numbers: `VX-4821-7390`, `VX-1029-5567`, `VX-7765-1188`.
