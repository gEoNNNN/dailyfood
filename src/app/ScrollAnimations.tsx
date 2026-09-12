"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      const applyReduced = () => {
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
      };
      applyReduced();
      const mo = new MutationObserver(applyReduced);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    root.classList.add("has-scroll-reveal");
    const timers: number[] = [];

    const observe = (element: HTMLElement) => {
      observer.observe(element);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          const delay = Number(element.dataset.revealDelay ?? 0) * 90;
          element.classList.add("is-visible");
          observer.unobserve(element);
          timers.push(window.setTimeout(() => {
            element.removeAttribute("data-reveal");
            element.removeAttribute("data-reveal-delay");
            element.classList.remove("is-visible");
          }, 900 + delay));
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((el) => observe(el));
    };

    scan();

    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      root.classList.remove("has-scroll-reveal");
    };
  }, []);

  return null;
}
