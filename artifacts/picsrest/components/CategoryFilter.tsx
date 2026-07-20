"use client";

import { Category, CATEGORIES } from "@/lib/images";

interface CategoryFilterProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export default function CategoryFilter({ activeCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto py-3 gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
