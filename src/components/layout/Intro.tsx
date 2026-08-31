import { useEffect, useState } from "react";

import { MorphingText } from "@/components/magic-ui/MorphingText";

import "./Intro.css";

const GREETINGS = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "Hallo",
  "Olá",
  "Hei",
  "Goedendag",
  "Halo, Selamat Datang",
] as const;

const SEQUENCE_DURATION_MS = 2_400;
const FINAL_GREETING_HOLD_MS = 200;
const EXIT_DURATION_MS = 400;
const REDUCED_ACTIVE_DURATION_MS = 350;
const REDUCED_EXIT_DURATION_MS = 150;

type IntroState = "active" | "exiting" | "complete";

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return reducedMotion;
}

export default function Intro() {
  const [introState, setIntroState] = useState<IntroState>("active");
  const reducedMotion = usePrefersReducedMotion();
  const isComplete = introState === "complete";

  useEffect(() => {
    if (isComplete) {
      return;
    }

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      const currentPaddingRight = window.getComputedStyle(body).paddingRight;
      body.style.paddingRight = `calc(${currentPaddingRight} + ${scrollbarWidth}px)`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [isComplete]);

  useEffect(() => {
    if (introState !== "active") {
      return;
    }

    const activeDuration = reducedMotion
      ? REDUCED_ACTIVE_DURATION_MS
      : SEQUENCE_DURATION_MS + FINAL_GREETING_HOLD_MS;
    const exitTimer = window.setTimeout(() => {
      setIntroState("exiting");
    }, activeDuration);

    return () => {
      window.clearTimeout(exitTimer);
    };
  }, [introState, reducedMotion]);

  useEffect(() => {
    if (introState !== "exiting") {
      return;
    }

    const exitDuration = reducedMotion
      ? REDUCED_EXIT_DURATION_MS
      : EXIT_DURATION_MS;
    const completeTimer = window.setTimeout(() => {
      setIntroState("complete");
    }, exitDuration);

    return () => {
      window.clearTimeout(completeTimer);
    };
  }, [introState, reducedMotion]);

  if (isComplete) {
    return null;
  }

  return (
    <div
      className="intro-overlay fixed inset-0 z-[200] grid min-h-dvh place-items-center overflow-hidden bg-background text-foreground"
      data-state={introState}
      aria-hidden="true"
    >
      <MorphingText
        durationMs={SEQUENCE_DURATION_MS}
        reducedMotion={reducedMotion}
        texts={GREETINGS}
      />
    </div>
  );
}
