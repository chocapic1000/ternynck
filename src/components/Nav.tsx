"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/domaines", label: "Les Domaines" },
  { href: "/vins", label: "Les Vins" },
  { href: "/histoire", label: "L'Histoire" },
  { href: "/boutique", label: "La Boutique" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-8 md:px-12 h-16 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className="text-cream text-[13px] tracking-[0.22em] uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Famille Ternynck
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-cream/70 hover:text-cream transition-colors text-[10px] tracking-widest uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Panier */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setOpen(true)}
            className="text-cream/70 hover:text-cream transition-colors text-[10px] tracking-widest uppercase hidden md:flex items-center gap-2"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Panier
            {count > 0 && (
              <span className="bg-amber text-cream text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </button>

          {/* Mobile : panier + burger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-cream/70 hover:text-cream relative"
            aria-label="Panier"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v12a2 2 0 002 2h10a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="17" y2="6"/>
            </svg>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber text-cream text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </button>

          <button
            className="md:hidden text-cream flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="block w-5 h-px bg-cream" />
            <span className="block w-5 h-px bg-cream" />
            <span className="block w-3 h-px bg-cream" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-ink/98 px-8 pb-8 pt-4">
          <ul className="flex flex-col gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-cream text-xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
