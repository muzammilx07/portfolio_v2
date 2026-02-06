# Portfolio Website - Complete System Design (Optimized)

## 🎯 Core Philosophy
**Performance-First** | **Command-Driven UX** | **Professional Animations** | **Scalable Architecture**

---

## 1. Technology Stack

### Core Framework
- **Next.js 14+** (App Router) - React meta-framework
- **React 18+** - UI library
- **TypeScript** - Type safety & developer experience

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Headless component library
- **GSAP (GreenSock)** - Professional-grade animations
  - **GSAP Core** - Main animation engine
  - **ScrollTrigger** - Scroll-based animations
  - **SplitText** - Advanced text animations (optional)
- **CSS Variables** - Dynamic theming

### State Management
- **Zustand** - Lightweight state management
  - Search state (modal, query, results, filters)
  - UI state (mobile menu, modals, loading states)
  - Page transition state
- **React Context (via next-themes)** - Theme only
  - **Why Context for Theme?**
    - Global accessibility required (all components need theme)
    - next-themes provides SSR-safe implementation out of the box
    - Prevents FOUC (Flash of Unstyled Content)
    - Persists user preference via localStorage
    - Syncs with system preferences
    - Minimal overhead - theme rarely changes
  - **Why NOT Zustand for Theme?**
    - next-themes handles SSR complexity
    - Avoids hydration mismatches
    - Industry standard for Next.js theming

### Search & Data
- **FlexSearch** - Ultra-fast full-text search (better than Fuse.js)
- **MDX** - Markdown with JSX for content
- **gray-matter** - Frontmatter parsing
- **Reading-time** - Estimated read time
- **Command Score** - Command palette ranking algorithm

### Developer Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Husky** - Git hooks
- **lint-staged** - Pre-commit checks

---

