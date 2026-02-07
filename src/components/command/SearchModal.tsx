"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Code2,
  Layers,
  MessageSquare,
  Star,
  User,
} from "lucide-react";
import CommandPalette, { type CommandItem } from "./CommandPalette";

export default function SearchModal() {
  const router = useRouter();

  const commands = useMemo<CommandItem[]>(
    () => [
      {
        id: "portfolio",
        label: "Portfolio",
        description: "Featured work and case studies",
        keywords: ["work", "projects", "featured"],
        icon: <Briefcase className="h-4 w-4" />,
        action: () => router.push("/projects"),
      },
      {
        id: "components",
        label: "Components",
        description: "UI building blocks",
        keywords: ["ui", "library", "design"],
        icon: <Layers className="h-4 w-4" />,
        action: () => router.push("/projects"),
      },
      {
        id: "blog",
        label: "Blog",
        description: "Writing and notes",
        keywords: ["articles", "posts"],
        icon: <Code2 className="h-4 w-4" />,
        action: () => router.push("/blog"),
      },
      {
        id: "about",
        label: "About",
        description: "Background and contact",
        keywords: ["bio", "contact"],
        icon: <User className="h-4 w-4" />,
        action: () => router.push("/contact"),
      },
      {
        id: "testimonials",
        label: "Testimonials",
        description: "Client feedback",
        keywords: ["reviews", "social proof"],
        icon: <Star className="h-4 w-4" />,
        action: () => router.push("/projects"),
      },
      {
        id: "tech-stack",
        label: "Tech Stack",
        description: "Tools and technologies",
        keywords: ["skills", "stack"],
        icon: <MessageSquare className="h-4 w-4" />,
        action: () => router.push("/"),
      },
    ],
    [router],
  );

  return <CommandPalette commands={commands} />;
}
