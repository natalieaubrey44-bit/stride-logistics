# Stride Logistics — Visual Redesign Prompt

## Context

The site is fully built and functional. Routing, Supabase integration, auth, and all page logic are working correctly. **Do not touch any logic, routing, Supabase queries, auth flow, or environment variables.** This pass is purely visual — CSS, layout, imagery, typography, and UX polish.

---

## What Exists Right Now

- `src/styles/global.css` — active stylesheet, CSS variables on `:root`, dark mode under `html[data-theme="dark"]`
- `src/index.css` and `src/App.css` — stale Vite template files, not imported, **delete both**
- Most component styling is currently inline in JSX — this needs to move to `global.css` or dedicated CSS files
- `.container` is the only reusable layout class

---

## Aesthetic Direction

**Industrial precision meets modern freight.** Think dark steel, clean grids, bold typographic hierarchy, and warm amber/orange accents that suggest movement and urgency. Light mode should feel crisp and professional — white backgrounds with deep navy sections and amber highlights. Dark mode should feel like a control room — near-black backgrounds, subtle surface contrast, glowing accent color.

This is not a startup SaaS site. It should feel like a company that moves real things across the world. Solid. Trustworthy. Efficient.

---

## Typography

- **Display / headings:** `Barlow Condensed` (Google Fonts) — bold, compressed, industrial. Use weight 700 for hero headings, 600 for section headings.
- **Body:** `DM Sans` (Google Fonts) — clean, readable, modern without being generic.
- Import both via a `<link>` in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
```

Apply in `global.css`:

```css
body {
  font-family: 'DM Sans', sans-serif;
}

h1, h2, h3, h4 {
  font-family: 'Barlow Condensed', sans-serif;
  letter-spacing: 0.01em;
}
```

---

## Color System

Replace the existing CSS variable values in `global.css` with the following. Do not rename variables — only update values:

```css
:root {
  --bg: #f8f7f4;
  --surface: #ffffff;
  --surface-alt: #f0eeea;
  --text: #0f0f0f;
  --text-muted: #6b6b6b;
  --border: #e0ddd8;
  --accent: #e07b2a;
  --accent-hover: #c96a1a;
  --accent-text: #ffffff;
  --navy: #0d1b2a;
  --navy-surface: #162032;
  --danger: #cc2200;
  --success: #1a7a3a;
  --shadow: 0 2px 12px rgba(0,0,0,0.08);
  --radius: 6px;
}