## 2. Enhanced Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx                      # Root layout with providers
│   ├── template.tsx                    # Page transition wrapper (GSAP)
│   ├── page.tsx                        # Home page
│   ├── loading.tsx                     # Loading UI
│   ├── error.tsx                       # Error boundary
│   ├── not-found.tsx                   # 404 page
│   │
│   ├── about/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   │
│   ├── projects/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   │
│   ├── blog/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   ├── search/
│   │   │   └── route.ts                # Local content search
│   │   └── command/
│   │       └── route.ts                # Command palette actions
│   │
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                  # Sticky navbar
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx             # Sun/Moon toggle
│   │   ├── CommandPalette.tsx          # 🔥 Main search (Cmd+K)
│   │   ├── MobileMenu.tsx              # Mobile navigation
│   │   └── PageTransition.tsx          # GSAP page transitions
│   │
│   ├── command/                        # 🔥 Command Palette System
│   │   ├── CommandDialog.tsx           # Dialog wrapper
│   │   ├── CommandInput.tsx            # Search input
│   │   ├── CommandList.tsx             # Results list
│   │   ├── CommandGroup.tsx            # Grouped results
│   │   ├── CommandItem.tsx             # Individual result
│   │   ├── CommandEmpty.tsx            # No results state
│   │   ├── CommandLoading.tsx          # Loading state
│   │   └── CommandShortcut.tsx         # Keyboard shortcuts display
│   │
│   ├── animations/                     # 🔥 GSAP Animation Components
│   │   ├── FadeIn.tsx                  # Fade in animation
│   │   ├── SlideIn.tsx                 # Slide in animation
│   │   ├── StaggerChildren.tsx         # Stagger animation
│   │   ├── ScrollReveal.tsx            # Scroll-triggered reveal
│   │   ├── MagneticButton.tsx          # Magnetic hover effect
│   │   ├── SmoothScroll.tsx            # Smooth scroll wrapper
│   │   └── TextReveal.tsx              # Text reveal animation
│   │
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── HeroBackground.tsx          # Animated background
│   │   ├── FeaturedProjects.tsx
│   │   ├── SkillsShowcase.tsx
│   │   ├── RecentBlog.tsx
│   │   └── CTASection.tsx
│   │
│   ├── about/
│   │   ├── Timeline.tsx                # Animated timeline
│   │   ├── TechStack.tsx               # Interactive tech stack
│   │   ├── Achievements.tsx
│   │   └── ProfileCard.tsx
│   │
│   ├── projects/
│   │   ├── ProjectCard.tsx             # Hover effects
│   │   ├── ProjectFilter.tsx           # Filter system
│   │   ├── ProjectGrid.tsx             # Masonry grid
│   │   ├── ProjectGallery.tsx          # Image gallery
│   │   └── TechBadge.tsx               # Tech badges
│   │
│   ├── blog/
│   │   ├── BlogCard.tsx
│   │   ├── BlogGrid.tsx
│   │   ├── TableOfContents.tsx         # Sticky TOC
│   │   ├── BlogHeader.tsx
│   │   ├── ShareButtons.tsx
│   │   └── RelatedPosts.tsx
│   │
│   ├── ui/                             # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx                # Loading skeleton
│   │   └── ...
│   │
│   └── shared/
│       ├── PageHeader.tsx
│       ├── SocialLinks.tsx
│       ├── NewsletterForm.tsx
│       ├── BackToTop.tsx               # Scroll to top
│       └── Breadcrumbs.tsx
│
├── content/
│   ├── blog/
│   │   ├── getting-started.mdx
│   │   ├── nextjs-tips.mdx
│   │   └── ...
│   │
│   ├── projects/
│   │   ├── ecommerce-platform.mdx
│   │   ├── portfolio-site.mdx
│   │   └── ...
│   │
│   └── pages/
│       └── about.mdx                   # Long-form about content
│
├── lib/
│   ├── data/
│   │   ├── personal.ts                 # Personal information
│   │   ├── skills.ts                   # Skills & proficiencies
│   │   ├── experience.ts               # Work experience
│   │   ├── education.ts                # Education history
│   │   ├── social.ts                   # Social links
│   │   └── seo.ts                      # SEO metadata
│   │
│   ├── store/                          # 🔥 Zustand Stores
│   │   ├── searchStore.ts              # Search state
│   │   ├── uiStore.ts                  # UI state
│   │   ├── commandStore.ts             # Command palette state
│   │   └── index.ts
│   │
│   ├── search/                         # 🔥 Search System
│   │   ├── flexsearch-index.ts         # FlexSearch setup
│   │   ├── search-config.ts            # Search configuration
│   │   ├── command-actions.ts          # Command actions registry
│   │   ├── search-filters.ts           # Search filters
│   │   └── ranking.ts                  # Result ranking algorithm
│   │
│   ├── animations/                     # 🔥 GSAP Utilities
│   │   ├── gsap-config.ts              # GSAP configuration
│   │   ├── page-transitions.ts         # Page transition animations
│   │   ├── scroll-animations.ts        # Scroll-based animations
│   │   ├── presets.ts                  # Animation presets
│   │   └── easing.ts                   # Custom easing functions
│   │
│   ├── utils/
│   │   ├── mdx.ts                      # MDX processing
│   │   ├── cn.ts                       # Class name merger
│   │   ├── date.ts                     # Date formatting
│   │   ├── reading-time.ts             # Calculate read time
│   │   ├── slug.ts                     # Slug generation
│   │   └── seo.ts                      # SEO helpers
│   │
│   ├── hooks/
│   │   ├── useGSAP.ts                  # GSAP hook
│   │   ├── useScrollTrigger.ts         # ScrollTrigger hook
│   │   ├── useCommandPalette.ts        # Command palette hook
│   │   ├── useSearch.ts                # Search hook
│   │   ├── useMediaQuery.ts            # Responsive hook
│   │   ├── useLocalStorage.ts          # LocalStorage hook
│   │   └── useKeyboard.ts              # Keyboard shortcuts hook
│   │
│   └── types/
│       ├── blog.ts
│       ├── project.ts
│       ├── search.ts
│       ├── command.ts
│       ├── animation.ts
│       └── common.ts
│
├── providers/
│   ├── ThemeProvider.tsx               # next-themes wrapper
│   ├── GSAPProvider.tsx                # GSAP registration
│   ├── CommandProvider.tsx             # Command palette provider
│   └── index.tsx                       # Combine all providers
│
├── public/
│   ├── images/
│   │   ├── projects/
│   │   ├── blog/
│   │   ├── og/                         # OpenGraph images
│   │   └── avatar.png
│   ├── fonts/                          # Custom fonts (optional)
│   ├── resume.pdf
│   └── robots.txt
│
├── config/
│   ├── site.ts                         # Site metadata
│   ├── navigation.ts                   # Navigation structure
│   ├── search.ts                       # Search configuration
│   ├── commands.ts                     # Command palette commands
│   └── animations.ts                   # Animation settings
│
├── styles/
│   └── gsap.css                        # GSAP-specific styles
│
└── scripts/
    ├── generate-search-index.ts        # Build-time search index
    └── generate-sitemap.ts             # Generate sitemap
