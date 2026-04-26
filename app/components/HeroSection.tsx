"use client";

import React from "react";
import Image from "next/image";
import { Utensils, Calendar, Star, Clock, Flame } from "lucide-react";

interface HeroSectionProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export default function HeroSection({ onOpenReservation, onOpenOrder }: HeroSectionProps) {
  return (
    <section className="relative pt-6 sm:pt-10 pb-0 overflow-hidden text-center z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative flex flex-col items-center">
        {/* Top Tagline / Social Proof Pill */}
        <div className="inline-flex items-center gap-2 bg-[#1A3E2C]/80 border border-[#F5B324]/40 px-3.5 py-1.5 rounded-full mb-3 sm:mb-4 shadow-sm backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex text-[#F5B324]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#F5B324]" />
            ))}
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#F4EBD9] tracking-wider uppercase">
            4.9 / 5 • Over 3,500+ Happy Foodies
          </span>
        </div>

        {/* Retro 3D Bubble Headline */}
        <div className="mb-3 sm:mb-4 select-none">
          <h1 className="flex flex-col items-center leading-[0.88] sm:leading-[0.85] tracking-wide">
            <span className="retro-headline text-5xl sm:text-7xl md:text-8xl lg:text-[104px] uppercase font-normal">
              DELICIOUS
            </span>
            <span className="retro-headline text-5xl sm:text-7xl md:text-8xl lg:text-[104px] uppercase font-normal mt-1 sm:mt-2">
              BURGERS
            </span>
          </h1>
        </div>

        {/* Subtitle description */}
        <p className="max-w-md sm:max-w-xl text-xs sm:text-sm md:text-base text-[#F4EBD9]/85 font-medium leading-relaxed px-4 mb-5 sm:mb-6">
          Handcrafted smash patties, golden brioche baked daily, and legendary house sauces made fresh to order.
        </p>

        {/* Hero CTA Button Group */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-4 z-20">
          <button
            onClick={onOpenOrder}
            className="inline-flex items-center gap-2 bg-[#F5B324] hover:bg-[#E2A117] text-[#234F38] font-display text-sm sm:text-base px-6 sm:px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#F5B324]/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider font-bold focus-visible:ring-2 focus-visible:ring-white"
          >
            <Utensils className="w-4 h-4" />
            <span>ORDER ONLINE</span>
          </button>

          <button
            onClick={onOpenReservation}
            className="inline-flex items-center gap-2 bg-transparent hover:bg-[#F4EBD9] text-[#F4EBD9] hover:text-[#234F38] border-2 border-[#F4EBD9] font-display text-sm sm:text-base px-5 sm:px-7 py-2.5 rounded-full transition-all transform hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider font-bold focus-visible:ring-2 focus-visible:ring-[#F5B324]"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK A TABLE</span>
          </button>
        </div>

        {/* Key USPs / Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-3 text-xs text-[#F4EBD9]/75 font-semibold">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#F5B324]" /> 25-Min Hot Delivery
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#F5B324]" /> 100% Grass-Fed Angus
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#F5B324]">★</span> Fresh Brioche Buns
          </span>
        </div>

        {/* Central Hands Holding Burger Hero Graphic */}
        <div className="relative mt-5 sm:mt-6 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[540px] flex justify-center items-center">
          {/* Burger Graphic Container */}
          <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] rounded-full overflow-hidden shadow-2xl border-4 border-[#F4EBD9]/20 animate-hero-float">
            <Image
              src="/images/hero_burger.jpg"
              alt="Hands holding fresh gourmet burger with sesame bun and cheese"
              fill
              priority
              className="object-cover scale-105 hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Soft inner glow vignette to seamlessly blend edges */}
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#F4EBD9]/30 pointer-events-none" />
          </div>

          {/* Floating Rotating "Reserve a Table" Sunburst Badge */}
          <button
            onClick={onOpenReservation}
            aria-label="Reserve a Table"
            className="group absolute right-0 sm:right-4 md:right-6 top-[48%] -translate-y-1/2 z-20 cursor-pointer transform hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#F5B324] rounded-full"
          >
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center filter drop-shadow-lg">
              {/* Scalloped Starburst Base */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full fill-[#F5B324] text-[#F5B324] transition-colors group-hover:fill-[#FFC338]"
              >
                <path d="M50 0 C53 8 57 10 65 8 C73 6 78 12 80 20 C82 28 88 32 92 38 C96 44 94 52 92 60 C90 68 93 75 88 82 C83 89 75 90 68 94 C61 98 54 96 50 100 C46 96 39 98 32 94 C25 90 17 89 12 82 C7 75 10 68 8 60 C6 52 4 44 8 38 C12 32 18 28 20 20 C22 12 27 6 35 8 C43 10 47 8 50 0 Z" />
              </svg>

              {/* Rotating Circular Text */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full animate-spin-badge"
              >
                <path
                  id="tableTextPath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="none"
                />
                <text className="text-[9.5px] font-bold fill-[#234F38] tracking-[0.14em] uppercase font-sans">
                  <textPath href="#tableTextPath" startOffset="0%">
                    • Reserve a Table • Reserve a Table
                  </textPath>
                </text>
              </svg>

              {/* Center Diagonal Arrow */}
              <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#234F38] flex items-center justify-center text-[#F5B324] shadow-inner group-hover:bg-[#1A3E2C] transition-colors">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.8"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7V15" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Scalloped Cloud Curve Transition into Feature Section */}
      <div className="relative w-full -mt-10 sm:-mt-16 z-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,220 L1440,220 L1440,110 C1380,105 1330,60 1280,75 C1220,95 1170,30 1090,35 C1010,40 960,0 870,5 C780,10 740,45 680,45 C620,45 580,10 500,5 C420,0 370,40 290,35 C210,30 160,95 100,75 C50,60 20,105 0,110 Z"
            fill="#F4EBD9"
          />
        </svg>
      </div>
    </section>
  );
}
