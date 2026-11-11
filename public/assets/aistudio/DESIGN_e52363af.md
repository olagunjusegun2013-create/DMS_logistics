---
name: Logistics Operations Suite
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdcf1'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4ff'
  surface-container: '#e4efff'
  surface-container-high: '#daeaff'
  surface-container-highest: '#d3e4fa'
  on-surface: '#0c1d2c'
  on-surface-variant: '#43474d'
  inverse-surface: '#223242'
  inverse-on-surface: '#e9f1ff'
  outline: '#74777e'
  outline-variant: '#c4c6ce'
  surface-tint: '#4a607c'
  primary: '#00162e'
  on-primary: '#ffffff'
  primary-container: '#142b45'
  on-primary-container: '#7d93b2'
  inverse-primary: '#b2c8e9'
  secondary: '#994700'
  on-secondary: '#ffffff'
  secondary-container: '#fd934c'
  on-secondary-container: '#6c3000'
  tertiary: '#00162e'
  on-tertiary: '#ffffff'
  tertiary-container: '#002b51'
  on-tertiary-container: '#5994db'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e4ff'
  primary-fixed-dim: '#b2c8e9'
  on-primary-fixed: '#031c36'
  on-primary-fixed-variant: '#334863'
  secondary-fixed: '#ffdbc8'
  secondary-fixed-dim: '#ffb68a'
  on-secondary-fixed: '#321300'
  on-secondary-fixed-variant: '#743500'
  tertiary-fixed: '#d3e4ff'
  tertiary-fixed-dim: '#a2c9ff'
  on-tertiary-fixed: '#001c38'
  on-tertiary-fixed-variant: '#004881'
  background: '#f8f9ff'
  on-background: '#0c1d2c'
  surface-variant: '#d3e4fa'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 2rem
    fontWeight: '800'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Manrope
    fontSize: 1.5rem
    fontWeight: '800'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Manrope
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Manrope
    fontSize: 1.25rem
    fontWeight: '700'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.005em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-xs:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.03em
  code-md:
    fontFamily: IBM Plex Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.125rem
    letterSpacing: 0em
  code-sm:
    fontFamily: IBM Plex Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style
The design system establishes a focused, high-precision operations environment for mission-critical logistics, fleet orchestration, and enterprise dispatch. It is designed for dispatch operators, fleet directors, and operational analysts who navigate high cognitive loads and data-dense dashboards across sustained multi-hour shifts.

The aesthetic fuses **Corporate / Modern** precision with architectural utility:
- **Operational Command:** Midnight Atlantic surfaces project grounded authority, framing global navigation and structural tools without competing with data feeds.
- **Data Primacy:** High-contrast neutral canvases optimize legibility across dense data tables, telemetry readouts, and tracking trees.
- **Calculated Urgency:** Burnished Amber acts as a singular, decisive call to action, reserving immediate visual priority for operational commits, route approvals, and exception handling.
- **Architectural Structure:** Clean, 1px structural borders replace ambient blur and heavy skeuomorphic shadows, creating a calm, resilient grid tailored for enterprise tooling.

## Colors
The palette organizes high-density logistics interfaces through structured contrast tiers:

- **Midnight Atlantic (`#142B45`):** Structural anchor used for master navigation rails, global search bars, header typography, and elevated framing boundaries.
- **Burnished Amber (`#D97732`):** Intentional accent dedicated to primary actions, interactive highlights, key dispatch triggers, and active waybill markers.
- **Porcelain Mist (`#F5F7F8`):** Base system canvas offering glare-free clarity across wide monitoring displays.
- **Pure White (`#FFFFFF`):** Work surfaces, data table rows, modal backplanes, and elevated analytical containers.
- **Slate Graphite (`#637386`):** Secondary metadata, inactive states, column titles, and structural divider labels.

### Semantic Tones
Statuses rely on 12% tinted backplanes paired with solid ink values for immediate legibility:
- **Success (`#16845B`):** Completed deliveries, healthy vehicle status, verified handoffs. Tint surface: `#EBF5F0`.
- **Warning (`#D69A36`):** Delayed milestones, queued orders, pending driver confirmations. Tint surface: `#FBF5EB`.
- **Error (`#C94B4B`):** Delivery failures, route anomalies, maintenance emergencies, dropped connections. Tint surface: `#FAECEC`.
- **In-Transit / Info (`#2B6CB0`):** Active vehicle movement, operational notices, unassigned manifests. Tint surface: `#EBF2FA`.

## Typography
The system deploys three distinct type families to enforce strict visual boundaries between hierarchy, reading matter, and data telemetry:

- **Manrope (Display & Headings):** Geometric, solid, authoritative. Used for high-level dashboard metrics, operational hub headers, and structural module framing.
- **Inter (Interface & Body):** Ultra-legible at small scale. Used across table cell contents, form fields, filter bars, tooltips, and procedural instructions.
- **IBM Plex Mono (Identifier Telemetry):** Reserved exclusively for machine identifiers, tracking codes (`DMS-TRK-8829`), vehicle VINs, GPS coordinates, timestamps, and waybill references.

Numeric tabular figures (`tnum`) must be enforced on both Inter and IBM Plex Mono for all numeric columns, KPIs, and payload weight metrics to prevent visual jitter during real-time updates.

