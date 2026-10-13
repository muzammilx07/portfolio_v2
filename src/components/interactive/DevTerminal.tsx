"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  Terminal as TerminalIcon,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface CommandOutput {
  id: string;
  command: string;
  timestamp: string;
  content: React.ReactNode;
}

const SUGGESTED_CHIPS = [
  { label: "skills", desc: "Tech stack & tools" },
  { label: "projects", desc: "Selected builds" },
  { label: "experience", desc: "Background & roles" },
  { label: "about", desc: "Engineering ethos" },
  { label: "contact", desc: "Get in touch" },
  { label: "sudo hire", desc: "Priority dispatch" },
];

function playKeyClack(isMuted: boolean) {
  if (isMuted || typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    // High-frequency subtle mechanical switch tactile snap
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.035);
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {}
}

export default function DevTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, setTheme } = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setHistory([
      {
        id: "init",
        command: "welcome",
        timestamp: timeStr,
        content: (
          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="inline-block size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold tracking-wider">
                MUZAMMIL-SHELL v2.4 // READY
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Interactive portfolio CLI. Type any command or click a chip below to explore my work, tech stack, and background.
            </p>
            <div className="text-[11px] text-muted-foreground/75">
              Tips: Try typing <span className="text-foreground underline underline-offset-2">skills</span>, <span className="text-foreground underline underline-offset-2">projects</span>, or <span className="text-emerald-400">sudo hire</span>. [Tab] auto-completes.
            </div>
          </div>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    if (history.length > 1 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    if (!raw) return;

    playKeyClack(isMuted);
    const normalized = raw.toLowerCase();
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newHistoryEntryId = Math.random().toString(36).substring(2, 9);

    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    if (normalized === "clear" || normalized === "cls") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let resultNode: React.ReactNode;

    switch (normalized) {
      case "help":
      case "?":
        resultNode = (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="text-foreground font-semibold">Available Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground pt-1">
              <div><span className="text-emerald-400 font-semibold">skills</span> - Core stack & technical proficiencies</div>
              <div><span className="text-emerald-400 font-semibold">projects</span> - Active builds & featured repositories</div>
              <div><span className="text-emerald-400 font-semibold">experience</span> - Roles, timeline & achievements</div>
              <div><span className="text-emerald-400 font-semibold">about</span> - Background & engineering philosophy</div>
              <div><span className="text-emerald-400 font-semibold">contact</span> - Email, socials & direct channels</div>
              <div><span className="text-emerald-400 font-semibold">theme</span> - Toggle light/dark interface</div>
              <div><span className="text-emerald-400 font-semibold">telemetry</span> - View OMNI-01 canvas on /contact</div>
              <div><span className="text-emerald-400 font-semibold">date</span> - Current Hyderabad local time</div>
              <div><span className="text-emerald-400 font-semibold">clear</span> - Clear terminal session</div>
              <div><span className="text-amber-400 font-semibold">sudo hire</span> - Direct priority dispatch</div>
            </div>
          </div>
        );
        break;

      case "skills":
      case "stack":
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <span>TECHNICAL STACK & COMPETENCIES</span>
            </div>
            <div className="space-y-1.5 text-muted-foreground pt-1">
              <div>
                <span className="text-emerald-400 font-medium">Languages:</span>{" "}
                JavaScript (ES6+), TypeScript, Python, Java, SQL, HTML5/CSS3.
              </div>
              <div>
                <span className="text-emerald-400 font-medium">Frameworks & UI:</span>{" "}
                React.js, Next.js (App Router), FastAPI, Spring Boot, Node.js, Express.js, Tailwind CSS, WebGL.
              </div>
              <div>
                <span className="text-emerald-400 font-medium">GenAI & ML:</span>{" "}
                LLM Workflows, OpenAI API, Gemini API, Prompt Pipelines, scikit-learn, XGBoost, Isolation Forest.
              </div>
              <div>
                <span className="text-emerald-400 font-medium">Databases & ORM:</span>{" "}
                PostgreSQL, MongoDB, Firebase, Prisma ORM, SQLAlchemy, Hibernate/JPA.
              </div>
              <div>
                <span className="text-emerald-400 font-medium">Core & Systems:</span>{" "}
                Data Structures & Algorithms (300+ Solved), Microservices Architecture, RESTful APIs, WebSockets.
              </div>
              <div>
                <span className="text-emerald-400 font-medium">DevOps & Tooling:</span>{" "}
                Git, GitHub, Docker, Turbopack, Vite, Postman, Maven, Linux, Vercel.
              </div>
            </div>
          </div>
        );
        break;

      case "projects":
      case "work":
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-foreground font-semibold">FEATURED PROJECTS:</div>
            <div className="space-y-2 pt-1">
              <div className="border-l-2 border-emerald-500/60 pl-2.5">
                <Link
                  href="/projects/ai-soc"
                  className="text-foreground hover:text-emerald-400 font-medium inline-flex items-center gap-1 group"
                >
                  <span>01. AI SOC Platform // Security Operations Center</span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <div className="text-muted-foreground text-[11px]">
                  Real-time WebSocket event monitoring with XGBoost threat scoring on CICIDS.
                </div>
              </div>

              <div className="border-l-2 border-emerald-500/60 pl-2.5">
                <Link
                  href="/projects/missing-tracker-person"
                  className="text-foreground hover:text-emerald-400 font-medium inline-flex items-center gap-1 group"
                >
                  <span>02. AI/ML-Based Missing Person Tracking System</span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <div className="text-muted-foreground text-[11px]">
                  AI face matching pipeline with image embeddings and Leaflet geospatial police routing.
                </div>
              </div>

              <div className="border-l-2 border-emerald-500/60 pl-2.5">
                <Link
                  href="/projects/feedbackflow"
                  className="text-foreground hover:text-emerald-400 font-medium inline-flex items-center gap-1 group"
                >
                  <span>03. FeedbackFlow // Widget-Based Platform</span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <div className="text-muted-foreground text-[11px]">
                  Embeddable JS widget API with unique project keys, NextAuth JWT sessions & Prisma ORM.
                </div>
              </div>
            </div>
            <div className="text-[11px] text-muted-foreground/75 pt-1">
              Tip: Click any project title to open its detailed case study.
            </div>
          </div>
        );
        break;

      case "experience":
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-foreground font-semibold">WORK EXPERIENCE:</div>
            <div className="space-y-2.5 text-muted-foreground pt-1">
              <div className="border-l-2 border-emerald-500/60 pl-2.5 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="text-foreground font-medium">Frontend Developer Intern</span>
                    <span className="text-emerald-400"> @ Blackbuck</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground/70">Jan 2026 — Mar 2026</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Shipped responsive React.js interfaces for 3 AI/ML features via FastAPI with sub-200ms latency, removing manual review steps for ops.
                </p>
              </div>

              <div className="border-l-2 border-border pl-2.5 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="text-foreground font-medium">Frontend Developer (UI/UX)</span>
                    <span className="text-muted-foreground"> @ Zatokshi Ventures</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground/70">Sep 2024 — Feb 2025</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Engineered React interfaces cutting turnaround by 40%, integrated 3D WebGL components, and achieved 30% faster page loads via code splitting.
                </p>
              </div>
            </div>
          </div>
        );
        break;

      case "about":
      case "cat about.md":
        resultNode = (
          <div className="space-y-1.5 text-xs font-mono leading-relaxed text-muted-foreground">
            <div className="text-foreground font-semibold">ABOUT MOHAMMED MUZAMMIL SHAREEF:</div>
            <p>
              Software engineer & CS graduate from Hyderabad, India. I specialize in craft-driven web engineering, Generative AI & LLM workflows, and distributed backend services.
            </p>
            <p>
              My work bridges responsive, tactile interface ergonomics (React, Next.js, Framer Motion) with high-throughput backend services (FastAPI, Python, Java microservices) and intelligent model pipelines.
            </p>
          </div>
        );
        break;

      case "contact":
      case "email":
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-foreground font-semibold">DIRECT CHANNELS:</div>
            <div className="space-y-1 text-muted-foreground pt-1">
              <div>
                Email:{" "}
                <a
                  href="mailto:muzammilxshareef@gmail.com"
                  className="text-emerald-400 hover:underline"
                >
                  muzammilxshareef@gmail.com
                </a>
              </div>
              <div>
                GitHub:{" "}
                <a
                  href="https://github.com/muzammilx07"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:underline"
                >
                  github.com/muzammilx07
                </a>
              </div>
              <div>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/muzammil633"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:underline"
                >
                  linkedin.com/in/muzammil633
                </a>
              </div>
              <div>
                X (Twitter):{" "}
                <a
                  href="https://x.com/itsShareef63"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:underline"
                >
                  @itsShareef63
                </a>
              </div>
            </div>
          </div>
        );
        break;

      case "sudo hire":
      case "hire":
        resultNode = (
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Sparkles className="size-3.5 animate-spin" />
              <span>[AUTHENTICATION GRANTED] PRIORITY RECRUITMENT DISPATCH</span>
            </div>
            <p className="text-foreground/90 leading-relaxed text-[11px]">
              Ready to create something exceptional. I am currently open to high-impact Frontend, Full-Stack, and Product Engineering roles or select contract collaborations.
            </p>
            <div className="pt-1">
              <a
                href="mailto:muzammilxshareef@gmail.com?subject=Opportunity%20Discussion%20-%20Muzammil%20Shareef"
                className="inline-flex items-center gap-1.5 rounded bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-zinc-950 transition-transform active:scale-95 hover:bg-emerald-400"
              >
                <span>Initiate Conversation (muzammilxshareef@gmail.com)</span>
                <ArrowRight className="size-3" />
              </a>
            </div>
          </div>
        );
        break;

      case "theme":
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        resultNode = (
          <div className="text-xs font-mono text-emerald-400">
            Interface theme switched to: <span className="font-semibold uppercase">{nextTheme}</span>
          </div>
        );
        break;

      case "date":
      case "time":
        resultNode = (
          <div className="text-xs font-mono text-muted-foreground">
            Current Location: Hyderabad, IN (IST, UTC+5:30)
            <br />
            System Timestamp: <span className="text-foreground font-semibold">{new Date().toString()}</span>
          </div>
        );
        break;

      case "matrix":
      case "telemetry":
        resultNode = (
          <div className="text-xs font-mono space-y-1">
            <div className="text-muted-foreground">
              [TELEMETRY CONSOLE]: Relocated to the dedicated signal hub on the contact page.
            </div>
            <Link
              href="/contact"
              className="text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Navigate to /contact to view OMNI-01 canvas</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>
        );
        break;

      default:
        resultNode = (
          <div className="text-xs font-mono text-red-400">
            command not found: <span className="text-foreground">{raw}</span>. Type{" "}
            <button
              type="button"
              onClick={() => executeCommand("help")}
              className="text-emerald-400 underline underline-offset-2 cursor-pointer"
            >
              help
            </button>{" "}
            or select a suggestion chip.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: newHistoryEntryId,
        command: raw,
        timestamp: timeStr,
        content: resultNode,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex] || "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.toLowerCase().trim();
      if (!current) return;
      const match = SUGGESTED_CHIPS.map((c) => c.label).find((cmd) =>
        cmd.startsWith(current)
      );
      if (match) {
        setInputVal(match);
      }
    }
  };

  const copyEntry = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div
      className={`group relative flex flex-col rounded-xl border border-divider bg-card/80 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-border ${
        isExpanded ? "min-h-[420px]" : "min-h-[290px]"
      }`}
    >
      {/* Chrome Header */}
      <div className="flex items-center justify-between border-b border-divider px-3.5 py-2.5 text-[11px] font-mono text-muted-foreground select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setHistory([])}
              className="size-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"
              title="Clear terminal"
            />
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="size-2.5 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer"
              title={isExpanded ? "Collapse height" : "Expand height"}
            />
            <button
              type="button"
              onClick={() => executeCommand("sudo hire")}
              className="size-2.5 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer"
              title="Execute hire Easter egg"
            />
          </div>
          <span className="text-foreground/75 font-semibold tracking-wide ml-1.5 flex items-center gap-1.5">
            <TerminalIcon className="size-3 text-emerald-400" />
            muzammil@portfolio ~ zsh
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer active:scale-95"
            title={isMuted ? "Unmute mechanical keyboard sound" : "Mute sound"}
          >
            {isMuted ? (
              <VolumeX className="size-3 text-muted-foreground" />
            ) : (
              <Volume2 className="size-3 text-emerald-400" />
            )}
            <span>{isMuted ? "SFX: OFF" : "SFX: ON"}</span>
          </button>

          <button
            type="button"
            onClick={() => setHistory([])}
            className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer active:scale-95"
            title="Reset terminal"
          >
            <RotateCcw className="size-3" />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {/* Suggested Command Chips */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-divider/60 bg-muted/30 px-3 py-2 text-[10px] font-mono">
        <span className="text-muted-foreground/70 mr-1 select-none">Quick:</span>
        {SUGGESTED_CHIPS.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => executeCommand(chip.label)}
            className="rounded-md border border-divider/80 bg-background/80 px-2 py-0.5 text-foreground/85 transition-all hover:border-emerald-500/50 hover:bg-muted hover:text-foreground active:scale-95 cursor-pointer shadow-2xs"
            title={chip.desc}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Terminal Output Stream */}
      <div
        ref={scrollContainerRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[380px] font-mono cursor-text"
      >
        {history.map((entry) => (
          <div key={entry.id} className="space-y-1.5 group/item">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground/75">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-semibold">$</span>
                <span className="text-foreground font-medium">{entry.command}</span>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                <span className="text-[9px] text-muted-foreground/60">{entry.timestamp}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyEntry(entry.id, entry.command);
                  }}
                  className="p-0.5 text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Copy command"
                >
                  {copiedId === entry.id ? (
                    <Check className="size-3 text-emerald-400" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                </button>
              </div>
            </div>
            <div className="pl-3.5">{entry.content}</div>
          </div>
        ))}

        {/* Live Input Line */}
        <div className="flex items-center gap-2 pt-1 text-xs font-mono">
          <span className="text-emerald-400 font-semibold select-none">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/40 focus:outline-none font-mono text-xs"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between border-t border-divider/60 px-3.5 py-2 text-[10px] font-mono text-muted-foreground/60 select-none">
        <span>PRESS [ENTER] TO RUN · [TAB] TO AUTOCOMPLETE</span>
        <span className="text-emerald-500/80 flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
          ACTIVE NODE
        </span>
      </div>
    </div>
  );
}

