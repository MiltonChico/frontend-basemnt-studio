import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { ContactModal } from "./ContactModal";
import { NavLinks } from "./NavLinks";
import type { NavLink } from "@/lib/sanity/types";

export function Navbar({
  title = "basement.",
  navLinks = [],
  contactEmail,
}: {
  title?: string;
  navLinks?: NavLink[];
  contactEmail?: string;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-body font-semibold">
          {title}
        </Link>

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-6">
          <NavLinks navLinks={navLinks} />
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ContactModal contactEmail={contactEmail} />
          </div>
          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
