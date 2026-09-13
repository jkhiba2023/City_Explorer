"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav className="relative w-full bg-gradient-to-r from-white via-blue-400 to-blue-600 shadow-md">
      <div className="mx-auto flex min-h-[90px] max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <img
              src="/logoImage/logo.png"
              alt="City-Explorer Logo"
              className="h-16 w-40 object-contain sm:h-18 sm:w-44 md:h-20 md:w-50"
            />
          </Link>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-4 sm:gap-6 md:flex md:gap-10 lg:gap-10">
          <Link
            href="/places"
            className="rounded-full px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:text-white sm:px-4 sm:text-base"
          >
            Places
          </Link>

          <Link
            href="/articles"
            className="rounded-full px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:text-white sm:px-4 sm:text-base"
          >
            Articles
          </Link>

          <Link
            href="/about"
            className="rounded-full px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:text-white sm:px-4 sm:text-base"
          >
            About
          </Link>
        </div>

        {/* Menu */}
        <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden">
          {isOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <Menu size={28} className="text-white" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="fixed left-0 top-[90px] z-50 h-[calc(100vh-90px)] w-full bg-blue-600 p-5 opacity-90 shadow-lg md:hidden">
            <div className="flex flex-col items-center gap-5">
              <Link
                href="/place"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="rounded-full px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:text-white sm:px-4 sm:text-base"
              >
                Place
              </Link>

              <Link
                href="/articles"
                onClick={() => setIsOpen(false)}
                className="rounded-full px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:text-white sm:px-4 sm:text-base"
              >
                Articles
              </Link>

              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="rounded-full px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:text-white sm:px-4 sm:text-base"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
