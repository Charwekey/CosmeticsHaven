import type { Metadata } from "next";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "@/components/ToastContainer";
import { SearchModal } from "@/components/SearchModal";

export const metadata: Metadata = {
  title: "Cosmetics Haven | Luxury Beauty & Skincare Accra Ghana",
  description: "Discover luxury skincare, high-pigment cosmetics, pure Ghanaian shea butter treatments, and exquisite fragrances at Cosmetics Haven in Accra, Ghana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ShopProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <ToastContainer />
          <SearchModal />
        </ShopProvider>
      </body>
    </html>
  );
}
