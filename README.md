# Stride Logistics

Vite, React, and Supabase frontend for Stride Logistics shipment visibility and admin shipment management.

## Local Setup

Install dependencies from the lockfile:

```sh
npm ci
```

Create a local `.env` file with the public Supabase browser config:

```sh
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Values exposed through `VITE_*` are bundled for the browser. Do not put service-role keys, passwords, private API keys, or other secrets in Vite environment variables.

## Scripts

```sh
npm run dev
npm run lint
npm run build
npm run preview
```

On Windows PowerShell systems with script execution disabled, use `npm.cmd`:

```sh
npm.cmd run lint
npm.cmd run build
```

## Netlify Deployment

Use these Netlify settings:

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

The `public/_redirects` file enables React Router fallback for deep links and page refreshes. The `public/_headers` file applies baseline security headers, including CSP, clickjacking protection, referrer policy, and browser feature restrictions.

## Security Notes

- Keep `.env` out of git. It is ignored by `.gitignore`.
- Supabase anon keys are public client keys. Production safety depends on Supabase Row Level Security policies.
- Before launch, verify RLS on the `shipments` table:
  - Public users should only be able to read the intended tracking fields by tracking number.
  - Admin-only create/update access should require authenticated users with the intended role or policy.
  - Service-role keys must never be shipped to this frontend.
- The contact form validates and preserves inquiry details locally, but online email submission is intentionally not connected until a backend or email provider endpoint is added.
