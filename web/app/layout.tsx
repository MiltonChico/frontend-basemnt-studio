import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/sanity/queries";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultTitle =
  "basement. — Research, insights & the science behind building brands & websites.";
const defaultDescription =
  "Research, insights, and the science behind building brands & websites.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s — basement.",
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "basement.",
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar
          title={siteSettings?.title}
          navLinks={siteSettings?.navLinks}
          contactEmail={siteSettings?.contactEmail}
        />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer
          footerColumns={siteSettings?.footerColumns}
          socialLinks={siteSettings?.socialLinks}
          copyrightHolder={siteSettings?.footerCopyrightHolder}
          membershipLabel={siteSettings?.footerMembershipLabel}
        />
      </body>
    </html>
  );
}
