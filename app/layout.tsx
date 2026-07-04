import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mjade.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "MJADE | Ngọc Phỉ Thúy Myanmar Type A 100%",
    template: "%s",
  },
  description:
    "MJADE tuyển chọn trang sức ngọc phỉ thúy Myanmar Type A 100%, có kiểm định, nguồn gốc minh bạch và trải nghiệm tư vấn cá nhân hóa.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "MJADE | Ngọc Phỉ Thúy Myanmar Type A 100%",
    description:
      "MJADE tuyển chọn trang sức ngọc phỉ thúy Myanmar Type A 100%, có kiểm định, nguồn gốc minh bạch và trải nghiệm tư vấn cá nhân hóa.",
    locale: "vi_VN",
    type: "website",
    siteName: "MJADE",
    images: [{ url: "/images/home/hero-jade-woman.webp", width: 2200, height: 1500 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MJADE | Ngọc Phỉ Thúy Myanmar Type A 100%",
    description:
      "Trang sức ngọc phỉ thúy Myanmar Type A 100% — kiểm định minh bạch, tư vấn cá nhân hóa.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MJADE",
  description:
    "Thương hiệu ngọc phỉ thúy Myanmar Type A tuyển chọn, tư vấn cá nhân hóa, không qua trung gian.",
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${montserrat.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-text-primary antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
