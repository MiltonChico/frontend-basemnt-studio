import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { Text } from "@/components/ui/Text";
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
      <Container className="flex flex-wrap gap-x-12 gap-y-8 pt-10 sm:grid sm:grid-cols-[repeat(auto-fill,234px)] sm:gap-y-12 sm:pt-12">
        {allColumns.map((column) => (
          <div key={column.title} className="flex flex-col gap-3.5 sm:gap-4">
            <Text as="h2" variant="eyebrow" tone="accent">
              {column.title}
            </Text>
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

      <div className="mt-8 overflow-hidden pb-2 sm:mx-auto sm:mt-4 sm:w-full sm:max-w-[1372px] sm:px-4 sm:pb-16" aria-hidden="true">
        <Image
          src="/footer-wordmark.svg"
          alt=""
          width={1398}
          height={213}
          className="h-auto w-full select-none"
        />
      </div>

      <Container className="mt-2 flex flex-row flex-wrap items-center justify-between gap-4 pb-6">
        <Text variant="micro" tone="mutedStrong" as="p">
          © {copyrightHolder} {new Date().getFullYear()}.
          <br />
          All rights reserved.
        </Text>
        <div className="flex items-center gap-2">
          <Text variant="label" tone="mutedStrong">
            {membershipLabel}
          </Text>
          <Image src="/soda-badge.svg" alt="" width={11} height={12} />
        </div>
      </Container>
    </footer>
  );
}
