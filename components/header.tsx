"use client";
// Header component for the portfolio site
// Desktop: brutalist nav grid. Mobile: MENU/CART, fullscreen overlay menu.

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b-2 border-[#E1E1E1] bg-white z-50 relative">
      {/* Desktop nav grid: now 4 columns for 4 items */}
      <nav className="hidden md:grid w-full grid-cols-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              `text-[#2E2E2E] text-lg font-bold uppercase tracking-wide text-center py-6 ` +
              `border-r-2 border-[#E1E1E1] last:border-r-0 flex items-center justify-center hover:bg-[#F8F8F8] transition-colors duration-200`
            }
            style={{ letterSpacing: "0.05em" }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {/* Mobile: MENU | CART */}
      <nav className="md:hidden w-full grid grid-cols-2 border-b-2 border-[#E1E1E1]">
        <button
          className="text-[#2E2E2E] text-2xl font-bold uppercase tracking-wide text-center py-6 border-r-2 border-[#E1E1E1] flex items-center justify-center"
          style={{ letterSpacing: "0.05em" }}
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
        {/* No cart on mobile, so leave blank or add a placeholder if needed */}
        <div></div>
      </nav>
      {/* Mobile fullscreen overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex justify-end border-b-2 border-[#E1E1E1]">
            <button
              className="text-[#2E2E2E] text-2xl font-bold uppercase tracking-wide px-6 py-6"
              style={{ letterSpacing: "0.05em" }}
              onClick={() => setMenuOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="flex-1 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#2E2E2E] text-2xl font-bold uppercase tracking-wide text-left px-6 py-8 border-b-2 border-[#111] flex items-center hover:bg-[#F8F8F8] transition-colors duration-200"
                style={{ letterSpacing: "0.05em" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}; 