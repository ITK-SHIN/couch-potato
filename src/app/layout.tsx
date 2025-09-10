import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { AdminProvider } from "@/contexts/AdminContext";
import QueryProvider from "@/components/providers/QueryProvider";

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
        <QueryProvider>
          <AdminProvider>
            <Navbar />
            {children}
            <Footer />
          </AdminProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
