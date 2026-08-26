"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    root.classList.add("has-scroll-reveal");
    const timers: number[] = [];

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

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      root.classList.remove("has-scroll-reveal");
    };
  }, []);

  return null;
}
