# Portfolio UI redesign

The design follows the monochrome typography, pill navigation, editorial portrait, fine rules, and open spacing in the user-supplied reference: https://www.instagram.com/p/DSpaaTVD10d/.

## Scope and preservation

- Rebuilt the homepage presentation and shared navigation and footer.
- Applied the same light palette and typography to about, work, services, hire, case studies, articles, and the not-found page.
- Kept all Markdown content, keyword frontmatter, project and service data, SEO definitions, canonical URLs, JSON-LD, sitemap, RSS, scheduling logic, and route slugs unchanged.
- Kept the original profile and social-sharing images.
- The homepage continues to server-render its developer keywords, skills, experience, and project descriptions. Native details elements reveal longer skills and background sections.
- Replaced homepage 3D rendering and GSAP scroll animations with a static portrait and CSS interactions. Project galleries retain their controls and respect reduced-motion preferences.
- Added responsive navigation, skip-to-content links, accessible filter state, and responsive optimized project images.

## Generated portrait

Mode: built-in ChatGPT image generation tool.

Reference: the existing public/images/pfp.webp photo, depicting the same person as the user-supplied portrait.

Final asset: public/images/ritesh-editorial.png. The original generated image remains in the Codex generated-images directory; the final asset is copied into the repository. Next Image serves appropriately sized and optimized versions.

Generation prompt: Preserve the man's facial identity, hair, distinctive curled moustache, short beard, age, and realistic skin texture. Create an editorial black-and-white studio portrait in a charcoal crewneck T-shirt, three-quarter pose, looking toward the camera, with soft sculptural light, full head and shoulders in frame, no text or graphics.

Final edit prompt: Change only the generated portrait's background to uniform pure white #ffffff. Remove the dark gray gradient and preserve the person's identity, pose, clothing, lighting, and composition. The white extends to every outer edge and surrounds the silhouette. No text or graphics.

## Validation

- Production build: all 219 routes generated successfully.
- Checked 117 original content phrases in server-rendered homepage HTML; none missing.
- All 16 checked production routes and assets returned HTTP 200. HTML pages retain one H1, a canonical URL, and JSON-LD.
- Desktop and mobile layouts inspected in Chrome; no horizontal overflow in the checked homepage and article layouts.
- Homepage client-project filtering: 9 WooCommerce cards from 13 total, with all projects restored using All.
- Full work directory filtering: 24 Fashion & Clothing cards from 81 directory entries.
- Native skills accordion, responsive menu, and case-study gallery controls checked.
- The sovereign AI article retains its title, canonical URL, metadata, one H1, and body content.

## Keyword performance

This change preserves the existing keyword strategy. It does not establish whether those keywords are ranking or converting. Assess actual performance with Google Search Console query/page impressions, clicks, CTR, and average position, comparing a baseline before release with data after release. No keyword, article, or metadata rewrites were made.
