import type { CSSProperties, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

import "./VideoText.css";

interface MaskConfig {
  fontSize: number;
  height: number;
  letterSpacing?: number;
  lineHeight: number;
  lines: readonly string[];
  textLength?: number;
  width: number;
}

interface VideoTextStyle extends CSSProperties {
  "--video-text-mask-desktop": string;
  "--video-text-mask-mobile": string;
  "--video-text-mask-tablet": string;
}

export interface VideoTextProps {
  as?: ElementType;
  autoPlay?: boolean;
  children: ReactNode;
  className?: string;
  desktopLines: readonly string[];
  id?: string;
  loop?: boolean;
  mobileLines: readonly string[];
  muted?: boolean;
  preload?: "auto" | "metadata" | "none";
  src: string;
  tabletLines: readonly string[];
}

function escapeSvgText(text: string) {
  return text.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&apos;",
      '"': "&quot;",
    };

    return entities[character] ?? character;
  });
}

function createMaskDataUrl({
  fontSize,
  height,
  letterSpacing = 0,
  lineHeight,
  lines,
  textLength,
  width,
}: MaskConfig) {
  const firstLineY = height / 2 - ((lines.length - 1) * lineHeight) / 2;
  const textElements = lines
    .map((line, index) => {
      const lengthAttributes = textLength
        ? ` textLength="${textLength}" lengthAdjust="spacingAndGlyphs"`
        : "";

      return `<text x="${width / 2}" y="${firstLineY + index * lineHeight}"${lengthAttributes}>${escapeSvgText(line)}</text>`;
    })
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><g fill="white" font-family="Geist,Arial,sans-serif" font-size="${fontSize}" font-weight="700" letter-spacing="${letterSpacing}" text-anchor="middle" dominant-baseline="middle">${textElements}</g></svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function FallbackText({
  className,
  lines,
}: {
  className: string;
  lines: readonly string[];
}) {
  return (
    <span className={cn("video-text__fallback", className)} aria-hidden="true">
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </span>
  );
}

export function VideoText({
  as: Component = "div",
  autoPlay = true,
  children,
  className,
  desktopLines,
  id,
  loop = true,
  mobileLines,
  muted = true,
  preload = "auto",
  src,
  tabletLines,
}: VideoTextProps) {
  const accessibleText = String(children);
  const style: VideoTextStyle = {
    "--video-text-mask-mobile": createMaskDataUrl({
      width: 1_000,
      height: 900,
      fontSize: 190,
      lineHeight: 205,
      letterSpacing: -8,
      lines: mobileLines,
    }),
    "--video-text-mask-tablet": createMaskDataUrl({
      width: 1_400,
      height: 700,
      fontSize: 176,
      lineHeight: 205,
      letterSpacing: -7,
      lines: tabletLines,
    }),
    "--video-text-mask-desktop": createMaskDataUrl({
      width: 1_800,
      height: 520,
      fontSize: 150,
      lineHeight: 160,
      lines: desktopLines,
      textLength: 1_680,
    }),
  };

  return (
    <Component id={id} className={cn("video-text", className)} style={style}>
      <span className="sr-only">{accessibleText}</span>
      <FallbackText className="video-text__fallback-mobile" lines={mobileLines} />
      <FallbackText className="video-text__fallback-tablet" lines={tabletLines} />
      <FallbackText className="video-text__fallback-desktop" lines={desktopLines} />

      <span className="video-text__mask" aria-hidden="true">
        <video
          className="video-text__video"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
          tabIndex={-1}
        >
          <source
            src={src}
            type="video/webm"
            media="(prefers-reduced-motion: no-preference)"
          />
        </video>
      </span>
    </Component>
  );
}
