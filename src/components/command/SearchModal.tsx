"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Code2,
  Layers,
  MessageSquare,
  Star,
  User,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCommandStore } from "@/lib/store/commandStore";

interface CommandEntry {
  id: string;
  label: string;
  keywords?: string[];
  icon: JSX.Element;
  action: () => void;
}

export default function SearchModal() {
  const router = useRouter();
  const { isOpen, open, close } = useCommandStore();
  const lastActiveElement = useRef<HTMLElement | null>(null);

  const handleSection = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      router.push(`/#${id}`);
    },
    [router],
  );

  const closeWithFocus = useCallback(() => {
    close();
    requestAnimationFrame(() => lastActiveElement.current?.focus());
  }, [close]);

  const openWithFocus = useCallback(() => {
    lastActiveElement.current = document.activeElement as HTMLElement | null;
    open();
  }, [open]);

  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (value) {
        openWithFocus();
      } else {
        closeWithFocus();
      }
    },
    [closeWithFocus, openWithFocus],
  );

  useEffect(() => {
    if (isOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement | null;
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isK = event.key.toLowerCase() === "k";
      const isMeta = event.metaKey || event.ctrlKey;
      if (isK && isMeta) {
        event.preventDefault();
        if (isOpen) {
          closeWithFocus();
        } else {
          openWithFocus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeWithFocus, isOpen, openWithFocus]);

  const menuItems = useMemo<CommandEntry[]>(
    () => [
      {
        id: "portfolio",
        label: "Portfolio",
        keywords: ["work", "projects", "featured"],
        icon: <Briefcase className="h-4 w-4" />,
        action: () => router.push("/projects"),
      },
      {
        id: "components",
        label: "Components",
        keywords: ["ui", "library", "design"],
        icon: <Layers className="h-4 w-4" />,
        action: () => router.push("/projects"),
      },
      {
        id: "blog",
        label: "Blog",
        keywords: ["articles", "posts"],
        icon: <Code2 className="h-4 w-4" />,
        action: () => router.push("/blog"),
      },
    ],
    [router],
  );

  const portfolioItems = useMemo<CommandEntry[]>(
    () => [
      {
        id: "about",
        label: "About",
        keywords: ["bio", "contact"],
        icon: <User className="h-4 w-4" />,
        action: () => handleSection("about"),
      },
      {
        id: "testimonials",
        label: "Testimonials",
        keywords: ["reviews", "social proof"],
        icon: <Star className="h-4 w-4" />,
        action: () => handleSection("testimonials"),
      },
      {
        id: "tech-stack",
        label: "Tech Stack",
        keywords: ["skills", "stack"],
        icon: <MessageSquare className="h-4 w-4" />,
        action: () => handleSection("tech-stack"),
      },
      {
        id: "experience",
        label: "Experience",
        keywords: ["career", "timeline"],
        icon: <Briefcase className="h-4 w-4" />,
        action: () => handleSection("experience"),
      },
    ],
    [handleSection],
  );

  const renderItem = (item: CommandEntry) => (
    <CommandItem
      key={item.id}
      keywords={item.keywords}
      onSelect={() => {
        item.action();
        closeWithFocus();
      }}
    >
      {item.icon}
      <span>{item.label}</span>
    </CommandItem>
  );

  return (
    <CommandDialog open={isOpen} onOpenChange={handleOpenChange}>
      <div className="border-b border-white/10 bg-zinc-950/90">
        <CommandInput placeholder="Type a command or search..." autoFocus />
      </div>
      <CommandList className="max-h-[420px]">
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Menu">{menuItems.map(renderItem)}</CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Portfolio">
          {portfolioItems.map(renderItem)}
        </CommandGroup>
      </CommandList>
      <div className="flex items-center justify-between border-t border-white/10 bg-zinc-950/90 px-4 py-2 text-xs text-zinc-400">
        <span>Go to Page</span>
        <div className="flex gap-2">
          <kbd className="rounded bg-zinc-800 px-2 py-1 text-[10px] text-zinc-100">
            Enter
          </kbd>
          <kbd className="rounded bg-zinc-800 px-2 py-1 text-[10px] text-zinc-100">
            Esc
          </kbd>
        </div>
      </div>
    </CommandDialog>
  );
}
