"use client";

import type { ReactNode } from "react";
import ThemeProvider from "./ThemeProvider";
import GlobalShortcuts from "@/components/shared/GlobalShortcuts";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
  return (
    <ThemeProvider>
      <GlobalShortcuts />
      {children}
    </ThemeProvider>
  );
}