```

---

## 3. 🔥 Command Palette System (Like VS Code)

### Features
1. **Keyboard-First Navigation** (Cmd/Ctrl + K)
2. **Multi-Category Search**
   - Pages (Home, About, Projects, Blog, Contact)
   - Blog posts
   - Projects
   - Actions (Theme toggle, scroll to section, etc.)
   - Skills/Technologies
   - Social links
3. **Real-time Fuzzy Search**
4. **Keyboard Navigation** (↑↓ arrows, Enter, Esc)
5. **Recent Searches** (stored in localStorage)
6. **Quick Actions**
   - Change theme
   - Navigate to sections
   - Copy email
   - Download resume
   - Open social links

### Command Palette Structure

```typescript
// lib/types/command.ts
export interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  category: CommandCategory;
  keywords?: string[];
  action: () => void | Promise<void>;
  shortcut?: string[];
  href?: string;
  priority?: number; // For ranking
}

export type CommandCategory = 
  | 'pages'
  | 'blog'
  | 'projects'
  | 'actions'
  | 'sections'
  | 'social';

export interface CommandGroup {
  heading: string;
  commands: Command[];
}
```

### Search Categories

```typescript
// config/commands.ts
export const commandCategories = {
  pages: {
    icon: '📄',
    label: 'Pages',
    priority: 1
  },
  sections: {
    icon: '🔗',
    label: 'Jump to Section',
    priority: 2
  },
  blog: {
    icon: '📝',
    label: 'Blog',
    priority: 3
  },
  projects: {
    icon: '🚀',
    label: 'Projects',
    priority: 4
  },
  actions: {
    icon: '⚡',
    label: 'Actions',
    priority: 5
  },
  social: {
    icon: '🌐',
    label: 'Social',
    priority: 6
  }
} as const;
```

### Example Commands Registry

```typescript
// lib/search/command-actions.ts
import { Command } from '@/lib/types/command';

