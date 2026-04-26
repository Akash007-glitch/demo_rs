"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ChefHat, Truck, UtensilsCrossed, ChevronRight } from "lucide-react";

interface FeatureSectionProps {
  onSelectFeature?: (id: number) => void;
}

export default function FeatureSection({ onSelectFeature }: FeatureSectionProps) {
  const [activePin, setActivePin] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      side: "left",
      title: "FRESH INGREDIENTS",
      description:
        "Sourced daily, our beef, buns, and veggies deliver unbeatable freshness and flavor in every bite.",
      icon: <Sparkles className="w-4 h-4 text-[#234F38]" />,
      highlightText: "🥬 Fresh Organic Greens & Vine Tomatoes",
      pinLabel: "Top Bun & Fresh Greens",
    },
    {
      id: 2,
      side: "left",
      title: "FUN FLAVOR COMBOS",
      description:
        "Playful sauces, cheesy layers, and bold toppings come together for exciting taste experiences.",
      icon: <UtensilsCrossed className="w-4 h-4 text-[#234F38]" />,
      highlightText: "🧀 Gooey Dripping Cheddar & Secret Sauce",
      pinLabel: "Melted Cheddar & Glaze",
    },
    {
      id: 3,
      side: "right",
      title: "CUSTOM YOUR WAY",
      description:
        "Choose your bun, patty, toppings, and sauce to enjoy a burger made just for you.",
      icon: <ChefHat className="w-4 h-4 text-[#234F38]" />,
      highlightText: "🍗 Double Patty: Crispy Fried Chicken & Smash Beef",
      pinLabel: "Prime Double Patties",
    },
    {
      id: 4,
      side: "right",
      title: "FAST DELIVERY",
      description:
        "Hot, juicy burgers delivered quickly so you can enjoy happiness without the wait.",
      icon: <Truck className="w-4 h-4 text-[#234F38]" />,
      highlightText: "⚡ Hot In Under 30 Mins Guaranteed",
      pinLabel: "Insulated Thermal Delivery",
    },
  ];

  const handleToggleFeature = (id: number) => {
    const nextId = activePin === id ? null : id;
    setActivePin(nextId);
    if (onSelectFeature && nextId !== null) {
      onSelectFeature(nextId);
    }
  };

  return (
    <section id="features" className="relative w-full bg-[#234F38] pt-0 pb-20 overflow-hidden">
      {/* Upper Cream Scalloped Cloud Area containing the Title */}
      <div className="relative bg-[#F4EBD9] text-[#234F38] pt-12 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold tracking-widest text-[#234F38]/70 uppercase">
            WHY FOOD LOVERS CHOOSE US
          </span>
          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#234F38] tracking-tight uppercase leading-[0.95] drop-shadow-sm mt-1">
            WHAT MAKES
            <br />
            BUNBITE DIFFERENT?
          </h2>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base text-[#234F38]/85 max-w-xl mx-auto font-medium leading-relaxed">
            Where fresh ingredients meet fun flavors, and your perfect burger comes to life, one tasty bite at a time.
          </p>

          <p className="mt-3 text-[11px] font-bold text-[#234F38]/60 uppercase tracking-widest sm:hidden">
            Tap any feature or pin below to explore layers
          </p>
        </div>

        {/* Bottom Wave/Cloud Cutout transitioning back to Green */}
        <div className="absolute left-0 right-0 bottom-0 translate-y-full z-10 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 L1440,0 L1440,30 C1360,85 1260,110 1140,80 C1020,50 920,110 800,80 C680,50 560,110 440,80 C320,50 200,105 100,75 L0,100 Z"
              fill="#F4EBD9"
            />
          </svg>
        </div>
      </div>

      {/* Main Interactive Burger Showcase & Feature Cards */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative">
          
          {/* Left Column (Cards 1 & 2 on Desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-8 order-2 lg:order-1">
            {features.filter(f => f.side === "left").map((feature) => (
              <div
                key={feature.id}
                role="button"
                tabIndex={0}
                aria-pressed={activePin === feature.id}
                onClick={() => handleToggleFeature(feature.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggleFeature(feature.id);
                  }
                }}
                onMouseEnter={() => setActivePin(feature.id)}
                onMouseLeave={() => setActivePin(null)}
                className={`group relative p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer border select-none focus-visible:ring-2 focus-visible:ring-[#F5B324] ${
                  activePin === feature.id
                    ? "bg-[#1E4330] border-[#F5B324] shadow-xl shadow-black/20 scale-[1.02]"
                    : "bg-[#1E4330]/30 border-transparent hover:bg-[#1E4330]/70 hover:border-[#F4EBD9]/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F4EBD9] flex items-center justify-center shadow-md group-hover:bg-[#F5B324] transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="font-display text-base sm:text-lg text-[#F4EBD9] tracking-wide uppercase group-hover:text-[#F5B324] transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-[#F4EBD9]/20 text-[#F4EBD9] text-xs font-bold flex items-center justify-center group-hover:bg-[#F5B324] group-hover:text-[#234F38] transition-colors">
                    {feature.id}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#F4EBD9]/85 leading-relaxed pl-1">
                  {feature.description}
                </p>
                {activePin === feature.id && (
                  <p className="mt-2 text-xs font-semibold text-[#F5B324] flex items-center gap-1">
                    <ChevronRight className="w-3.5 h-3.5" />
                    {feature.highlightText}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Center Column: Burger Visual with Pin Hotspots */}
          <div className="lg:col-span-4 flex justify-center relative order-1 lg:order-2 my-2 lg:my-0">
            <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] flex items-center justify-center">
              
              {/* Soft background glow */}
              <div className="absolute inset-4 rounded-full bg-[#F5B324]/10 blur-3xl pointer-events-none" />

              {/* Burger Centerpiece Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-[#F4EBD9]/25 hover:border-[#F5B324]/60 transition-all duration-500">
                <Image
                  src="/images/feature_burger.jpg"
                  alt="Double stacked burger with dripping cheese and crispy chicken"
                  fill
                  className={`object-cover transform transition-all duration-500 ${
                    activePin ? "scale-105" : "scale-100"
                  }`}
                />

                {/* Interactive Highlight Overlay Banner when pin/card is active */}
                {activePin && (
                  <div className="absolute bottom-4 left-4 right-4 bg-[#1A3E2C]/95 backdrop-blur-md border border-[#F5B324] py-2 px-3 rounded-xl text-center shadow-lg animate-in fade-in zoom-in-95 duration-200">
                    <p className="text-xs font-bold text-[#F5B324] tracking-wide">
                      {features.find(f => f.id === activePin)?.highlightText}
                    </p>
                  </div>
                )}
              </div>

              {/* Numbered Pin Badges (1, 2, 3, 4) */}
              {/* Pin 1 (Top Left) */}
              <button
                onClick={() => handleToggleFeature(1)}
                onMouseEnter={() => setActivePin(1)}
                onMouseLeave={() => setActivePin(null)}
                className={`absolute left-0 sm:-left-3 top-[26%] w-8 h-8 sm:w-9 sm:h-9 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center cursor-pointer transition-all duration-300 z-20 focus-visible:ring-2 focus-visible:ring-white ${
                  activePin === 1
                    ? "bg-[#F5B324] text-[#234F38] scale-125 shadow-lg shadow-[#F5B324]/50 animate-pulse-ring"
                    : "bg-[#F4EBD9] text-[#234F38] hover:bg-[#F5B324] hover:scale-110 shadow-md"
                }`}
                aria-label="Toggle Pin 1: Fresh Ingredients"
                aria-pressed={activePin === 1}
              >
                1
              </button>

              {/* Pin 2 (Bottom Left) */}
              <button
                onClick={() => handleToggleFeature(2)}
                onMouseEnter={() => setActivePin(2)}
                onMouseLeave={() => setActivePin(null)}
                className={`absolute left-0 sm:-left-3 bottom-[26%] w-8 h-8 sm:w-9 sm:h-9 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center cursor-pointer transition-all duration-300 z-20 focus-visible:ring-2 focus-visible:ring-white ${
                  activePin === 2
                    ? "bg-[#F5B324] text-[#234F38] scale-125 shadow-lg shadow-[#F5B324]/50 animate-pulse-ring"
                    : "bg-[#F4EBD9] text-[#234F38] hover:bg-[#F5B324] hover:scale-110 shadow-md"
                }`}
                aria-label="Toggle Pin 2: Fun Flavor Combos"
                aria-pressed={activePin === 2}
              >
                2
              </button>

              {/* Pin 3 (Top Right) */}
              <button
                onClick={() => handleToggleFeature(3)}
                onMouseEnter={() => setActivePin(3)}
                onMouseLeave={() => setActivePin(null)}
                className={`absolute right-0 sm:-right-3 top-[26%] w-8 h-8 sm:w-9 sm:h-9 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center cursor-pointer transition-all duration-300 z-20 focus-visible:ring-2 focus-visible:ring-white ${
                  activePin === 3
                    ? "bg-[#F5B324] text-[#234F38] scale-125 shadow-lg shadow-[#F5B324]/50 animate-pulse-ring"
                    : "bg-[#F4EBD9] text-[#234F38] hover:bg-[#F5B324] hover:scale-110 shadow-md"
                }`}
                aria-label="Toggle Pin 3: Custom Your Way"
                aria-pressed={activePin === 3}
              >
                3
              </button>

              {/* Pin 4 (Bottom Right) */}
              <button
                onClick={() => handleToggleFeature(4)}
                onMouseEnter={() => setActivePin(4)}
                onMouseLeave={() => setActivePin(null)}
                className={`absolute right-0 sm:-right-3 bottom-[26%] w-8 h-8 sm:w-9 sm:h-9 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center cursor-pointer transition-all duration-300 z-20 focus-visible:ring-2 focus-visible:ring-white ${
                  activePin === 4
                    ? "bg-[#F5B324] text-[#234F38] scale-125 shadow-lg shadow-[#F5B324]/50 animate-pulse-ring"
                    : "bg-[#F4EBD9] text-[#234F38] hover:bg-[#F5B324] hover:scale-110 shadow-md"
                }`}
                aria-label="Toggle Pin 4: Fast Delivery"
                aria-pressed={activePin === 4}
              >
                4
              </button>
            </div>
          </div>

          {/* Right Column (Cards 3 & 4 on Desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-8 order-3">
            {features.filter(f => f.side === "right").map((feature) => (
              <div
                key={feature.id}
                role="button"
                tabIndex={0}
                aria-pressed={activePin === feature.id}
                onClick={() => handleToggleFeature(feature.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggleFeature(feature.id);
                  }
                }}
                onMouseEnter={() => setActivePin(feature.id)}
                onMouseLeave={() => setActivePin(null)}
                className={`group relative p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer border select-none focus-visible:ring-2 focus-visible:ring-[#F5B324] ${
                  activePin === feature.id
                    ? "bg-[#1E4330] border-[#F5B324] shadow-xl shadow-black/20 scale-[1.02]"
                    : "bg-[#1E4330]/30 border-transparent hover:bg-[#1E4330]/70 hover:border-[#F4EBD9]/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F4EBD9] flex items-center justify-center shadow-md group-hover:bg-[#F5B324] transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="font-display text-base sm:text-lg text-[#F4EBD9] tracking-wide uppercase group-hover:text-[#F5B324] transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-[#F4EBD9]/20 text-[#F4EBD9] text-xs font-bold flex items-center justify-center group-hover:bg-[#F5B324] group-hover:text-[#234F38] transition-colors">
                    {feature.id}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#F4EBD9]/85 leading-relaxed pl-1">
                  {feature.description}
                </p>
                {activePin === feature.id && (
                  <p className="mt-2 text-xs font-semibold text-[#F5B324] flex items-center gap-1">
                    <ChevronRight className="w-3.5 h-3.5" />
                    {feature.highlightText}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
