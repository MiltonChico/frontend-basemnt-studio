"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/sanity/types";

export function NavLinks({
  navLinks,
  className,
  onNavigate,
}: {
  navLinks: NavLink[];
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.label}
            href={link.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={
              className ??
              "text-body font-semibold text-cream/70 hover:text-accent aria-[current=page]:text-accent"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
