import type { PortableTextBlock } from "@portabletext/types";

export type NavLink = {
  label: string;
  href: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteSettings = {
  title?: string;
  blogHero?: string;
  // Array fields Sanity has never touched come back as `null`, not `undefined` —
  // components consuming these must guard with `?? []`, not a default parameter.
  navLinks?: NavLink[] | null;
  contactEmail?: string;
  footerColumns?: FooterColumn[] | null;
  footerCopyrightHolder?: string;
  footerMembershipLabel?: string;
  socialLinks?: SocialLink[] | null;
};

export type SanityImage = {
  asset?: { _ref: string; _type: string };
  hotspot?: { x: number; y: number };
  alt?: string;
};

export type Category = {
  _id: string;
  title: string;
  slug: string;
};

export type Author = {
  _id: string;
  name: string;
  role?: string;
  image?: SanityImage;
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  ctaLabel?: string;
  categories?: Category[];
};

export type Post = PostSummary & {
  authors?: Author[];
  body?: PortableTextBlock[];
};
