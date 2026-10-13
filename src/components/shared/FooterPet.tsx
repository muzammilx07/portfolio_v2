"use client";

import { useEffect, useRef, useState } from "react";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  symbol: string;
}

function playPetSound(isCool = false) {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (isCool) {
      // Harmonic major chime for cool cat
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    } else {
      // Soft purr resonance
      osc.type = "triangle";
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.08);
      osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch {}
}

export default function FooterPet() {
  const [petCount, setPetCount] = useState(0);
  const [isSleeping, setIsSleeping] = useState(false);
  const [showShades, setShowShades] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<FloatingHeart[]>([]);
  const [isBouncing, setIsBouncing] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  // Load persistent pet count & view count
  useEffect(() => {
    try {
      const savedPets = localStorage.getItem("muzammil_portfolio_pets");
      if (savedPets) {
        const count = parseInt(savedPets, 10);
        setPetCount(count);
        if (count >= 5) setShowShades(true);
      }
    } catch {}
  }, []);

  // Pupil eye tracking mouse cursor
  useEffect(() => {
    if (isSleeping) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!catRef.current) return;
      const rect = catRef.current.getBoundingClientRect();
      const catCenterX = rect.left + rect.width / 2;
      const catCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - catCenterX;
      const dy = e.clientY - catCenterY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(Math.hypot(dx, dy) / 100, 1.2);

      setPupilOffset({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist * 0.8,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isSleeping]);

  const handlePet = () => {
    if (isSleeping) {
      setIsSleeping(false);
      return;
    }

    const nextCount = petCount + 1;
    setPetCount(nextCount);
    try {
      localStorage.setItem("muzammil_portfolio_pets", String(nextCount));
    } catch {}

    // Auto unlock sunglasses at 5 pets
    if (nextCount >= 5 && !showShades) {
      setShowShades(true);
      playPetSound(true);
    } else {
      playPetSound(showShades);
    }

    // Bounce animation
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 260);

    // Spawn floating particle
    const symbols = ["♥", "✦", "purr", "♪", "♥"];
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const newParticle: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 40,
      y: -10,
      symbol: randomSymbol,
    };
    setParticles((prev) => [...prev.slice(-4), newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1200);
  };

  const getRankBadge = () => {
    if (petCount >= 25) return { title: "Grandmaster Companion 🏆", color: "text-amber-400" };
    if (petCount >= 15) return { title: "Purr Machine ✨", color: "text-purple-400" };
    if (petCount >= 5) return { title: "Cool Cat w/ Shades 😎", color: "text-emerald-400" };
    return { title: "Curious Kitten (=^·^=)", color: "text-muted-foreground" };
  };

  const rank = getRankBadge();

  return (
    <div
      ref={catRef}
      className="absolute -top-12 right-6 select-none flex items-end gap-2 sm:right-10"
    >
      {/* Floating Reaction Particles */}
      <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-16 overflow-visible flex items-center justify-center">
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              transform: `translate(${p.x}px, ${p.y}px)`,
            }}
            className="absolute animate-out fade-out slide-out-to-top-8 duration-1000 text-xs font-mono font-bold text-red-500"
          >
            {p.symbol}
          </span>
        ))}
      </div>

      {/* Floating Status / Pet Pill */}
      <div
        onClick={handlePet}
        className="group cursor-pointer rounded-full border border-divider bg-card/90 px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground shadow-sm backdrop-blur-xs transition-all hover:border-border hover:text-foreground"
        title="Click to pet companion (double click cat to sleep)"
      >
        <span className="flex items-center gap-1.5">
          <span className={rank.color}>
            {petCount > 0 ? `${petCount} pets` : "pet me!"}
          </span>
          {showShades && <span className="text-[11px]">🕶️</span>}
        </span>
      </div>

      {/* High-Fidelity NiteshSeram-Inspired Vector Cat */}
      <div
        onClick={handlePet}
        onDoubleClick={() => setIsSleeping(!isSleeping)}
        className={`relative cursor-pointer transition-transform duration-200 ${
          isBouncing ? "scale-90 translate-y-1" : "hover:-translate-y-0.5"
        }`}
        title={
          isSleeping
            ? "Cat is sleeping (click to wake up)"
            : `Pet Muzammil's cat! (${rank.title})`
        }
      >
        {/* Sleeping zZz Animation */}
        {isSleeping && (
          <div className="absolute -top-5 right-2 font-mono text-[10px] font-bold text-muted-foreground animate-pulse">
            zZz
          </div>
        )}

        <svg
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-14 sm:size-16 text-foreground overflow-visible"
        >
          <defs>
            <clipPath id="cat-mask-head">
              <rect width="64" height="48" />
            </clipPath>
            <clipPath id="cat-mask-body">
              <path d="M11 28C8 21 10 8 14 6c4-2 8 7 11 13 5-2 11-2 16 0 4-7 7-12 10-11 5 2 6 15 2 22 4 9-4 18-21 18S7 40 11 28Z" />
            </clipPath>
            <clipPath id="cat-mask-paws">
              <rect width="64" height="52" />
            </clipPath>
          </defs>

          {/* Head & Body */}
          <g clipPath="url(#cat-mask-head)">
            <g>
              {/* Outer silhouette outline */}
              <path
                d="M11 28C8 21 10 8 14 6c4-2 8 7 11 13 5-2 11-2 16 0 4-7 7-12 10-11 5 2 6 15 2 22 4 9-4 18-21 18S7 40 11 28Z"
                fill="var(--card)"
                className="transition-colors"
              />

              {/* Coat markings */}
              <g clipPath="url(#cat-mask-body)">
                <path
                  d="M8 46c1-9 5-17 11-18 5-1 8 2 10 6l2-12 1 10 4-11-1 13c3-6 8-8 12-5 6 3 8 10 9 17v5H8Z"
                  fill="currentColor"
                  opacity="0.12"
                  stroke="none"
                />
              </g>

              {/* Inner ear fur */}
              <path
                d="M13 25c-1-6 0-14 2-14 2 0 5 6 7 10Zm31-3c2-5 5-10 7-9 2 2 2 8 0 14Z"
                fill="currentColor"
                opacity="0.18"
                stroke="none"
              />

              {/* Eyes state */}
              {!isSleeping ? (
                /* Awake Eyes with Tracking Pupils */
                <g>
                  {/* Eye Sockets */}
                  <circle cx="23" cy="33" r="3.2" fill="var(--background)" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="41" cy="33" r="3.2" fill="var(--background)" stroke="currentColor" strokeWidth="1.2" />

                  {/* Dynamic Pupils */}
                  <circle
                    cx={23 + pupilOffset.x}
                    cy={33 + pupilOffset.y}
                    r="1.8"
                    fill="currentColor"
                    stroke="none"
                  />
                  <circle
                    cx={41 + pupilOffset.x}
                    cy={33 + pupilOffset.y}
                    r="1.8"
                    fill="currentColor"
                    stroke="none"
                  />

                  {/* Pupil Catchlight Reflection */}
                  <circle
                    cx={22.3 + pupilOffset.x * 0.5}
                    cy={32.2 + pupilOffset.y * 0.5}
                    r="0.6"
                    fill="var(--card)"
                    stroke="none"
                  />
                  <circle
                    cx={40.3 + pupilOffset.x * 0.5}
                    cy={32.2 + pupilOffset.y * 0.5}
                    r="0.6"
                    fill="var(--card)"
                    stroke="none"
                  />
                </g>
              ) : (
                /* Sleeping Eyes (Happy Arcs) */
                <g stroke="currentColor" strokeWidth="1.6" fill="none">
                  <path d="M20 34 Q23 37 26 34" />
                  <path d="M38 34 Q41 37 44 34" />
                </g>
              )}

              {/* Cool Sunglasses (Unlocked at 5 pets or toggled) */}
              {showShades && (
                <g strokeWidth="1.3" className="transition-all duration-300">
                  <path d="m13 29 4 2m12 0q3-2 6 0m12 0 4-2" stroke="currentColor" />
                  <path
                    d="M17 30h12l-1 4.5c-.5 2-2 2.5-5 2.5s-4.5-.5-5-2.5Zm18 0h12l-1 4.5c-.5 2-2 2.5-5 2.5s-4.5-.5-5-2.5Z"
                    fill="currentColor"
                    stroke="currentColor"
                  />
                  <path
                    d="m21 31.5-1.5 2m19.5-2-1.5 2"
                    stroke="var(--card)"
                    strokeWidth="1"
                  />
                </g>
              )}

              {/* Cute Nose & Mouth */}
              <path
                d="M28 39c0-2.5 8-2.5 8 0 0 2-2 3.5-4 3.5s-4-1.5-4-3.5Z"
                fill="currentColor"
                stroke="none"
              />
              <path d="M32 42.5v3" stroke="currentColor" strokeWidth="1.2" />

              {/* Delicate Whiskers */}
              <path
                d="M18 39 L7 37 M18 41 L8 43 M46 39 L57 37 M46 41 L56 43"
                stroke="currentColor"
                strokeWidth="0.9"
                opacity="0.35"
              />
            </g>
          </g>

          {/* Front Paws Sitting Directly On The Footer Border Line */}
          <g clipPath="url(#cat-mask-paws)">
            <g fill="var(--card)">
              {/* Left & Right Paws */}
              <path
                d="M5 47c0-5 4-8 8-8 5 0 9 4 9 8 0 3-4 4-9 4s-8-1-8-4Zm37 0c0-4 4-8 9-8 4 0 8 3 8 8 0 3-3 4-8 4s-9-1-9-4Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              {/* Claw Dividers */}
              <path
                d="M10 46v4m5-4v4m32-4v4m5-4v4"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.5"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