export const staticCommands: Command[] = [
  // Pages
  {
    id: 'nav-home',
    label: 'Home',
    description: 'Go to home page',
    category: 'pages',
    keywords: ['home', 'index', 'landing'],
    href: '/',
    action: () => router.push('/'),
    priority: 10
  },
  {
    id: 'nav-about',
    label: 'About',
    description: 'Learn more about me',
    category: 'pages',
    keywords: ['about', 'bio', 'info'],
    href: '/about',
    action: () => router.push('/about'),
    priority: 9
  },
  
  // Actions
  {
    id: 'action-theme',
    label: 'Toggle Theme',
    description: 'Switch between light and dark mode',
    category: 'actions',
    keywords: ['theme', 'dark', 'light', 'mode'],
    action: () => toggleTheme(),
    shortcut: ['⌘', 'T'],
    priority: 8
  },
  {
    id: 'action-resume',
    label: 'Download Resume',
    description: 'Download my resume as PDF',
    category: 'actions',
    keywords: ['resume', 'cv', 'download'],
    action: () => window.open('/resume.pdf'),
    priority: 7
  },
  {
    id: 'action-email',
    label: 'Copy Email',
    description: 'Copy email to clipboard',
    category: 'actions',
    keywords: ['email', 'contact', 'copy'],
    action: async () => {
      await navigator.clipboard.writeText('your@email.com');
      toast.success('Email copied!');
    },
    priority: 6
  },
  
  // Sections (for same-page navigation)
  {
    id: 'section-skills',
    label: 'Skills',
    description: 'Jump to skills section',
    category: 'sections',
    keywords: ['skills', 'tech', 'stack'],
    action: () => scrollToSection('skills'),
    priority: 5
  },
  
  // Social
  {
    id: 'social-github',
    label: 'GitHub',
    description: 'Open GitHub profile',
    category: 'social',
    keywords: ['github', 'code', 'repos'],
    action: () => window.open('https://github.com/yourusername'),
    priority: 4
  }
];

// Dynamic commands generated from content
export async function getDynamicCommands(): Promise<Command[]> {
  const [posts, projects] = await Promise.all([
    getAllPosts(),
    getAllProjects()
  ]);
  
  return [
    // Blog posts
    ...posts.map((post, index) => ({
      id: `blog-${post.slug}`,
      label: post.title,
      description: post.description,
      category: 'blog' as const,
      keywords: [post.title, ...post.tags],
      href: `/blog/${post.slug}`,
      action: () => router.push(`/blog/${post.slug}`),
      priority: Math.max(1, 5 - index) // Recent posts rank higher
    })),
    
    // Projects
    ...projects.map((project, index) => ({
      id: `project-${project.slug}`,
      label: project.title,
      description: project.description,
      category: 'projects' as const,
      keywords: [project.title, ...project.tech],
      href: `/projects/${project.slug}`,
      action: () => router.push(`/projects/${project.slug}`),
      priority: Math.max(1, 5 - index)
    }))
  ];
}
```

### Command Palette Component

```typescript
// components/command/CommandPalette.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCommandStore } from '@/lib/store/commandStore';
import { Command } from '@/lib/types/command';
import { staticCommands, getDynamicCommands } from '@/lib/search/command-actions';
import FlexSearch from 'flexsearch';

