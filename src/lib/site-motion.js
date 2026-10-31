// Native animations keep this enhancement small and independent of page content.
//
// The hero is deliberately absent: its entrance is pure CSS (motion.css) so it
// starts on the first painted frame instead of waiting for hydration, and its
// headline and portrait (the LCP candidates) never animate in at all.
const REVEAL_SELECTOR = [
  "[data-motion-reveal]",
  ".section-heading > div",
  ".section-description",
  ".about-name",
  ".about-intro > div:last-child",
  ".stats-grid > div",
  ".about-focus > div",
  ".experience-row",
  ".background-grid > details",
  ".project-card",
  ".client-section-heading > *",
  ".client-project",
  ".directory-grid > li",
  ".project-section-heading > *",
  ".archive-ledger > div",
  ".archive-story",
  ".archive-tools",
  ".archive-category-filters",
  ".archive-results-bar",
  ".archive-empty",
  ".case-hero-label",
  ".case-hero-description",
  ".case-hero-facts > div",
  ".case-project-info",
  ".case-hire-link",
  ".skills-list > details",
  ".all-work-link",
  ".contact-summary > p",
  ".contact-values",
  ".contact-intro > p",
  ".contact-title",
  ".contact-grid > div",
  ".contact-socials",
  ".contact-tags",
  ".content-page h1",
  ".content-page > section:first-of-type > div > p",
  ".content-page > header p",
  ".content-page section h2",
  ".content-page section h3",
  ".content-page dl > div",
  ".content-page > div > p",
  ".content-page article:not(.post-body)",
  ".content-page section ul.grid > li",
  ".blog-list > li",
  ".post-body > h2",
  ".post-body > h3",
  ".reveal-item",
  ".site-footer > div:first-child > *",
  ".footer-signature",
  ".footer-bottom",
].join(",");
const FILTER_ITEM = ".client-project, .directory-grid > li";
const MAGNETIC_SELECTOR =
  ".solid-button, .nav-contact, .hero-scroll, .contact-title .circle-link";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const LOOP_SELECTOR =
  ".stack-strip, .availability, .hero-scroll, .motion-toggle";
// Card screenshots are unmasked from the bottom edge as their card rises in.
const MASK_SELECTOR =
  ".client-project-image, .project-image, .archive-feature-screen, .case-related-visual";
// Project cards that get the "View project" cursor label on fine pointers.
const CURSOR_SELECTOR =
  ".client-project-image, .project-image, .archive-feature, .case-related";
