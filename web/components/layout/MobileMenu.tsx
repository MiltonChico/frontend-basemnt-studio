"use client";

import { useRef, useState } from "react";
import { NavLinks } from "./NavLinks";
import type { NavLink } from "@/lib/sanity/types";

export function MobileMenu({ navLinks }: { navLinks: NavLink[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  function toggle() {
    if (open) {
      dialogRef.current?.close();
    } else {
      dialogRef.current?.showModal();
      setOpen(true);
      navRef.current?.focus();
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
        className="flex flex-col gap-1.5 p-2"
      >
        <span className="h-0.5 w-6 bg-cream" />
        <span className="h-0.5 w-6 bg-cream" />
        <span className="h-0.5 w-6 bg-cream" />
      </button>

      <dialog
        id="mobile-nav"
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        aria-label="Site menu"
        className="m-0 h-full max-h-none w-full max-w-none border-none bg-ink p-0 text-cream backdrop:bg-ink/90"
      >
        <nav
          ref={navRef}
          tabIndex={-1}
          aria-label="Mobile"
          className="flex h-full flex-col items-start justify-center gap-6 px-8"
        >
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute right-6 top-6 font-mono text-label"
          >
            CLOSE
          </button>
          <NavLinks
            navLinks={navLinks}
            onNavigate={() => dialogRef.current?.close()}
            className="text-h3 font-semibold hover:text-accent aria-[current=page]:text-accent"
          />
        </nav>
      </dialog>
    </div>
  );
}
