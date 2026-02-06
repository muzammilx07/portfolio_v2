"use client";

import { useState, useCallback } from "react";
import { Sun, Moon } from "lucide-react";

// -----------------------------------------------------------------------------
// Rectangle Bottom-Up + Blur animation (LOCKED)
// -----------------------------------------------------------------------------
const createRectangleBottomUpBlurAnimation = () => ({
  css: `
  ::view-transition-group(root) {
    animation-duration: 0.7s;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  }

  ::view-transition-new(root) {
    animation-name: reveal-light;
    filter: blur(2px);
  }

  ::view-transition-old(root),
  .dark::view-transition-old(root) {
    animation: none;
    z-index: -1;
  }

  .dark::view-transition-new(root) {
    animation-name: reveal-dark;
    filter: blur(2px);
  }

  @keyframes reveal-light {
    from {
      clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
      filter: blur(8px);
    }
    50% {
      filter: blur(4px);
    }
    to {
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
      filter: blur(0px);
    }
  }

  @keyframes reveal-dark {
    from {
      clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
      filter: blur(8px);
    }
    50% {
      filter: blur(4px);
    }
    to {
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
      filter: blur(0px);
    }
  }
  `,
});

// -----------------------------------------------------------------------------
// Toggle Button
// -----------------------------------------------------------------------------
export default function ToggleTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const isCurrentlyDark = html.classList.contains("dark");

    // Inject animation styles
    const { css } = createRectangleBottomUpBlurAnimation();
    let style = document.getElementById(
      "theme-transition-style",
    ) as HTMLStyleElement;

    if (!style) {
      style = document.createElement("style");
      style.id = "theme-transition-style";
      document.head.appendChild(style);
    }

    style.textContent = css;

    const switchTheme = () => {
      if (isCurrentlyDark) {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsDark(false);
      } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDark(true);
      }
    };

    // Fallback if View Transition API is unavailable
    const startViewTransition = (
      document as Document & { startViewTransition?: (cb: () => void) => void }
    ).startViewTransition;

    if (!startViewTransition) {
      switchTheme();
      return;
    }

    startViewTransition(switchTheme);
  }, []);

  return (
    <div
      onClick={toggleTheme}
      role="button"
      aria-label="Toggle theme"
      className="
        relative
        h-8 w-8
        cursor-pointer
        rounded-full
        border border-border
        bg-muted
        text-muted-foreground
        flex items-center justify-center
        transition-colors
        hover:bg-accent
      "
    >
      {/* Sun */}
      <Sun
        className={`
          absolute h-4 w-4
          transition-all duration-300
          ${
            isDark
              ? "scale-0 rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          }
        `}
      />

      {/* Moon */}
      <Moon
        className={`
          absolute h-4 w-4
          transition-all duration-300
          ${
            isDark
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 -rotate-90 opacity-0"
          }
        `}
      />
    </div>
  );
}
