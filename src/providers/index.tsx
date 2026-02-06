"use client";

import type { ReactNode } from "react";
import ThemeProvider from "./ThemeProvider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
