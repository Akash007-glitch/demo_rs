"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Check, Plus, ShoppingBag } from "lucide-react";
import { CartItem } from "./Modals";

interface BestSellersSectionProps {
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
  onOpenMenu: () => void;
}

export default function BestSellersSection({
  onAddToCart,
  onOpenMenu,
}: BestSellersSectionProps) {
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  const bestSellers = [
    {
      id: "midnight-bite",
      name: "MIDNIGHT BITE",
      description: "Honey mustard, crispy onion rings, and melted Swiss cheese.",
      price: 15.0,
      image: "/images/midnight_bite.jpg",
      bgColor: "bg-[#EAA43A]",
      textColor: "text-[#234F38]",
      btnBg: "bg-[#F4EBD9] hover:bg-white text-[#234F38]",
      rating: 5,
      reviewsCount: 428,
      badge: "Customer Favorite",
    },
    {
      id: "cheesy-boom",
      name: "CHEESY BOOM",
      description: "Warm cheddar cheese lava, double beef smash patty, garlic brioche.",
      price: 17.0,
      image: "/images/cheesy_boom.jpg",
      bgColor: "bg-[#C83E38]",
      textColor: "text-[#234F38]",
      btnBg: "bg-[#F4EBD9] hover:bg-white text-[#C83E38]",
      rating: 5,
      reviewsCount: 612,
      badge: "#1 Best Seller",
    },
    {
      id: "smoky-beast",
      name: "SMOKY BEAST",
      description: "Tangy BBQ glaze, applewood smoked bacon, crispy caramelized onions.",
      price: 14.0,
      image: "/images/smoky_beast.jpg",
      bgColor: "bg-[#1E4330]",
      textColor: "text-[#234F38]",
      btnBg: "bg-[#F5B324] hover:bg-[#FFC338] text-[#234F38]",
      rating: 5,
      reviewsCount: 389,
      badge: "Chef's Award",
    },
  ];

  const handleAddWithFeedback = (burger: typeof bestSellers[0]) => {
    onAddToCart({
      id: burger.id,
      name: burger.name,
      price: burger.price,
      image: burger.image,
      customization: burger.description,
    });

    setAddedItemMap((prev) => ({ ...prev, [burger.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [burger.id]: false }));
    }, 1500);
  };

  return (
    <section id="bestsellers" className="relative w-full bg-[#F4EBD9] py-16 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#234F38]/10 text-[#234F38] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <ShoppingBag className="w-3.5 h-3.5 text-[#234F38]" />
              <span>Most Ordered Dishes</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-[#234F38] uppercase tracking-tight leading-none">
              BEST SELLERS
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#234F38]/80 max-w-xl font-medium leading-relaxed">
              The burgers everyone raves about, known for their rich taste, fresh
              ingredients, and crave-worthy sauce combinations.
            </p>
          </div>

          <button
            onClick={onOpenMenu}
            className="self-start sm:self-auto px-6 py-2.5 rounded-full border-2 border-[#234F38] text-[#234F38] font-display text-xs tracking-wider uppercase font-bold hover:bg-[#234F38] hover:text-[#F4EBD9] transition-all transform hover:scale-105 active:scale-95 cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-[#234F38]"
          >
            VIEW FULL MENU
          </button>
        </div>

        {/* 3 Best Seller Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {bestSellers.map((burger) => {
            const isAdded = addedItemMap[burger.id];

            return (
              <div
                key={burger.id}
                className={`relative ${burger.bgColor} rounded-3xl pt-28 pb-6 px-6 text-center text-white shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between border-2 border-white/10`}
              >
                {/* Floating Tag */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-white border border-white/30 shadow-sm">
                  {burger.badge}
                </div>

                {/* Overflowing Burger Image */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-40 h-40 sm:w-48 sm:h-48 drop-shadow-2xl">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                    <Image
                      src={burger.image}
                      alt={burger.name}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div>
                  {/* Rating & Count */}
                  <div className="flex justify-center items-center gap-1.5 mb-2 text-white">
                    <div className="flex">
                      {[...Array(burger.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold opacity-90">
                      ({burger.reviewsCount})
                    </span>
                  </div>

                  {/* Burger Title */}
                  <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-white drop-shadow-sm">
                    {burger.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs text-white/90 leading-snug min-h-[36px] px-2 font-medium">
                    {burger.description}
                  </p>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="font-display text-2xl sm:text-3xl text-white font-bold">
                      ${burger.price.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-white/70 uppercase tracking-wider font-semibold">
                      • combo ready
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button with Instant Feedback */}
                <div className="mt-5">
                  <button
                    onClick={() => handleAddWithFeedback(burger)}
                    disabled={isAdded}
                    aria-label={`Add ${burger.name} to cart`}
                    className={`w-full py-3 rounded-full ${burger.btnBg} font-display text-xs sm:text-sm tracking-wider uppercase font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>ADDED TO ORDER!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>ADD TO CART</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
