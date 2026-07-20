"use client";

import { useEffect, useState, useCallback } from "react";
import { PicsrestImage, fullUrl, picsumFullUrl } from "@/lib/images";

interface ImageModalProps {
  image: PicsrestImage;
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  // Fade-in state — triggered one frame after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = "";
    };
  }, []);

  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 250);
  }, [onClose]);

  const handleShare = useCallback(() => {
    navigator.clipboard
      .writeText(`${window.location.origin}?img=${image.id}`)
      .catch(() => {});
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  }, [image.id]);

  // Image src with Picsum fallback
  const [imgSrc, setImgSrc] = useState(() => fullUrl(image.unsplashId));
  const [usedFallback, setUsedFallback] = useState(false);

  const handleImgError = useCallback(() => {
    if (!usedFallback) {
      setUsedFallback(true);
      setImgSrc(picsumFullUrl(image.picsumSeed));
    }
  }, [usedFallback, image.picsumSeed]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 transition-all duration-250 ${
        visible
          ? "opacity-100 backdrop-blur-sm bg-black/75"
          : "opacity-0 backdrop-blur-none bg-black/0"
      }`}
      onClick={handleClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-10 text-lg"
        onClick={handleClose}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Modal card */}
      <div
        className={`relative flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] shadow-2xl transition-all duration-250 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo */}
        <div className="flex-1 bg-gray-50 flex items-center justify-center min-h-[40vh] md:min-h-0 overflow-hidden">
          <img
            src={imgSrc}
            alt={image.title}
            className="w-full h-full object-contain"
            onError={handleImgError}
          />
        </div>

        {/* Details panel */}
        <div className="w-full md:w-80 bg-white flex flex-col p-6 flex-shrink-0 overflow-y-auto">
          {/* Category + Save */}
          <div className="flex items-center justify-between mb-5">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wide">
              {image.category}
            </span>
            <button
              onClick={() => setIsSaved((v) => !v)}
              className={`px-4 py-2 flex items-center gap-1.5 rounded-full text-sm font-bold shadow-sm transition-colors ${
                isSaved
                  ? "bg-gray-900 text-white"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              📌 {isSaved ? "Saved" : "Save"}
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">
            {image.title}
          </h2>
          <p className="text-gray-500 text-sm mb-auto">By {image.creator}</p>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-gray-100 mt-6">
            <button
              onClick={() => setIsLiked((v) => !v)}
              className={`flex-1 h-11 flex items-center justify-center gap-2 rounded-2xl font-semibold text-sm transition-colors border ${
                isLiked
                  ? "bg-red-50 text-red-600 border-red-200"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              ❤️ {(image.likes + (isLiked ? 1 : 0)).toLocaleString()}
            </button>
            <button
              onClick={handleShare}
              className="flex-1 h-11 flex items-center justify-center gap-2 rounded-2xl bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 font-semibold text-sm transition-colors"
            >
              🔗 {showCopied ? "Copied!" : "Share"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
