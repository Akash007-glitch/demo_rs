import React from "react";

export default function DoodleBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.09] select-none z-0">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="food-doodles"
            x="0"
            y="0"
            width="280"
            height="280"
            patternUnits="userSpaceOnUse"
          >
            {/* Burger doodle */}
            <g transform="translate(30, 30) scale(0.7)" stroke="#F4EBD9" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 10 30 Q 35 5, 60 30 Z" />
              <path d="M 5 38 Q 35 34, 65 38" />
              <path d="M 8 46 Q 35 44, 62 46" />
              <rect x="10" y="52" width="50" height="8" rx="4" />
              <circle cx="25" cy="18" r="1.5" fill="#F4EBD9" />
              <circle cx="38" cy="15" r="1.5" fill="#F4EBD9" />
              <circle cx="48" cy="22" r="1.5" fill="#F4EBD9" />
            </g>

            {/* Fries doodle */}
            <g transform="translate(180, 20) scale(0.65)" stroke="#F4EBD9" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <path d="M 15 35 L 20 85 L 50 85 L 55 35 Z" />
              <path d="M 22 35 L 22 15" />
              <path d="M 28 35 L 30 5" />
              <path d="M 35 35 L 36 10" />
              <path d="M 42 35 L 44 18" />
              <path d="M 48 35 L 48 24" />
            </g>

            {/* Drink Cup with Straw */}
            <g transform="translate(200, 160) scale(0.65)" stroke="#F4EBD9" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <path d="M 18 30 L 25 80 L 55 80 L 62 30 Z" />
              <ellipse cx="40" cy="30" rx="22" ry="5" />
              <path d="M 40 28 L 52 5" />
            </g>

            {/* Pizza Slice */}
            <g transform="translate(40, 170) scale(0.7)" stroke="#F4EBD9" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 15 20 Q 45 15, 65 30 L 35 80 Z" />
              <circle cx="36" cy="38" r="3" />
              <circle cx="45" cy="52" r="3" />
            </g>

            {/* Hotdog */}
            <g transform="translate(110, 100) scale(0.65)" stroke="#F4EBD9" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <rect x="10" y="20" width="55" height="24" rx="12" />
              <path d="M 5 28 C 15 22, 25 38, 35 28 C 45 20, 55 36, 65 28" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#food-doodles)" />
      </svg>
    </div>
  );
}
