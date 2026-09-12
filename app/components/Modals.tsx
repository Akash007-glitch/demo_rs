"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  X,
  Check,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  CreditCard,
  MapPin,
  Phone,
  User,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization?: string;
}

// ----------------------------------------------------
// 1. CART DRAWER & COMPLETE CHECKOUT FLOW
// ----------------------------------------------------
export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "details" | "success">("cart");
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [specialNote, setSpecialNote] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  // Customer Details Form
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "card",
  });

  // Close on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCloseDrawer = () => {
    setCheckoutStep("cart");
    onClose();
  };

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const delivery = subtotal > 0 ? (discountPercent === 100 ? 0 : 2.99) : 0;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + delivery + tax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === "BUNBITE10") {
      setDiscountPercent(10);
      setPromoMessage({ type: "success", text: "10% Discount applied!" });
    } else if (clean === "FREESHIP") {
      setDiscountPercent(100);
      setPromoMessage({ type: "success", text: "Free Delivery applied!" });
    } else {
      setPromoMessage({ type: "error", text: "Invalid code. Try BUNBITE10" });
    }
  };

  const handleProceedToDetails = () => {
    setCheckoutStep("details");
  };

  const handleFinalOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `BUN-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(generatedOrder);
    setCheckoutStep("success");
    onCheckout();
  };

  const handleFinish = () => {
    setCheckoutStep("cart");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order Cart"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCloseDrawer();
      }}
      className="fixed inset-0 z-50 overflow-hidden bg-black/65 backdrop-blur-sm animate-in fade-in duration-200 flex justify-end"
    >
      <div className="relative w-full max-w-md h-full bg-[#234F38] border-l-2 border-[#F5B324]/40 text-[#F4EBD9] p-5 sm:p-6 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#F4EBD9]/20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#F5B324]" />
              <h3 className="font-display text-2xl uppercase tracking-wider text-[#F4EBD9]">
                {checkoutStep === "details" ? "CHECKOUT DETAILS" : checkoutStep === "success" ? "ORDER CONFIRMED" : "YOUR ORDER"}
              </h3>
            </div>
            <button
              onClick={handleCloseDrawer}
              aria-label="Close cart drawer"
              className="p-2 rounded-full bg-[#1A3E2C] text-[#F4EBD9] hover:bg-[#F5B324] hover:text-[#234F38] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* STEP 1: CART ITEMS VIEW */}
          {checkoutStep === "cart" && (
            <>
              {items.length === 0 ? (
                <div className="py-20 text-center text-[#F4EBD9]/70 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#1A3E2C] text-[#F5B324] flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <p className="font-display text-xl text-[#F4EBD9]">YOUR CART IS EMPTY</p>
                  <p className="text-xs max-w-xs mx-auto text-[#F4EBD9]/70">
                    Add your favorite flame-grilled burgers, crispy fries, and retro milkshakes to start!
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-3 max-h-[46vh] overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-[#1A3E2C] p-3 rounded-2xl border border-[#F4EBD9]/15 shadow-sm group hover:border-[#F5B324]/40 transition-all"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#F4EBD9]/20">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="font-display text-sm uppercase text-[#F4EBD9] truncate">
                          {item.name}
                        </h5>
                        <p className="text-xs text-[#F5B324] font-bold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.customization && (
                          <p className="text-[10px] text-[#F4EBD9]/60 truncate">{item.customization}</p>
                        )}
                      </div>

                      {/* Quantity Buttons */}
                      <div className="flex items-center gap-1.5 bg-[#234F38] px-2 py-1 rounded-lg border border-[#F4EBD9]/20 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="p-1 text-[#F4EBD9] hover:text-[#F5B324] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="p-1 text-[#F4EBD9] hover:text-[#F5B324] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Instant Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name} from order`}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Special Kitchen Notes */}
                  <div className="pt-2">
                    <label className="block text-[11px] font-bold text-[#F4EBD9]/80 uppercase mb-1">
                      Kitchen Instructions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Extra napkins, no pickles, sauce on side"
                      value={specialNote}
                      onChange={(e) => setSpecialNote(e.target.value)}
                      className="w-full bg-[#1A3E2C] border border-[#F4EBD9]/25 rounded-xl px-3 py-1.5 text-xs text-[#F4EBD9] placeholder-[#F4EBD9]/40 focus:outline-none focus:border-[#F5B324]"
                    />
                  </div>

                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyPromo} className="pt-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#F5B324]" />
                        <input
                          type="text"
                          placeholder="Promo code (BUNBITE10)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full bg-[#1A3E2C] border border-[#F4EBD9]/25 rounded-xl pl-9 pr-3 py-1.5 text-xs uppercase font-bold text-[#F4EBD9] placeholder-[#F4EBD9]/40 focus:outline-none focus:border-[#F5B324]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl bg-[#F5B324] text-[#234F38] font-display text-xs font-bold uppercase tracking-wider hover:bg-[#E2A117] transition-colors cursor-pointer"
                      >
                        APPLY
                      </button>
                    </div>
                    {promoMessage && (
                      <p
                        className={`text-[11px] font-bold mt-1 ${
                          promoMessage.type === "success" ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {promoMessage.text}
                      </p>
                    )}
                  </form>
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT DETAILS VIEW */}
          {checkoutStep === "details" && (
            <form onSubmit={handleFinalOrder} className="mt-4 space-y-3.5 animate-in fade-in duration-200">
              <button
                type="button"
                onClick={() => setCheckoutStep("cart")}
                className="text-xs text-[#F5B324] hover:underline font-bold uppercase tracking-wider flex items-center gap-1 mb-2 cursor-pointer"
              >
                ← Back to Cart
              </button>

              <div>
                <label className="block text-[11px] font-bold text-[#F4EBD9] uppercase tracking-wider mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#F5B324]" /> Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your full name"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                  className="w-full bg-[#1A3E2C] border border-[#F4EBD9]/30 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#F4EBD9] placeholder-[#F4EBD9]/40 focus:outline-none focus:border-[#F5B324]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#F4EBD9] uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#F5B324]" /> Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                  className="w-full bg-[#1A3E2C] border border-[#F4EBD9]/30 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#F4EBD9] placeholder-[#F4EBD9]/40 focus:outline-none focus:border-[#F5B324]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#F4EBD9] uppercase tracking-wider mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F5B324]" /> Delivery Address *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Street address, Apt / Suite number"
                  value={customerData.address}
                  onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                  className="w-full bg-[#1A3E2C] border border-[#F4EBD9]/30 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#F4EBD9] placeholder-[#F4EBD9]/40 focus:outline-none focus:border-[#F5B324] resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#F4EBD9] uppercase tracking-wider mb-1 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-[#F5B324]" /> Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomerData({ ...customerData, paymentMethod: "card" })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase transition-all cursor-pointer ${
                      customerData.paymentMethod === "card"
                        ? "bg-[#F5B324] text-[#234F38] border-[#F5B324]"
                        : "bg-[#1A3E2C] text-[#F4EBD9] border-[#F4EBD9]/25"
                    }`}
                  >
                    💳 Card / Online
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomerData({ ...customerData, paymentMethod: "cod" })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase transition-all cursor-pointer ${
                      customerData.paymentMethod === "cod"
                        ? "bg-[#F5B324] text-[#234F38] border-[#F5B324]"
                        : "bg-[#1A3E2C] text-[#F4EBD9] border-[#F4EBD9]/25"
                    }`}
                  >
                    💵 Cash On Delivery
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-2xl bg-[#F5B324] hover:bg-[#E2A117] text-[#234F38] font-display text-base tracking-wider uppercase font-bold transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>PAY & PLACE ORDER (₹{grandTotal.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 3: ORDER SUCCESS CONFIRMATION */}
          {checkoutStep === "success" && (
            <div className="py-10 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#F5B324] text-[#234F38] flex items-center justify-center mx-auto shadow-xl ring-4 ring-[#F5B324]/20">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="font-display text-3xl uppercase text-[#F4EBD9]">
                ORDER PLACED!
              </h4>
              <p className="text-xs sm:text-sm text-[#F4EBD9]/85 max-w-xs mx-auto">
                Thank you, <strong className="text-[#F5B324]">{customerData.name || "Foodie"}</strong>! Your flame-grilled meal is being prepared with love.
              </p>

              <div className="bg-[#1A3E2C] rounded-2xl p-4 border border-[#F5B324]/30 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#F4EBD9]/15 pb-2">
                  <span className="text-[#F4EBD9]/70">Tracking Code:</span>
                  <span className="font-display text-sm text-[#F5B324]">#{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F4EBD9]/70">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-400">25 - 30 mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F4EBD9]/70">Deliver To:</span>
                  <span className="font-semibold truncate max-w-[180px]">{customerData.address || "Your Address"}</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3 rounded-2xl bg-[#F5B324] text-[#234F38] font-display text-sm font-bold uppercase tracking-wider hover:bg-[#E2A117] transition-all cursor-pointer"
              >
                CLOSE & ENJOY
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary in Cart Mode */}
        {checkoutStep === "cart" && items.length > 0 && (
          <div className="pt-4 border-t border-[#F4EBD9]/20 space-y-2.5">
            <div className="space-y-1.5 text-xs text-[#F4EBD9]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#F4EBD9]">₹{rawSubtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Hot Delivery</span>
                <span className="font-bold text-[#F4EBD9]">
                  {delivery === 0 ? "FREE" : `₹${delivery.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-bold text-[#F4EBD9]">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#F5B324] pt-2 border-t border-[#F4EBD9]/10">
                <span className="font-display uppercase tracking-wider">TOTAL</span>
                <span className="font-display text-xl">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToDetails}
              className="w-full py-3 rounded-2xl bg-[#F5B324] hover:bg-[#E2A117] text-[#234F38] font-display text-base tracking-wider uppercase font-bold transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>CHECKOUT</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. QUICK MENU CATALOG MODAL COMPONENT
// ----------------------------------------------------
export function MenuModal({
  isOpen,
  onClose,
  onAddToCart,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
}) {
  const [activeTab, setActiveTab] = useState("all");
  const [modalSearch, setModalSearch] = useState("");
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  // Close on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const menuItems = useMemo(
    () => [
      {
        id: "burger-classic",
        name: "BUNBITE DELUXE CHEESE",
        category: "burgers",
        description: "Signature sesame bun, aged cheddar, flame-grilled beef, secret sauce.",
        price: 9.99,
        image: "/images/hero_burger.jpg",
        tag: "Best Seller",
      },
      {
        id: "burger-double",
        name: "DOUBLE SMASH & CRISPY CHICKEN",
        category: "burgers",
        description: "Crispy fried chicken patty, double beef smash, gooey cheddar drip.",
        price: 12.99,
        image: "/images/feature_burger.jpg",
        tag: "Chef Special",
      },
      {
        id: "burger-ocean",
        name: "OCEAN CRUNCH COD BURGER",
        category: "burgers",
        description: "Tartar sauce, crispy wild cod patty, fresh red slaw, brioche bun.",
        price: 16.0,
        image: "/images/ocean_crunch.jpg",
        tag: "Seafood",
      },
      {
        id: "side-fries",
        name: "RETRO GOLDEN FRIES",
        category: "sides",
        description: "Crispy skin-on french fries seasoned with sea salt & warm cheddar dip.",
        price: 4.49,
        image: "/images/fries.jpg",
        tag: "Sides",
      },
      {
        id: "side-onion",
        name: "BEER-BATTERED ONION RINGS",
        category: "sides",
        description: "Jumbo sweet onions in golden craft batter with smoky chipotle dip.",
        price: 5.49,
        image: "/images/fries.jpg",
        tag: "Sides",
      },
      {
        id: "chicken-nashville",
        name: "NASHVILLE HOT CHICKEN",
        category: "chicken",
        description: "Drenched in cayenne pepper oil, tangy dill pickles, cabbage slaw.",
        price: 14.99,
        image: "/images/feature_burger.jpg",
        tag: "Spicy",
      },
      {
        id: "drink-shake",
        name: "STRAWBERRY RETRO SHAKE",
        category: "drinks",
        description: "Creamy hand-spun milkshake with whipped cream & maraschino cherry.",
        price: 5.49,
        image: "/images/milkshake.jpg",
        tag: "Drinks",
      },
      {
        id: "drink-chocolate",
        name: "DOUBLE CHOCOLATE FUDGE SHAKE",
        category: "drinks",
        description: "Rich dark chocolate ganache, premium chocolate ice cream, fudge drizzle.",
        price: 5.99,
        image: "/images/milkshake.jpg",
        tag: "Drinks",
      },
    ],
    []
  );

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeTab === "all" || item.category === activeTab;
      const matchesSearch =
        !modalSearch.trim() ||
        item.name.toLowerCase().includes(modalSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(modalSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeTab, modalSearch]);

  const handleAdd = (item: typeof menuItems[0]) => {
    onAddToCart({ id: item.id, name: item.name, price: item.price, image: item.image });
    setAddedMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Full Menu Catalog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#234F38] border-2 border-[#F5B324] rounded-3xl p-5 sm:p-7 text-[#F4EBD9] shadow-2xl flex flex-col justify-between overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1A3E2C] text-[#F4EBD9] hover:bg-[#F5B324] hover:text-[#234F38] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F5B324]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-3">
          <span className="text-xs font-bold text-[#F5B324] tracking-widest uppercase">
            CRAFTED WITH FRESHNESS
          </span>
          <h3 className="font-display text-3xl sm:text-4xl text-[#F4EBD9] uppercase mt-0.5">
            BUNBITE COMPLETE MENU
          </h3>
        </div>

        {/* Tabs & Search */}
        <div className="space-y-2 mb-3">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {[
              { id: "all", label: "All Dishes" },
              { id: "burgers", label: "Burgers" },
              { id: "chicken", label: "Chicken" },
              { id: "sides", label: "Sides" },
              { id: "drinks", label: "Shakes" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#F5B324] text-[#234F38]"
                    : "bg-[#1A3E2C] text-[#F4EBD9]/80 hover:bg-[#1A3E2C]/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Quick search in menu..."
            value={modalSearch}
            onChange={(e) => setModalSearch(e.target.value)}
            className="w-full max-w-sm mx-auto block bg-[#1A3E2C] border border-[#F4EBD9]/20 rounded-full px-4 py-1.5 text-xs text-[#F4EBD9] placeholder-[#F4EBD9]/40 focus:outline-none focus:border-[#F5B324]"
          />
        </div>

        {/* Grid of Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-1 my-1 max-h-[50vh]">
          {filteredItems.map((item) => {
            const isAdded = addedMap[item.id];

            return (
              <div
                key={item.id}
                className="bg-[#1A3E2C] border border-[#F4EBD9]/20 rounded-2xl p-3.5 flex flex-col justify-between hover:border-[#F5B324] transition-all group"
              >
                <div className="flex gap-3 items-center">
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden shrink-0 border border-[#F4EBD9]/20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] bg-[#F5B324] text-[#234F38] font-black px-2 py-0.5 rounded-full uppercase">
                      {item.tag}
                    </span>
                    <h4 className="font-display text-sm text-[#F4EBD9] uppercase mt-1 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#F4EBD9]/70 line-clamp-2 leading-tight mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#F4EBD9]/10">
                  <span className="font-display text-base text-[#F5B324] font-bold">
                    ₹{item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAdd(item)}
                    disabled={isAdded}
                    className={`px-3 py-1.5 rounded-full font-display text-xs uppercase tracking-wider font-bold transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1 ${
                      isAdded
                        ? "bg-emerald-500 text-white"
                        : "bg-[#F4EBD9] hover:bg-[#F5B324] text-[#234F38]"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2 text-[11px] text-[#F4EBD9]/60 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-[#F5B324]" />
          <span>All burgers are flame-grilled to order with 100% grass-fed beef and daily brioche buns.</span>
        </div>
      </div>
    </div>
  );
}
