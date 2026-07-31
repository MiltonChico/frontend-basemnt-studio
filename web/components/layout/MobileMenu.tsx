"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { NavLinks } from "./NavLinks";
import type { NavLink } from "@/lib/sanity/types";

export function MobileMenu({ navLinks }: { navLinks: NavLink[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const [open, setOpen] = useState(false);

  function animateIcon() {
    gsap.fromTo(
      iconRef.current,
      { rotate: 0 },
      { rotate: 90, duration: 0.25, ease: "power3.out", yoyo: true, repeat: 1 },
    );
  }

  function openMenu() {
    dialogRef.current?.showModal();
    setOpen(true);
    navRef.current?.focus();
    gsap.fromTo(
      navRef.current,
      { xPercent: 100 },
      { xPercent: 0, duration: 0.5, ease: "power3.out" },
    );
  }

  function closeMenu() {
    if (!navRef.current) {
      dialogRef.current?.close();
      return;
    }
    gsap.to(navRef.current, {
      xPercent: 100,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => dialogRef.current?.close(),
    });
  }

  function toggle() {
    animateIcon();
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="cursor-pointer p-2"
      >
        <Image
          ref={iconRef}
          src="/hamburger.svg"
          alt=""
          aria-hidden="true"
          width={40}
          height={11}
        />
      </button>

      <dialog
        id="mobile-nav"
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeMenu();
        }}
        aria-label="Site menu"
        className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none border-none bg-ink p-0 text-cream backdrop:bg-ink/90"
      >
        <nav
          ref={navRef}
          tabIndex={-1}
          aria-label="Mobile"
          className="flex h-full flex-col items-start justify-center gap-6 px-8"
        >
          <button
            type="button"
            onClick={closeMenu}
            className="absolute right-6 top-6 cursor-pointer font-mono text-label"
          >
            CLOSE
          </button>
          <NavLinks
            navLinks={navLinks}
            onNavigate={closeMenu}
            className="text-h3 font-semibold hover:text-accent aria-[current=page]:text-accent"
          />
        </nav>
      </dialog>
    </div>
  );
}
