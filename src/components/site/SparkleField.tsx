import { useMemo } from "react";

type Sparkle = {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  color: string;
  rotate: string;
};

const PALETTE = [
  "text-coral",
  "text-sun",
  "text-mint",
  "text-sky",
  "text-lilac",
];

function seeded(i: number, salt: number) {
  const x = Math.sin(i * 9301 + salt * 49297) * 233280;
  return x - Math.floor(x);
}

/**
 * Decorative sparkle field — fixed full-screen layer with
 * twinkling 4-point sparkles in the brand pastel palette.
 * Sits behind all content; doesn't intercept pointer events.
 */
export function SparkleField({ count = 60 }: { count?: number }) {
  const sparkles = useMemo<Sparkle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      top: `${seeded(i, 1) * 100}%`,
      left: `${seeded(i, 2) * 100}%`,
      size: 14 + Math.floor(seeded(i, 3) * 26),
      delay: `${(seeded(i, 4) * 6).toFixed(2)}s`,
      duration: `${(3 + seeded(i, 5) * 4).toFixed(2)}s`,
      color: PALETTE[Math.floor(seeded(i, 6) * PALETTE.length)],
      rotate: `${Math.floor(seeded(i, 7) * 90)}deg`,
    }));
  }, [count]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {sparkles.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`absolute spark-twinkle ${s.color}`}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
            transform: `rotate(${s.rotate})`,
          }}
        >
          <path
            d="M12 0 C12.8 7.2 16.8 11.2 24 12 C16.8 12.8 12.8 16.8 12 24 C11.2 16.8 7.2 12.8 0 12 C7.2 11.2 11.2 7.2 12 0 Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}
