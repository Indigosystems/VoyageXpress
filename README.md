# VoyageXpress

Logistics & shipping platform — the website, app, and AI agent for VoyageXpress.

Built with **Next.js 15 + TypeScript + Tailwind**. Currently **Phase 1**
(marketing site + mock tracking), running standalone with no external services.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Try tracking a demo shipment: `VX-4821-7390`, `VX-1029-5567`, or `VX-7765-1188`.

## What's here

- **Landing page** — hero, services, stats, AI-agent teaser
- **Track** (`/track`) — shipment lookup with live status timeline (mock data)
- **Services** (`/services`) — express, freight, ocean & air, managed fleet
- **Quote** (`/quote`) — instant indicative price estimator

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full plan and roadmap (Supabase
data layer, customer/ops app, and the Claude-powered "Vex" agent).
