import { useEffect, useMemo, useState, type ElementType } from "react";

import { cn } from "@/lib/utils";

import "./TypingAnimation.css";

export interface TypingAnimationProps {
  as?: ElementType;
  className?: string;
  deleteSpeed?: number;
  holdDuration?: number;
  isActive: boolean;
  pauseDuration?: number;
  reducedMotion: boolean;
  text: string;
  typingSpeed?: number;
}

type TypingPhase = "idle" | "typing" | "holding" | "deleting" | "pausing";

export function TypingAnimation({
  as: Component = "p",
  className,
  deleteSpeed = 14,
  holdDuration = 1_500,
  isActive,
  pauseDuration = 600,
  reducedMotion,
  text,
  typingSpeed = 24,
}: TypingAnimationProps) {
  const characters = useMemo(() => Array.from(text), [text]);
  const [characterIndex, setCharacterIndex] = useState(characters.length);
  const [phase, setPhase] = useState<TypingPhase>("idle");

  useEffect(() => {
    if (!isActive || reducedMotion) {
      setCharacterIndex(characters.length);
      setPhase("idle");
      return;
    }

    setCharacterIndex(0);
    setPhase("typing");
  }, [characters.length, isActive, reducedMotion]);

  useEffect(() => {
    if (!isActive || reducedMotion || phase === "idle") {
      return;
    }

    let delay: number;

    switch (phase) {
      case "typing":
        delay = characterIndex < characters.length ? typingSpeed : 0;
        break;
      case "holding":
        delay = holdDuration;
        break;
      case "deleting":
        delay = characterIndex > 0 ? deleteSpeed : 0;
        break;
      case "pausing":
        delay = pauseDuration;
        break;
    }

    const timer = window.setTimeout(() => {
      switch (phase) {
        case "typing":
          if (characterIndex < characters.length) {
            setCharacterIndex((index) => index + 1);
          } else {
            setPhase("holding");
          }
          break;
        case "holding":
          setPhase("deleting");
          break;
        case "deleting":
          if (characterIndex > 0) {
            setCharacterIndex((index) => index - 1);
          } else {
            setPhase("pausing");
          }
          break;
        case "pausing":
          setCharacterIndex(0);
          setPhase("typing");
          break;
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [
    characterIndex,
    characters.length,
    deleteSpeed,
    holdDuration,
    isActive,
    pauseDuration,
    phase,
    reducedMotion,
    typingSpeed,
  ]);

  const displayedText = characters.slice(0, characterIndex).join("");
  const showCursor = isActive && !reducedMotion;

  return (
    <Component
      className={cn("typing-animation", className)}
      data-phase={phase}
    >
      <span className="sr-only">{text}</span>
      <span className="typing-animation__text" aria-hidden="true">
        {displayedText}
        {showCursor && (
          <span className="typing-animation__cursor" aria-hidden="true" />
        )}
      </span>
    </Component>
  );
}
