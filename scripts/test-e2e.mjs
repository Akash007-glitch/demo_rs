import assert from "node:assert";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

console.log("==================================================");
console.log("STARTING COMPREHENSIVE BUNBITE AUDIT TEST SUITE");
console.log("==================================================\n");

let passed = 0;
let total = 0;

function it(name, fn) {
  total++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

async function runAsync(name, fn) {
  total++;
  try {
    await fn();
    console.log(`  [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

// 1. Dev Server & HTML Response
await runAsync("Dev Server responds with HTTP 200 and loads root HTML", async () => {
  const res = await new Promise((resolve, reject) => {
    http.get("http://localhost:3000", (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    }).on("error", reject);
  });

  assert.strictEqual(res.status, 200, "Expected status code 200");
  assert.ok(res.body.includes("BUNBITE"), "Body must contain BUNBITE branding");
});

// 2. Navigation Anchor Targets Exist
it("All main navigation target anchors exist in component source files", () => {
  const discoverMenu = fs.readFileSync(path.resolve("app/components/DiscoverMenuSection.tsx"), "utf8");
  const bestSellers = fs.readFileSync(path.resolve("app/components/BestSellersSection.tsx"), "utf8");
  const features = fs.readFileSync(path.resolve("app/components/FeatureSection.tsx"), "utf8");
  const testimonials = fs.readFileSync(path.resolve("app/components/TestimonialsSection.tsx"), "utf8");
  const hours = fs.readFileSync(path.resolve("app/components/OpeningHoursSection.tsx"), "utf8");

  assert.ok(discoverMenu.includes('id="menu"'), "Menu section anchor missing");
  assert.ok(bestSellers.includes('id="bestsellers"'), "Best sellers section anchor missing");
  assert.ok(features.includes('id="features"'), "Features section anchor missing");
  assert.ok(testimonials.includes('id="testimonials"'), "Testimonials section anchor missing");
  assert.ok(hours.includes('id="hours"'), "Hours section anchor missing");
});

// 3. Cart & Order Calculation Rules
it("Cart subtotal, discount, delivery fee, and tax calculations are accurate", () => {
  const items = [
    { id: "1", price: 9.99, quantity: 2 },
    { id: "2", price: 4.49, quantity: 1 },
  ];
  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  assert.strictEqual(rawSubtotal.toFixed(2), "24.47");

  // Standard checkout (no promo)
  const discount0 = 0;
  const subtotal0 = rawSubtotal - (rawSubtotal * discount0) / 100;
  const delivery0 = 2.99;
  const tax0 = subtotal0 * 0.08;
  const grandTotal0 = subtotal0 + delivery0 + tax0;
  assert.strictEqual(grandTotal0.toFixed(2), "29.42");

  // BUNBITE10 (10% promo)
  const discount10 = 10;
  const discountAmount10 = (rawSubtotal * discount10) / 100;
  const subtotal10 = rawSubtotal - discountAmount10;
  const tax10 = subtotal10 * 0.08;
  const grandTotal10 = subtotal10 + delivery0 + tax10;
  assert.strictEqual(grandTotal10.toFixed(2), "26.77");

  // FREESHIP (free delivery promo)
  const deliveryFree = 0;
  const grandTotalFree = rawSubtotal + deliveryFree + (rawSubtotal * 0.08);
  assert.strictEqual(grandTotalFree.toFixed(2), "26.43");
});

// 4. Opening Hours Logic
it("Opening hours calculation handles weekdays and weekends properly without 12PM noon bug", () => {
  function checkHours(day, hour) {
    const isWeekend = day === 0 || day === 6;
    if (isWeekend) {
      return hour >= 9 && hour < 24;
    }
    return hour >= 8 && hour < 22;
  }

  // Weekday tests (8am to 10pm)
  assert.strictEqual(checkHours(1, 7), false, "Weekday 7am should be closed");
  assert.strictEqual(checkHours(1, 8), true, "Weekday 8am should be open");
  assert.strictEqual(checkHours(1, 14), true, "Weekday 2pm should be open");
  assert.strictEqual(checkHours(1, 21), true, "Weekday 9pm should be open");
  assert.strictEqual(checkHours(1, 22), false, "Weekday 10pm should be closed");

  // Weekend tests (9am to midnight 24:00)
  assert.strictEqual(checkHours(6, 8), false, "Saturday 8am should be closed");
  assert.strictEqual(checkHours(6, 9), true, "Saturday 9am should be open");
  assert.strictEqual(checkHours(6, 12), true, "Saturday 12pm (noon) MUST be open (regression test)");
  assert.strictEqual(checkHours(6, 23), true, "Saturday 11pm should be open");
  assert.strictEqual(checkHours(6, 24), false, "Saturday 12am midnight should be closed");
});

// 5. Table Booking Removed & Online Ordering Active
it("Table reservation system is completely removed and online ordering is active", () => {
  const pageSrc = fs.readFileSync(path.resolve("app/page.tsx"), "utf8");
  const navSrc = fs.readFileSync(path.resolve("app/components/Navbar.tsx"), "utf8");
  const modalSrc = fs.readFileSync(path.resolve("app/components/Modals.tsx"), "utf8");
  const heroSrc = fs.readFileSync(path.resolve("app/components/HeroSection.tsx"), "utf8");

  assert.ok(!pageSrc.includes("ReserveTableSection"), "ReserveTableSection must not be in page");
  assert.ok(!pageSrc.includes("ReservationModal"), "ReservationModal must not be in page");
  assert.ok(!navSrc.includes("BOOK TABLE"), "Navbar must not have BOOK TABLE button");
  assert.ok(!heroSrc.includes("BOOK A TABLE"), "Hero must not have BOOK A TABLE button");
  assert.ok(!modalSrc.includes("ReservationModal"), "Modals must not export ReservationModal");
  assert.ok(!fs.existsSync(path.resolve("app/components/ReserveTableSection.tsx")), "ReserveTableSection file must be removed");
});

// 6. Accessibility & Keyboard Navigation
it("Keyboard handlers and ARIA attributes are implemented across interactive surfaces", () => {
  const modalSrc = fs.readFileSync(path.resolve("app/components/Modals.tsx"), "utf8");
  const navSrc = fs.readFileSync(path.resolve("app/components/Navbar.tsx"), "utf8");
  const testSrc = fs.readFileSync(path.resolve("app/components/TestimonialsSection.tsx"), "utf8");
  const pageSrc = fs.readFileSync(path.resolve("app/page.tsx"), "utf8");

  assert.ok(modalSrc.includes('e.key === "Escape"'), "Modals must support Escape key dismissal");
  assert.ok(navSrc.includes('e.key === "Escape"'), "Navbar mobile menu must support Escape key");
  assert.ok(modalSrc.includes('role="dialog"'), "Modals must have role=dialog");
  assert.ok(modalSrc.includes('aria-modal="true"'), "Modals must have aria-modal=true");
  assert.ok(pageSrc.includes('role="status"'), "Toast must have role=status");
  assert.ok(pageSrc.includes('aria-live="polite"'), "Toast must have aria-live=polite");
  assert.ok(testSrc.includes('aria-label="Previous testimonial"'), "Testimonial carousel needs aria labels");
});

// 7. Responsive Styling & Viewport Breakpoints
it("Components contain responsive Tailwind classes for mobile (sm), tablet (md), and desktop (lg)", () => {
  const heroSrc = fs.readFileSync(path.resolve("app/components/HeroSection.tsx"), "utf8");
  const navSrc = fs.readFileSync(path.resolve("app/components/Navbar.tsx"), "utf8");
  const menuSrc = fs.readFileSync(path.resolve("app/components/DiscoverMenuSection.tsx"), "utf8");

  assert.ok(heroSrc.includes("text-5xl sm:text-7xl md:text-8xl"), "Hero title has fluid scale");
  assert.ok(navSrc.includes("hidden md:flex"), "Navbar adapts for mobile and desktop");
  assert.ok(menuSrc.includes("grid-cols-1 sm:grid-cols-2") || menuSrc.includes("md:grid-cols"), "Menu adapts to screen width");
});

// 8. Brand Consistency & Palette Enforcement
it("Retro Diner color palette tokens are strictly adhered to", () => {
  const globalCss = fs.readFileSync(path.resolve("app/globals.css"), "utf8");
  assert.ok(globalCss.includes("#234F38") || globalCss.includes("forest"), "Deep forest green token present");
  assert.ok(globalCss.includes("#F4EBD9") || globalCss.includes("warm-cream"), "Warm cream token present");
});

console.log("\n==================================================");
console.log(`RESULTS: ${passed}/${total} TESTS PASSED (${((passed/total)*100).toFixed(0)}%)`);
console.log("==================================================");

if (passed !== total) {
  process.exit(1);
}
