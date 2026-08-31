import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface MorphingTextProps {
  className?: string;
  durationMs?: number;
  reducedMotion?: boolean;
  texts: readonly string[];
}

interface MorphingWordsProps {
  durationMs: number;
  texts: readonly string[];
}

const FILTER_ID = "intro-morph-threshold";
const DEFAULT_DURATION_MS = 2_400;
const MORPH_BLUR_PX = 6;

function setWordStyles(
  outgoing: HTMLSpanElement,
  incoming: HTMLSpanElement,
  fraction: number,
) {
  const incomingFraction = Math.max(fraction, 0.001);
  const outgoingFraction = Math.max(1 - fraction, 0.001);

  incoming.style.filter = `blur(${Math.min(MORPH_BLUR_PX / incomingFraction - MORPH_BLUR_PX, 100)}px)`;
  incoming.style.opacity = `${Math.pow(fraction, 0.4)}`;
  outgoing.style.filter = `blur(${Math.min(MORPH_BLUR_PX / outgoingFraction - MORPH_BLUR_PX, 100)}px)`;
  outgoing.style.opacity = `${Math.pow(1 - fraction, 0.4)}`;
}

function MorphingWords({ durationMs, texts }: MorphingWordsProps) {
  const outgoingRef = useRef<HTMLSpanElement>(null);
  const incomingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const outgoing = outgoingRef.current;
    const incoming = incomingRef.current;

    if (!outgoing || !incoming || texts.length < 2) {
      return;
    }

    const transitionCount = texts.length - 1;
    const stepDuration = durationMs / transitionCount;
    const holdDuration = stepDuration * 0.35;
    const morphDuration = stepDuration - holdDuration;
    let animationFrameId = 0;
    let startTime: number | undefined;

    const showFinalText = () => {
      outgoing.textContent = texts.at(-1) ?? "";
      outgoing.style.filter = "none";
      outgoing.style.opacity = "1";
      incoming.textContent = "";
      incoming.style.filter = "none";
      incoming.style.opacity = "0";
    };

    const animate = (time: number) => {
      startTime ??= time;
      const elapsed = time - startTime;

      if (elapsed >= durationMs) {
        showFinalText();
        return;
      }

      const transitionIndex = Math.min(
        Math.floor(elapsed / stepDuration),
        transitionCount - 1,
      );
      const stepElapsed = elapsed - transitionIndex * stepDuration;
      const fraction = Math.min(
        Math.max((stepElapsed - holdDuration) / morphDuration, 0),
        1,
      );

      outgoing.textContent = texts[transitionIndex] ?? "";
      incoming.textContent = texts[transitionIndex + 1] ?? "";
      setWordStyles(outgoing, incoming, fraction);

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [durationMs, texts]);

  return (
    <>
      <span
        ref={outgoingRef}
        className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
      >
        {texts[0]}
      </span>
      <span
        ref={incomingRef}
        className="absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-0"
      >
        {texts[1]}
      </span>
    </>
  );
}

function ThresholdFilter() {
  return (
    <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
      <defs>
        <filter id={FILTER_ID}>
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function MorphingText({
  className,
  durationMs = DEFAULT_DURATION_MS,
  reducedMotion = false,
  texts,
}: MorphingTextProps) {
  const finalText = texts.at(-1) ?? "";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative h-[clamp(2.5rem,10vw,7rem)] w-[min(calc(100vw-2.5rem),64rem)] text-center font-sans text-[clamp(1.75rem,8vw,6rem)] leading-none font-medium tracking-[-0.04em] text-foreground",
        className,
      )}
    >
      {reducedMotion || texts.length < 2 ? (
        <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
          {finalText}
        </span>
      ) : (
        <>
          <div
            className="absolute inset-0 motion-reduce:hidden"
            style={{ filter: `url(#${FILTER_ID}) blur(0.6px)` }}
          >
            <MorphingWords durationMs={durationMs} texts={texts} />
          </div>
          <span className="absolute inset-0 hidden items-center justify-center whitespace-nowrap motion-reduce:flex">
            {finalText}
          </span>
        </>
      )}
      {!reducedMotion && texts.length > 1 && <ThresholdFilter />}
    </div>
  );
}
