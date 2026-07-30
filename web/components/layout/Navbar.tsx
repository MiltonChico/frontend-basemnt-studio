import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { ContactModal } from "./ContactModal";
import { NavLinks } from "./NavLinks";
import type { NavLink } from "@/lib/sanity/types";

export function Navbar({
  title = "basement.",
  navLinks,
  contactEmail,
}: {
  title?: string;
  navLinks?: NavLink[] | null;
  contactEmail?: string;
}) {
  const links = navLinks ?? [];

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="navbar-pill relative mx-auto flex h-[52px] w-full max-w-[1340px] items-center justify-between rounded-[10px] pt-2 pr-[7.5px] pb-2 pl-4">
        <Link href="/" className="text-body font-semibold">
          {title}
        </Link>

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-8">
          <NavLinks navLinks={links} />
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ContactModal contactEmail={contactEmail} />
          </div>
          <MobileMenu navLinks={links} />
        </div>
      </div>
    </header>
  );
}
