# Go To Sushi Bar

Production website for Go To Sushi Bar (Rīgas iela 9, Cēsis, LV-4101). Next.js (App Router) + Tailwind CSS, menu/photo data served from Nhost (Postgres via Hasura GraphQL, Auth, and Storage).

## Stack

- **Next.js 14** (App Router, TypeScript, React Server Components)
- **Tailwind CSS** for layout utilities; most visual styling lives in `app/globals.css`
- **Nhost** — Postgres + Hasura GraphQL for menu/photo data, Nhost Auth for the `/admin` panel, Nhost Storage for uploaded photos
- Deploy target: **Vercel**, domain **gotosushibar.lv**

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in the real values (see below)
npm run dev
```

Open http://localhost:3000. If `NHOST_GRAPHQL_URL` isn't set or the menu table is empty, the Menu section shows a friendly "menu is being updated" message instead of erroring — the rest of the site still renders normally.

## Site structure

The public site is multiple routes (`/`, `/menu`, `/about`, `/experience`, `/location`) sharing a persistent header/footer via `app/(site)/layout.tsx`. `/admin` is a separate, Latvian-only panel with its own layout (`app/admin/(protected)/layout.tsx`), gated by `middleware.ts`.

## One-time setup against a real Nhost project

1. In the Nhost dashboard: **Settings → Environment Variables**, note `NHOST_SUBDOMAIN` and `NHOST_REGION`, and reveal `NHOST_ADMIN_SECRET` (click the eye icon next to the masked value).
2. Put those in `.env.local` (gitignored, never commit), along with `ADMIN_ALLOWED_EMAILS` (comma-separated emails allowed to sign in to `/admin`):
   ```
   NHOST_SUBDOMAIN=xdyttnhegqcopywhsqtk
   NHOST_REGION=eu-central-1
   NHOST_ADMIN_SECRET=<the real secret>
   ADMIN_ALLOWED_EMAILS=owner@example.com,dev@example.com
   ```
3. Run, in order:
   ```bash
   npm run db:setup       # creates + seeds menu_items (~230 items from scripts/seed-data.ts)
   npm run admin:schema   # adds image_url column, site_media table, and the *_draft shadow tables
   npm run admin:users    # creates the ADMIN_ALLOWED_EMAILS accounts, prints their passwords once
   ```
   `db:setup` prints a list of rows flagged `verify` — items where the source photo was ambiguous, worth a check against the physical menu.
4. In the Nhost dashboard (**Settings → Authentication**), disable public sign-up — **only after** step 3's `admin:users` run has created the accounts. This is a manual, dashboard-only step; the real access control is `ADMIN_ALLOWED_EMAILS`, enforced in code regardless of this toggle.
5. Set `NHOST_GRAPHQL_URL` in `.env.local` (and later in Vercel) to the public endpoint shown in the dashboard.

## Editing content

**Preferred**: sign in at `/admin` (owner + developer accounts only). Drag photos onto the named slots, edit menu items, preview your changes live at `/admin/preview`, then click "Publicēt izmaiņas" — nothing is visible to visitors until you do. Everything in `/admin` writes to `*_draft` shadow tables; publishing copies them into the live tables in one transaction.

**Direct dashboard access** (Nhost table editor) still works for bulk edits, but only touches the *published* tables directly — it bypasses the draft/preview safety net, so use it carefully.

To bulk-reload the whole menu from an updated `scripts/seed-data.ts`, run `npm run db:setup` again — it truncates and re-inserts `menu_items` (published) only; it does not touch `menu_items_draft`, so re-run `npm run admin:schema` afterward if you want the draft copy resynced too.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New Project** → import the repo. Framework preset auto-detects Next.js.
3. Add these environment variables in Vercel's project settings:
   - `NHOST_GRAPHQL_URL` — public, no secret
   - `NHOST_ADMIN_SECRET` — **required in production now** (the `/admin` panel's server actions use it at request time, not just for local setup scripts)
   - `NHOST_SUBDOMAIN`, `NHOST_REGION`
   - `ADMIN_ALLOWED_EMAILS`
4. Deploy.
5. Point `gotosushibar.lv` at the Vercel project (**Settings → Domains**, follow its DNS instructions with your domain registrar).

## Project structure

```
app/(site)/     Public routes (home, menu, about, experience, location) + shared layout
app/admin/      /admin panel: login (public), (protected)/ (dashboard, menu editor, preview), api/ (route handlers)
components/     Section components (Header, Hero, Menu, Location, etc.)
components/admin/  Admin-only UI (dropzone, menu editor, publish bar, logout)
lib/i18n/       LV/EN language context (cookie-persisted)
lib/nhost/      GraphQL/Storage/Auth helpers — getMenu/getSiteMedia (draft|published modes),
                adminClient (admin-secret client for server actions), serverClient/adminSession (auth)
middleware.ts   Gates /admin/* behind a verified, allow-listed Nhost session
scripts/        seed-data.ts, db-setup.ts, admin-schema-setup.ts, admin-users-setup.ts,
                hasuraAdmin.ts (shared setup-script helpers)
```

## Notes on fidelity to the approved concept

- Colors, type (Fraunces / Work Sans / Space Mono), hero canvas animation, ghost wordmark, spinning ring mark, ticker marquee, and motion rules (CSS-first entrance, reveal-on-scroll with a 1.2s safety net, `prefers-reduced-motion` handling) are all carried over as designed.
- The Menu section is tabbed by category (Suši / Ēdieni / Dzērieni) with CSS-only tab switching — the real menu has ~230 items across ~35 subcategories.
- A live Google Maps embed is on the Location page.
- Photo slots (hero background, About photo, an 8-image gallery, per-menu-item photos) are supported end-to-end but start empty — the site looks and works fine with none set; upload real photos via `/admin` when ready.