export function CommandPalette() {
  const router = useRouter();
  const { isOpen, setIsOpen, query, setQuery } = useCommandStore();
  const [commands, setCommands] = useState<Command[]>([]);
  const [results, setResults] = useState<Command[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Initialize commands and search index
  useEffect(() => {
    async function init() {
      const dynamic = await getDynamicCommands();
      const allCommands = [...staticCommands, ...dynamic];
      setCommands(allCommands);
      
      // Create FlexSearch index
      const index = new FlexSearch.Index({
        tokenize: 'forward',
        resolution: 9,
        depth: 3
      });
      
      allCommands.forEach((cmd, i) => {
        const searchText = [
          cmd.label,
          cmd.description,
          ...(cmd.keywords || [])
        ].join(' ');
        index.add(i, searchText);
      });
      
      // Store index for searching
      window.__commandIndex = { index, commands: allCommands };
    }
    
    init();
  }, []);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      // Show recent or top commands
      setResults(commands.slice(0, 10));
      return;
    }

    const { index, commands: allCommands } = window.__commandIndex || {};
    if (!index) return;

    const searchResults = index.search(query);
    const ranked = searchResults
      .map(idx => allCommands[idx])
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
    
    setResults(ranked.slice(0, 10));
    setSelectedIndex(0);
  }, [query, commands]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      if (!isOpen) return;

      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        return;
      }

      // Navigate with arrows
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
      }

      // Execute with Enter
      if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        results[selectedIndex].action();
        setIsOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  if (!isOpen) return null;

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Type a command or search..."
      />
      
      <CommandList>
        {results.length === 0 && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        
        {/* Group by category */}
        {Object.entries(groupByCategory(results)).map(([category, items]) => (
          <CommandGroup key={category} heading={category}>
            {items.map((cmd, index) => (
              <CommandItem
                key={cmd.id}
                selected={index === selectedIndex}
                onSelect={() => {
                  cmd.action();
                  setIsOpen(false);
                }}
              >
                <span>{cmd.label}</span>
                {cmd.description && (
                  <span className="text-muted">{cmd.description}</span>
                )}
                {cmd.shortcut && (
                  <CommandShortcut>{cmd.shortcut}</CommandShortcut>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
```

---

## 4. 🔥 GSAP Animation System

### Why GSAP over Framer Motion?

**GSAP Advantages:**
- ✅ **Performance**: Hardware-accelerated, 20x faster than CSS
- ✅ **Precision**: Frame-perfect animations
- ✅ **ScrollTrigger**: Best-in-class scroll animations
- ✅ **Timeline**: Complex sequence control
- ✅ **Cross-browser**: Works everywhere
- ✅ **File size**: Only load what you need
- ✅ **Professional**: Industry standard (used by Apple, Google, etc.)

**Framer Motion Disadvantages:**
- ❌ Bundle size increases significantly
- ❌ Less performant for complex animations
- ❌ Tightly coupled with React (harder to optimize)
- ❌ Limited scroll animation capabilities

### GSAP Setup

```typescript
// lib/animations/gsap-config.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Global GSAP defaults
gsap.defaults({
  ease: 'power2.out',
  duration: 0.6
});

export { gsap, ScrollTrigger };
```

### Animation Presets

```typescript
// lib/animations/presets.ts
import { gsap } from './gsap-config';

export const animations = {
  fadeIn: (element: HTMLElement, options = {}) => {
    return gsap.from(element, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      ...options
    });
  },

  slideIn: (element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'up') => {
    const directions = {
      left: { x: -100, y: 0 },
      right: { x: 100, y: 0 },
      up: { x: 0, y: 20 },
      down: { x: 0, y: -20 }
    };

    return gsap.from(element, {
      ...directions[direction],
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  },

  stagger: (elements: HTMLElement[], options = {}) => {
    return gsap.from(elements, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      ...options
    });
  },

  scaleIn: (element: HTMLElement) => {
    return gsap.from(element, {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)'
    });
  },

  // Magnetic button effect
  magnetic: (button: HTMLElement, strength: number = 0.5) => {
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }
};
```

### Page Transitions

```typescript
// app/template.tsx
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/animations/gsap-config';

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current) return;

    // Animate in
    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }
    );

    // Cleanup on unmount (animate out)
    return () => {
      if (ref.current) {
        gsap.to(ref.current, {
          opacity: 0,
          y: -20,
          duration: 0.3
        });
      }
    };
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
```

### Scroll Animations Hook

```typescript
// lib/hooks/useScrollTrigger.ts
'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap-config';

export function useScrollTrigger(options: gsap.TweenVars & {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean;
  markers?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const {
      trigger = element,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      markers = false,
      ...tweenVars
    } = options;

    const animation = gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        ...tweenVars,
        scrollTrigger: {
          trigger: typeof trigger === 'string' ? trigger : element,
          start,
          end,
          scrub,
          markers
        }
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  return ref;
}

// Usage:
// const ref = useScrollTrigger({ y: 0, opacity: 1, duration: 1 });
// <div ref={ref}>Animated content</div>
```

### Reusable Animation Components

```typescript
// components/animations/ScrollReveal.tsx
'use client';

import { useScrollTrigger } from '@/lib/hooks/useScrollTrigger';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up' 
}: ScrollRevealProps) {
  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: -50 },
    right: { x: 50 }
  };

  const ref = useScrollTrigger({
    opacity: 1,
    ...directions[direction],
    duration: 0.8,
    delay,
    ease: 'power3.out'
  });

  return <div ref={ref as any}>{children}</div>;
}
```

```typescript
// components/animations/StaggerChildren.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations/gsap-config';

interface StaggerChildrenProps {
  children: React.ReactNode;
  stagger?: number;
}

export function StaggerChildren({ children, stagger = 0.1 }: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.children;
    
    gsap.from(elements, {
      opacity: 0,
      y: 20,
      stagger,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%'
      }
    });
  }, [stagger]);

  return <div ref={ref}>{children}</div>;
}
```

---

## 5. Search Implementation (FlexSearch)

### Why FlexSearch?

**FlexSearch vs Fuse.js:**
- ✅ **10-100x faster** than Fuse.js
- ✅ Smaller bundle size
- ✅ Better memory efficiency
- ✅ More flexible configuration
- ✅ Better ranking algorithm

### FlexSearch Setup

```typescript
// lib/search/flexsearch-index.ts
import FlexSearch from 'flexsearch';
import { Post } from '@/lib/types/blog';
import { Project } from '@/lib/types/project';

