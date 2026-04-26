"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, Mail, ArrowUpRight, CheckCircle2, Heart } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError(true);
      return;
    }
    setError(false);
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#F4EBD9] text-[#234F38] pt-10 pb-8 px-6 sm:px-10 lg:px-12 border-t border-[#234F38]/15 z-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 items-start pb-10 border-b border-[#234F38]/15">
          
          {/* Column 1: LOCATION */}
          <div className="space-y-4">
            <h4 className="font-display text-2xl uppercase tracking-wider text-[#234F38]">
              OUR LOCATION
            </h4>
            
            <div className="flex gap-4 items-center">
              {/* Restaurant Interior Thumbnail */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-md border border-[#234F38]/20">
                <Image
                  src="/images/interior.jpg"
                  alt="BunBite restaurant location interior"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs text-[#234F38]/85 font-medium leading-relaxed">
                  123 BunBite Street, Downtown
                  <br />
                  Food District, New York, NY 10001
                </p>
                <button
                  onClick={() => scrollTo("reservation")}
                  className="inline-flex items-center gap-1 font-display text-xs text-[#234F38] hover:text-[#C83E38] tracking-wider uppercase underline underline-offset-4 transition-colors cursor-pointer"
                >
                  VISIT & DINE IN <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-wider text-[#234F38]/70 pt-2">
              <button onClick={() => scrollTo("menu")} className="hover:text-[#234F38] hover:underline">Menu</button>
              <span>•</span>
              <button onClick={() => scrollTo("bestsellers")} className="hover:text-[#234F38] hover:underline">Best Sellers</button>
              <span>•</span>
              <button onClick={() => scrollTo("hours")} className="hover:text-[#234F38] hover:underline">Hours</button>
              <span>•</span>
              <button onClick={() => scrollTo("testimonials")} className="hover:text-[#234F38] hover:underline">Reviews</button>
            </div>
          </div>

          {/* Column 2: ABOUT US */}
          <div className="space-y-4 md:px-2">
            <h4 className="font-display text-2xl uppercase tracking-wider text-[#234F38]">
              ABOUT BUNBITE
            </h4>
            
            <p className="text-xs text-[#234F38]/85 leading-relaxed font-medium">
              BunBite serves fresh, juicy burgers with fun flavors and premium ingredients. Every bite is crafted to bring you happiness and unforgettable taste.
            </p>

            {/* Social Icons (X, Facebook, Instagram, YouTube) */}
            <div className="flex items-center gap-2.5 pt-1">
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on X"
                className="w-8 h-8 rounded-full border border-[#234F38]/40 hover:border-[#234F38] hover:bg-[#234F38] hover:text-[#F4EBD9] flex items-center justify-center text-[#234F38] transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-[#234F38]"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Facebook"
                className="w-8 h-8 rounded-full border border-[#234F38]/40 hover:border-[#234F38] hover:bg-[#234F38] hover:text-[#F4EBD9] flex items-center justify-center text-[#234F38] transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-[#234F38]"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Instagram"
                className="w-8 h-8 rounded-full border border-[#234F38]/40 hover:border-[#234F38] hover:bg-[#234F38] hover:text-[#F4EBD9] flex items-center justify-center text-[#234F38] transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-[#234F38]"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Connect with BunBite on LinkedIn"
                className="w-8 h-8 rounded-full border border-[#234F38]/40 hover:border-[#234F38] hover:bg-[#234F38] hover:text-[#F4EBD9] flex items-center justify-center text-[#234F38] transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-[#234F38]"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: CONTACT US */}
          <div className="space-y-3">
            <h4 className="font-display text-2xl uppercase tracking-wider text-[#234F38]">
              GET IN TOUCH
            </h4>
            
            <p className="text-xs text-[#234F38]/85 leading-relaxed font-medium">
              Join the BunBite Club for $5 off your first order, secret menu drops & exclusive rewards!
            </p>

            {/* Newsletter Input */}
            <form onSubmit={handleNewsletterSubmit} className="relative mt-2">
              <div className="flex items-center bg-[#EFE6D5] rounded-full border border-[#234F38]/40 p-1 shadow-inner focus-within:border-[#234F38]">
                <input
                  required
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(false);
                  }}
                  className="w-full bg-transparent px-4 py-1.5 text-xs text-[#234F38] placeholder-[#234F38]/50 focus:outline-none"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-[#234F38] text-[#F4EBD9] hover:bg-[#1A3E2C] font-display text-[11px] tracking-wider uppercase font-bold transition-all shadow-sm shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F5B324]"
                >
                  {subscribed ? "JOINED!" : "SUBSCRIBE"}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-800 font-bold mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Welcome! Check your inbox for $5 off coupon code.</span>
                </p>
              )}
              {error && (
                <p className="text-[11px] text-red-600 font-bold mt-1">
                  Please enter a valid email address.
                </p>
              )}
            </form>

            {/* Phone & Email */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#234F38]/85 font-semibold">
              <a href="tel:+15551234567" className="flex items-center gap-1.5 hover:text-[#C83E38] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#234F38]" />
                <span>+1 (555) 123-4567</span>
              </a>
              <a href="mailto:hello@bunbite.com" className="flex items-center gap-1.5 hover:text-[#C83E38] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#234F38]" />
                <span>hello@bunbite.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#234F38]/70">
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} BUNBITE Burgers Inc. Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-[#C83E38] text-[#C83E38] inline" />
            <span>for burger lovers.</span>
          </p>

          <div className="flex items-center gap-4 text-[11px] font-semibold">
            <span className="hover:underline cursor-pointer">Allergen Information</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
