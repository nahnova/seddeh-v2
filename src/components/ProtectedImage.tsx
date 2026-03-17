"use client";

import Image from "next/image";

/**
 * Image wrapper that discourages casual downloading/saving.
 * Blocks right-click, drag, and overlays a transparent div to
 * intercept pointer events aimed at the underlying <img>.
 */
export function ProtectedImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div
      className="relative"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`select-none pointer-events-none ${className ?? ""}`}
      />
      {/* Transparent overlay — intercepts save-image and inspect attempts */}
      <div className="absolute inset-0" aria-hidden="true" />
    </div>
  );
}