export interface SearchableContent {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  type: 'post' | 'project' | 'page';
  url: string;
  date?: string;
}

export function createSearchIndex() {
  const index = new FlexSearch.Document({
    document: {
      id: 'id',
      index: ['title', 'description', 'content', 'tags'],
      store: ['title', 'description', 'type', 'url', 'date']
    },
    tokenize: 'forward',
    resolution: 9,
    depth: 3,
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true
    }
  });

  return index;
}

export async function buildSearchIndex() {
  const index = createSearchIndex();
  
  // Index blog posts
  const posts = await getAllPosts();
  posts.forEach(post => {
    index.add({
      id: `post-${post.slug}`,
      title: post.title,
      description: post.description,
      content: post.content,
      tags: post.tags,
      type: 'post',
      url: `/blog/${post.slug}`,
      date: post.date
    });
  });

  // Index projects
  const projects = await getAllProjects();
  projects.forEach(project => {
    index.add({
      id: `project-${project.slug}`,
      title: project.title,
      description: project.description,
      content: project.content,
      tags: project.tech,
      type: 'project',
      url: `/projects/${project.slug}`,
      date: project.date
    });
  });

  return index;
}

// Client-side search
export function search(index: FlexSearch.Document, query: string, limit = 10) {
  const results = index.search(query, {
    limit,
    suggest: true, // Enable suggestions
    enrich: true   // Return full documents
  });

  // Flatten results from all fields
  const allResults = results.flatMap(result => result.result);
  
  // Remove duplicates and sort by relevance
  const uniqueResults = Array.from(
    new Map(allResults.map(item => [item.id, item])).values()
  );

  return uniqueResults.slice(0, limit);
}
```

### Search API Route

```typescript
// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { buildSearchIndex, search } from '@/lib/search/flexsearch-index';

// Build index at startup
let searchIndex: any;
buildSearchIndex().then(index => {
  searchIndex = index;
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 });
  }

  if (!searchIndex) {
    return NextResponse.json({ error: 'Search not ready' }, { status: 503 });
  }

  const results = search(searchIndex, query, limit);
  
  return NextResponse.json({ results, query });
}
```

---

## 6. Zustand State Management

### Search Store

```typescript
// lib/store/searchStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchState {
  query: string;
  results: any[];
  recentSearches: string[];
  isLoading: boolean;
  setQuery: (query: string) => void;
  setResults: (results: any[]) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  setLoading: (loading: boolean) => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      query: '',
      results: [],
      recentSearches: [],
      isLoading: false,
      
      setQuery: (query) => set({ query }),
      setResults: (results) => set({ results }),
      
      addRecentSearch: (query) => set((state) => ({
        recentSearches: [
          query,
          ...state.recentSearches.filter(q => q !== query)
        ].slice(0, 5) // Keep last 5
      })),
      
      clearRecentSearches: () => set({ recentSearches: [] }),
      setLoading: (loading) => set({ isLoading: loading })
    }),
    {
      name: 'search-storage',
      partialize: (state) => ({ 
        recentSearches: state.recentSearches 
      })
    }
  )
);
```

### Command Palette Store

```typescript
// lib/store/commandStore.ts
import { create } from 'zustand';

