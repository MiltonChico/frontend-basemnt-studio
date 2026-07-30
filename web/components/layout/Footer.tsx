import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import type { FooterColumn, SocialLink } from "@/lib/sanity/types";

export function Footer({
  footerColumns,
  socialLinks,
  copyrightHolder = "basement.studio LLC",
  membershipLabel = "Proud member of SoDA",
}: {
  footerColumns?: FooterColumn[] | null;
  socialLinks?: SocialLink[] | null;
  copyrightHolder?: string;
  membershipLabel?: string;
}) {
  const columns = footerColumns ?? [];
  const social = socialLinks ?? [];

  const allColumns: FooterColumn[] = [
    ...columns,
    ...(social.length ? [{ title: "Connect", links: social }] : []),
  ];

  return (
    <footer className="border-t border-line bg-ink text-cream">
      {/* gap-x is the property controlling the horizontal space between columns —
          bumped from 16 (64px) to 24 (96px) at sm+ per request. */}
      <Container className="flex flex-wrap gap-x-12 gap-y-8 pt-10 sm:gap-x-24 sm:pt-12">
        {allColumns.map((column) => (
          <div key={column.title} className="flex flex-col gap-3.5 sm:gap-4">
            <h2 className="text-[12px] font-mono uppercase tracking-tight text-accent sm:text-label">
              {column.title}
            </h2>
            <ul className="flex flex-col gap-1 sm:gap-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[12px] font-semibold leading-[1.3] text-cream hover:text-accent sm:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      {/* Full-bleed edge-to-edge on mobile (per Figma), constrained to the shared
          Container from sm+ up — the only spot in the footer where mobile deliberately
          does NOT match desktop's container width. mt-8/sm:mt-4: mobile gets more room
          above the wordmark than desktop, which had none before. */}
      <div className="mt-8 overflow-hidden pb-2 sm:mx-auto sm:mt-4 sm:w-full sm:max-w-[1372px] sm:px-4 sm:pb-16" aria-hidden="true">
        <Image
          src="/footer-wordmark.svg"
          alt=""
          width={1398}
          height={213}
          className="h-auto w-full select-none"
        />
      </div>

      <Container className="mt-2 flex flex-row flex-wrap items-center justify-between gap-4 pb-6 text-[9px] font-mono uppercase tracking-tight text-cream/40">
        {/* Explicit <br/> matches Figma's forced two-line break, not just narrow-width
            wrap ("© basement.studio LLC 2026." / "All rights reserved."). */}
        <p>
          © {copyrightHolder} {new Date().getFullYear()}.
          <br />
          All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <span>{membershipLabel}</span>
          <Image src="/soda-badge.svg" alt="" width={11} height={12} />
        </div>
      </Container>
    </footer>
  );
}
