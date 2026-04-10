import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

const COLS = 32,
  ROWS = 20,
  DOT = 10,
  GAP = 6,
  CELL = DOT + GAP;
const MODES = ["LISTEN", "TIME", "WAVE", "TEXT"];

const FONT = {
  "0": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "10000", "11110", "00001", "00001", "11110"],
  "6": ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
  ":": ["00000", "00100", "00100", "00000", "00100", "00100", "00000"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
  "_": ["00000", "00000", "00000", "00000", "00000", "00000", "11111"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  M: ["10001", "11011", "10101", "10001", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  S: ["01110", "10000", "10000", "01110", "00001", "00001", "11110"],
  I: ["01110", "00100", "00100", "00100", "00100", "00100", "01110"],
};

function getTextDots(text: string, offset: number = 0) {
  const charW = 6;
  const totalW = text.length * charW - 1;
  const startCol = Math.round((COLS - totalW) / 2) + offset;
  const startRow = Math.round((ROWS - 7) / 2);
  const dots = new Set<string>();
  for (let ci = 0; ci < text.length; ci++) {
    const bmp = FONT[text[ci].toUpperCase() as keyof typeof FONT] || FONT[" "];
    for (let py = 0; py < 7; py++) {
      for (let px = 0; px < 5; px++) {
        if (bmp[py][px] === "1") {
          const c = startCol + ci * charW + px;
          const r = startRow + py;
          if (c >= 0 && c < COLS && r >= 0 && r < ROWS) dots.add(`${c},${r}`);
        }
      }
    }
  }
  return dots;
}

interface MatrixDisplayProps {
  showStatus?: boolean;
  showControls?: boolean;
  time?: string;
}

export default function OmniLED({
  showStatus = true,
  showControls = true,
  time,
}: MatrixDisplayProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef("WAVE");
  const modeIdxRef = useRef(0);
  const [modeIdx, setModeIdx] = useState(0);
  const [coord, setCoord] = useState("00,00");
  const [scale, setScale] = useState(1);
  const coordRef = useRef({ col: 0, row: 0 });
  const mouse = useRef({ x: -9999, y: -9999 });
  const timeRef = useRef(time);
  const isInViewRef = useRef(false);
  const modeRotateRef = useRef<NodeJS.Timeout | null>(null);
  const modeStartTimeRef = useRef(Date.now());

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  // Intersection observer for auto-mode rotation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          modeStartTimeRef.current = Date.now();
          // Check mode duration every 500ms
          modeRotateRef.current = setInterval(() => {
            const currentMode = modeRef.current;
            const modeDuration =
              currentMode === "TEXT" ? 8000 : 3000; // 8s for TEXT, 3s for others
            const elapsed = Date.now() - modeStartTimeRef.current;
            if (elapsed >= modeDuration) {
              modeStartTimeRef.current = Date.now();
              changeMode(1);
            }
          }, 500);
        } else {
          // Stop auto-rotate when out of view
          if (modeRotateRef.current) clearInterval(modeRotateRef.current);
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (modeRotateRef.current) clearInterval(modeRotateRef.current);
    };
  }, []);

  const sa = useRef(new Float32Array(COLS * ROWS));
  const dxa = useRef(new Float32Array(COLS * ROWS));
  const dya = useRef(new Float32Array(COLS * ROWS));
  const vxa = useRef(new Float32Array(COLS * ROWS));
  const vya = useRef(new Float32Array(COLS * ROWS));

  const changeMode = (dir: number) => {
    const next = (modeIdxRef.current + dir + MODES.length) % MODES.length;
    modeIdxRef.current = next;
    modeRef.current = MODES[next];
    setModeIdx(next);
  };

  // Calculate scale based on available space
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const baseWidth = COLS * CELL;
      const statusHeight = showStatus ? 30 : 0;
      const controlsHeight = showControls ? 40 : 0;
      const baseHeight = ROWS * CELL + statusHeight + controlsHeight;
      const scaleX = (rect.width - 16) / baseWidth;
      const scaleY = (rect.height - 16) / baseHeight;
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(Math.max(newScale, 0.3));
    };
    calculateScale();
    const timer = setTimeout(calculateScale, 100);
    window.addEventListener("resize", calculateScale);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateScale);
    };
  }, [showStatus, showControls]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const col = Math.max(
        0,
        Math.min(COLS - 1, Math.floor(mouse.current.x / (CELL * scale))),
      );
      const row = Math.max(
        0,
        Math.min(ROWS - 1, Math.floor(mouse.current.y / (CELL * scale))),
      );
      if (col !== coordRef.current.col || row !== coordRef.current.row) {
        coordRef.current = { col, row };
        setCoord(
          `${String(col).padStart(2, "0")},${String(row).padStart(2, "0")}`,
        );
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [scale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx = ctxRaw; // Store non-null ctx
    canvas.width = COLS * CELL;
    canvas.height = ROWS * CELL;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const s = sa.current;
    const dx = dxa.current;
    const dy = dya.current;
    const vx = vxa.current;
    const vy = vya.current;

    let raf: number;

    function drawDot(x: number, y: number, val: number, isDark: boolean) {
      const r = DOT / 2;

      // NON-ACTIVE — tiny dim speck only
      if (val < 0.04) {
        ctx!.beginPath();
        ctx!.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx!.fillStyle = isDark
          ? "rgba(120,120,130,0.48)"
          : "rgba(100,100,120,0.48)";
        ctx!.fill();
        return;
      }

      const alpha = Math.min(val, 1);
      const isStrong = val > 0.75;

      // Dark/light interior
      ctx!.beginPath();
      ctx!.arc(x, y, r, 0, Math.PI * 2);
      ctx!.fillStyle = isDark ? "#1a1a20" : "#f5f5f8";
      ctx!.fill();

      // Outer ring — bright active / dim semi-active
      ctx!.beginPath();
      ctx!.arc(x, y, r, 0, Math.PI * 2);
      ctx!.strokeStyle = isStrong
        ? isDark
          ? `rgba(255,255,255,${alpha})`
          : `rgba(40,60,100,${alpha})`
        : isDark
          ? `rgba(100,120,150,${alpha * 0.8})`
          : `rgba(100,120,160,${alpha * 0.8})`;
      ctx!.lineWidth = isStrong ? 1.8 : 1.2;
      ctx!.stroke();

      // Inner detail ring (active only)
      if (isStrong) {
        ctx!.beginPath();
        ctx!.arc(x, y, r - 2.2, 0, Math.PI * 2);
        ctx!.strokeStyle = isDark
          ? "rgba(50,60,80,0.65)"
          : "rgba(150,160,190,0.65)";
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // Center core
      ctx!.beginPath();
      ctx!.arc(x, y, isStrong ? 2.1 : 1.5, 0, Math.PI * 2);
      ctx!.fillStyle = isStrong
        ? isDark
          ? "rgba(255,255,255,0.76)"
          : "rgba(60,80,120,0.76)"
        : isDark
          ? "rgba(80,100,130,0.32)"
          : "rgba(120,140,180,0.32)";
      ctx!.fill();

      // Pinpoint highlight
      if (isStrong) {
        ctx!.beginPath();
        ctx!.arc(x, y, 0.7, 0, Math.PI * 2);
        ctx!.fillStyle = isDark
          ? "rgba(255,255,255,0.92)"
          : "rgba(30,50,90,0.92)";
        ctx!.fill();
      }
    }

    function animate() {
      // Read theme colors every frame to catch theme changes
      const root = document.documentElement;
      const bgValue = getComputedStyle(root)
        .getPropertyValue("--background")
        .trim();

      // Handle both hex (#f0f0f0) and RGB (rgb(240,240,240)) formats
      let bgColor = bgValue;
      if (bgValue.startsWith("rgb")) {
        // Convert rgb(r,g,b) to hex
        const match = bgValue.match(/\d+/g);
        if (match && match.length >= 3) {
          const hex = (x: string) => parseInt(x).toString(16).padStart(2, "0");
          bgColor = `#${hex(match[0])}${hex(match[1])}${hex(match[2])}`;
        }
      } else if (!bgValue.startsWith("#")) {
        bgColor = `#${bgValue}`;
      }

      const isDark = bgColor.toLowerCase() === "#0a0a0a";

      const t = performance.now() / 1000;
      ctx!.fillStyle = bgColor;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      const m = modeRef.current;

      let timeDots: Set<string> | null = null;
      if (m === "TIME") {
        if (timeRef.current) {
          // Use provided time prop
          timeDots = getTextDots(timeRef.current);
        } else {
          // Fallback to calculating time
          const now = new Date();
          const h = String(now.getHours()).padStart(2, "0");
          const min = String(now.getMinutes()).padStart(2, "0");
          const blink = now.getSeconds() % 2 === 0;
          timeDots = getTextDots(h + (blink ? ":" : " ") + min);
        }
      }

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const i = row * COLS + col;
          const baseX = col * CELL + DOT / 2 + GAP / 2;
          const baseY = row * CELL + DOT / 2 + GAP / 2;
          let target = 0;

          if (m === "WAVE") {
            const wave = Math.sin(col * 0.5 - t * 4);
            const band = Math.abs(row - (ROWS / 2 + wave * 4));
            target = band < 1.2 ? 1 : 0;
          }

          if (m === "LISTEN") {
            const d = Math.hypot(baseX - cx, baseY - cy);
            target = Math.cos(d * 0.12 - t * 4) > 0.7 ? 1 : 0;
          }

          if (m === "TIME") {
            target = timeDots?.has(`${col},${row}`) ? 1 : 0;
          }

          if (m === "TEXT") {
            // LED scrolling text: right to left animation
            const scrollDuration = 8; // Complete scroll in 8 seconds
            const scrollTime = t % scrollDuration;
            const charW = 6;
            const textWidth = "OPEN FOR WORK ".length * charW;
            // Offset moves from COLS (right) to -textWidth (left)
            const scrollOffset = Math.round(COLS - (scrollTime / scrollDuration) * (COLS + textWidth));
            const scrollingDots = getTextDots("OPEN FOR WORK ", scrollOffset);
            target = scrollingDots.has(`${col},${row}`) ? 1 : 0;
          } else {
            // Decay displacement when leaving TEXT mode
            dx[i] *= 0.82;
            dy[i] *= 0.82;
            vx[i] *= 0.82;
            vy[i] *= 0.82;
          }

          s[i] += (target - s[i]) * 0.15;
          drawDot(baseX + dx[i], baseY + dy[i], s[i], isDark);
        }
      }

      raf = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  const W = COLS * CELL * scale;
  const H = ROWS * CELL * scale;
  const mode = MODES[modeIdx];

  return (
    <div
      ref={containerRef}
      className="bg-background"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        width: "100%",
        height: "100%",
        padding: "8px",
        boxSizing: "border-box",
      }}
    >
      {/* Top status */}
      {/* {showStatus && (
        <div
          style={{
            width: W,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10,
            color: "#2e2e44",
            marginBottom: 4,
          }}
        >
          <span>SYSTEM: OMNI-01</span>
          <span>MODE: {mode}</span>
          <span>● LIVE TELEMETRY</span>
        </div>
      )} */}

      {/* LED canvas */}
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: W,
          height: H,
          imageRendering: "pixelated",
          maxHeight: "12rem",
        }}
      />

      {/* Bottom status */}
      {/* {showStatus && (
        <div
          style={{
            width: W,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10,
            color: "#2e2e44",
            marginTop: 4,
          }}
        >
          <span>COORD: {coord}</span>
          <span>FREQUENCY: 44.1KHZ</span>
          <span>MEM: 8.42GB</span>
        </div>
      )} */}

      {/* Arrow navigation */}
      {showControls && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 12,
          }}
        >
          <Button variant="secondary" onClick={() => changeMode(-1)}>
            ‹
          </Button>
          <span
            style={{
              fontSize: 11,
              color: "var(--muted-foreground)",
              letterSpacing: 3,
              minWidth: 56,
              textAlign: "center",
            }}
          >
            {mode}
          </span>
          <Button variant="secondary" onClick={() => changeMode(1)}>
            ›
          </Button>
        </div>
      )}
    </div>
  );
}
