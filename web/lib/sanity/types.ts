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
  navLinks?: NavLink[];
  contactEmail?: string;
  footerColumns?: FooterColumn[];
  socialLinks?: SocialLink[];
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
  categories?: Category[];
};

export type Post = PostSummary & {
  authors?: Author[];
  body?: PortableTextBlock[];
};
