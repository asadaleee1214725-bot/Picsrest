"use client";

import { useState, useMemo } from "react";
import { ALL_IMAGES, Category } from "@/lib/images";
import CategoryFilter from "@/components/CategoryFilter";
import ImageGrid from "@/components/ImageGrid";
import ImageModal from "@/components/ImageModal";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const filteredImages = useMemo(() => {
    return ALL_IMAGES.filter((img) => {
      const matchesCategory = activeCategory === "All" || img.category === activeCategory;
      const matchesSearch =
        img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.creator.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const selectedImage = useMemo(() => {
    return ALL_IMAGES.find((img) => img.id === selectedImageId) || null;
  }, [selectedImageId]);

  return (
    <main className="min-h-screen bg-white flex flex-col relative">
      {/* ── Navigation Bar ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">

            {/* Logo */}
            <a
              href="/"
              className="flex-shrink-0 flex items-center gap-1.5 select-none"
              aria-label="Picsrest home"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-500 text-white font-extrabold text-sm tracking-tight shadow-sm">
                PR
              </span>
              <span className="hidden sm:inline text-lg font-bold text-gray-900 tracking-tight">
                Picsrest
              </span>
            </a>

            {/* Search bar — centered, grows */}
            <div className="flex-1 max-w-2xl mx-auto">
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                  <SearchIcon />
                </span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for ideas, photos, inspiration…"
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 border border-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white focus:border-orange-300 transition"
                />
              </div>
            </div>

            {/* Auth buttons — desktop */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              <button className="px-4 py-2 rounded-full text-sm font-semibold text-gray-700 border border-gray-200 hover:border-orange-400 hover:text-orange-600 transition-colors">
                Log in
              </button>
              <button className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-sm transition-colors">
                Sign up
              </button>
            </div>

            {/* Hamburger — mobile */}
            <button
              className="sm:hidden flex-shrink-0 p-2 rounded-lg text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 sm:hidden border-b border-gray-100 bg-white px-4 pb-4 pt-3 flex flex-col gap-2 shadow-lg z-50">
            <button className="w-full py-2.5 rounded-full text-sm font-semibold text-gray-700 border border-gray-200 hover:border-orange-400 hover:text-orange-600 transition-colors">
              Log in
            </button>
            <button className="w-full py-2.5 rounded-full text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors">
              Sign up
            </button>
          </div>
        )}
      </nav>

      <CategoryFilter 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />

      <div className="flex-1">
        <ImageGrid 
          images={filteredImages} 
          onImageClick={setSelectedImageId} 
        />
      </div>

      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          onClose={() => setSelectedImageId(null)} 
        />
      )}
    </main>
  );
}

/* ── Icon components ── */

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="22" y2="22" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  );
}
