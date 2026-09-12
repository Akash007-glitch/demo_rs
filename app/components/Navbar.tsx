"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu as MenuIcon, X, Utensils } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenMenu,
  onNavigateSection,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "MENU", id: "menu", action: () => onNavigateSection("menu") },
    { name: "BEST SELLERS", id: "bestsellers", action: () => onNavigateSection("bestsellers") },
    { name: "ABOUT", id: "features", action: () => onNavigateSection("features") },
    { name: "TESTIMONIALS", id: "testimonials", action: () => onNavigateSection("testimonials") },
    { name: "HOURS", id: "hours", action: () => onNavigateSection("hours") },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#1A3E2C]/95 backdrop-blur-md shadow-xl py-3 px-6 sm:px-10 lg:px-16 border-b border-[#F4EBD9]/15"
          : "relative pt-6 pb-4 px-6 sm:px-10 lg:px-16 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-display text-3xl sm:text-4xl text-[#F4EBD9] tracking-wider hover:opacity-90 transition-opacity drop-shadow-sm flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#F5B324] rounded-lg px-1 cursor-pointer"
          aria-label="BUNBITE Home"
        >
          <span>BUNBITE</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5B324] inline-block animate-pulse" />
        </button>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={link.action}
              className="text-xs sm:text-sm font-bold tracking-widest text-[#F4EBD9]/90 hover:text-[#F5B324] transition-colors uppercase cursor-pointer py-1 px-1.5 rounded focus-visible:ring-2 focus-visible:ring-[#F5B324]"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right Actions: Menu / Order Now + Cart */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Quick Menu Button */}
          <button
            onClick={onOpenMenu}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#1A3E2C] text-[#F5B324] border border-[#F5B324]/40 font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-full hover:bg-[#F5B324] hover:text-[#234F38] transition-all cursor-pointer tracking-wider uppercase font-display focus-visible:ring-2 focus-visible:ring-[#F5B324]"
            title="Open Quick Menu"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>FULL MENU</span>
          </button>


          {/* Order Now Button */}
          <button
            onClick={onOpenMenu}
            className="bg-[#F4EBD9] text-[#234F38] font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-white hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-black/10 cursor-pointer tracking-wider uppercase font-display focus-visible:ring-2 focus-visible:ring-[#F5B324]"
          >
            ORDER NOW
          </button>

          {/* Cart Icon with count */}
          <button
            onClick={onOpenCart}
            aria-label={`View Cart with ${cartCount} items`}
            className="relative p-2.5 rounded-full border border-[#F4EBD9]/40 hover:border-[#F4EBD9] bg-[#234F38]/60 hover:bg-[#1A3E2C] text-[#F4EBD9] transition-all cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#F5B324]"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#F5B324] text-[#234F38] font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#234F38] shadow-sm">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F4EBD9] hover:text-[#F5B324] transition-colors focus-visible:ring-2 focus-visible:ring-[#F5B324] rounded-lg cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 bg-[#1B4330]/98 backdrop-blur-lg border border-[#F4EBD9]/20 rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  link.action();
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm font-semibold tracking-wider text-[#F4EBD9] hover:text-[#F5B324] py-2 px-2 rounded-lg hover:bg-white/5 border-b border-[#F4EBD9]/10 transition-colors"
              >
                {link.name}
              </button>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenMenu();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-[#F5B324] text-[#234F38] font-display font-bold text-center tracking-wider text-sm hover:bg-[#E2A117] transition-colors"
              >
                ORDER NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
