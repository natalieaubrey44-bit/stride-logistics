# Stride Logistics — Homepage Conversion & Messaging Upgrade

## Scope

Edit **`src/pages/Home.tsx` and `src/styles/global.css` only.** Do not touch any other file — no routing, auth, Supabase logic, or other pages.

Stride is a courier company (air, sea, road freight). Customers book via the contact form and track via a tracking number. Admin manually updates statuses. Do not imply GPS, real-time tracking, or a SaaS product.

---

## Five Fixes

### 1. Hero — Rewrite Content

Headline (`Barlow Condensed` 700, two lines):
- Line 1: `YOUR CARGO,` — white
- Line 2: `DELIVERED WORLDWIDE.` — `var(--accent)`

Subheadline (`DM Sans` 400, white 85% opacity):
`Stride Logistics moves parcels and freight by air, sea, and road — across borders, through customs, and to the door.`

Replace existing CTAs with exactly two:
- **Primary:** "Ship With Us" → `/contact` — `var(--accent)` filled, white text
- **Secondary:** "Track Your Shipment" → `/track` — transparent, white border; hover fills white with `var(--navy)` text

Add a CSS-only scroll arrow at bottom center.

---

### 2. Stats Bar — Real Numbers + CountUp

Replace stat values with:

| Stat | Value |
|---|---|
| Shipments Delivered | 1,200+ |
| On-Time Delivery Rate | 98.4% |
| Countries Reached | 40+ |
| Years in Operation | 5+ |

Animate on scroll using the existing `src/components/CountUp.tsx` — read its actual props before importing. Do not rewrite it.

---

### 3. How It Works — New Section

Insert between the Services section and the "Why Stride" section.

Heading: `HOW IT WORKS` (`Barlow Condensed` 700, centered) with standard amber `::after` underline (3px × 60px, `var(--accent)`).

Five steps, horizontal row on desktop with a `1px solid var(--border)` connecting line behind step numbers, vertical stack on mobile. Each step: watermark step number (opacity 0.15, `var(--accent)`), Unicode icon, title (`Barlow Condensed` 600), one-sentence description (`DM Sans`, `var(--text-muted)`).

| # | Icon | Title | Description |
|---|---|---|---|
| 01 | 📋 | Place Your Booking | Fill out our contact form with your cargo details, origin, and destination. |
| 02 | 📦 | We Collect Your Cargo | Our team arranges collection from your location at a confirmed time. |
| 03 | ✈️ | Your Shipment Moves | Your cargo travels by the fastest available air, sea, or road route. |
| 04 | 🔍 | Track Every Update | Use your unique tracking number to follow your shipment in real time. |
| 05 | ✅ | Delivered | Your cargo arrives at its destination. Confirmation sent to you directly. |

---

### 4. Why Stride — Rewrite Bullets

Keep the existing two-column navy layout. Replace bullet text only:

```
✓  No account needed — track your shipment with just a code
✓  Direct customs handling support on every international shipment
✓  Air, sea, and road coverage across 40+ countries
✓  Personal updates from our team — not bots, not automated delays
```

Add above the bullets (`DM Sans` 400, white 85% opacity, max-width 480px):
`Most couriers leave you guessing. Stride gives every customer a tracking number, a direct line to our team, and status updates that actually mean something — from dispatch to doorstep.`

---

### 5. CTA Section — New, Above Footer

Full-width `var(--accent)` background. Centered content:
- Heading: `READY TO SHIP?` (`Barlow Condensed` 700, white)
- Subtext: `Get in touch with our team and we'll handle the rest — from collection to delivery, anywhere in the world.` (`DM Sans`, white 90%)
- Button: "Ship With Us" → `/contact` — white background, `var(--accent)` text; hover `transform: scale(1.03)`, `transition: 0.2s ease`

This replaces or supersedes any existing tracking CTA section.

---

## CSS Rules

New classes in `src/styles/global.css` under labeled comment blocks. Use CSS variables only — no hardcoded colours. Breakpoint: `768px`. Section padding: `80px` desktop / `48px` mobile. Max content width: `1200px`, `margin: 0 auto`.

---

## Hallucination Guard

Read `Home.tsx`, `global.css`, and `CountUp.tsx` fully before writing any code. Complete one fix, report what changed, then proceed to the next. Do not guess — ask if anything is unclear.
