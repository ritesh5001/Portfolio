# Motion and interaction audit

The implementation follows the supplied refinement list and preserves the monochrome layout, original keyword strategy, content, URLs, and SEO definitions.

| Area                  | Implemented behavior                                                                                                                                                                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero                  | Two upward headline reveals, staggered by 90 ms; the hero sequence finishes in under one second. Portrait entrance and a bounded desktop scroll offset, with no continuous portrait floating.                                                        |
| Navigation            | Section highlighting on the homepage, responsive menu entrances, animated menu/close icon, arrow responses, and a scroll-progress line. Services now opens `/services`; Technical Skills remains reachable through the expanded menu.                |
| About                 | One-time 700 ms counters for 50+, 10+, and 4. Labels stay in place; screen readers receive the final figures without repeated announcements.                                                                                                         |
| Experience            | Each job enters as one complete block. Bullets remain together.                                                                                                                                                                                      |
| Background and skills | Native disclosure semantics, opening and closing height transitions in supporting browsers, rotating plus-to-minus symbols in background rows, and arrow/background transitions in Skills.                                                           |
| Projects              | Coordinated screenshot zoom/lift, card lift, and arrow feedback. Full featured descriptions are retained in expandable Project details rows.                                                                                                         |
| Filters               | Animated selected pills, FLIP position transitions for retained cards, short entrances for new results, and a smooth grid-height change. Rapid selections cancel the previous animation. Offscreen cards do not receive unnecessary FLIP animations. |
| Technology strip      | One slow continuous strip; pause on hover, static and readable in reduced-motion mode. The visual duplicate is hidden from assistive technology.                                                                                                     |
| Contact/footer        | Sliding email, social, and footer link underlines; small arrow responses; magnetic motion on selected primary desktop controls.                                                                                                                      |
| Services              | Three matching interactive cards with border/lift feedback and an independently moving Details arrow.                                                                                                                                                |
| Case studies          | 240 ms screenshot crossfades, animated thumbnail selection, larger dot targets, previous/next buttons, left/right keyboard controls, and horizontal pointer/swipe gestures. Vertical page scrolling and pinch zoom remain enabled.                   |
| Blog                  | Restrained cover-image, heading, and link effects; article paragraphs stay stable. Desktop table-of-contents links follow the current heading.                                                                                                       |
| Loading images        | 188 tiny previews derived from the existing images, used by responsive Next Image components across projects, the directory, blog covers, and profile imagery.                                                                                       |

## Timing and implementation

- Hover effects: generally 220–250 ms.
- Section entrances: 550 ms; hero/image entrances: 650 ms.
- Accordion height transitions: 450 ms, progressively enhanced with `interpolate-size` and `::details-content`; native disclosure behavior remains the fallback.
- Filter movement: 320 ms; new cards: 250 ms; grid resize: 340 ms.
- Native Web Animations, IntersectionObserver, ResizeObserver, and CSS provide the effects. No new runtime dependencies were added.
- Scroll and pointer work is scheduled with requestAnimationFrame. Animation effects, observers, and listeners are cleaned up on route changes and preference changes.
- No reveal styles hide server-rendered content before JavaScript starts.

The native API and accordion enhancement follow [Web Animations API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) and [interpolate-size documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/interpolate-size).

## Motion preference

The footer control switches between full and reduced motion and remembers the choice in browser-local storage. The initial default follows the operating system. Reduced mode cancels in-flight entrances, removes decorative movement, stops the strip, and leaves the interface and content usable. Restoring full motion does not replay the currently visible footer around the control.

## Count explanations and content

The homepage now explains that 50+ refers to WordPress websites maintained. The full directory separately labels its 81 entries as 66 live sites and 15 archived projects, using the existing project data. Original statistics and descriptions remain in the rendered HTML. A preservation check covers 119 original phrases, including the full featured project descriptions.

## Updating previews

Run `node scripts/generate-image-placeholders.mjs` after replacing screenshots. Generated maps live in `src/generated/`. The helper uses the Sharp dependency already installed with Next.js; production pages consume only the generated data, and missing entries gracefully use the standard image loading state.

## Browser validation

- Desktop and 390 px mobile viewport checks.
- Statistic completion; scroll progress and active section; real card hover lift and screenshot scale.
- Rapid homepage filter changes, restoring all 13 cards, and filtering the work directory to 24 Fashion & Clothing entries.
- Expandable descriptions and accordion controls.
- Gallery arrows, horizontal pointer drag, keyboard navigation, active-image accessibility, and crossfade layer opacity.
- Motion preference behavior and persistence, plus responsive menu navigation.
- Production build: all 225 generated pages passed. All 16 checked routes/assets returned HTTP 200; checked content pages retain one H1, a canonical URL, and JSON-LD.
- All 119 original content phrases remain in server-rendered HTML. Source blog content, keyword frontmatter, SEO definitions, and project data were not rewritten.
- The personal Tat Vivah preview referenced an existing 503 capture. Its card now reuses the saved storefront screenshot from the case study; the original asset is retained.

Swipe handling uses Pointer Events and was exercised with horizontal browser pointer gestures; physical touch hardware was not available for validation.
