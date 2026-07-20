"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { PicsrestImage, PAGE_SIZE } from "@/lib/images";
import ImageCard from "./ImageCard";

interface ImageGridProps {
  images: PicsrestImage[];
  onImageClick: (id: string) => void;
}

export default function ImageGrid({ images, onImageClick }: ImageGridProps) {
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset count whenever the image list changes (filter / search)
  useEffect(() => {
    setDisplayCount(PAGE_SIZE);
  }, [images]);

  // Infinite-scroll via IntersectionObserver
  const loadMore = useCallback(() => {
    setDisplayCount((prev) => prev + PAGE_SIZE);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "300px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  // Build the visible list — cycle through `images` indefinitely
  if (images.length === 0) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-gray-500 px-4 text-center">
        <span className="text-4xl mb-4">🔍</span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
        <p className="text-sm">
          Try a different search or pick another category.
        </p>
      </div>
    );
  }

  // Each visible slot: take item at cycled index, give it a unique React key
  const visibleItems = Array.from({ length: displayCount }, (_, i) => {
    const img = images[i % images.length] as PicsrestImage;
    // Append the cycle index so the key stays unique as we scroll past one full cycle
    const uniqueKey = `${img.id}-${Math.floor(i / images.length)}-${i % images.length}`;
    return { img, uniqueKey, index: i };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* CSS-columns masonry — 2 / 3 / 4 columns by breakpoint */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
        {visibleItems.map(({ img, uniqueKey, index }) => (
          <div key={uniqueKey} className="break-inside-avoid mb-3">
            <ImageCard
              image={img}
              onClick={() => onImageClick(img.id)}
              eager={index < PAGE_SIZE}
            />
          </div>
        ))}
      </div>

      {/* Sentinel + loading indicator */}
      <div
        ref={sentinelRef}
        className="py-10 flex justify-center"
        aria-hidden="true"
      >
        <span className="flex items-center gap-2 text-sm text-gray-400">
          <span className="w-4 h-4 border-2 border-gray-200 border-t-orange-400 rounded-full animate-spin" />
          Loading more…
        </span>
      </div>
    </div>
  );
}