interface CommandState {
  isOpen: boolean;
  query: string;
  selectedIndex: number;
  setIsOpen: (open: boolean) => void;
  setQuery: (query: string) => void;
  setSelectedIndex: (index: number) => void;
  reset: () => void;
}

export const useCommandStore = create<CommandState>((set) => ({
  isOpen: false,
  query: '',
  selectedIndex: 0,
  
  setIsOpen: (isOpen) => set({ isOpen }),
  setQuery: (query) => set({ query, selectedIndex: 0 }),
  setSelectedIndex: (selectedIndex) => set({ selectedIndex }),
  
  reset: () => set({ query: '', selectedIndex: 0 })
}));
```

### UI Store

```typescript
// lib/store/uiStore.ts
import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  isScrolled: boolean;
  activeSection: string;
  setMobileMenuOpen: (open: boolean) => void;
  setScrolled: (scrolled: boolean) => void;
  setActiveSection: (section: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isScrolled: false,
  activeSection: '',
  
  setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
  setScrolled: (isScrolled) => set({ isScrolled }),
  setActiveSection: (activeSection) => set({ activeSection })
}));
```

---

## 7. Performance Optimization Strategies

### 1. Code Splitting
```typescript
// Dynamic imports for heavy components
const CommandPalette = dynamic(
  () => import('@/components/command/CommandPalette'),
  { ssr: false }
);

const ThreeJSBackground = dynamic(
  () => import('@/components/ThreeJSBackground'),
  { ssr: false, loading: () => <div>Loading...</div> }
);
```

### 2. Image Optimization
```typescript
// Always use Next.js Image component
import Image from 'next/image';

<Image
  src="/images/project.jpg"
  alt="Project screenshot"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 800px"
/>
```

### 3. Font Optimization
```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono'
});

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### 4. GSAP Performance
```typescript
// Use will-change for animated elements
gsap.set(element, {
  willChange: 'transform, opacity'
});

// Clean up after animation
animation.eventCallback('onComplete', () => {
  gsap.set(element, { clearProps: 'all' });
});

// Kill ScrollTrigger instances
useEffect(() => {
  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, []);
```

### 5. Lazy Loading Content
```typescript
// Lazy load blog posts
import { Suspense } from 'react';

<Suspense fallback={<BlogSkeleton />}>
  <BlogGrid posts={posts} />
</Suspense>
```

### 6. Debounce Search Input
```typescript
// lib/hooks/useDebounce.ts
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage in search
const debouncedQuery = useDebounce(query, 300);

useEffect(() => {
  if (debouncedQuery) {
    performSearch(debouncedQuery);
  }
}, [debouncedQuery]);
```

---

## 8. Page-Specific Designs

### Home Page

```typescript
// app/page.tsx
export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center">
        <ScrollReveal>
          <Hero />
        </ScrollReveal>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-20">
        <StaggerChildren>
          <h2>Featured Projects</h2>
          <ProjectGrid projects={featured} />
        </StaggerChildren>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20">
        <ScrollReveal direction="right">
          <SkillsShowcase />
        </ScrollReveal>
      </section>

      {/* Recent Blog */}
      <section id="blog" className="py-20">
        <StaggerChildren stagger={0.15}>
          <h2>Recent Posts</h2>
          <BlogGrid posts={recent} />
        </StaggerChildren>
      </section>

      {/* CTA */}
      <section className="py-20">
        <ScrollReveal>
          <CTASection />
        </ScrollReveal>
      </section>
    </>
  );
}
```

