"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, ChevronRight, Search, Plus, Check, Sparkles } from "lucide-react";
import { CartItem } from "./Modals";

interface DiscoverMenuSectionProps {
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
}

interface MenuItemData {
  id: string;
  name: string;
  price: number;
  description: string;
  ingredients: string;
  image: string;
  category: "burger" | "sides" | "chicken" | "drinks";
  dietary?: "spicy" | "veg" | "popular" | "special";
}

interface MenuCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: MenuItemData[];
}

const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "burger",
    title: "BURGER",
    icon: (
      <svg className="w-5 h-5 fill-[#234F38]" viewBox="0 0 24 24">
        <path d="M19 8c0-3.3-2.7-6-6-6S7 4.7 7 8H2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-5zM4 16h16c1.1 0 2 .9 2 2v1c0 1.7-1.3 3-3 3H5c-1.7 0-3-1.3-3-3v-1c0-1.1.9-2 2-2z" />
      </svg>
    ),
    items: [
      {
        id: "ocean-crunch",
        name: "OCEAN CRUNCH",
        price: 16.0,
        description: "Tartar sauce, crispy wild cod patty, and fresh slaw",
        ingredients: "Crispy wild cod patty, tartar sauce, fresh red cabbage slaw, butter leaf lettuce, toasted brioche.",
        image: "/images/ocean_crunch.jpg",
        category: "burger",
        dietary: "popular",
      },
      {
        id: "golden-stack",
        name: "GOLDEN STACK",
        price: 17.0,
        description: "Honey mustard, crispy onion rings, and melted Swiss",
        ingredients: "Prime Angus beef, golden beer-battered onion rings, aged Swiss cheese, honey mustard glaze.",
        image: "/images/midnight_bite.jpg",
        category: "burger",
        dietary: "special",
      },
      {
        id: "truffle-dream",
        name: "TRUFFLE DREAM",
        price: 15.0,
        description: "Truffle mayo, sautéed mushrooms, and Swiss cheese",
        ingredients: "Flame-grilled smash patty, black truffle aioli, wild sautéed mushrooms, melted Swiss.",
        image: "/images/smoky_beast.jpg",
        category: "burger",
        dietary: "special",
      },
      {
        id: "chili-smash",
        name: "CHILI SMASH",
        price: 16.0,
        description: "Spicy chili sauce, double patty, and pepperjack cheese",
        ingredients: "Double smash patties, spicy red chili sauce, melted pepperjack, jalapeño relish.",
        image: "/images/feature_burger.jpg",
        category: "burger",
        dietary: "spicy",
      },
    ],
  },
  {
    id: "sides",
    title: "SIDES",
    icon: (
      <svg className="w-5 h-5 stroke-[#234F38] fill-none stroke-2" viewBox="0 0 24 24">
        <path d="M5 8l2 12h10l2-12H5z" />
        <path d="M7 8V4 M12 8V2 M17 8V5" strokeLinecap="round" />
      </svg>
    ),
    items: [
      {
        id: "retro-fries",
        name: "RETRO GOLDEN FRIES",
        price: 4.49,
        description: "Crispy skin-on french fries seasoned with sea salt & warm cheddar dip",
        ingredients: "Idaho russet potatoes, coarse sea salt, rosemary seasoning, melted cheese sauce.",
        image: "/images/fries.jpg",
        category: "sides",
        dietary: "veg",
      },
      {
        id: "loaded-bacon-fries",
        name: "CHEESY BACON LOADED FRIES",
        price: 6.99,
        description: "Loaded with melted cheddar, smoked bacon bits, and scallions",
        ingredients: "Golden fries, aged cheddar sauce, crispy bacon crumbles, spring onion.",
        image: "/images/fries.jpg",
        category: "sides",
        dietary: "popular",
      },
      {
        id: "onion-rings",
        name: "BEER-BATTERED ONION RINGS",
        price: 5.49,
        description: "Jumbo sweet onion rings with smoky chipotle dip",
        ingredients: "Sweet onions, crispy golden craft beer batter, paprika, house smoky dip.",
        image: "/images/fries.jpg",
        category: "sides",
        dietary: "veg",
      },
      {
        id: "truffle-parm-fries",
        name: "TRUFFLE PARMESAN WEDGES",
        price: 6.49,
        description: "Truffle oil, freshly grated parmesan, and roasted garlic dip",
        ingredients: "Potato wedges, white truffle oil, 24-month parmesan, fresh parsley.",
        image: "/images/fries.jpg",
        category: "sides",
        dietary: "veg",
      },
    ],
  },
  {
    id: "chicken",
    title: "CHICKEN",
    icon: (
      <svg className="w-5 h-5 stroke-[#234F38] fill-none stroke-2" viewBox="0 0 24 24">
        <path d="M12 4c-3.5 0-6 2.5-6 6 0 3 2 5 4 6l-3 4h4l1-2 1 2h4l-3-4c2-1 4-3 4-6 0-3.5-2.5-6-6-6z" />
      </svg>
    ),
    items: [
      {
        id: "crispy-chicken-classic",
        name: "CRISPY CHICKEN CLASSIC",
        price: 13.99,
        description: "Buttermilk fried chicken breast, dill pickles, and creamy mayo",
        ingredients: "100% chicken breast in crunchy herb batter, house pickles, garlic mayo, brioche.",
        image: "/images/feature_burger.jpg",
        category: "chicken",
        dietary: "popular",
      },
      {
        id: "nashville-hot",
        name: "NASHVILLE HOT CHICKEN",
        price: 14.99,
        description: "Spicy cayenne dip, creamy coleslaw, and sweet pickles",
        ingredients: "Crispy fried chicken drenched in Nashville cayenne oil, vinegar slaw, butter bun.",
        image: "/images/feature_burger.jpg",
        category: "chicken",
        dietary: "spicy",
      },
      {
        id: "crispy-tenders",
        name: "GOLDEN CHICKEN TENDERS (5 PCS)",
        price: 9.49,
        description: "Hand-breaded tender strips served with choice of 2 dips",
        ingredients: "Whole chicken tenders, crunchy coating, honey mustard and BBQ dips.",
        image: "/images/feature_burger.jpg",
        category: "chicken",
        dietary: "popular",
      },
      {
        id: "bbq-wings",
        name: "SMOKY BBQ WINGS (6 PCS)",
        price: 10.99,
        description: "Tossed in sticky Kansas City barbecue glaze with blue cheese dip",
        ingredients: "Crispy fried wings, tangy dark BBQ glaze, celery sticks, ranch dip.",
        image: "/images/midnight_bite.jpg",
        category: "chicken",
        dietary: "popular",
      },
    ],
  },
  {
    id: "drinks",
    title: "DRINKS & SHAKES",
    icon: (
      <svg className="w-5 h-5 stroke-[#234F38] fill-none stroke-2" viewBox="0 0 24 24">
        <path d="M7 6h10l-1.5 14h-7L7 6z" />
        <path d="M5 6h14 M12 6V2 M12 2l3-1" strokeLinecap="round" />
      </svg>
    ),
    items: [
      {
        id: "retro-strawberry-shake",
        name: "STRAWBERRY RETRO SHAKE",
        price: 5.49,
        description: "Hand-spun with vanilla bean ice cream & strawberry puree",
        ingredients: "Whole milk, premium vanilla bean ice cream, real strawberry compote, whipped cream, cherry.",
        image: "/images/milkshake.jpg",
        category: "drinks",
        dietary: "popular",
      },
      {
        id: "chocolate-fudge-shake",
        name: "DOUBLE CHOCOLATE FUDGE SHAKE",
        price: 5.99,
        description: "Rich dark chocolate ganache, chocolate ice cream, and chocolate sprinkles",
        ingredients: "Dutch cocoa, whole cream, fudge drizzle, whipped topping, cocoa crispies.",
        image: "/images/milkshake.jpg",
        category: "drinks",
        dietary: "special",
      },
      {
        id: "craft-vanilla-soda",
        name: "HAND-CRAFTED VANILLA SODA",
        price: 3.99,
        description: "Sparkling soda with Madagascar vanilla and fresh lime wedge",
        ingredients: "Sparkling water, pure cane sugar, Madagascar vanilla extract, lime slice.",
        image: "/images/milkshake.jpg",
        category: "drinks",
        dietary: "veg",
      },
      {
        id: "iced-lemon-tea",
        name: "FRESH ICED LEMON TEA",
        price: 3.49,
        description: "Freshly brewed Ceylon black tea with cold-pressed lemon juice and mint",
        ingredients: "Ceylon tea leaves, fresh lemon juice, wild honey, fresh mint sprigs.",
        image: "/images/milkshake.jpg",
        category: "drinks",
        dietary: "veg",
      },
    ],
  },
];

