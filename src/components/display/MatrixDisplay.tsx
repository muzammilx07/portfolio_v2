"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const COLS = 32,
  ROWS = 18,
  DOT = 9,
  GAP = 5,
  CELL = DOT + GAP;

export const MATRIX_MODES = [
  "CAT",
  "SPECTRUM",
  "LIFE",
  "RADAR",
  "TIME",
] as const;
export type MatrixMode = (typeof MATRIX_MODES)[number];

const FONT: Record<string, string[]> = {
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
};

function getTextDots(text: string) {
  const charW = 6;
  const totalW = text.length * charW - 1;
  const startCol = Math.round((COLS - totalW) / 2);
  const startRow = Math.round((ROWS - 7) / 2);
  const dots = new Set<string>();
  for (let ci = 0; ci < text.length; ci++) {
    const bmp = FONT[text[ci]] || FONT[" "];
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

function playSynthesizedMeowOrChirp(frequency = 520, isMuted = false) {
  if (isMuted) return;
  try {
    const ctx = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    )();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    // Playful 8-bit meow frequency sweep
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      frequency * 1.5,
      ctx.currentTime + 0.06,
    );
    osc.frequency.exponentialRampToValueAtTime(
      frequency * 0.9,
      ctx.currentTime + 0.18,
    );
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  } catch {}
}

