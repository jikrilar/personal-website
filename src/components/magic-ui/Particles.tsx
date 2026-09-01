import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

interface Particle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

// Magic UI Particles adapted for Astro islands with viewport pausing and reduced motion.
function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "").trim();
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((character) => character + character)
          .join("")
      : normalized;
  const value = Number.parseInt(expanded, 16);

  if (Number.isNaN(value)) return [10, 10, 10];

  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export default function Particles({
  className = "",
  quantity = 36,
  staticity = 80,
  ease = 90,
  size = 0.35,
  refresh = false,
  color,
  vx = 0,
  vy = 0,
  ...props
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const containerElement = containerRef.current;

    if (!canvasElement || !containerElement) return;

    const drawingContext = canvasElement.getContext("2d");

    if (!drawingContext) return;

    const canvas = canvasElement as HTMLCanvasElement;
    const container = containerElement as HTMLDivElement;
    const context = drawingContext as CanvasRenderingContext2D;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles: Particle[] = [];
    const pointer = { x: 0, y: 0 };
    const canvasSize = { width: 0, height: 0 };
    let rgb: [number, number, number] = [10, 10, 10];
    let animationFrame: number | null = null;
    let isVisible = false;

    function resolveColor() {
      const tokenColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim();
      rgb = hexToRgb(color ?? tokenColor);
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * canvasSize.width,
        y: Math.random() * canvasSize.height,
        translateX: 0,
        translateY: 0,
        size: Math.random() * 1.25 + size,
        alpha: 0,
        targetAlpha: Math.random() * 0.3 + 0.12,
        dx: (Math.random() - 0.5) * 0.035,
        dy: (Math.random() - 0.5) * 0.035,
        magnetism: 0.5 + Math.random() * 2.5,
      };
    }

    function drawParticle(particle: Particle) {
      context.beginPath();
      context.arc(
        particle.x + particle.translateX,
        particle.y + particle.translateY,
        particle.size,
        0,
        Math.PI * 2,
      );
      context.fillStyle = `rgba(${rgb.join(", ")}, ${particle.alpha})`;
      context.fill();
    }

    function resetCanvas() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const particleCount = width < 640 ? Math.ceil(quantity * 0.55) : quantity;

      canvasSize.width = width;
      canvasSize.height = height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.length = 0;

      for (let index = 0; index < particleCount; index += 1) {
        particles.push(createParticle());
      }

      context.clearRect(0, 0, width, height);
      particles.forEach(drawParticle);
    }

    function remapEdge(distance: number) {
      return Math.max(0, Math.min(1, distance / 24));
    }

    function stopAnimation() {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    }

    function animate() {
      if (!isVisible || motionPreference.matches) {
        stopAnimation();
        return;
      }

      context.clearRect(0, 0, canvasSize.width, canvasSize.height);

      particles.forEach((particle, index) => {
        const closestEdge = Math.min(
          particle.x - particle.size,
          canvasSize.width - particle.x - particle.size,
          particle.y - particle.size,
          canvasSize.height - particle.y - particle.size,
        );
        const edgeOpacity = remapEdge(closestEdge);

        particle.alpha = Math.min(
          particle.targetAlpha * edgeOpacity,
          particle.alpha + 0.008,
        );
        particle.x += particle.dx + vx;
        particle.y += particle.dy + vy;
        particle.translateX +=
          (pointer.x / (staticity / particle.magnetism) - particle.translateX) / ease;
        particle.translateY +=
          (pointer.y / (staticity / particle.magnetism) - particle.translateY) / ease;

        if (
          particle.x < -particle.size ||
          particle.x > canvasSize.width + particle.size ||
          particle.y < -particle.size ||
          particle.y > canvasSize.height + particle.size
        ) {
          particles[index] = createParticle();
        } else {
          drawParticle(particle);
        }
      });

      animationFrame = window.requestAnimationFrame(animate);
    }

    function startAnimation() {
      stopAnimation();

      if (isVisible && !motionPreference.matches) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      if (!isVisible) return;

      const bounds = container.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const isInside = x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height;

      pointer.x = isInside ? x - canvasSize.width / 2 : 0;
      pointer.y = isInside ? y - canvasSize.height / 2 : 0;
    }

    function handleMotionChange() {
      if (motionPreference.matches) {
        stopAnimation();
        context.clearRect(0, 0, canvasSize.width, canvasSize.height);
      } else {
        resetCanvas();
        startAnimation();
      }
    }

    resolveColor();
    resetCanvas();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        startAnimation();
      },
      { rootMargin: "120px" },
    );
    const resizeObserver = new ResizeObserver(() => {
      resetCanvas();
      startAnimation();
    });
    const themeObserver = new MutationObserver(() => {
      resolveColor();
      resetCanvas();
      startAnimation();
    });

    visibilityObserver.observe(container);
    resizeObserver.observe(container);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    motionPreference.addEventListener("change", handleMotionChange);

    return () => {
      stopAnimation();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      motionPreference.removeEventListener("change", handleMotionChange);
    };
  }, [color, ease, quantity, refresh, size, staticity, vx, vy]);

  return (
    <div
      ref={containerRef}
      className={["particles", className].filter(Boolean).join(" ")}
      aria-hidden="true"
      {...props}
    >
      <canvas
        ref={canvasRef}
        role="presentation"
        aria-hidden="true"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
