"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Star, ArrowLeft, ArrowRight, CheckCircle2, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 0,
      author: "Lucas Martinez",
      role: "Verified Foodie",
      tag: "Dine-in Customer",
      date: "Yesterday",
      rating: 5,
      quote:
        "GREAT TASTE, AND SUPER FRESH INGREDIENTS! HANDS DOWN ONE OF THE BEST BURGERS I'VE EVER HAD IN THE CITY!",
    },
    {
      id: 1,
      author: "Emily Grace",
      role: "Burger Connoisseur",
      tag: "Regular Visitor",
      date: "3 days ago",
      rating: 5,
      quote:
        "I LOVE HOW FRESH EVERYTHING TASTES! THE FLAVORS ARE AMAZING, AND THE BURGERS ARE ALWAYS JUICY AND SATISFYING.",
    },
    {
      id: 2,
      author: "Daniel Kim",
      role: "Verified Foodie",
      tag: "Online Order",
      date: "1 week ago",
      rating: 5,
      quote:
        "BUNBITE IS MY GO TO FOR WEEKEND BURGERS! SO MANY FUN FLAVOR COMBOS AND THE SPECIAL CHEESE SAUCE NEVER DISAPPOINTS.",
    },
    {
      id: 3,
      author: "Sophia Ramirez",
      role: "Food Blogger & Critic",
      tag: "Local Guide",
      date: "2 weeks ago",
      rating: 5,
      quote:
        "THE CRISPY CHICKEN & SMASH PATTY COMBO IS LEGENDARY. YOU CAN TASTE THE QUALITY IN EVERY CRUNCH!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, [testimonials.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, [testimonials.length]);

  // Keyboard navigation for testimonials
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  const getCard = (offset: number) => {
    const idx = (currentIndex + offset + testimonials.length) % testimonials.length;
    return testimonials[idx];
  };

  const leftCard = getCard(-1);
  const centerCard = getCard(0);
  const rightCard = getCard(1);

  return (
    <section id="testimonials" className="relative w-full bg-[#234F38] pt-16 pb-18 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-[#F5B324] uppercase">
            REAL REVIEWS FROM REAL FOODIES
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#F4EBD9] uppercase tracking-tight leading-none mt-1">
            BITES OF HAPPINESS
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#F4EBD9]/80 max-w-xl mx-auto font-medium leading-relaxed">
            See why customers keep rating us five stars for taste, freshness, and premium
            quality flavor in every bite.
          </p>
        </div>

        {/* 3-Card Carousel Container */}
        <div className="relative flex items-center justify-center gap-4 sm:gap-6 py-4">
          
          {/* Left Card (Partially Visible / Faded Peek) */}
          <div
            onClick={prevSlide}
            role="button"
            tabIndex={0}
            aria-label={`Previous review by ${leftCard.author}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                prevSlide();
              }
            }}
            className="hidden md:flex flex-col justify-between w-64 lg:w-72 h-64 p-6 rounded-3xl border border-[#F4EBD9]/20 bg-[#1E4330]/60 text-[#F4EBD9]/50 backdrop-blur-sm transform scale-90 opacity-60 hover:opacity-80 transition-all cursor-pointer shrink-0 select-none focus-visible:ring-2 focus-visible:ring-[#F5B324]"
          >
            <div>
              <div className="flex gap-1 mb-3">
                {[...Array(leftCard.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F4EBD9]/40 text-[#F4EBD9]/40" />
                ))}
              </div>
              <p className="font-display text-xs uppercase leading-snug line-clamp-4">
                &ldquo;{leftCard.quote}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-2.5 pt-2">
              <div className="w-7 h-7 rounded-full bg-[#F4EBD9]/20 flex items-center justify-center font-bold text-xs text-[#F4EBD9]">
                {leftCard.author[0]}
              </div>
              <span className="font-display text-xs uppercase text-[#F4EBD9]/80">{leftCard.author}</span>
            </div>
          </div>

          {/* Center Active Card (Solid Cream with Dark Green Text) */}
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-[#F4EBD9] text-[#234F38] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl transform transition-all duration-300 flex flex-col justify-between text-center min-h-[280px] sm:min-h-[300px] border-2 border-[#F5B324]/40 relative">
            <div className="absolute top-4 right-5 opacity-15">
              <Quote className="w-10 h-10 text-[#234F38]" />
            </div>

            <div>
              {/* 5-Star Rating */}
              <div className="flex justify-center items-center gap-1.5 mb-4">
                {[...Array(centerCard.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#F5B324] text-[#F5B324]" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="font-display text-base sm:text-lg md:text-xl uppercase leading-relaxed tracking-wide text-[#234F38]">
                &ldquo;{centerCard.quote}&rdquo;
              </blockquote>
            </div>

            {/* Author Profile */}
            <div className="flex items-center justify-center gap-3 mt-6 pt-2 border-t border-[#234F38]/15">
              <div className="w-10 h-10 rounded-full bg-[#234F38] text-[#F5B324] font-display font-bold text-base flex items-center justify-center shadow-md ring-2 ring-[#F5B324]/60">
                {centerCard.author[0]}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <p className="font-display text-sm uppercase text-[#234F38] tracking-wider leading-none">
                    {centerCard.author}
                  </p>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#234F38] fill-[#F5B324]" />
                </div>
                <p className="text-[10px] text-[#234F38]/80 font-bold uppercase tracking-wider mt-0.5">
                  {centerCard.role} • <span className="text-[#234F38]/60">{centerCard.date}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Card (Partially Visible / Faded Peek) */}
          <div
            onClick={nextSlide}
            role="button"
            tabIndex={0}
            aria-label={`Next review by ${rightCard.author}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                nextSlide();
              }
            }}
            className="hidden md:flex flex-col justify-between w-64 lg:w-72 h-64 p-6 rounded-3xl border border-[#F4EBD9]/20 bg-[#1E4330]/60 text-[#F4EBD9]/50 backdrop-blur-sm transform scale-90 opacity-60 hover:opacity-80 transition-all cursor-pointer shrink-0 select-none focus-visible:ring-2 focus-visible:ring-[#F5B324]"
          >
            <div>
              <div className="flex gap-1 mb-3">
                {[...Array(rightCard.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F4EBD9]/40 text-[#F4EBD9]/40" />
                ))}
              </div>
              <p className="font-display text-xs uppercase leading-snug line-clamp-4">
                &ldquo;{rightCard.quote}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-2.5 pt-2">
              <div className="w-7 h-7 rounded-full bg-[#F4EBD9]/20 flex items-center justify-center font-bold text-xs text-[#F4EBD9]">
                {rightCard.author[0]}
              </div>
              <span className="font-display text-xs uppercase text-[#F4EBD9]/80">{rightCard.author}</span>
            </div>
          </div>

        </div>

        {/* Carousel Controls & Pagination Dots */}
        <div className="flex flex-col items-center gap-4 mt-8">
          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? "w-8 bg-[#F5B324]" : "w-2.5 bg-[#F4EBD9]/30 hover:bg-[#F4EBD9]/60"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border-2 border-[#F4EBD9]/40 hover:border-[#F4EBD9] bg-[#1E4330]/60 hover:bg-[#F4EBD9] text-[#F4EBD9] hover:text-[#234F38] flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md focus-visible:ring-2 focus-visible:ring-[#F5B324]"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border-2 border-[#F4EBD9]/40 hover:border-[#F4EBD9] bg-[#1E4330]/60 hover:bg-[#F4EBD9] text-[#F4EBD9] hover:text-[#234F38] flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md focus-visible:ring-2 focus-visible:ring-[#F5B324]"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
