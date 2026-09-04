"use client";

import { useEffect } from "react";

export default function PageMotion() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const header = document.getElementById("siteHeader");
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const revealEls = Array.from(document.querySelectorAll(".reveal"));
    const showAll = () => revealEls.forEach((el) => el.classList.add("is-visible"));

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => io?.observe(el));
    } else {
      showAll();
    }

    const safetyNet = window.setTimeout(showAll, 1200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      window.clearTimeout(safetyNet);
    };
  }, []);

  return null;
}
