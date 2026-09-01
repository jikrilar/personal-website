import { useEffect, useMemo, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

import "./PixelImage.css";

interface Grid {
  cols: number;
  rows: number;
}

interface PixelPieceStyle extends CSSProperties {
  "--pixel-hide-delay": string;
  "--pixel-reveal-delay": string;
}

export interface PixelImageProps {
  alt: string;
  className?: string;
  grid?: Grid;
  height: number;
  isActive: boolean;
  loading?: "eager" | "lazy";
  reducedMotion: boolean;
  sizes?: string;
  src: string;
  width: number;
}

const DEFAULT_GRID: Grid = { rows: 6, cols: 4 };
const MAX_STAGGER_MS = 800;
const TRANSITION_DURATION_MS = 1_000;
const TRANSITION_TOTAL_MS = MAX_STAGGER_MS + TRANSITION_DURATION_MS;
const REVEALED_HOLD_MS = 1_800;
const PIXELATED_HOLD_MS = 1_000;

type PixelPhase = "idle" | "pixelated" | "revealing" | "revealed" | "hiding";

function getDeterministicDelay(index: number, total: number) {
  return ((index * 17) % total) * (MAX_STAGGER_MS / total);
}

export function PixelImage({
  alt,
  className,
  grid = DEFAULT_GRID,
  height,
  isActive,
  loading = "lazy",
  reducedMotion,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  src,
  width,
}: PixelImageProps) {
  const [phase, setPhase] = useState<PixelPhase>("idle");
  const pieces = useMemo(() => {
    const total = grid.rows * grid.cols;

    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / grid.cols);
      const col = index % grid.cols;
      const left = col * (100 / grid.cols);
      const right = (col + 1) * (100 / grid.cols);
      const top = row * (100 / grid.rows);
      const bottom = (row + 1) * (100 / grid.rows);

      return {
        clipPath: `polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)`,
        revealDelay: getDeterministicDelay(index, total),
        hideDelay: getDeterministicDelay(total - index - 1, total),
      };
    });
  }, [grid.cols, grid.rows]);

  useEffect(() => {
    if (!isActive || reducedMotion) {
      setPhase("idle");
      return;
    }

    setPhase("pixelated");
  }, [isActive, reducedMotion]);

  useEffect(() => {
    if (!isActive || reducedMotion || phase === "idle") {
      return;
    }

    const phaseDuration =
      phase === "pixelated"
        ? PIXELATED_HOLD_MS
        : phase === "revealed"
          ? REVEALED_HOLD_MS
          : TRANSITION_TOTAL_MS;
    const timer = window.setTimeout(() => {
      setPhase((currentPhase) => {
        switch (currentPhase) {
          case "pixelated":
            return "revealing";
          case "revealing":
            return "revealed";
          case "revealed":
            return "hiding";
          case "hiding":
            return "pixelated";
          case "idle":
            return "idle";
        }
      });
    }, phaseDuration);

    return () => window.clearTimeout(timer);
  }, [isActive, phase, reducedMotion]);

  return (
    <div
      className={cn("pixel-image", className)}
      data-phase={phase}
    >
      <img
        className="pixel-image__fallback"
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        sizes={sizes}
      />

      <span className="pixel-image__pieces" aria-hidden="true">
        {pieces.map(({ clipPath, hideDelay, revealDelay }, index) => {
          const style: PixelPieceStyle = {
            clipPath,
            "--pixel-hide-delay": `${hideDelay}ms`,
            "--pixel-reveal-delay": `${revealDelay}ms`,
          };

          return (
            <span className="pixel-image__piece" key={index} style={style}>
              <img
                className="pixel-image__piece-image"
                src={src}
                alt=""
                width={width}
                height={height}
                loading={loading}
                decoding="async"
                draggable={false}
              />
            </span>
          );
        })}
      </span>
    </div>
  );
}
