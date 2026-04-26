"use client";

import React, { useState } from "react";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";

function checkIsOpenNow(): boolean {
  if (typeof window === "undefined") return true;
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 6 = Sat
  const hour = now.getHours();

  const isWeekend = day === 0 || day === 6;
  if (isWeekend) {
    return hour >= 9 && hour < 24;
  }
  return hour >= 8 && hour < 22;
}

export default function OpeningHoursSection() {
  const [isOpenNow] = useState<boolean>(checkIsOpenNow);

  return (
    <section id="hours" className="relative w-full bg-[#234F38] pt-8 pb-0 overflow-hidden z-10">
      {/* Cloud Shape Transition */}
      <div className="relative w-full">
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,180 L1440,180 L1440,70 C1370,120 1280,10 1180,60 C1080,110 980,10 880,50 C780,90 680,20 580,50 C480,80 380,0 280,50 C180,100 80,20 0,70 Z"
            fill="#F4EBD9"
          />
        </svg>
      </div>

      {/* Opening Hours Content on Cream Background */}
      <div className="bg-[#F4EBD9] text-[#234F38] py-8 sm:py-14 px-4 sm:px-6 text-center -mt-1">
        <div className="max-w-4xl mx-auto">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#234F38] text-[#F4EBD9] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isOpenNow ? "bg-emerald-400 animate-ping" : "bg-amber-400"
              }`}
            />
            <span className="flex items-center gap-1.5">
              {isOpenNow ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kitchen Is Open Now • Taking Orders</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Currently Closed • Opens Tomorrow at 8 AM</span>
                </>
              )}
            </span>
          </div>

          {/* Section Title */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#234F38] uppercase tracking-tight leading-none mb-8 sm:mb-10">
            OPENING HOURS
          </h2>

          {/* Schedule Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 max-w-2xl mx-auto items-center">
            
            {/* Weekdays */}
            <div className="flex flex-col items-center sm:border-r border-[#234F38]/25 sm:pr-8 bg-white/40 sm:bg-transparent p-6 sm:p-0 rounded-2xl shadow-sm sm:shadow-none border border-[#234F38]/10 sm:border-0">
              <span className="font-display text-xs sm:text-sm tracking-widest text-[#234F38]/80 uppercase font-bold mb-3 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#234F38]" />
                <span>MON TO FRI:</span>
              </span>
              <div className="flex items-baseline gap-2 text-[#234F38]">
                <div className="flex items-start">
                  <span className="font-display text-4xl sm:text-5xl md:text-6xl leading-none">8</span>
                  <div className="flex flex-col text-[10px] font-black leading-tight ml-1 -mt-1 text-left">
                    <span>A</span>
                    <span>M</span>
                  </div>
                </div>

                <span className="font-display text-3xl sm:text-4xl px-2 text-[#234F38]/60">-</span>

                <div className="flex items-start">
                  <span className="font-display text-4xl sm:text-5xl md:text-6xl leading-none">10</span>
                  <div className="flex flex-col text-[10px] font-black leading-tight ml-1 -mt-1 text-left">
                    <span>P</span>
                    <span>M</span>
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-[#234F38]/70 font-semibold mt-2">
                Breakfast, Lunch & Dinner Service
              </span>
            </div>

            {/* Weekends */}
            <div className="flex flex-col items-center sm:pl-8 bg-white/40 sm:bg-transparent p-6 sm:p-0 rounded-2xl shadow-sm sm:shadow-none border border-[#234F38]/10 sm:border-0">
              <span className="font-display text-xs sm:text-sm tracking-widest text-[#234F38]/80 uppercase font-bold mb-3 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#234F38]" />
                <span>SAT TO SUN:</span>
              </span>
              <div className="flex items-baseline gap-2 text-[#234F38]">
                <div className="flex items-start">
                  <span className="font-display text-4xl sm:text-5xl md:text-6xl leading-none">9</span>
                  <div className="flex flex-col text-[10px] font-black leading-tight ml-1 -mt-1 text-left">
                    <span>A</span>
                    <span>M</span>
                  </div>
                </div>

                <span className="font-display text-3xl sm:text-4xl px-2 text-[#234F38]/60">-</span>

                <div className="flex items-start">
                  <span className="font-display text-4xl sm:text-5xl md:text-6xl leading-none">12</span>
                  <div className="flex flex-col text-[10px] font-black leading-tight ml-1 -mt-1 text-left">
                    <span>A</span>
                    <span>M</span>
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-[#234F38]/70 font-semibold mt-2">
                Late Night Cravings & Weekend Brunch
              </span>
            </div>

          </div>

          <p className="mt-8 text-xs text-[#234F38]/75 font-medium max-w-md mx-auto">
            Takeout pickup and express delivery available until 30 minutes before closing.
          </p>
        </div>
      </div>
    </section>
  );
}