## Layout & Spacing
The layout adheres to a strict 8pt grid with 4pt baseline substeps for dense data components. Interfaces prioritize horizontal viewport efficiency to accommodate real-time dispatch streams, split views, and map layouts.

### Screen Adaptations
- **Desktop (>= 1280px):** 12-column grid or flexible 2-to-3 pane split views (Collapsible Navigation Rail at 64px/240px, Active Manifest List at 380px, Telemetry Map/Detail Canvas flexible `1fr`).
- **Tablet (768px - 1279px):** 8-column layout. Navigation shifts to a compact rail. Detail panels become sliding overlays or tabs.
- **Mobile (< 768px):** Single-column stacked stream. Map toggles via bottom sheet or persistent segment control. Gutters compress to `1rem` and padding scales to `space-sm` for dense list viewing.

## Elevation & Depth
Depth is communicated through architectural outlines and crisp tonal surfaces rather than heavy blur shadows, preserving focus during multi-window enterprise usage.

- **Level 0 (Canvas Base):** Background canvas rendered in Porcelain Mist (`#F5F7F8`). Flat, zero shadow.
- **Level 1 (Data Surfaces & Cards):** Pure White (`#FFFFFF`) containers with a crisp 1px perimeter border (`#E2E8F0`). Flat or micro-tint shadow (`0 1px 2px rgba(20, 43, 69, 0.04)`).
- **Level 2 (Popovers, Flyouts & Filter Panels):** Elevated White (`#FFFFFF`) with 1px border (`#CBD5E1`) and directional shadow: `0 4px 12px -2px rgba(20, 43, 69, 0.08)`.
- **Level 3 (Modal Dialogs & Critical Alerts):** Centered surfaces over a Midnight Atlantic translucent veil (`rgba(20, 43, 69, 0.65)` backdrop with `blur(2px)`). Elevation shadow: `0 12px 32px -4px rgba(20, 43, 69, 0.18)`.

## Shapes
The system applies a restrained geometric shape language calibrated between 6px and 10px. This avoids bubbly consumer curves while eliminating harsh brutalist corners.

- **Inputs, Buttons, Badges, Dropdowns:** `rounded-base` (6px) for crisp interaction targets and modular alignment in dense forms.
- **Cards, Table Shells, Panels, Map Overlays:** `rounded-lg` (8px) to establish clean containment boundaries.
- **Dialogs & System Modals:** `rounded-xl` (10px) to distinguish detached focal layers.
- **Pills / Status Dots:** Circular/full-radius is strictly reserved for status indicator pips and compact count badges (`rounded-full`).

## Components

### Buttons
- **Primary:** Background Burnished Amber (`#D97732`), text white, hover `#C26526`, active `#A8541D`. Radius 6px, font `Inter` SemiBold (14px).
- **Secondary / Operational:** Background Midnight Atlantic (`#142B45`), text white, hover `#1E3F63`. Used for structural enterprise utilities.
- **Tertiary / Outlined:** Background transparent, 1px border (`#E2E8F0`), text Midnight Atlantic (`#142B45`), hover `#F8FAFC`.
- **Destructive:** Background white, 1px border (`#C94B4B`), text `#C94B4B`, hover `#FAECEC`.

### Status Badges & Chips
- Compact height (22px to 24px), font `Inter` SemiBold (11px or 12px), uppercase tracking optional for codes.
- 1px matching border at 20% opacity over the status background tint.
- Includes a 6px solid status dot on the left.
- Format: `[• In Transit]` in Blue (`#2B6CB0` text, `#EBF2FA` background, `#2B6CB033` border).

### High-Density Data Tables
- Row heights: Default `40px` (dense) to `48px` (comfortable).
- Header row: Background Porcelain Mist (`#F5F7F8`), bottom border 1px (`#CBD5E1`), text Slate Graphite (`#637386`) in `label-xs` uppercase.
- Alternating or clean hover rows: Pure White background transitioning to `#F8FAFC` on hover.
- Cell padding: Horizontal `12px`, vertical `8px`. Monospace alignment for Tracking IDs and timestamps.

### Input Fields & Controls
- Height: 36px (standard desktop enterprise).
- Surface: White, 1px border (`#CBD5E1`), radius 6px, text `#142B45`.
- Focus state: Border Burnished Amber (`#D97732`) with a 2px outer glow (`rgba(217, 119, 50, 0.15)`). Zero layout shift.
- Checkboxes & Radios: 16px square/circle, active fill Burnished Amber or Midnight Atlantic with crisp white checkmark vector.

### KPI & Metric Cards
- Background Pure White (`#FFFFFF`), border 1px (`#E2E8F0`), radius 8px, padding `16px`.
- Metric layout: Muted label on top (`label-sm`), large tabular value in Manrope (`headline-lg`), inline trend pill below (e.g., `+4.2% vs target` in Success Green with subtle arrow icon).

### Specialized Logistics Elements
- **Waybill / Tracking Token:** Inline badge using `IBM Plex Mono` (`code-sm`), background Porcelain Mist (`#F5F7F8`), border `#E2E8F0`, copy-to-clipboard trigger on hover.
- **Route Stepper:** Vertical timeline node with 2px stroke. Completed segments: Success Green; active legs: In-Transit Blue pulsating indicator; unreached legs: `#E2E8F0` neutral line.
- **Iconography:** Lucide line icons rendered with a consistent 1.75px stroke width, sized strictly at 16px or 20px.