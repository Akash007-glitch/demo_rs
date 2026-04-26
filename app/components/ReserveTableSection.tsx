"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, ChevronDown, Check, Sparkles, Copy, CheckCircle2 } from "lucide-react";

export default function ReserveTableSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: "2 Guests",
    date: "",
    time: "19:00",
    seating: "Indoor Dining Room",
    occasion: "Casual Dinner",
    specialRequests: "",
  });

  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);
  const [reservationCode, setReservationCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `BUN-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationCode(randomCode);
    setSubmittedData({ ...formData });
  };

  const handleReset = () => {
    setSubmittedData(null);
    setReservationCode("");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      guests: "2 Guests",
      date: "",
      time: "19:00",
      seating: "Indoor Dining Room",
      occasion: "Casual Dinner",
      specialRequests: "",
    });
  };

  const handleCopyCode = () => {
    if (reservationCode) {
      navigator.clipboard?.writeText(reservationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="reservation" className="relative w-full bg-[#234F38] py-14 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Split Card Container */}
        <div className="bg-[#F4EBD9] rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 border-4 border-[#F4EBD9]/40">
          
          {/* Left Column: Reservation Form */}
          <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-[#234F38]">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-[#234F38]/70 uppercase">
                GUARANTEE YOUR SPOT
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#234F38] uppercase tracking-tight leading-none mt-1">
                RESERVE YOUR TABLE
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#234F38]/80 leading-relaxed font-medium">
                Book your spot and enjoy fresh, fun, and flavorful burgers with your favorite people.
              </p>
            </div>

            {submittedData ? (
              <div className="py-8 text-center animate-in zoom-in-95 duration-200 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#234F38] text-[#F5B324] flex items-center justify-center mx-auto shadow-lg ring-4 ring-[#234F38]/20">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                
                <div>
                  <h3 className="font-display text-2xl uppercase text-[#234F38]">
                    RESERVATION CONFIRMED!
                  </h3>
                  <p className="text-xs text-[#234F38]/85 mt-1">
                    Thank you, {submittedData.fullName}! We&apos;ve reserved your table.
                  </p>
                </div>

                {/* Booking Summary Box */}
                <div className="bg-[#EFE6D5] rounded-2xl p-4 border border-[#234F38]/20 text-left space-y-2 text-xs text-[#234F38]">
                  <div className="flex justify-between items-center pb-2 border-b border-[#234F38]/15">
                    <span className="font-bold text-[11px] uppercase tracking-wider text-[#234F38]/70">Confirmation Code:</span>
                    <button
                      onClick={handleCopyCode}
                      className="font-display font-bold text-sm text-[#234F38] hover:text-[#C83E38] flex items-center gap-1 cursor-pointer"
                      title="Click to copy code"
                    >
                      <span>#{reservationCode}</span>
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div>
                      <span className="text-[#234F38]/60 font-semibold block">Party:</span>
                      <span className="font-bold">{submittedData.guests}</span>
                    </div>
                    <div>
                      <span className="text-[#234F38]/60 font-semibold block">Date & Time:</span>
                      <span className="font-bold">{submittedData.date} at {submittedData.time}</span>
                    </div>
                    <div>
                      <span className="text-[#234F38]/60 font-semibold block">Seating Area:</span>
                      <span className="font-bold">{submittedData.seating}</span>
                    </div>
                    <div>
                      <span className="text-[#234F38]/60 font-semibold block">Occasion:</span>
                      <span className="font-bold">{submittedData.occasion}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 rounded-full border border-[#234F38] text-[#234F38] hover:bg-[#234F38] hover:text-[#F4EBD9] font-display text-xs tracking-wider uppercase font-bold transition-all cursor-pointer"
                  >
                    BOOK ANOTHER TABLE
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#234F38]/80 mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Alex Morgan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#EFE6D5] border border-[#234F38]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#234F38] placeholder-[#234F38]/50 focus:outline-none focus:border-[#234F38] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#234F38]/80 mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#EFE6D5] border border-[#234F38]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#234F38] placeholder-[#234F38]/50 focus:outline-none focus:border-[#234F38] font-medium"
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#234F38]/80 mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#EFE6D5] border border-[#234F38]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#234F38] placeholder-[#234F38]/50 focus:outline-none focus:border-[#234F38] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#234F38]/80 mb-1">
                      Party Size
                    </label>
                    <div className="relative">
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full appearance-none bg-[#EFE6D5] border border-[#234F38]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#234F38] focus:outline-none focus:border-[#234F38] font-medium cursor-pointer"
                      >
                        <option value="1 Guest">1 Guest (Bar or Solo)</option>
                        <option value="2 Guests">2 Guests (Cozy Table)</option>
                        <option value="4 Guests">4 Guests (Standard Booth)</option>
                        <option value="6 Guests">6 Guests (Large Booth)</option>
                        <option value="8+ Party">8+ Party (Special Area)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#234F38]/70 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 3: Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#234F38]/80 mb-1">
                      Reservation Date *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="date"
                        min={todayStr}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#EFE6D5] border border-[#234F38]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#234F38] focus:outline-none focus:border-[#234F38] font-medium"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#234F38]/60 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#234F38]/80 mb-1">
                      Preferred Time *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full appearance-none bg-[#EFE6D5] border border-[#234F38]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#234F38] focus:outline-none focus:border-[#234F38] font-medium cursor-pointer"
                      >
                        <option value="12:00">12:00 PM (Lunch)</option>
                        <option value="13:00">1:00 PM (Lunch)</option>
                        <option value="14:00">2:00 PM (Afternoon)</option>
                        <option value="17:30">5:30 PM (Early Dinner)</option>
                        <option value="18:30">6:30 PM (Dinner Rush)</option>
                        <option value="19:00">7:00 PM (Prime Dinner)</option>
                        <option value="20:00">8:00 PM (Late Dinner)</option>
                        <option value="21:00">9:00 PM (Late Night)</option>
                      </select>
                      <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#234F38]/60 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 4: Seating Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#234F38]/80 mb-1">
                      Seating Preference
                    </label>
                    <select
                      value={formData.seating}
                      onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
                      className="w-full bg-[#EFE6D5] border border-[#234F38]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#234F38] focus:outline-none focus:border-[#234F38] font-medium cursor-pointer"
                    >
                      <option value="Indoor Dining Room">Indoor Dining Room</option>
                      <option value="Retro Leather Booth">Retro Leather Booth</option>
                      <option value="Sunny Patio Dining">Outdoor Heated Patio</option>
                      <option value="Bar High-Top">Bar High-Top</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#234F38]/80 mb-1">
                      Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full bg-[#EFE6D5] border border-[#234F38]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#234F38] focus:outline-none focus:border-[#234F38] font-medium cursor-pointer"
                    >
                      <option value="Casual Dinner">Casual Dine / Meal</option>
                      <option value="Birthday Celebration">Birthday Celebration 🎂</option>
                      <option value="Date Night">Date Night ✨</option>
                      <option value="Business / Team Lunch">Business / Team Gathering</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: Special Requests */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#234F38]/80 mb-1">
                    Special Requests / Dietary Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Dietary allergies, high chair needed, anniversary surprise, etc."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full bg-[#EFE6D5] border border-[#234F38]/30 rounded-xl px-3.5 py-2 text-xs text-[#234F38] placeholder-[#234F38]/50 focus:outline-none focus:border-[#234F38] font-medium resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#234F38] hover:bg-[#1A3E2C] text-[#F4EBD9] font-display text-xs sm:text-sm tracking-wider uppercase font-bold transition-all shadow-md active:scale-98 cursor-pointer mt-2 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#234F38]"
                >
                  <Sparkles className="w-4 h-4 text-[#F5B324]" />
                  <span>CONFIRM RESERVATION</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Friends Lifestyle Photo */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full">
            <Image
              src="/images/friends_eating.jpg"
              alt="Friends happily enjoying burgers and milkshakes at BunBite"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
              <span className="bg-[#F5B324] text-[#234F38] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                Happy Hours 4-7 PM Daily
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
