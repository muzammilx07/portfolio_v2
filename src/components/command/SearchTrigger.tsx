"use client";

import { useCommandStore } from "@/lib/store/commandStore";
import PillButton from "@/components/ui/PillButton";

interface Props {
  className?: string;
}

export default function SearchTrigger({ className }: Props) {
  const open = useCommandStore((state) => state.open);

  return (
    <PillButton
      text="Search"
      shortcut="Ctrl K"
      ariaLabel="Open search"
      onClick={open}
      className={className}
    />
  );
}
