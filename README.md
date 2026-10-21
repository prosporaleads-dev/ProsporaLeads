# Propspora Leads — Full-stack website starter

A full-stack, SEO-aware B2B lead generation website for Propspora Leads. Built with Next.js App Router, strict TypeScript, Tailwind CSS v4, shadcn/ui-compatible primitives, Framer Motion, PostgreSQL, Prisma and JWT sessions.

## Included

- Public pages: Home, About, Services, Industries, Markets, How We Work, FAQ, Contact, Privacy Policy and Terms of Service.
- Responsive visual system with navy, teal and gold brand colours and reduced-motion support.
- Contact form with server-side Zod validation, a honeypot field, consent requirement and rate limiting.
- PostgreSQL/Prisma schema for admin users, editable pages/sections, site settings, services, FAQs, markets, industries, media and enquiries.
- Admin sign-in using JWT in an HttpOnly, SameSite cookie; bcrypt password hashing; protected admin APIs; role-aware settings update.
- Admin overview, page records, services, FAQs, enquiries and site settings screens.
- SEO metadata, canonical URLs on key pages, Open Graph/Twitter metadata, JSON-LD organisation schema, sitemap and robots rules.
- Seed script for initial CMS content and CLI script to create the first administrator.

## Requirements

- Node.js 20.9 or later
- PostgreSQL 14+
- npm 10+ (or compatible package manager)

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables and edit them:

   ```bash
   cp .env.example .env
   ```

   Set a reachable PostgreSQL database, `APP_URL`, and a cryptographically random `JWT_SECRET` of at least 32 characters. Never commit `.env`.

3. Generate the Prisma client and create the schema:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

   If this is a local prototype and you prefer schema push, `npx prisma db push` is an alternative; use migrations for deployment.

4. Seed the initial website content:

   ```bash
   npm run db:seed
   ```

5. Create the first administrator. Set `ADMIN_NAME`, `ADMIN_EMAIL`, and a unique `ADMIN_PASSWORD` (14+ characters) in `.env` first:

   ```bash
   npm run admin:create
   ```

6. Start development:

   ```bash
   npm run dev
   ```

   Public site: http://localhost:3000  
   Admin sign-in: http://localhost:3000/admin/login

## Admin access and content management

- `/admin` — overview and counts
- `/admin/pages` — page records and SEO overview
- `/admin/services` — service records
- `/admin/faqs` — FAQ records
- `/admin/inquiries` — contact submissions
- `/admin/settings` — editable site identity, brand colours, contact information and default SEO values

Admin API endpoints require a valid JWT session cookie:

- `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/admin/pages`, `GET /api/admin/pages/:id`, `PATCH /api/admin/pages/:id`
- `GET /api/admin/services`, `POST /api/admin/services`
- `GET /api/admin/faqs`, `POST /api/admin/faqs`
- `GET /api/admin/inquiries`
- `GET /api/admin/settings`, `PATCH /api/admin/settings` (Super Admin only)

## Important implementation notes

This is a runnable starter foundation, not a claim that every CMS feature is finished. The admin screens for services, FAQs and page content currently include review/listing interfaces; the API foundation is present but full create/edit/delete experiences should be completed before a production launch. The public website currently renders several core page sections from typed defaults; the Prisma CMS models are in place to move all content to fully database-driven rendering.

The in-memory rate limiter is best-effort and works per process. Replace it with a shared Redis/managed rate-limit service for horizontally scaled production deployments. Add a transactional email provider to notify the team of new enquiries. No media upload API is included; use a trusted object-storage provider and validate file type/size before enabling uploads.

Privacy Policy and Terms of Service are draft placeholders and must be reviewed by qualified legal counsel. Outreach laws vary by country and audience. Do not publish invented statistics, customer logos or testimonials. Review compliance claims against your actual operating practices.

## Production checklist

- [ ] Use managed PostgreSQL, backups and migrations (`npm run db:deploy`).
- [ ] Set a strong `JWT_SECRET`, correct `APP_URL` and HTTPS deployment.
- [ ] Configure transactional email and spam protection.
- [ ] Replace `hello@example.com` with a monitored business email.
- [ ] Replace the draft legal pages with reviewed policies and real legal entity details.
- [ ] Add a full block editor and CRUD forms for CMS pages, services, FAQs, industries and markets.
- [ ] Add audit logs, account recovery, MFA and shared rate limiting if required by your risk profile.
- [ ] Test accessibility, SEO previews, mobile layouts and Core Web Vitals.
- [ ] Add a real 1200×630 PNG/JPEG social image; the repository includes an editable SVG concept.

## Code conventions

- Strict TypeScript; no `any` is intentionally used in application code.
- Server-side input validation with Zod.
- Prisma access is centralised through `src/lib/prisma.ts`.
- Public pages use server components by default; only interactive UI is client-side.
- Admin APIs re-check the session on the server; hiding UI is not treated as authorization.
