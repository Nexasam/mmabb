# MMAB Healthcare — Changelog

---

## [Unreleased] — July 2026

### Summary

Client-requested updates across branding, accreditation, imagery guidance, and a new Training section. No database migrations, no dependency changes.

---

### 1. Branding — "MMAB Healthcare"

All references to the old names **"MMAB Home Care"** and **"MMAB Consulting"** have been replaced with **"MMAB Healthcare"** across the public-facing site and the authenticated app shell.

**Files changed:**

| File | What changed |
|---|---|
| `resources/js/layouts/public-layout.tsx` | Header logo tagline, mobile drawer header, footer brand block, footer tagline, footer copyright |
| `resources/js/pages/home.tsx` | `<Head>` title, hero subtext default, about section label, "About MMAB" button text, video subtitle |
| `resources/js/pages/about.tsx` | Page `<Head>` title, hero H1, body copy intro, leadership bio, CTA section heading |
| `resources/js/components/app-sidebar.tsx` | Sidebar company name in the authenticated app |
| `resources/js/components/landing/video-section.tsx` | Default subtitle copy |

---

### 2. CQC Widget

The previous implementation used a plain `<div>` with `data-*` attributes and a `<script defer>` tag in JSX. JSX script tags do not execute at runtime in a React SPA, so the widget was never actually loading.

**Fix:** Created `resources/js/components/cqc-widget.tsx` — a React component that dynamically injects the official CQC script via `useEffect`, ensuring it runs after the DOM is ready.

The widget loads the correct location-specific script:
```
https://www.cqc.org.uk/sites/all/modules/custom/cqc_widget/widget.js
  ?data-id=1-15528561702
  &data-host=https://www.cqc.org.uk
  &type=location
```

The footer now renders `<CqcWidget />` alongside a plain-text description and a link to the full CQC report at `https://www.cqc.org.uk/location/1-15528561702`.

**Files changed:**

| File | What changed |
|---|---|
| `resources/js/components/cqc-widget.tsx` | **New file** — dynamic script injection component |
| `resources/js/layouts/public-layout.tsx` | Footer CQC section updated to use `<CqcWidget />` |

---

### 3. Imagery — Hero Video

The hero video `aria-label` has been updated to reflect inclusive, care-focused imagery:

> *"A caregiver warmly supporting a child with complex care needs at home"*

The actual video file (`/public/videos/hero.mp4`) should be replaced with footage featuring:
- Children and adults receiving care in home settings
- Individuals with disabilities interacting positively with caregivers
- Warm, professional tone — inclusive and person-centred

**Files changed:**

| File | What changed |
|---|---|
| `resources/js/components/landing/hero-section.tsx` | `aria-label` updated on the hero `<video>` element |

---

### 4. Navigation — Training Link

"Training" has been added as a top-level nav item in both the desktop navigation bar and the mobile drawer, sitting between "About Us" and "Contact". It has also been added to the footer Navigation column.

**Files changed:**

| File | What changed |
|---|---|
| `resources/js/layouts/public-layout.tsx` | Desktop nav, mobile drawer nav, footer nav column |

---

### 5. New Page — `/training` (Training We Offer)

A dedicated Training page has been added at `/training`, accessible from the main navigation.

**Page structure:**

- **Hero** — matching the existing About/Contact page style; headline "Training We Offer"
- **Coming Soon banner** — amber alert banner highlighting the upcoming *Complex Care Train the Trainer* courses with a "Register interest" button linking to `/contact`
- **Core course cards** — three cards, one per course:
  - People Moving and Handling
  - Complex Care Competency Assessment
  - Staff Supervision and Sign-off

  Each card lists the course description and key highlights as a checklist.
- **Full catalogue section** — links to `https://mmabconsulting.com` (the main site) and to `/courses` (the internal CPD course listing)
- **Train the Trainer feature section** — dark brand-gradient panel with detail on the upcoming programme, "Register Interest" and "Get in touch" CTAs, and four stat tiles (CPD Accredited, Nurse-Led, In-House, Bespoke)
- **Accreditation strip** — CPD Accredited · Nurse-Led Delivery · 30+ Years Clinical Experience

**Files changed / created:**

| File | What changed |
|---|---|
| `resources/js/pages/training.tsx` | **New file** — full Training page component |
| `resources/js/app.tsx` | `'training'` added to the `PublicLayout` case in the layout switch |
| `routes/web.php` | `GET /training` route added, name `training` |
| `app/Http/Controllers/PageController.php` | `training()` method added, renders `Inertia::render('training')` |

---

### Files Changed — Full List

```
app/Http/Controllers/PageController.php
resources/js/app.tsx
resources/js/components/app-sidebar.tsx
resources/js/components/cqc-widget.tsx              ← new
resources/js/components/landing/hero-section.tsx
resources/js/components/landing/video-section.tsx
resources/js/layouts/public-layout.tsx
resources/js/pages/about.tsx
resources/js/pages/home.tsx
resources/js/pages/training.tsx                     ← new
routes/web.php



```
/ — Home page (updated branding)
/about — About page (updated branding)
/training — New Training page
/contact — Contact page (footer CQC widget visible here)