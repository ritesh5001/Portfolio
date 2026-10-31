// Native animations keep this enhancement small and independent of page content.
const REVEAL_SELECTOR = [
  "[data-motion-reveal]",
  ".hero-topline",
  ".hero-line",
  ".hero-location",
  ".hero-portrait",
  ".hero-aside",
  ".hero-bottomline",
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
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function installSiteMotion({ reduced, animateInitial = true }) {
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
    window.removeEventListener("scroll", requestScroll);
    window.removeEventListener("resize", requestScroll);
    document.removeEventListener("focusin", onFocus);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    document.removeEventListener("pointermove", onPointer);
    document.removeEventListener("pointerleave", clearMagnetic);
    document.removeEventListener("toggle", onToggle, true);
    for (const animation of animations) animation.cancel();
    clearMagnetic();
    portrait?.style.removeProperty("--portrait-shift");
    if (header) delete header.dataset.scrolled;
    if (homeNav) delete homeNav.dataset.scrollspy;
    delete root.dataset.motionSuspended;
    for (const element of loopTargets) delete element.dataset.loopVisible;
    for (const link of [...homeLinks, ...tocLinks]) delete link.dataset.current;
    for (const element of document.querySelectorAll("[data-motion-state]"))
      delete element.dataset.motionState;
  };
}
