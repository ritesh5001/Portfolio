# Project archive and case study refresh

The portfolio's project archive is `/work`; individual case studies are `/projects/[slug]`. Both now share a stronger editorial treatment with the existing black-and-white portfolio.

- Archive: large opening typography, real counts (81 total, 66 live, 13 case studies, 15 archived), two featured builds with saved screenshots, and an expandable introduction retaining the full original copy.
- Directory: combined name/domain/industry search, live/archived status and category filtering; a live results count, clear/reset controls, and an empty state. All 81 entries remain in the initial HTML. Offline domains remain unlinked.
- Project pages: larger name and brief, role/category/domain details, framed screenshot gallery, numbered overview/deliverables/stack sections, sticky desktop project information, and screenshot previews of adjacent case studies.
- Gallery: original screenshot assets, full-image containment, blur loading previews, crossfade, numbered thumbnail selection, previous/next controls, keyboard arrows and horizontal pointer swipe. One-image projects omit navigation. A project key resets the selection between routes.
- Motion: existing scroll reveals and card/filter interactions continue. Large filter changes skip the multi-screen height tween to keep search and the empty state stable. The archive introduction animates opening/closing where supported; reduced motion disables these effects.
- Mobile: stacked cards, wrapped filters, full-width search, smaller gallery controls and project information after the narrative.

## Verification

Production build: 225 pages generated. All 13 project routes and `/work` returned HTTP 200 with exactly one H1, preserved canonical URLs and structured data. Original project names, taglines, descriptions, deliverables and technologies were compared against the rendered HTML; none were missing. All 81 directory names and the original archive introduction remain present.

Chrome checks cover desktop and a 390px viewport, combined category/status/search filters, no-match/reset behavior, multi-image gallery controls, keyboard navigation and a horizontal pointer swipe, plus a one-image archived case study. Reduced motion was checked in the browser (gallery transition duration becomes 0s). Horizontal overflow and visible broken images were checked. Physical touch hardware was not available; swipe uses the existing pointer-event implementation.

No original content, keyword constants, metadata helpers, route slugs or screenshot files were rewritten. Changes are local source changes; no deployment was performed.
