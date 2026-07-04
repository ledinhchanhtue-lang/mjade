import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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

export const metadata: Metadata = {
  title: "MJADE | Ngọc Phỉ Thúy Myanmar Type A 100%",
  description:
    "MJADE tuyển chọn trang sức ngọc phỉ thúy Myanmar Type A 100%, có kiểm định, nguồn gốc minh bạch và trải nghiệm tư vấn cá nhân hóa.",
  metadataBase: new URL("https://mjade.vn"),
  openGraph: {
    title: "MJADE | Ngọc Phỉ Thúy Myanmar Type A 100%",
    description:
      "MJADE tuyển chọn trang sức ngọc phỉ thúy Myanmar Type A 100%, có kiểm định, nguồn gốc minh bạch và trải nghiệm tư vấn cá nhân hóa.",
    locale: "vi_VN",
    type: "website",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MJADE",
  description:
    "Thương hiệu ngọc phỉ thúy Myanmar Type A tuyển chọn, tư vấn cá nhân hóa, không qua trung gian.",
  url: "https://mjade.vn",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
