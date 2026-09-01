import { useEffect, useRef, useState } from "react";

import { PixelImage } from "@/components/magic-ui/PixelImage";
import { TypingAnimation } from "@/components/magic-ui/TypingAnimation";

interface AboutContentProps {
  imageAlt: string;
  imageHeight: number;
  imageSrc: string;
  imageWidth: number;
  summary: string;
}

const VISIBILITY_THRESHOLD = 0.3;

export function AboutContent({
  imageAlt,
  imageHeight,
  imageSrc,
  imageWidth,
  summary,
}: AboutContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionQuery.matches);
    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(
          Boolean(
            entry?.isIntersecting &&
              entry.intersectionRatio >= VISIBILITY_THRESHOLD,
          ),
        );
      },
      { threshold: [0, VISIBILITY_THRESHOLD] },
    );
    visibilityObserver.observe(container);

    let introObserver: MutationObserver | undefined;
    const updateIntroState = () => {
      const isComplete = document.querySelector(".intro-overlay") === null;
      setIntroComplete(isComplete);

      if (isComplete) {
        introObserver?.disconnect();
      }
    };

    updateIntroState();

    if (document.querySelector(".intro-overlay")) {
      introObserver = new MutationObserver(updateIntroState);
      introObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      visibilityObserver.disconnect();
      introObserver?.disconnect();
      motionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  const isActive = isVisible && introComplete && !reducedMotion;

  return (
    <div
      ref={containerRef}
      className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20"
    >
      <div className="lg:pr-10">
        <TypingAnimation
          isActive={isActive}
          reducedMotion={reducedMotion}
          text={summary}
          typingSpeed={24}
          holdDuration={1_500}
          deleteSpeed={14}
          pauseDuration={600}
          className="max-w-[38rem] text-[clamp(1.125rem,1.7vw,1.375rem)] leading-[1.65] tracking-[-0.015em] text-foreground"
        />
      </div>

      <div className="mx-auto w-full max-w-[22rem] lg:mx-0 lg:ml-auto lg:max-w-[26rem]">
        <PixelImage
          isActive={isActive}
          reducedMotion={reducedMotion}
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          grid={{ rows: 6, cols: 4 }}
          sizes="(min-width: 1024px) 26rem, min(22rem, calc(100vw - 2.5rem))"
        />
      </div>
    </div>
  );
}
