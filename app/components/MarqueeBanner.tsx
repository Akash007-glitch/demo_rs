"use client";

import React from "react";

export default function MarqueeBanner() {
  const items = [
    "HAPPY BITES",
    "FUN FLAVORS",
    "SO TASTY",
    "FAST & FRESH",
    "SNACK TIME",
    "CRISPY FRIES",
    "JUICY PATTIES",
    "MELTY CHEESE",
  ];

  return (
    <div className="relative w-full bg-[#F5B324] py-3 sm:py-3.5 overflow-hidden shadow-md z-20 select-none border-y-2 border-[#E2A117]">
      <div className="animate-marquee flex items-center gap-8 sm:gap-12 whitespace-nowrap">
        {/* First set */}
        <div className="flex items-center gap-8 sm:gap-12">
          {items.map((item, idx) => (
            <div key={`item-1-${idx}`} className="flex items-center gap-8 sm:gap-12">
              <span className="font-display text-lg sm:text-2xl text-[#234F38] tracking-wider uppercase flex items-center">
                {item}
              </span>
              <span className="text-[#234F38] text-base sm:text-xl font-black">✱</span>
            </div>
          ))}
        </div>
        {/* Duplicate set for seamless infinite loop (hidden from screen readers) */}
        <div className="flex items-center gap-8 sm:gap-12" aria-hidden="true">
          {items.map((item, idx) => (
            <div key={`item-2-${idx}`} className="flex items-center gap-8 sm:gap-12">
              <span className="font-display text-lg sm:text-2xl text-[#234F38] tracking-wider uppercase flex items-center">
                {item}
              </span>
              <span className="text-[#234F38] text-base sm:text-xl font-black">✱</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