export default function DiscoverMenuSection({ onAddToCart }: DiscoverMenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("burger");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterDietary, setFilterDietary] = useState<string>("all");
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});
  const [selectedItemByCat, setSelectedItemByCat] = useState<Record<string, number>>({
    burger: 0,
    sides: 0,
    chicken: 0,
    drinks: 0,
  });

  const handleAddItem = (item: MenuItemData) => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      customization: item.description,
    });
    setAddedItemMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const toggleCategory = (catId: string) => {
    setActiveCategory(activeCategory === catId ? "" : catId);
  };

  const handleSelectItem = (catId: string, idx: number) => {
    setSelectedItemByCat((prev) => ({ ...prev, [catId]: idx }));
  };

  // Filtered items when search is active
  const filteredAllItems = useMemo(() => {
    if (!searchQuery.trim() && filterDietary === "all") return null;

    const all = MENU_CATEGORIES.flatMap((c) => c.items);
    return all.filter((item) => {
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDietary =
        filterDietary === "all" ||
        (filterDietary === "spicy" && item.dietary === "spicy") ||
        (filterDietary === "veg" && item.dietary === "veg") ||
        (filterDietary === "popular" && item.dietary === "popular") ||
        (filterDietary === "special" && item.dietary === "special");

      return matchesSearch && matchesDietary;
    });
  }, [searchQuery, filterDietary]);

  return (
    <section id="menu" className="relative w-full bg-[#F4EBD9] pt-6 pb-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold tracking-widest text-[#234F38]/70 uppercase">
            CHEF CRAFTED & MADE TO ORDER
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#234F38] uppercase tracking-tight mt-1">
            DISCOVER OUR MENUS
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#234F38]/80 max-w-xl mx-auto font-medium leading-relaxed">
            A complete menu of bold burgers, crispy chicken, tasty sides, and refreshing shakes made fresh daily.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-3">
          {/* Search Input */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#234F38]/60" />
            <input
              type="text"
              placeholder="Search burgers, sides, chicken, shakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/80 border border-[#234F38]/25 text-[#234F38] placeholder-[#234F38]/50 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#234F38] shadow-sm"
              aria-label="Search menu items"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#234F38]/60 hover:text-[#234F38]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {[
              { id: "all", label: "All Items" },
              { id: "popular", label: "🔥 Most Popular" },
              { id: "special", label: "⭐ Chef Specials" },
              { id: "spicy", label: "🌶️ Spicy Kick" },
              { id: "veg", label: "🥬 Veggie & Sides" },
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setFilterDietary(pill.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filterDietary === pill.id
                    ? "bg-[#234F38] text-[#F4EBD9] shadow-sm"
                    : "bg-[#234F38]/10 text-[#234F38] hover:bg-[#234F38]/20"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Search Results View */}
        {filteredAllItems !== null ? (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-2 text-xs font-bold text-[#234F38]/70 uppercase">
              <span>Search Results ({filteredAllItems.length})</span>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterDietary("all");
                }}
                className="text-[#C83E38] hover:underline"
              >
                Reset Filters
              </button>
            </div>

            {filteredAllItems.length === 0 ? (
              <div className="bg-white/60 rounded-2xl p-10 text-center text-[#234F38]">
                <p className="font-display text-xl">NO ITEMS FOUND</p>
                <p className="text-xs text-[#234F38]/70 mt-1">
                  Try searching for &ldquo;burger&rdquo;, &ldquo;shake&rdquo;, or &ldquo;fries&rdquo;.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredAllItems.map((item) => {
                  const isAdded = addedItemMap[item.id];
                  return (
                    <div
                      key={item.id}
                      className="bg-white/80 rounded-2xl p-4 shadow-sm border border-[#234F38]/15 flex gap-3 items-center justify-between"
                    >
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-[#234F38]/15">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="font-display text-sm sm:text-base text-[#234F38] uppercase truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#234F38]/75 line-clamp-2 mt-0.5">
                          {item.description}
                        </p>
                        <span className="font-display text-sm sm:text-base text-[#234F38] font-bold mt-1 inline-block">
                          ₹{item.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddItem(item)}
                        disabled={isAdded}
                        className={`shrink-0 p-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-sm ${
                          isAdded
                            ? "bg-[#234F38] text-[#F5B324]"
                            : "bg-[#234F38] text-[#F4EBD9] hover:bg-[#1A3E2C] active:scale-95"
                        }`}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Standard Categories Accordion */
          <div className="space-y-4">
            {MENU_CATEGORIES.map((category) => {
              const isOpen = activeCategory === category.id;
              const categoryIndex = selectedItemByCat[category.id] ?? 0;
              const featuredItem = category.items[categoryIndex] || category.items[0];

              return (
                <div
                  key={category.id}
                  className="overflow-hidden rounded-2xl transition-all duration-300 border border-[#234F38]/15 shadow-sm"
                >
                  {/* Category Bar Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={isOpen}
                    className={`w-full flex items-center justify-between px-6 py-4.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                      isOpen
                        ? "bg-[#F5B324] text-[#234F38] shadow-md"
                        : "bg-white/60 hover:bg-[#EADFCA] text-[#234F38]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <span className="font-display text-xl sm:text-2xl tracking-wider uppercase text-[#234F38]">
                        {category.title}
                      </span>
                      <span className="text-xs font-bold text-[#234F38]/70 bg-[#234F38]/10 px-2 py-0.5 rounded-full">
                        {category.items.length} items
                      </span>
                    </div>

                    <div className="w-8 h-8 flex items-center justify-center">
                      {isOpen ? (
                        <ChevronDown className="w-6 h-6 text-[#234F38] stroke-[2.5]" />
                      ) : (
                        <ChevronRight className="w-6 h-6 text-[#234F38] stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Accordion Body */}
                  {isOpen && (
                    <div className="pt-6 pb-6 px-3 sm:px-5 bg-white/40 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                        
                        {/* Left: Featured Platter Card (Dark Forest Green Container) */}
                        <div className="md:col-span-5 bg-[#234F38] text-[#F4EBD9] rounded-3xl overflow-hidden shadow-xl border border-[#1A3E2C] flex flex-col justify-between">
                          {/* Food Image */}
                          <div className="relative w-full h-52 sm:h-60 overflow-hidden">
                            <Image
                              src={featuredItem.image}
                              alt={featuredItem.name}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                            {featuredItem.dietary && (
                              <div className="absolute top-3 left-3 bg-[#F5B324] text-[#234F38] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                {featuredItem.dietary}
                              </div>
                            )}
                          </div>

                          {/* Ingredients Box & Button */}
                          <div className="p-5 flex flex-col justify-between flex-1">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-display text-lg uppercase text-[#F4EBD9] truncate">
                                  {featuredItem.name}
                                </h4>
                                <span className="font-display text-lg text-[#F5B324] font-bold">
                                  ₹{featuredItem.price.toFixed(2)}
                                </span>
                              </div>
                              <span className="font-display text-[10px] text-[#F5B324] tracking-widest uppercase">
                                INGREDIENTS:
                              </span>
                              <p className="mt-1 text-xs text-[#F4EBD9]/85 leading-relaxed">
                                {featuredItem.ingredients}
                              </p>
                            </div>

                            <button
                              onClick={() => handleAddItem(featuredItem)}
                              disabled={addedItemMap[featuredItem.id]}
                              className="mt-4 w-full py-2.5 rounded-full bg-[#F5B324] hover:bg-[#E2A117] text-[#234F38] font-display text-xs tracking-wider uppercase font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-white"
                            >
                              {addedItemMap[featuredItem.id] ? (
                                <>
                                  <Check className="w-4 h-4 stroke-[3]" />
                                  <span>ADDED TO ORDER!</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-4 h-4 stroke-[3]" />
                                  <span>ADD FEATURED ITEM</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Right: List of Menu Items with Direct Add Buttons */}
                        <div className="md:col-span-7 flex flex-col gap-2.5">
                          {category.items.map((item, idx) => {
                            const isSelected = categoryIndex === idx;
                            const isAdded = addedItemMap[item.id];

                            return (
                              <div
                                key={item.id}
                                className={`p-3.5 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 border ${
                                  isSelected
                                    ? "bg-white border-[#234F38]/30 shadow-md ring-1 ring-[#234F38]/20"
                                    : "bg-white/60 border-transparent hover:bg-white/90 hover:border-[#234F38]/20"
                                }`}
                              >
                                <div
                                  onClick={() => handleSelectItem(category.id, idx)}
                                  className="flex-1 min-w-0 cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-display text-base uppercase text-[#234F38] tracking-wide truncate">
                                      {item.name}
                                    </h4>
                                    {isSelected && (
                                      <span className="text-[10px] bg-[#234F38] text-[#F4EBD9] px-2 py-0.5 rounded-full uppercase font-bold">
                                        Active
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-[#234F38]/75 leading-snug mt-0.5 line-clamp-1">
                                    {item.description}
                                  </p>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                  <span className="font-display text-base text-[#234F38] font-bold">
                                    ₹{item.price.toFixed(2)}
                                  </span>

                                  <button
                                    onClick={() => handleAddItem(item)}
                                    disabled={isAdded}
                                    className={`px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#234F38] ${
                                      isAdded
                                        ? "bg-[#234F38] text-[#F5B324]"
                                        : "bg-[#234F38] text-[#F4EBD9] hover:bg-[#1A3E2C] active:scale-95"
                                    }`}
                                    aria-label={`Add ${item.name} to cart`}
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

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
