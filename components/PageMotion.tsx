"use client";

import { useEffect } from "react";

export default function PageMotion() {
  useEffect(() => {
    const header = document.getElementById("siteHeader");
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
