"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MarqueeBanner from "./components/MarqueeBanner";
import FeatureSection from "./components/FeatureSection";
import BestSellersSection from "./components/BestSellersSection";
import DiscoverMenuSection from "./components/DiscoverMenuSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ReserveTableSection from "./components/ReserveTableSection";
import OpeningHoursSection from "./components/OpeningHoursSection";
import Footer from "./components/Footer";
import DoodleBackground from "./components/DoodleBackground";
import { ReservationModal, CartDrawer, MenuModal, CartItem } from "./components/Modals";

export default function Home() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "burger-classic",
      name: "BUNBITE DELUXE CHEESE",
      price: 9.99,
      quantity: 1,
      image: "/images/hero_burger.jpg",
      customization: "Sesame Brioche • Extra Cheddar",
    },
  ]);

  const handleAddToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setToastMessage(`Added ${item.name} to order!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#EFE6D5] p-0 sm:p-4 md:p-6 lg:p-8 flex justify-center items-center">
      {/* Main Card Frame with Rounded Borders (matches Mockup Canvas) */}
      <main className="relative w-full max-w-6xl bg-[#234F38] shadow-2xl rounded-none sm:rounded-[36px] overflow-hidden border-0 sm:border-[10px] border-[#EFE6D5]">
        
        {/* Subtle Hand-Drawn Food Line Doodles Pattern */}
        <DoodleBackground />

        {/* Navigation Bar */}
        <Navbar
          cartCount={totalCartCount}
          onOpenCart={() => setCartOpen(true)}
          onOpenReservation={() => setReservationOpen(true)}
          onOpenMenu={() => setMenuOpen(true)}
          onNavigateSection={scrollToSection}
        />

        {/* Hero Section: DELICIOUS BURGERS, Hands Holding Burger, Sunburst Badge */}
        <HeroSection
          onOpenReservation={() => setReservationOpen(true)}
          onOpenOrder={() => setMenuOpen(true)}
        />

        {/* Marquee Ribbon Banner with Asterisks */}
        <MarqueeBanner />

        {/* WHAT MAKES BUNBITE DIFFERENT? Section */}
        <FeatureSection onSelectFeature={() => {}} />

        {/* BEST SELLERS Section */}
        <BestSellersSection
          onAddToCart={handleAddToCart}
          onOpenMenu={() => setMenuOpen(true)}
        />

        {/* DISCOVER OUR MENUS Section */}
        <DiscoverMenuSection onAddToCart={handleAddToCart} />

        {/* BITES OF HAPPINESS Testimonials Section */}
        <TestimonialsSection />

        {/* RESERVE YOUR TABLE Split Card Section */}
        <ReserveTableSection />

        {/* OPENING HOURS Cloud Section */}
        <OpeningHoursSection />

        {/* 3-Column Bottom FOOTER */}
        <Footer />

        {/* Toast Notification */}
        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-6 right-6 z-50 bg-[#F5B324] text-[#234F38] px-4 sm:px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 border-2 border-[#234F38]"
          >
            <span className="text-xl">🍔</span>
            <div>
              <p className="text-xs font-black uppercase tracking-wider font-display leading-tight">{toastMessage}</p>
            </div>
            <button
              onClick={() => {
                setToastMessage(null);
                setCartOpen(true);
              }}
              className="ml-2 px-3 py-1 rounded-xl bg-[#234F38] text-[#F4EBD9] font-display text-[11px] uppercase tracking-wider font-bold hover:bg-[#1A3E2C] transition-colors cursor-pointer"
            >
              VIEW CART
            </button>
            <button
              onClick={() => setToastMessage(null)}
              aria-label="Dismiss message"
              className="p-1 text-[#234F38]/70 hover:text-[#234F38] cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Modals and Drawers */}
        <ReservationModal
          isOpen={reservationOpen}
          onClose={() => setReservationOpen(false)}
        />

        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />

        <MenuModal
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onAddToCart={handleAddToCart}
        />
      </main>
    </div>
  );
}