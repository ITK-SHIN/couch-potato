import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

export const metadata: Metadata = {
  title: {
    template: " %s | Couch Potato",
    default: "Couch Potato",
  },
  description: "Couch Potato is a content production company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