export default function OmniLED() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<MatrixMode>("CAT");
  const [activeMode, setActiveMode] = useState<MatrixMode>("CAT");
  const [scale, setScale] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [catStatus, setCatStatus] = useState<
    "Curious" | "Purring" | "Sleeping" | "Happy"
  >("Curious");
  const isVisibleRef = useRef(true);
  const mouse = useRef({ x: -9999, y: -9999 });
  const lastMouseMoveTime = useRef(Date.now());
  const bounceY = useRef(0);
  const heartFloat = useRef<{
    active: boolean;
    row: number;
    col: number;
    progress: number;
  }>({
    active: false,
    row: 0,
    col: 0,
    progress: 0,
  });

  // Conway Game of Life grid
  const lifeGrid = useRef<Uint8Array>(new Uint8Array(COLS * ROWS));
  const lifeNext = useRef<Uint8Array>(new Uint8Array(COLS * ROWS));
  const lifeLastTick = useRef(0);

  const sa = useRef(new Float32Array(COLS * ROWS));

  const seedLife = () => {
    const g = lifeGrid.current;
    for (let i = 0; i < g.length; i++) {
      g[i] = Math.random() > 0.78 ? 1 : 0;
    }
  };

  useEffect(() => {
    seedLife();
  }, []);

  const setMode = (m: MatrixMode) => {
    modeRef.current = m;
    setActiveMode(m);
    playSynthesizedMeowOrChirp(
      m === "CAT" ? 540 : m === "LIFE" ? 720 : 640,
      isMuted,
    );
    if (m === "LIFE") seedLife();
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const baseWidth = COLS * CELL;
      const scaleX = (rect.width - 24) / baseWidth;
      setScale(Math.min(Math.max(scaleX, 0.45), 1));
    };
    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      lastMouseMoveTime.current = Date.now();
    };

    const onDown = () => {
      playSynthesizedMeowOrChirp(680, isMuted);
      bounceY.current = -2; // Cat jump bounce!
      lastMouseMoveTime.current = Date.now();

      if (modeRef.current === "CAT") {
        setCatStatus("Happy");
        heartFloat.current = {
          active: true,
          row: 5,
          col: 16,
          progress: 0,
        };
      } else if (modeRef.current === "LIFE") {
        seedLife();
      }
    };

    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mousedown", onDown);
      canvas.addEventListener("mouseleave", onLeave);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener("mousemove", onMove);
        canvas.removeEventListener("mousedown", onDown);
        canvas.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [isMuted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = COLS * CELL;
    canvas.height = ROWS * CELL;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const s = sa.current;
    let raf: number;

    function drawDot(x: number, y: number, val: number, isDark: boolean) {
      const r = DOT / 2;

      if (val < 0.04) {
        ctx!.beginPath();
        ctx!.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx!.fillStyle = isDark
          ? "rgba(255, 255, 255, 0.12)"
          : "rgba(0, 0, 0, 0.12)";
        ctx!.fill();
        return;
      }

      const alpha = Math.min(val, 1);
      const isStrong = val > 0.7;

      ctx!.beginPath();
      ctx!.arc(x, y, r, 0, Math.PI * 2);
      ctx!.fillStyle = isDark ? "#1c1c22" : "#f0f0f5";
      ctx!.fill();

      ctx!.beginPath();
      ctx!.arc(x, y, r, 0, Math.PI * 2);
      ctx!.strokeStyle = isStrong
        ? isDark
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(18, 18, 20, ${alpha})`
        : isDark
          ? `rgba(255, 255, 255, ${alpha * 0.4})`
          : `rgba(18, 18, 20, ${alpha * 0.4})`;
      ctx!.lineWidth = isStrong ? 1.4 : 1;
      ctx!.stroke();

      ctx!.beginPath();
      ctx!.arc(x, y, isStrong ? 2.3 : 1.5, 0, Math.PI * 2);
      ctx!.fillStyle = isStrong
        ? isDark
          ? "rgba(255, 255, 255, 0.98)"
          : "rgba(18, 18, 20, 0.98)"
        : isDark
          ? "rgba(255, 255, 255, 0.45)"
          : "rgba(18, 18, 20, 0.45)";
      ctx!.fill();
    }

    function stepLife() {
      const g = lifeGrid.current;
      const next = lifeNext.current;
      let liveCount = 0;

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          let neighbors = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const nr = (r + dr + ROWS) % ROWS;
              const nc = (c + dc + COLS) % COLS;
              if (g[nr * COLS + nc] === 1) neighbors++;
            }
          }
          const idx = r * COLS + c;
          if (g[idx] === 1) {
            next[idx] = neighbors === 2 || neighbors === 3 ? 1 : 0;
          } else {
            next[idx] = neighbors === 3 ? 1 : 0;
          }
          if (next[idx] === 1) liveCount++;
        }
      }

      lifeGrid.current.set(next);
      if (liveCount < 10) seedLife();
    }

    function animate() {
      if (!isVisibleRef.current) {
        raf = requestAnimationFrame(animate);
        return;
      }
      const isDark = document.documentElement.classList.contains("dark");
      const t = performance.now() / 1000;

      // Settle jump bounce back to 0
      bounceY.current *= 0.88;
      if (Math.abs(bounceY.current) < 0.05) bounceY.current = 0;

      ctx!.fillStyle = isDark ? "#141418" : "#f7f7fa";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      const m = modeRef.current;

      if (m === "LIFE" && performance.now() - lifeLastTick.current > 180) {
        stepLife();
        lifeLastTick.current = performance.now();
      }

      let timeDots: Set<string> | null = null;
      if (m === "TIME") {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, "0");
        const min = String(now.getMinutes()).padStart(2, "0");
        const blink = now.getSeconds() % 2 === 0;
        timeDots = getTextDots(`${h}${blink ? ":" : " "}${min}`);
      }

      const mx = mouse.current.x / scale;
      const my = mouse.current.y / scale;
      const isMouseActive = mouse.current.x > 0;
      const idleTime = Date.now() - lastMouseMoveTime.current;
      const isDozing = idleTime > 6000;

      // Mouse distance to center of cat
      const catCenterX = 16 * CELL;
      const catCenterY = (9 + bounceY.current) * CELL;
      const distToCat = Math.hypot(mx - catCenterX, my - catCenterY);
      const isPetting = isMouseActive && distToCat < 60;

      // Update cat status label
      if (m === "CAT") {
        if (isPetting) setCatStatus("Purring");
        else if (isDozing) setCatStatus("Sleeping");
        else setCatStatus("Curious");
      }

      // Precalculate dynamic eye tracking pupil shifts
      let pupilShiftX = 0;
      let pupilShiftY = 0;
      if (isMouseActive && !isDozing) {
        pupilShiftX = Math.min(
          Math.max(Math.round((mx - catCenterX) / 45), -1),
          1,
        );
        pupilShiftY = Math.min(
          Math.max(Math.round((my - catCenterY) / 35), -1),
          1,
        );
      }

      // Periodic blink calculation
      const blinkCycle = t % 4.2;
      const isBlinking = !isDozing && blinkCycle > 4.05;

      // Tail wave speed (wags excitedly when petting)
      const tailFreq = isPetting ? 6.5 : isDozing ? 1.0 : 3.0;
      const tailWag = Math.sin(t * tailFreq);

      // Heart floating animation
      if (heartFloat.current.active) {
        heartFloat.current.progress += 0.05;
        if (heartFloat.current.progress > 1) {
          heartFloat.current.active = false;
        }
      }

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const i = row * COLS + col;
          const baseX = col * CELL + DOT / 2 + GAP / 2;
          const baseY = (row + bounceY.current) * CELL + DOT / 2 + GAP / 2;
          let target = 0;

          // ==========================================
          // 1. MARQUEE MODE: INTERACTIVE DOT-MATRIX CAT
          // ==========================================
          if (m === "CAT") {
            // 1. Pointy Triangular Ears with Inner Depth
            const isLeftEarTip = row === 2 && (col === 10 || col === 11);
            const isRightEarTip = row === 2 && (col === 20 || col === 21);
            const isLeftEar =
              (row === 3 && col >= 9 && col <= 12) ||
              (row === 4 && col >= 8 && col <= 12);
            const isRightEar =
              (row === 3 && col >= 19 && col <= 22) ||
              (row === 4 && col >= 19 && col <= 23);
            const isLeftInnerEar =
              (row === 3 && col === 10) ||
              (row === 4 && (col === 10 || col === 11));
            const isRightInnerEar =
              (row === 3 && col === 21) ||
              (row === 4 && (col === 20 || col === 21));

            if (isLeftInnerEar || isRightInnerEar) {
              target = 0.22;
            } else if (
              isLeftEarTip ||
              isRightEarTip ||
              isLeftEar ||
              isRightEar
            ) {
              target = 0.85;
            }

            // 2. Forehead & Crown
            if (row === 4 && col >= 12 && col <= 19) target = 0.85;
            if (row === 5 && col >= 7 && col <= 24) target = 0.82;

            // 3. Whiskers (Sharp, unmistakable `=^.^=`)
            const isLeftWhiskerTop = row === 6 && col >= 2 && col <= 5;
            const isLeftWhiskerBot = row === 8 && col >= 1 && col <= 5;
            const isRightWhiskerTop = row === 6 && col >= 26 && col <= 29;
            const isRightWhiskerBot = row === 8 && col >= 26 && col <= 30;
            if (
              isLeftWhiskerTop ||
              isLeftWhiskerBot ||
              isRightWhiskerTop ||
              isRightWhiskerBot
            ) {
              target = 0.95;
            }

            // 4. Eyes Sockets (Left: 11..14, Right: 17..20, Rows: 6..7)
            const isLeftEye =
              col >= 11 && col <= 14 && (row === 6 || row === 7);
            const isRightEye =
              col >= 17 && col <= 20 && (row === 6 || row === 7);

            if (isLeftEye || isRightEye) {
              if (isDozing) {
                // Sleeping closed eye slits
                if (
                  row === 7 &&
                  ((col >= 11 && col <= 14) || (col >= 17 && col <= 20))
                ) {
                  target = 0.9;
                } else {
                  target = 0.08;
                }
              } else if (isPetting) {
                // Adorable happy smiling cat eyes ^ ^
                const isHappyArc =
                  (row === 6 &&
                    (col === 12 || col === 13 || col === 18 || col === 19)) ||
                  (row === 7 &&
                    (col === 11 || col === 14 || col === 17 || col === 20));
                target = isHappyArc ? 1.0 : 0.08;
              } else if (isBlinking) {
                // Blinking slit
                if (
                  row === 7 &&
                  ((col >= 11 && col <= 14) || (col >= 17 && col <= 20))
                ) {
                  target = 0.88;
                } else {
                  target = 0.08;
                }
              } else {
                // Awake pupil tracking: big 2x2 pupils track the mouse!
                const pLeft = 12 + pupilShiftX;
                const pRight = 18 + pupilShiftX;
                const pRow = 6 + (pupilShiftY > 0 ? 1 : 0);
                const isPupil =
                  (row === pRow ||
                    (pRow === 6 && row === 7 && pupilShiftY === 0)) &&
                  ((col >= pLeft && col <= pLeft + 1) ||
                    (col >= pRight && col <= pRight + 1));
                target = isPupil ? 1.0 : 0.15;
              }
            }

            // 5. Cheeks & Face Outline
            if (
              (row === 6 || row === 7) &&
              col >= 7 &&
              col <= 24 &&
              !isLeftEye &&
              !isRightEye
            ) {
              target = 0.8;
            }
            if (row === 8 && col >= 7 && col <= 24) target = 0.8;
            if (row === 9 && col >= 8 && col <= 23) target = 0.8;
            if (row === 10 && col >= 9 && col <= 22) target = 0.8;

            // 6. Nose
            if (row === 8 && (col === 15 || col === 16)) target = 1.0;

            // 7. Cute Mouth :3
            if (row === 9 && (col === 14 || col === 17)) target = 0.92;
            if (row === 9 && (col === 15 || col === 16)) target = 0.98;
            if (row === 10 && (col === 13 || col === 18)) target = 0.75;

            // 8. Seated Body & Chest Fur
            if (row >= 11 && row <= 14) {
              if (col >= 14 && col <= 17) {
                target = 0.45; // chest highlight
              } else {
                const margin = row === 11 ? 9 : row === 12 ? 8 : 7;
                if (col >= margin && col <= 31 - margin) {
                  target = 0.75;
                }
              }
            }

            // 9. Paws & Base Ledge
            const isLeftPaw =
              (row === 15 || row === 16) && col >= 10 && col <= 13;
            const isRightPaw =
              (row === 15 || row === 16) && col >= 18 && col <= 21;
            if (isLeftPaw || isRightPaw) {
              if (
                row === 16 &&
                (col === 11 || col === 12 || col === 19 || col === 20)
              ) {
                target = 0.35; // toe claw separation slit
              } else {
                target = 0.95; // bright cute paws
              }
            } else if ((row === 15 || row === 16) && col >= 6 && col <= 25) {
              target = 0.72;
            }

            // 10. Animated Wagging Tail
            const tailTipCol = Math.round(27 + tailWag);
            if (row === 10 && col >= tailTipCol - 1 && col <= tailTipCol + 1)
              target = 0.9;
            if (row === 11 && col >= tailTipCol - 1 && col <= tailTipCol + 1)
              target = 0.85;
            if (row === 12 && col >= 27 && col <= 29) target = 0.82;
            if (row === 13 && col >= 26 && col <= 28) target = 0.8;
            if (row === 14 && col >= 25 && col <= 27) target = 0.78;

            // 11. Breathing Motion when Sleeping
            if (isDozing && row >= 11 && row <= 14 && target > 0) {
              const breath = Math.sin(t * 2.2) * 0.12;
              target = Math.min(Math.max(target + breath, 0.2), 0.95);
            }

            // 12. Floating Pixel Heart on Click / Meow
            if (heartFloat.current.active) {
              const hRowCenter = Math.round(
                5 - heartFloat.current.progress * 6,
              );
              const hColCenter = 16;
              const dR = row - hRowCenter;
              const dC = col - hColCenter;
              const isHeartPixel =
                (dR === -1 && (dC === -1 || dC === 1)) ||
                (dR === 0 && Math.abs(dC) <= 2) ||
                (dR === 1 && Math.abs(dC) <= 1) ||
                (dR === 2 && dC === 0);

              if (isHeartPixel) {
                target = Math.max(
                  target,
                  1 - heartFloat.current.progress * 0.6,
                );
              }
            }

            // 13. Sleepy 'Z' when Dozing
            if (isDozing) {
              const zCycle = (t * 0.75) % 3;
              const zRow = Math.round(5 - zCycle * 1.5);
              const zCol = Math.round(23 + zCycle * 0.8);
              if (
                (row === zRow && (col === zCol || col === zCol + 1)) ||
                (row === zRow + 1 && col === zCol) ||
                (row === zRow + 2 && (col === zCol || col === zCol + 1))
              ) {
                target = Math.max(target, 0.8 * (1 - zCycle / 3));
              }
            }
          }

          // 2. SPECTRUM MODE
          if (m === "SPECTRUM") {
            const freq = Math.sin(col * 0.35 + t * 4) * 0.5 + 0.5;
            const barHeight = Math.floor(freq * 12 + Math.sin(t * 7 + col) * 2);
            const invertedRow = ROWS - 1 - row;
            if (invertedRow <= barHeight) {
              target = 1;
            } else if (invertedRow === barHeight + 1) {
              target = 0.5;
            }
          }

          // 3. CONWAY'S GAME OF LIFE
          if (m === "LIFE") {
            target = lifeGrid.current[i] === 1 ? 1 : 0;
          }

          // 4. RADAR SCAN MODE
          if (m === "RADAR") {
            const angle = Math.atan2(baseY - cy, baseX - cx);
            const sweepAngle = ((t * 2.5) % (Math.PI * 2)) - Math.PI;
            let diff = angle - sweepAngle;
            while (diff < -Math.PI) diff += Math.PI * 2;
            while (diff > Math.PI) diff -= Math.PI * 2;

            if (diff >= -0.45 && diff <= 0) {
              target = 1 - Math.abs(diff) / 0.45;
            }

            const dist = Math.hypot(baseX - cx, baseY - cy);
            if (dist > 30 && dist < 36 && Math.abs(angle - 0.7) < 0.2)
              target = 1;
            if (dist > 65 && dist < 72 && Math.abs(angle + 1.2) < 0.2)
              target = 1;
          }

          // 5. CLOCK TIME MODE
          if (m === "TIME") {
            target = timeDots?.has(`${col},${row}`) ? 1 : 0;
          }

          // Proximity glow on cursor hover (only for non-CAT modes so cat remains crisp)
          if (m !== "CAT") {
            const distMouse = Math.hypot(baseX - mx, baseY - my);
            if (distMouse < 45) {
              target = Math.max(target, 1 - distMouse / 45);
            }
          }

          s[i] += (target - s[i]) * 0.24;
          drawDot(baseX, baseY, s[i], isDark);
        }
      }

      raf = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(raf);
  }, [scale]);

  const W = COLS * CELL * scale;
  const H = ROWS * CELL * scale;

  return (
    <div
      ref={containerRef}
      className="group relative flex flex-col items-center rounded-xl border border-divider bg-card/70 p-3.5 shadow-sm backdrop-blur-sm transition-all hover:border-border"
    >
      <span className="absolute top-2 left-2 text-[10px] font-mono text-muted-foreground/40 select-none">
        +
      </span>
      <span className="absolute top-2 right-2 text-[10px] font-mono text-muted-foreground/40 select-none">
        +
      </span>
      <span className="absolute bottom-2 left-2 text-[10px] font-mono text-muted-foreground/40 select-none">
        +
      </span>
      <span className="absolute bottom-2 right-2 text-[10px] font-mono text-muted-foreground/40 select-none">
        +
      </span>

      <div className="flex w-full items-center justify-between border-b border-divider pb-2.5 px-3 text-[10px] font-mono tracking-wider text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-foreground uppercase tracking-widest">
            OMNI-01 // TELEMETRY CANVAS
          </span>
          {activeMode === "CAT" && (
            <span className="hidden sm:inline-flex items-center gap-1 rounded bg-muted/70 px-1.5 py-0.2 text-[9px] text-emerald-400 font-mono">
              STATUS: {catStatus.toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer active:scale-95"
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? (
              <VolumeX className="size-3 text-red-400" />
            ) : (
              <Volume2 className="size-3 text-emerald-400" />
            )}
            <span className="uppercase">{isMuted ? "MUTED" : "AUDIO"}</span>
          </button>
        </div>
      </div>

      <div className="relative my-3 flex items-center justify-center overflow-hidden rounded-lg border border-divider/60 bg-zinc-950 p-2 shadow-inner">
        <canvas
          ref={canvasRef}
          style={{ width: `${W}px`, height: `${H}px` }}
          className="cursor-crosshair select-none block"
        />
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-1.5 border-t border-divider pt-2.5 px-2 text-[10px] font-mono">
        <span className="text-muted-foreground/75 text-[9px] uppercase tracking-wider">
          {activeMode === "CAT"
            ? "INTERACTIVE CAT [MOVE MOUSE / CLICK TO JUMP]"
            : "MODE SELECT [CLICK TO TOGGLE]"}
        </span>

        <div className="flex items-center gap-1">
          {MATRIX_MODES.map((m) => {
            const isActive = activeMode === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex items-center gap-1 rounded px-2 py-0.5 transition-all cursor-pointer active:scale-95 ${
                  isActive
                    ? "bg-foreground text-background font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {isActive && (
                  <span className="h-1 w-1 rounded-full bg-emerald-400 animate-ping" />
                )}
                <span>{m}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
