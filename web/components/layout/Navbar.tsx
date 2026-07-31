import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { ContactModal } from "./ContactModal";
import { NavLinks } from "./NavLinks";
import { Container } from "./Container";
import { AnimatedLogo } from "./AnimatedLogo";
import type { NavLink } from "@/lib/sanity/types";

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "Showcase", href: "#" },
  { label: "Services", href: "#" },
  { label: "People", href: "#" },
  { label: "Laboratory", href: "#" },
  { label: "Blog", href: "/" },
  { label: "Ventures", href: "#" },
];

export function Navbar({
  title = "basement.",
  navLinks,
  contactEmail,
}: {
  title?: string;
  navLinks?: NavLink[] | null;
  contactEmail?: string;
}) {
  const links = navLinks && navLinks.length > 0 ? navLinks : DEFAULT_NAV_LINKS;

  return (
    <header className="sticky top-0 z-40 pt-4">
      <Container>
        <div className="navbar-pill relative flex h-[52px] items-center justify-between rounded-[10px] pt-2 pr-[7.5px] pb-2 pl-4">
          <Link href="/" className="block h-[46px] w-[123px] shrink-0">
            <AnimatedLogo title={title} />
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
