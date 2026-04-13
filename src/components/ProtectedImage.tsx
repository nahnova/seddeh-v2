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
      {/* Repeating watermark across entire image */}
      <div
        className="absolute inset-0 pointer-events-none select-none opacity-15"
        aria-hidden="true"
        style={{
          backgroundImage: "url(/logo.png)",
          backgroundSize: "140px auto",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          transform: "rotate(-25deg)",
          scale: "1.5",
        }}
      />
    </div>
  );
}
