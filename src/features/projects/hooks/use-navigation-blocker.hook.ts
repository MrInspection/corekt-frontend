"use client";

import { easeInOut, useAnimation } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

export function useDirtyNavigationBlocker({ isDirty }: { isDirty: boolean }) {
  const controls = useAnimation();
  const isActiveRef = useRef(false);

  const shakeAnimation = useCallback(
    () => ({
      x: [0, -8, 12, -15, 8, -10, 5, -3, 2, -1, 0],
      y: [0, 4, -9, 6, -12, 8, -3, 5, -2, 1, 0],
      filter: [
        "blur(0px)",
        "blur(2px)",
        "blur(2px)",
        "blur(3px)",
        "blur(2px)",
        "blur(2px)",
        "blur(1px)",
        "blur(2px)",
        "blur(1px)",
        "blur(1px)",
        "blur(0px)",
      ],
      "--warning-opacity": [0, 0.5, 0.3, 0.1, 0],
      transition: {
        duration: 0.4,
        ease: easeInOut,
      },
    }),
    [],
  );

  const triggerShake = useCallback(async () => {
    await controls.start(shakeAnimation());
  }, [controls, shakeAnimation]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isActiveRef.current) return;
      e.preventDefault();
    };

    const handlePopState = (e: PopStateEvent) => {
      if (!isActiveRef.current) return;
      e.preventDefault();
      triggerShake();
      window.history.pushState(null, "", window.location.href);
    };

    const handleLinkClick = (e: Event) => {
      if (!isActiveRef.current) return;

      const mouseEvent = e as MouseEvent;
      const target = mouseEvent.target as HTMLElement;
      const link = target.closest("a[href]") as HTMLAnchorElement;
      if (!link || link.target === "_blank") return;

      const linkUrl = new URL(link.href, window.location.origin);
      const currentUrl = new URL(window.location.href);

      const isExternal = linkUrl.origin !== currentUrl.origin;

      if (!isExternal) {
        e.preventDefault();
        e.stopPropagation();
        triggerShake();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleLinkClick, true);

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a[href]").forEach((anchor) => {
        anchor.removeEventListener("click", handleLinkClick, true);
        anchor.addEventListener("click", handleLinkClick, true);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick, true);
      observer.disconnect();
    };
  }, [triggerShake]);

  useEffect(() => {
    isActiveRef.current = isDirty;
    if (isDirty) {
      window.history.pushState(null, "", window.location.href);
    }
  }, [isDirty]);

  return { controls, triggerShake };
}
