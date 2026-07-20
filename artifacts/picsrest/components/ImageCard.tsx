"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { PicsrestImage, thumbUrl, picsumThumbUrl } from "@/lib/images";

interface ImageCardProps {
  image: PicsrestImage;
  onClick: () => void;
  /** Cards in the initial viewport load immediately; others are lazy */
  eager?: boolean;
}

export default function ImageCard({
  image,
  onClick,
  eager = false,
}: ImageCardProps) {
  const [imgSrc, setImgSrc] = useState(() => thumbUrl(image.unsplashId, 600));
  const [loaded, setLoaded] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  /**
   * If the browser already had the image in its cache, `onLoad` fires
   * synchronously *before* React attaches the listener. We catch that by
   * checking `img.complete` after mount.
   */
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  /* ── Image loading ──────────────────────────────────────────────────────── */

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    if (!usedFallback) {
      setUsedFallback(true);
      setLoaded(false);
      // Picsum is always available and deterministic — guaranteed to load
      setImgSrc(picsumThumbUrl(image.picsumSeed, 600, image.aspectRatio));
    }
  }, [usedFallback, image.picsumSeed, image.aspectRatio]);

  /* ── Interactions ───────────────────────────────────────────────────────── */

  const handleLike = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((v) => !v);
  }, []);

  const handleSave = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved((v) => !v);
  }, []);

  const handleShare = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      navigator.clipboard
        .writeText(`${window.location.origin}?img=${image.id}`)
        .catch(() => {});
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    },
    [image.id]
  );

  /* ── Render ─────────────────────────────────────────────────────────────── */

  return (
    <div
      className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
      onClick={onClick}
    >
      {/* Image area — height is derived from aspect-ratio */}
      <div
        className="relative w-full overflow-hidden bg-gray-100"
        style={{ aspectRatio: `1 / ${image.aspectRatio}` }}
      >
        {/* Shimmer skeleton — fades out once the photo is ready */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 pointer-events-none transition-opacity duration-500 ${
            loaded ? "opacity-0" : "animate-pulse"
          }`}
        />

        {/* Photo — always in the DOM so onLoad/onError fire reliably */}
        <img
          ref={imgRef}
          src={imgSrc}
          alt={image.title}
          /**
           * sizes hint: on mobile (2 cols ~50vw) → ~50vw; on md (3 cols) → ~33vw;
           * on lg (4 cols) → ~25vw; max ~600px. Helps browsers pick the right fetch.
           */
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
        />

        {/* Hover overlay — only rendered after image is visible */}
        {loaded && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Gradient for legibility */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Save — top right */}
            <button
              onClick={handleSave}
              className={`absolute top-2.5 right-2.5 px-3 py-1.5 flex items-center gap-1 rounded-full text-xs font-bold shadow transition-colors ${
                isSaved
                  ? "bg-black/80 text-white"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              📌 {isSaved ? "Saved" : "Save"}
            </button>

            {/* Share + Like — bottom right */}
            <div className="absolute bottom-2.5 right-2.5 flex gap-1.5">
              <button
                onClick={handleShare}
                title="Share"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-900 shadow transition-colors"
              >
                {showCopied ? (
                  <span className="text-[10px] font-bold text-green-600">✓</span>
                ) : (
                  <span className="text-sm leading-none">🔗</span>
                )}
              </button>
              <button
                onClick={handleLike}
                className={`px-2.5 h-8 flex items-center gap-1 rounded-full shadow transition-colors ${
                  isLiked
                    ? "bg-red-500 text-white"
                    : "bg-white/90 hover:bg-white text-gray-900"
                }`}
              >
                <span className="text-sm leading-none">❤️</span>
                <span className="text-xs font-bold tabular-nums">
                  {(image.likes + (isLiked ? 1 : 0)).toLocaleString()}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Always-visible title + creator below the photo */}
      <div className="px-3 py-2.5">
        <p className="text-sm font-semibold text-gray-900 truncate leading-snug">
          {image.title}
        </p>
        <p className="text-xs text-gray-500 truncate mt-0.5">{image.creator}</p>
      </div>
    </div>
  );
}
