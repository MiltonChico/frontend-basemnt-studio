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
  slug?: string;
  role?: string;
  image?: SanityImage;
};

export type PullQuote = {
  _type: "pullQuote";
  _key: string;
  quote: string;
  attributionName?: string;
  attributionRole?: string;
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  ctaLabel?: string;
  categories?: Category[];
};

export type Post = PostSummary & {
  subtitle?: string;
  // Full-length lead paragraph for the detail header — kept separate from `description`
  // (the card teaser) since one gets clamped and the other needs its full length.
  intro?: string;
  authors?: Author[];
  // `body` blocks are either standard Portable Text blocks/images, or the custom
  // `pullQuote` object — components consuming this should switch on `_type`.
  body?: (PortableTextBlock | PullQuote)[];
  displayNumber?: number;
  previousPost?: PostSummary | null;
  nextPost?: PostSummary | null;
};
