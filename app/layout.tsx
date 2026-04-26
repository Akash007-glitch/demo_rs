import type { Metadata } from "next";
import { Lilita_One, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const lilitaOne = Lilita_One({
  weight: "400",
  variable: "--font-lilita",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BUNBITE | Delicious Burgers & Happy Bites",
  description:
    "Where fresh ingredients meet fun flavors, and your perfect burger comes to life, one tasty bite.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lilitaOne.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans bg-[#234F38] text-[#F5EBD9] selection:bg-[#F5B324] selection:text-[#234F38]">
        {children}
      </body>
    </html>
  );
}
