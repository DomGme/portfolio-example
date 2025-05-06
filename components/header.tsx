"use client";
// Header component for the portfolio site
// This will be used at the top of every page
// It uses the project's color palette and is responsive
// On mobile, it shows a hamburger menu for navigation

import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  // State to control mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <header className="w-full bg-[#F8F8F8] border-b border-[#E1E1E1] shadow-sm">
      <nav className="max-w-4xl mx-auto flex items-center justify-between p-4">
        {/* Site title or logo */}
        <Link href="/" className="text-2xl font-bold text-[#2E2E2E] hover:text-[#1C1C1C] transition-colors duration-200">
          Dominik's Portfolio
        </Link>
        {/* Desktop navigation links */}
        <div className="hidden md:flex gap-4">
          <Link href="/" className="text-[#607D8B] hover:text-[#546E7A] transition-colors duration-200">
            Home
          </Link>
          <Link href="/projects" className="text-[#607D8B] hover:text-[#546E7A] transition-colors duration-200">
            Projects
          </Link>
        </div>
        {/* Hamburger button for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-[#A1887F]"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          {/* Hamburger icon: 3 bars */}
          <span className={`block w-6 h-0.5 bg-[#607D8B] mb-1 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#607D8B] mb-1 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#607D8B] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </nav>
      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden transition-all duration-200 bg-[#F8F8F8] border-t border-[#E1E1E1] shadow ${menuOpen ? 'max-h-40 py-2' : 'max-h-0 overflow-hidden py-0'} flex flex-col items-center gap-2`}
      >
        <Link
          href="/"
          className="block w-full text-center text-[#607D8B] hover:text-[#546E7A] py-2 transition-colors duration-200"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/projects"
          className="block w-full text-center text-[#607D8B] hover:text-[#546E7A] py-2 transition-colors duration-200"
          onClick={() => setMenuOpen(false)}
        >
          Projects
        </Link>
      </div>
    </header>
  );
}; 