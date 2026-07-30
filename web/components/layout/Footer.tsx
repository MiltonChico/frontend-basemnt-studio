import Link from "next/link";
import type { FooterColumn, SocialLink } from "@/lib/sanity/types";

export function Footer({
  footerColumns,
  socialLinks,
  wordmark = "basement.",
}: {
  footerColumns?: FooterColumn[] | null;
  socialLinks?: SocialLink[] | null;
  wordmark?: string;
}) {
  const columns = footerColumns ?? [];
  const social = socialLinks ?? [];

  const allColumns: FooterColumn[] = [
    ...columns,
    ...(social.length ? [{ title: "Connect", links: social }] : []),
  ];

  return (
    <footer className="border-t border-line bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {allColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h2 className="text-caption font-semibold uppercase text-accent">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-label font-mono text-cream/80 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <p
          aria-hidden="true"
          className="select-none whitespace-nowrap pb-2 text-center font-sans text-[18vw] font-bold leading-none tracking-tighter text-cream/10"
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        >
          {wordmark}
        </p>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 pb-6 text-caption text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© basement.studio LLC {new Date().getFullYear()}. All rights reserved.</p>
          <p>Proud member of SODA</p>
        </div>
      </div>
    </footer>
  );
}