const CODE_FIGURE = ".post-body figure[data-rehype-pretty-code-figure]";
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// Elements already on screen when motion installs were painted visible by the
// server render. Replaying them would dim content the visitor has already seen
// (a visible flash on slower phones), so they are marked revealed and left
// alone; only content scrolled into view later animates.
export function installSiteMotion({ reduced, animateInitial = false }) {
  const root = document.documentElement;
  let progress;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const animations = new Set();
  const elementAnimations = new WeakMap();
  const registered = new WeakSet();
  const revealed = new WeakSet();
  const loopTargets = new Set();
  let observer;
  let loopObserver;
  let mutationObserver;
  let resizeObserver;
  let frame = 0;
  let refreshFrame = 0;
  let pointerFrame = 0;
  let magnetic = null;
  let pointer = null;
  let homeSections = [];
  let homeLinks = [];
  let tocHeadings = [];
  let tocLinks = [];
  let header;
  let portrait;
  let homeNav;
  let nav;
  let indicator;
  let hoveredLink = null;
  let cursorLabel = null;
  let cursorFrame = 0;
  const cursor = { x: 0, y: 0, tx: 0, ty: 0, card: null };

  function cancel(element) {
    const animation = elementAnimations.get(element);
    if (animation) animation.cancel();
  }

  function play(element, { delay, compact = false } = {}) {
    if (
      reduced ||
      typeof element.animate !== "function" ||
      !element.getClientRects().length
    )
      return;
    cancel(element);
    element.dataset.motionState = "revealed";
    const isHeadline = element.matches(
      ".hero-line, .content-page h1, [data-motion-reveal='headline']",
    );
    const isImage = element.matches(
      ".hero-portrait, [data-motion-reveal='image']",
    );
    const sibling = Array.prototype.indexOf.call(
      element.parentElement.children,
      element,
    );
    const stagger = Number(element.dataset.motionDelay ?? (sibling % 3) * 65);
    const animation = element.animate(
      [
        {
          opacity: isHeadline ? 0.3 : 0,
          transform: isImage
            ? "translateY(24px) scale(0.975)"
            : "translateY(" + (compact ? 12 : isHeadline ? 32 : 24) + "px)",
        },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      {
        duration: compact ? 320 : isHeadline || isImage ? 650 : 550,
        delay: delay ?? stagger,
        easing: EASE,
        fill: "both",
      },
    );
    animations.add(animation);
    elementAnimations.set(element, animation);
    const mask = element.matches(MASK_SELECTOR)
      ? element
      : element.querySelector(MASK_SELECTOR);
    if (mask && !compact) unmask(mask, animation.effect.getTiming().delay);
    const release = () => {
      animations.delete(animation);
      if (elementAnimations.get(element) === animation)
        elementAnimations.delete(element);
    };
    animation.oncancel = release;
    animation.onfinish = () => {
      release();
      // Release the transform so CSS hover and layout can take over again.
      animation.cancel();
    };
  }

  function unmask(mask, delay) {
    const timing = { duration: 900, delay, easing: EASE, fill: "both" };
    const reveal = mask.animate(
      [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
      timing,
    );
    const image = mask.querySelector("img");
    const settle = image?.animate(
      [{ transform: "scale(1.12)" }, { transform: "scale(1)" }],
      { ...timing, duration: 1200 },
    );
    for (const animation of [reveal, settle]) {
      if (!animation) continue;
      animations.add(animation);
      // Cancel once done so hover transforms on the image work again.
      animation.onfinish = () => {
        animations.delete(animation);
        animation.cancel();
      };
      animation.oncancel = () => animations.delete(animation);
    }
  }

  // The dark pill behind the current nav link slides between links instead
  // of each link switching its own background on and off.
  function placeIndicator() {
    if (!indicator || !nav) return;
    const target =
      hoveredLink ??
      nav.querySelector('.nav-pill[data-current="true"]') ??
      (nav.dataset.scrollspy ? null : nav.querySelector(".nav-pill.is-active"));
    for (const link of nav.querySelectorAll(".nav-pill")) {
      if (link === target) link.dataset.indicated = "true";
      else delete link.dataset.indicated;
    }
    if (!target || !target.offsetWidth) {
      indicator.style.opacity = "0";
      return;
    }
    indicator.style.opacity = "1";
    indicator.style.width = target.offsetWidth + "px";
    indicator.style.height = target.offsetHeight + "px";
    indicator.style.transform =
      "translate(" + target.offsetLeft + "px, " + target.offsetTop + "px)";
  }

  function onNavOver(event) {
    const link = event.target.closest?.(".nav-pill");
    if (!finePointer.matches || link === hoveredLink) return;
    hoveredLink = link;
    placeIndicator();
  }

  function onNavLeave() {
    hoveredLink = null;
    placeIndicator();
  }

  function moveCursorLabel() {
    cursorFrame = 0;
    if (!cursorLabel) return;
    cursor.x += (cursor.tx - cursor.x) * 0.22;
    cursor.y += (cursor.ty - cursor.y) * 0.22;
    cursorLabel.style.transform =
      "translate(" + cursor.x + "px, " + cursor.y + "px)";
    if (
      cursor.card &&
      (Math.abs(cursor.tx - cursor.x) > 0.3 ||
        Math.abs(cursor.ty - cursor.y) > 0.3)
    )
      cursorFrame = requestAnimationFrame(moveCursorLabel);
  }

  function updateCursorLabel(event) {
    if (!cursorLabel) return;
    const card = finePointer.matches
      ? event.target.closest?.(CURSOR_SELECTOR)
      : null;
    const link = card?.closest("a[href]");
    if (card !== cursor.card) {
      cursor.card = card;
      if (card) {
        // Start at the pointer so the label never streaks in from a corner.
        cursor.x = event.clientX + 18;
        cursor.y = event.clientY + 18;
        cursorLabel.textContent =
          link && link.origin !== location.origin
            ? "Visit site ↗"
            : "View project";
      }
      cursorLabel.dataset.visible = card ? "true" : "false";
    }
    cursor.tx = event.clientX + 18;
    cursor.ty = event.clientY + 18;
    if (card && !cursorFrame)
      cursorFrame = requestAnimationFrame(moveCursorLabel);
  }

  function hideCursorLabel() {
    if (!cursorLabel) return;
    cursor.card = null;
    cursorLabel.dataset.visible = "false";
  }

  function enhanceCodeBlocks() {
    if (!navigator.clipboard) return;
    for (const figure of document.querySelectorAll(CODE_FIGURE)) {
      if (figure.querySelector(".code-copy")) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy";
      button.textContent = "Copy";
      button.addEventListener("click", async () => {
        const code = figure.querySelector("pre")?.innerText ?? "";
        try {
          await navigator.clipboard.writeText(code.trimEnd());
          button.textContent = "Copied";
        } catch {
          button.textContent = "Press Ctrl+C";
        }
        setTimeout(() => {
          button.textContent = "Copy";
        }, 1600);
      });
      figure.append(button);
    }
  }

  function refreshTargets() {
    progress = document.querySelector("[data-scroll-progress]");
    header = document.querySelector(".site-header");
    portrait = document.querySelector(".hero-portrait img");
    homeSections = [
      ...document.querySelectorAll(".portfolio-home > section[id]"),
    ];
    homeNav = homeSections.length
      ? document.querySelector(".desktop-nav")
      : null;
    homeLinks = homeNav ? [...homeNav.querySelectorAll("a")] : [];
    if (homeNav) homeNav.dataset.scrollspy = "true";
    nav = document.querySelector(".desktop-nav");
    const nextIndicator = reduced ? null : nav?.querySelector(".nav-indicator");
    if (nextIndicator !== indicator) {
      indicator = nextIndicator;
      if (indicator) {
        nav.dataset.indicator = "true";
        nav.addEventListener("pointerover", onNavOver);
        nav.addEventListener("pointerleave", onNavLeave);
        placeIndicator();
        // First placement is instant; only later moves slide.
        requestAnimationFrame(() => {
          if (indicator) indicator.dataset.ready = "true";
        });
      }
    }
    enhanceCodeBlocks();
    tocHeadings = [
      ...document.querySelectorAll(".post-body > h2[id], .post-body > h3[id]"),
    ];
    tocLinks = [...document.querySelectorAll('[aria-label="On this page"] a')];
    if (loopObserver) {
      for (const element of document.querySelectorAll(LOOP_SELECTOR)) {
        if (loopTargets.has(element)) continue;
        loopTargets.add(element);
        element.dataset.loopVisible = "false";
        loopObserver.observe(element);
      }
    }
    if (observer) {
      const candidates = [...document.querySelectorAll(REVEAL_SELECTOR)];
      const selected = new Set(candidates);
      for (const element of candidates) {
        // A card is revealed as one unit, never as several nested animations.
        let ancestor = element.parentElement;
        while (ancestor && !selected.has(ancestor))
          ancestor = ancestor.parentElement;
        if (ancestor || registered.has(element)) continue;
        registered.add(element);
        const rect = element.getBoundingClientRect();
        if (
          !animateInitial &&
          rect.top < window.innerHeight &&
          rect.bottom > 0
        ) {
          revealed.add(element);
          element.dataset.motionState = "revealed";
          continue;
        }
        element.dataset.motionState = "ready";
        observer.observe(element);
      }
    }
    requestScroll();
  }

  function setCurrent(links, active) {
    for (const link of links) {
      const current = link === active;
      if (current && link.dataset.current !== "true")
        link.dataset.current = "true";
      if (!current && link.dataset.current) delete link.dataset.current;
    }
  }

  function updateScroll() {
    frame = 0;
    const y = Math.max(0, window.scrollY);
    const distance = root.scrollHeight - window.innerHeight;
    if (progress)
      progress.style.transform =
        "scaleX(" + (distance > 0 ? clamp(y / distance, 0, 1) : 0) + ")";
    if (header) header.dataset.scrolled = y > 24 ? "true" : "false";
    if (!reduced && finePointer.matches && portrait) {
      portrait.style.setProperty(
        "--portrait-shift",
        -Math.min(y * 0.045, 18) + "px",
      );
    }
    if (homeLinks.length) {
      let active = homeSections[0];
      for (const section of homeSections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.36)
          active = section;
      }
      setCurrent(
        homeLinks,
        homeLinks.find((link) =>
          active?.id === "home"
            ? link.getAttribute("href") === "/"
            : link.hash === "#" + active?.id,
        ),
      );
    }
    placeIndicator();
    if (tocLinks.length) {
      let active = tocHeadings[0];
      for (const heading of tocHeadings) {
        if (heading.getBoundingClientRect().top <= 160) active = heading;
      }
      setCurrent(
        tocLinks,
        tocLinks.find(
          (link) => decodeURIComponent(link.hash.slice(1)) === active?.id,
        ),
      );
    }
  }

  function requestScroll() {
    if (!frame) frame = requestAnimationFrame(updateScroll);
  }

  function clearMagnetic() {
    if (magnetic) {
      magnetic.style.removeProperty("--magnetic-x");
      magnetic.style.removeProperty("--magnetic-y");
    }
    magnetic = null;
  }

  function updatePointer() {
    pointerFrame = 0;
    if (!pointer || !finePointer.matches) return clearMagnetic();
    const target = pointer.target.closest?.(MAGNETIC_SELECTOR);
    if (target !== magnetic) clearMagnetic();
    if (!target) return;
    magnetic = target;
    const rect = target.getBoundingClientRect();
    target.style.setProperty(
      "--magnetic-x",
      clamp((pointer.x - rect.left - rect.width / 2) * 0.12, -5, 5) + "px",
    );
    target.style.setProperty(
      "--magnetic-y",
      clamp((pointer.y - rect.top - rect.height / 2) * 0.12, -5, 5) + "px",
    );
  }

  function onPointer(event) {
    pointer = { target: event.target, x: event.clientX, y: event.clientY };
    updateCursorLabel(event);
    if (!pointerFrame) pointerFrame = requestAnimationFrame(updatePointer);
  }

  function onToggle(event) {
    const details = event.target;
    if (!(details instanceof HTMLDetailsElement) || !details.open) return;
    [...details.children]
      .filter((child) => child.tagName !== "SUMMARY")
      .forEach((child, index) =>
        play(child, { compact: true, delay: index * 35 }),
      );
    requestScroll();
  }

  function onFocus(event) {
    clearMagnetic();
    if (!event.target.matches?.(":focus-visible")) return;
    // Keyboard users never wait for a focused control to finish entering.
    for (const animation of animations) {
      const target = animation.effect?.target;
      if (target?.contains(event.target)) animation.finish();
    }
  }

  function onVisibilityChange() {
    root.dataset.motionSuspended = document.hidden ? "true" : "false";
    if (document.hidden) clearMagnetic();
  }

  if (!reduced && finePointer.matches) {
    cursorLabel = document.createElement("div");
    cursorLabel.className = "cursor-label";
    cursorLabel.setAttribute("aria-hidden", "true");
    cursorLabel.dataset.visible = "false";
    document.body.append(cursorLabel);
  }

  if (!reduced && "IntersectionObserver" in window) {
    loopObserver = new IntersectionObserver((entries) => {
      for (const entry of entries)
        entry.target.dataset.loopVisible = entry.isIntersecting
          ? "true"
          : "false";
    });
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || revealed.has(entry.target)) continue;
          revealed.add(entry.target);
          observer.unobserve(entry.target);
          if (entry.target.closest("[data-filter-changing]")) {
            entry.target.dataset.motionState = "revealed";
            continue;
          }
          play(entry.target);
        }
      },
      { rootMargin: "0px 0px 55px 0px", threshold: 0.01 },
    );
  }

  refreshTargets();
  onVisibilityChange();
  if ("ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(requestScroll);
    resizeObserver.observe(document.body);
  }
  mutationObserver = new MutationObserver((records) => {
    let changedChildren = false;
    for (const record of records) {
      if (record.type === "childList") changedChildren = true;
      if (
        reduced ||
        record.type !== "attributes" ||
        !record.target.matches(FILTER_ITEM)
      )
        continue;
      if (record.target.closest("[data-filter-grid]")) continue;
      const element = record.target;
      const rect = element.getBoundingClientRect();
      cancel(element);
      if (!rect.width || !rect.height) continue;
      if (rect.top < window.innerHeight + 55 && rect.bottom > 0) {
        revealed.add(element);
        observer?.unobserve(element);
        play(element, { compact: true });
      } else {
        revealed.delete(element);
        observer?.observe(element);
      }
    }
    if (changedChildren && !refreshFrame) {
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;
        refreshTargets();
      });
    }
    requestScroll();
  });
  mutationObserver.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["hidden", "class"],
  });
  window.addEventListener("scroll", requestScroll, { passive: true });
  window.addEventListener("resize", requestScroll, { passive: true });
  document.addEventListener("focusin", onFocus);
  document.addEventListener("visibilitychange", onVisibilityChange);
  if (!reduced) {
    document.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", clearMagnetic);
    document.addEventListener("pointerleave", hideCursorLabel);
    window.addEventListener("scroll", hideCursorLabel, { passive: true });
    document.addEventListener("toggle", onToggle, true);
  }

  return () => {
    observer?.disconnect();
    loopObserver?.disconnect();
    resizeObserver?.disconnect();
    mutationObserver.disconnect();
    cancelAnimationFrame(frame);
    cancelAnimationFrame(refreshFrame);
    cancelAnimationFrame(pointerFrame);
    cancelAnimationFrame(cursorFrame);
    window.removeEventListener("scroll", requestScroll);
    window.removeEventListener("resize", requestScroll);
    document.removeEventListener("focusin", onFocus);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    document.removeEventListener("pointermove", onPointer);
    document.removeEventListener("pointerleave", clearMagnetic);
    document.removeEventListener("pointerleave", hideCursorLabel);
    window.removeEventListener("scroll", hideCursorLabel);
    document.removeEventListener("toggle", onToggle, true);
    for (const animation of animations) animation.cancel();
    clearMagnetic();
    portrait?.style.removeProperty("--portrait-shift");
    if (header) delete header.dataset.scrolled;
    if (homeNav) delete homeNav.dataset.scrollspy;
    cursorLabel?.remove();
    if (nav) {
      nav.removeEventListener("pointerover", onNavOver);
      nav.removeEventListener("pointerleave", onNavLeave);
      delete nav.dataset.indicator;
      for (const link of nav.querySelectorAll(".nav-pill"))
        delete link.dataset.indicated;
    }
    if (indicator) {
      delete indicator.dataset.ready;
      indicator.removeAttribute("style");
    }
    delete root.dataset.motionSuspended;
    for (const element of loopTargets) delete element.dataset.loopVisible;
    for (const link of [...homeLinks, ...tocLinks]) delete link.dataset.current;
    for (const element of document.querySelectorAll("[data-motion-state]"))
      delete element.dataset.motionState;
  };
}