### Hero Component with GSAP

```typescript
// components/home/Hero.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations/gsap-config';
import { MagneticButton } from '@/components/animations/MagneticButton';

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate title with split text effect
    if (titleRef.current) {
      const chars = titleRef.current.textContent!.split('');
      titleRef.current.innerHTML = chars
        .map(char => `<span class="inline-block">${char}</span>`)
        .join('');

      tl.from(titleRef.current.children, {
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: 'back.out(1.7)'
      });
    }

    // Animate subtitle
    tl.from(subtitleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6
    }, '-=0.4');

    // Animate CTA buttons
    tl.from(ctaRef.current?.children, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6
    }, '-=0.3');

  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 ref={titleRef} className="text-6xl font-bold mb-4">
        Hi, I'm John Doe
      </h1>
      
      <p ref={subtitleRef} className="text-xl text-muted-foreground mb-8">
        Full Stack Developer crafting digital experiences
      </p>

      <div ref={ctaRef} className="flex gap-4">
        <MagneticButton>
          <button className="btn-primary">View My Work</button>
        </MagneticButton>
        
        <MagneticButton>
          <button className="btn-secondary">Contact Me</button>
        </MagneticButton>
      </div>
    </div>
  );
}
```

---

## 9. Updated Package.json

```json
{
  "name": "portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write ."
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-slot": "^1.0.2",
    
    "tailwindcss": "^3.4.0",
    "tailwind-merge": "^2.2.0",
    "clsx": "^2.1.0",
    "class-variance-authority": "^0.7.0",
    
    "gsap": "^3.12.5",
    "zustand": "^4.5.0",
    "flexsearch": "^0.7.43",
    
    "next-themes": "^0.3.0",
    "next-mdx-remote": "^4.4.1",
    "gray-matter": "^4.0.3",
    "rehype-pretty-code": "^0.13.0",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.1.0",
    "remark-gfm": "^4.0.0",
    
    "reading-time": "^1.5.0",
    "date-fns": "^3.3.0",
    "lucide-react": "^0.344.0",
    "react-icons": "^5.0.0",
    
    "sonner": "^1.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    
    "@tailwindcss/typography": "^0.5.10",
    
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.0",
    "prettier-plugin-tailwindcss": "^0.5.11",
    
    "@types/flexsearch": "^0.7.6",
    
    "husky": "^9.0.0",
    "lint-staged": "^15.2.0"
  }
}
```

---

## 10. Final Recommendations

### ✅ Best Practices

1. **Data Strategy**: Use TypeScript for static data + MDX for content
2. **Animations**: Use GSAP for performance + professional results
3. **Search**: Implement command palette for power users
4. **State**: Zustand for UI state, Context only for theme
5. **Performance**: Code split, lazy load, optimize images
6. **Accessibility**: Keyboard navigation, ARIA labels, focus management
7. **SEO**: Dynamic metadata, sitemap, structured data

### 🚀 Development Timeline

**Week 1**: Setup + Core Components + Theme System  
**Week 2**: GSAP Animations + Page Transitions  
**Week 3**: Command Palette + Search System  
**Week 4**: Content Pages (Home, About, Projects)  
**Week 5**: Blog + MDX Setup  
**Week 6**: Polish + Optimization + Deploy  

### 📊 Performance Targets

- **Lighthouse Score**: 95+ (all categories)
- **FCP**: < 1.5s
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **Bundle Size**: < 200KB (initial)

---

This system is optimized for:
✅ **Performance** - GSAP + code splitting + image optimization  
✅ **Developer Experience** - TypeScript + organized structure  
✅ **User Experience** - Command palette + smooth animations  
✅ **Scalability** - Room for growth + modular architecture  
✅ **Maintainability** - Clean code + documentation
