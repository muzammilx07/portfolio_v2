"use client";

import { JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Briefcase,
  Code2,
  Copy,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  User,
  ExternalLink,
  Layers,
  Sparkles,
  BookOpen,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useCommandStore } from "@/lib/store/commandStore";
import { projects } from "@/lib/data/projects";

type SearchCategoryTab = "all" | "projects" | "blog" | "actions" | "links";

interface CommandEntry {
  id: string;
  category: SearchCategoryTab;
  label: string;
  description?: string;
  keywords?: string[];
  icon: JSX.Element;
  action: () => void;
}

export default function SearchModal() {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const { isOpen, open, close } = useCommandStore();
  const [activeTab, setActiveTab] = useState<SearchCategoryTab>("all");
  const lastActiveElement = useRef<HTMLElement | null>(null);

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

  const allCommands = useMemo<CommandEntry[]>(() => {
    // Project entries
    const projectEntries: CommandEntry[] = projects.map((p) => ({
      id: `project-${p.slug}`,
      category: "projects",
      label: p.title,
      description: `${p.category} · ${p.readTime}`,
      keywords: [p.title, p.category, ...p.tags, "case study", "project"],
      icon: <Layers className="h-4 w-4" />,
      action: () => router.push(`/projects/${p.slug}`),
    }));

    // Blog entries
    const blogEntries: CommandEntry[] = [
      {
        id: "blog-fastapi-react",
        category: "blog",
        label: "Architecting Sub-200ms AI Interfaces: Bridging FastAPI and React",
        description: "Article · 5 min read",
        keywords: ["fastapi", "react", "ai", "latency", "streaming", "rest api"],
        icon: <Code2 className="h-4 w-4" />,
        action: () =>
          router.push("/blog/building-sub-200ms-ai-interfaces-fastapi-react"),
      },
      {
        id: "blog-threat-telemetry",
        category: "blog",
        label: "Engineering Real-Time Threat Streams: WebSockets, XGBoost & CICIDS",
        description: "Article · 6 min read",
        keywords: ["websockets", "xgboost", "soc", "telemetry", "cicids", "ml"],
        icon: <Sparkles className="h-4 w-4" />,
        action: () =>
          router.push("/blog/realtime-threat-telemetry-websockets-xgboost"),
      },
      {
        id: "blog-embeddable-widgets",
        category: "blog",
        label: "Designing Lightweight Cross-Origin Embeddable Widgets in Next.js 14",
        description: "Article · 5 min read",
        keywords: ["next.js", "widgets", "sdk", "shadow dom", "cross-origin", "prisma"],
        icon: <BookOpen className="h-4 w-4" />,
        action: () =>
          router.push("/blog/designing-cross-origin-embeddable-widgets-nextjs14"),
      },
    ];

    // Navigation & Actions
    const actionEntries: CommandEntry[] = [
      {
        id: "toggle-theme",
        category: "actions",
        label: `Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode (Alt+T)`,
        description: "Theme toggle",
        keywords: ["theme", "mode", "dark", "light", "color"],
        icon: resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />,
        action: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "copy-email",
        category: "actions",
        label: "Copy Email Address",
        description: "muzammilxshareef@gmail.com",
        keywords: ["email", "contact", "copy", "hire"],
        icon: <Copy className="h-4 w-4" />,
        action: () => {
          navigator.clipboard?.writeText("muzammilxshareef@gmail.com");
        },
      },
      {
        id: "nav-home",
        category: "actions",
        label: "Go to Home",
        keywords: ["home", "intro", "hero"],
        icon: <User className="h-4 w-4" />,
        action: () => router.push("/"),
      },
      {
        id: "nav-projects",
        category: "actions",
        label: "View All Projects Gallery",
        keywords: ["projects", "gallery", "portfolio", "code"],
        icon: <Briefcase className="h-4 w-4" />,
        action: () => router.push("/projects"),
      },
      {
        id: "nav-blog",
        category: "actions",
        label: "Read Engineering Blog",
        keywords: ["blog", "writing", "articles"],
        icon: <BookOpen className="h-4 w-4" />,
        action: () => router.push("/blog"),
      },
      {
        id: "nav-contact",
        category: "actions",
        label: "Go to Contact Page",
        keywords: ["contact", "hire", "email", "get in touch"],
        icon: <Mail className="h-4 w-4" />,
        action: () => router.push("/contact"),
      },
    ];

    // External Social Links
    const linkEntries: CommandEntry[] = [
      {
        id: "github",
        category: "links",
        label: "GitHub Profile",
        description: "github.com/muzammilx07",
        keywords: ["github", "code", "repos", "open source"],
        icon: <Github className="h-4 w-4" />,
        action: () => window.open("https://github.com/muzammilx07", "_blank"),
      },
      {
        id: "linkedin",
        category: "links",
        label: "LinkedIn Profile",
        description: "linkedin.com/in/muzammil633",
        keywords: ["linkedin", "network", "career", "experience"],
        icon: <Linkedin className="h-4 w-4" />,
        action: () => window.open("https://www.linkedin.com/in/muzammil633", "_blank"),
      },
      {
        id: "x",
        category: "links",
        label: "X / Twitter Profile",
        description: "@itsShareef63",
        keywords: ["twitter", "x", "social"],
        icon: <ExternalLink className="h-4 w-4" />,
        action: () => window.open("https://x.com/itsShareef63", "_blank"),
      },
    ];

    return [...projectEntries, ...blogEntries, ...actionEntries, ...linkEntries];
  }, [resolvedTheme, router, setTheme]);

  const filteredCommands = useMemo(() => {
    if (activeTab === "all") return allCommands;
    return allCommands.filter((item) => item.category === activeTab);
  }, [activeTab, allCommands]);

  const renderItem = (item: CommandEntry) => (
    <CommandItem
      key={item.id}
      value={`${item.label} ${item.description || ""} ${(item.keywords || []).join(" ")}`}
      onSelect={() => {
        item.action();
        closeWithFocus();
      }}
      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-foreground cursor-pointer transition-colors hover:bg-muted"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-muted-foreground shrink-0">{item.icon}</span>
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-foreground truncate">{item.label}</span>
          {item.description && (
            <span className="text-[11px] text-muted-foreground truncate">{item.description}</span>
          )}
        </div>
      </div>
      <span className="text-[10px] font-mono text-muted-foreground uppercase shrink-0 ml-2">
        {item.category}
      </span>
    </CommandItem>
  );

  return (
    <CommandDialog open={isOpen} onOpenChange={handleOpenChange}>
      <div className="border-b border-divider bg-card">
        <CommandInput placeholder="Type to search projects, articles, actions, or links..." />
        
        {/* Category Tabs Header (ramx.in unique tab filter) */}
        <div className="flex items-center gap-1 px-3 pb-2.5 pt-1 overflow-x-auto text-[11px] font-mono">
          {(["all", "projects", "blog", "actions", "links"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded px-2.5 py-1 capitalize transition-colors cursor-pointer ${
                activeTab === tab
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <CommandList className="max-h-[360px] p-2 bg-card">
        <CommandEmpty className="py-6 text-center text-xs text-muted-foreground">
          No matching items found.
        </CommandEmpty>

        <CommandGroup heading={activeTab === "all" ? "Suggestions" : activeTab.toUpperCase()}>
          {filteredCommands.map(renderItem)}
        </CommandGroup>
      </CommandList>

      <div className="flex items-center justify-between border-t border-divider bg-card px-4 py-2.5 text-xs text-muted-foreground">
        <span className="font-mono text-[10px]">ESC to close · ↑↓ to navigate</span>
        <div className="flex gap-2">
          <kbd className="rounded border border-divider bg-muted/60 px-1.5 py-0.5 text-[10px] text-foreground font-mono">
            ↵ Select
          </kbd>
        </div>
      </div>
    </CommandDialog>
  );
}