html[data-theme="dark"] {
  --bg: #0a0a0a;
  --surface: #141414;
  --surface-alt: #1c1c1c;
  --text: #f0ede8;
  --text-muted: #888888;
  --border: #2a2a2a;
  --accent: #e07b2a;
  --accent-hover: #f08c3a;
  --accent-text: #ffffff;
  --navy: #0d1b2a;
  --navy-surface: #0f2030;
  --danger: #ff4422;
  --success: #33bb55;
  --shadow: 0 2px 16px rgba(0,0,0,0.4);
  --radius: 6px;
}
```

---

## Verified Image URLs

Use these exact URLs. They are publicly available and have been confirmed to load:

| Use | URL |
|---|---|
| Hero background (container ship aerial) | `https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80` |
| Services section (cargo/freight) | `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80` |
| Services section (air freight) | `https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80` |
| Services section (road freight) | `https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80` |
| Contact page background | `https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80` |

All images are from Unsplash (free to use, no attribution required for web use).

---

## Navbar (`Navbar.jsx`)

**Desktop:**
- Full-width, fixed to top, `z-index: 100`
- Background: `var(--surface)` with a thin `1px solid var(--border)` bottom border
- Logo left: "STRIDE" in `Barlow Condensed` 700, `var(--accent)` color + "LOGISTICS" in `Barlow Condensed` 600, `var(--text)` color — side by side, no icon needed
- Nav links center or right: Home, Track, Contact — `DM Sans`, `var(--text-muted)`, underline on hover using `var(--accent)` color
- Dark mode toggle far right: sun/moon SVG icon, no label
- Subtle `box-shadow: var(--shadow)` on scroll (add a scroll listener that adds a `.scrolled` class to the navbar)

**Mobile (hamburger menu):**
- Hide nav links below `768px`
- Show a hamburger icon (three lines) on the right
- On click, a full-width dropdown slides down below the navbar showing stacked nav links
- Each link closes the menu on click
- Hamburger toggles to an X icon when menu is open
- No external libraries — implement with a `menuOpen` state and CSS transition

---

## Home Page (`Home.jsx`)

### Hero Section

- Full viewport height (`100vh`), no less
- Background: the container ship image (`photo-1494412574643`) as `background-image`, with a dark overlay: `linear-gradient(to right, rgba(13,27,42,0.85) 40%, rgba(13,27,42,0.4) 100%)`
- Left-aligned content (max 55% width on desktop, full width on mobile)
- Headline: `"RELIABLE LOGISTICS,\nWORLDWIDE REACH"` — `Barlow Condensed` 700, `4rem` desktop / `2.8rem` mobile, `var(--accent)` color for "WORLDWIDE REACH", white for the first line
- Subheading: `"Stride Logistics handles your freight by air, sea, and road — so your cargo arrives on time, every time."` — `DM Sans` 400, `1.1rem`, white at 85% opacity
- Two CTA buttons side by side:
  - Primary: "Track Your Shipment" → `/track` — filled `var(--accent)` background, white text
  - Secondary: "Get in Touch" → `/contact` — transparent background, white border, white text, hover fills white with navy text
- Subtle scroll indicator arrow at bottom center

### Stats Bar

- Full-width dark band (`var(--navy)`) immediately below the hero
- Three stats side by side: `"500+ Shipments Delivered"`, `"98% On-Time Rate"`, `"3 Continents Covered"`
- `Barlow Condensed` 700 for the number, `DM Sans` for the label, white text, amber accent on the numbers
- Thin vertical dividers between stats

### Services Section

- Section heading: `"WHAT WE MOVE"` — `Barlow Condensed` 700, centered, with a short amber underline decoration (use `::after` pseudo-element, `3px` height, `60px` width, `var(--accent)` color)
- Three cards side by side (stack on mobile):

**Card 1 — Sea Freight**
- Image: `photo-1586528116311` as card header image (200px height, `object-fit: cover`)
- Title: "Sea Freight"
- Body: "Full and partial container loads handled across major international ports."

**Card 2 — Air Freight**
- Image: `photo-1436491865332` as card header image
- Title: "Air Freight"
- Body: "Time-critical cargo moved fast through our global air freight network."

**Card 3 — Road Freight**
- Image: `photo-1601584115197` as card header image
- Title: "Road Freight"
- Body: "Reliable door-to-door road haulage across regions and borders."

- Cards: `var(--surface)` background, `1px solid var(--border)`, `var(--radius)`, `var(--shadow)`, slight `translateY(-4px)` on hover

### Why Stride Section

- Dark background (`var(--navy)`), white text
- Left: large heading `"WHY CHOOSE STRIDE?"` + short paragraph about reliability, transparency, and experience
- Right: four short bullet points with amber checkmark icons (use `✓` character styled in `var(--accent)`):
  - "Real-time shipment status updates"
  - "Dedicated customs handling support"
  - "Air, sea, and road coverage"
  - "Direct communication with your logistics team"
- Two-column layout on desktop, stacked on mobile

### Track CTA Section

- Light background (`var(--surface-alt)`), centered
- Heading: `"KNOW WHERE YOUR CARGO IS"` — `Barlow Condensed` 700, large
- Subtext: "Enter your tracking number and get an instant status update."
- Single prominent button: "Track a Shipment" → `/track`

### Footer

- `var(--navy)` background, white text
- Left: "STRIDE LOGISTICS" wordmark + `"© 2026 Stride Logistics. All rights reserved."`
- Right: nav links (Home, Track, Contact) in a column
- Top border: `1px solid rgba(255,255,255,0.1)`

---

## Track Page (`Track.jsx`)

- Do not touch any query logic, validation, or Supabase code
- Center the form vertically and horizontally on the page with generous padding
- Heading: `"TRACK YOUR SHIPMENT"` — `Barlow Condensed` 700, large
- Subtext: "Enter your Stride tracking number below (format: STR-XXXXX)"
- Input and button on the same row on desktop (stacked on mobile)
- Input: full border, `var(--border)`, focus ring in `var(--accent)`
- Button: `var(--accent)` filled, white text, same height as input
- Result card: `var(--surface)` background, `var(--border)` border, `var(--radius)`, `var(--shadow)`, clear label/value pairs
- Status badge: pill shape, color-coded:
  - Booked → grey (`var(--surface-alt)`)
  - In Transit → amber (`var(--accent)` at 15% opacity, amber text)
  - At Customs → orange-red (warning tone)
  - In Wharf → blue-grey
  - Arrived → green (`var(--success)` at 15% opacity, green text)
  - Delivered → solid `var(--success)`, white text
- Error/not-found message: styled clearly in `var(--danger)` color, not a raw browser error

---

## Contact Page (`Contact.jsx`)

- Do not touch form logic, validation, sanitization, or the email TODO
- Page split: left half has a dark background (`var(--navy)`) with the contact image (`photo-1578575437130`) as a background behind a dark overlay — heading and short intro text over it. Right half has the form on `var(--surface)` background.
- On mobile: image panel collapses, form takes full width
- Heading on left panel: `"LET'S MOVE\nYOUR CARGO"` — `Barlow Condensed` 700, white, large
- Subtext: "Fill in the form and our team will get back to you within 24 hours."
- Form fields: full-width, clean labels above inputs, consistent spacing
- Submit button: full width, `var(--accent)` filled

---

## Admin Pages (`AdminLogin.jsx`, `AdminDashboard.jsx`)

- Keep these functional and clean but do not apply the full marketing aesthetic
- `AdminLogin.jsx`: centered card on `var(--bg)`, `var(--surface)` card, subtle shadow, "STRIDE LOGISTICS" wordmark at top of card, email + password fields, login button in `var(--accent)`
- `AdminDashboard.jsx`: clean table layout, `var(--surface)` rows, `var(--border)` dividers, `var(--accent)` for action buttons, status badges consistent with Track page, "New Shipment" button prominent at top right

---

## General CSS Rules

- Move all inline JSX styles into `global.css` or page-level CSS files (e.g. `home.css`, `track.css`) — no inline `style={{}}` props except for truly dynamic values
- All sections have consistent vertical padding: `80px` desktop, `48px` mobile
- Max content width: `1200px`, centered with `margin: 0 auto`
- All images use `object-fit: cover` and have explicit `width` and `height` or aspect-ratio set
- Responsive breakpoint: `768px` for mobile layout changes
- Add a `404` catch-all route in `App.jsx` that renders a simple centered message: `"PAGE NOT FOUND"` with a link back to `/`
- Remove `src/index.css` and `src/App.css` — they are unused

---

## Hallucination Guard

Read every file before editing it. After completing each file, stop and report what was changed verbatim before moving to the next. Do not modify any Supabase queries, auth logic, routing logic, or environment variable references. If a file has a TODO comment, leave it exactly as is.
