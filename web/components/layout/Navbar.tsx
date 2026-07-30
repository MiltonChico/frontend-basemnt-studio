import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { ContactModal } from "./ContactModal";
import { NavLinks } from "./NavLinks";
import { Container } from "./Container";
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
    <header className="sticky top-0 z-40 pt-4">
      {/* Container owns the outer width/centering/gutter; the pill below only owns its
          own visual padding — kept as two elements so the pill's asymmetric padding
          (pl-4/pr-[7.5px]) never has to fight Container's uniform px-4 for precedence. */}
      <Container>
        <div className="navbar-pill relative flex h-[52px] items-center justify-between rounded-[10px] pt-2 pr-[7.5px] pb-2 pl-4">
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
      </Container>
    </header>
  );
}
