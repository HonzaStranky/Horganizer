# Horganizer — Marketing Website

A single-page marketing site for **Horganizer** and **Horganizer PRO**, a Windows desktop
file-organization application. The design, terminology, feature list and app mockups are all
based directly on the attached Horganizer Python/CustomTkinter source code (`source/horganizer_source.txt`).

## Currently completed features

- **Sticky navigation** with logo, anchor links (Features / How it works / PRO / FAQ), a
  "Get Horganizer PRO" CTA, scroll-triggered blur/darken effect, and a mobile hamburger menu.
- **Hero section** with an original headline ("Your files shouldn't be a mess."), supporting copy,
  primary/secondary CTAs, a small status line ("Horganizer PRO • Windows desktop app"), and an
  animated mini app-window mockup.
- **Real App Showcase** — a fully interactive recreation of the actual Horganizer interface: title
  bar, header with language selector and version badge, and five clickable tabs (Organizing, Own
  Rules, Auto Monitoring, Duplicates Finder, Investigate) that switch panels exactly like the real
  app's `CTkTabview`. Content in each panel (labels, buttons, table columns, status text) is taken
  verbatim from the app's English translation strings.
- **The Problem** section with a Before/After Downloads-folder comparison.
- **Features** section with five distinct visual treatments, one per real feature:
  1. **Organizing** — category sorting flow diagram.
  2. **Own Rules** — IF/THEN rule-builder visual.
  3. **Auto Monitoring** — animated "NEW FILE DETECTED → RULE MATCHED → FILE ORGANIZED" timeline
     that plays when scrolled into view.
  4. **Duplicates Finder** — duplicate group card with SHA-256 hash display.
  5. **Investigate** — file inspector detail card (Name, Size, Type, Created, Modified, Hash,
     Location, Duplicate status) matching the app's real investigation report format.
- **"One app, five tools"** pipeline section: Organize → Monitor → Detect → Investigate → Maintain.
- **PRO section** with checklist of all five real tools and a small app-window style graphic.
- **Pricing card** — Horganizer PRO, **50 Kč, one-time purchase**, full feature list, and a note
  that "Payment and activation will be connected separately."
- **Purchase modal** (visual only) — opens on "Get Horganizer PRO" in the pricing card, clearly
  states no payment is processed and no account is created. No payment fields exist anywhere on
  the site.
- **Why Horganizer** section (local app, customizable, automatic, transparent, 10 languages, simple).
- **FAQ** with smooth accordion, using honest answers derived from the source code.
- **Final CTA** and **Footer** with Horganizer / Horganizer PRO / Features / FAQ / Privacy / Terms
  links and © 2026 Horganizer.
- Separate **Privacy** (`privacy.html`) and **Terms** (`terms.html`) pages with honest, minimal
  copy (no invented company info).
- Fully responsive layout (desktop / laptop / tablet / mobile), verified at both desktop and mobile
  viewports.
- No fake statistics, testimonials, countdowns, or invented features — every claim on the site
  traces back to the attached source code.

## Site structure / entry points

| Path | Description |
|---|---|
| `index.html` | Main single-page site (all sections, anchors: `#features`, `#how-it-works`, `#pro`, `#pricing`, `#faq`, `#top`) |
| `privacy.html` | Privacy page |
| `terms.html` | Terms page |
| `css/style.css` | Full design system and responsive styles |
| `js/main.js` | Nav scroll state, mobile menu, tab switching, demo progress animation, monitoring timeline animation, scroll reveals, FAQ accordion, purchase modal |
| `source/horganizer_source.txt` | Reference copy of the attached Horganizer application source (used only as design reference, not served as a "feature") |

## Data / features derived from the source code

Everything shown as a "real feature" was verified in the attached code:

- 15 built-in categories (Images, Videos, Music, Documents/PDF, Documents/Word, Documents/Excel,
  Documents/PowerPoint, Documents/Text, Archives, Programs, Libraries, System, Code (5 sub-types),
  Databases, Minecraft, 3D, Books, Games, Unknown).
- Own Rules: name + comma-separated extensions + destination folder + enabled switch; first
  matching enabled rule wins, evaluated in table order.
- Auto Monitoring: uses `watchdog` to watch folders (non-recursive), waits for file-write stability
  before organizing a newly created/moved file.
- Duplicates Finder: groups files by size first, then confirms with SHA-256 hashing; results shown
  in expandable groups; supports deleting selected duplicates.
- Investigate: shows Name, Size, Type (extension + category), Created, Modified, SHA-256 Hash,
  Location history (path trail from home directory), and Duplicate status (unique or list of exact
  copies found in Downloads + monitored folders).
- Suite version shown in the app: "Desktop Suite v2.0.1" — reused verbatim in the mockups.
- 10 supported interface languages (English, Čeština, 中文, Español, हिन्दी, Português, Français,
  Deutsch, 日本語, 한국어) — mentioned in the Why section and pricing list.

No PRO/free split exists in the source code (there is only one app); the site frames "Horganizer
PRO" as the full, complete application rather than inventing a separate limited free tier.

## Data models / storage

This is a fully static frontend — there is no database, table schema, or backend API used or
required. All interactivity (tab switching, demo progress bar, monitoring timeline, FAQ accordion,
purchase modal) is client-side only, driven by `js/main.js`, and holds no persistent state.

## Not yet implemented / intentionally left out

- **Real payment processing.** The "Get Horganizer PRO" button opens a checkout *preview* modal
  only. No payment gateway, no license key generation, no account system — per the requirements,
  this must be connected separately and was intentionally not faked.
- **Real product screenshots.** The app showcase is a faithful HTML/CSS recreation of the actual
  interface (verified against the source code's labels, layout and theme colors), not a captured
  screenshot, since no screenshot file was provided — only source code.
- **Download links.** There is no build/installer artifact to link to; CTAs point to the pricing
  section rather than a fake download URL.
- Multi-language site content (the app itself is 10-language; this marketing site is English-only).

## Recommended next steps

1. Replace the recreated app-window mockups with real screenshots once available, keeping the same
   markup/CSS so no redesign is needed.
2. Connect a real payment processor (e.g., a checkout provider) behind the pricing card button and
   swap the current preview modal for the real checkout flow once ready.
3. Add a real download link/installer once one exists.
4. If Horganizer PRO ever gets extra features beyond the current app, add them as a 6th feature row
   using the existing `.feature-row` pattern.
5. Consider adding a changelog/version history page once the app has released updates beyond v2.0.1.

## Design direction summary

Dark charcoal background (`#070A0F`), card surfaces (`#0F141C`), thin borders (`#263241`), and a
single restrained blue/cyan accent (`#3B9CCB`) — all pulled directly from the app's own `THEME`
dictionary in the source code, so the website visually matches the real product rather than
inventing a new brand palette.
