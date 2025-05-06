// Footer component for the portfolio site
// Brutalist, minimal, blocky style: strong border, no shadow, clear nav links, left-aligned copyright

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-[#E1E1E1] bg-white py-8 mt-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8 px-4">
        <div>
          <span className="font-bold text-[#2E2E2E] text-lg">Dominik Gmeiner</span>
          <p className="text-[#607D8B] text-sm mt-2">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-start md:items-center">
          <Link href="/" className="text-[#607D8B] text-base font-semibold hover:underline transition-colors duration-200">
            Home
          </Link>
          <Link href="/projects" className="text-[#607D8B] text-base font-semibold hover:underline transition-colors duration-200">
            Projects
          </Link>
          <a href="#" className="text-[#607D8B] text-base font-semibold hover:underline transition-colors duration-200">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}; 