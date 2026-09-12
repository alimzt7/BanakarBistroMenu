import type { Metadata } from "next";
import "./globals.css";
import { CartDrawer } from "../components/cart-drawer";
import { CartProvider } from "../components/cart-context";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Ambre — Café · Table · Ritual",
  description: "منوی دیجیتال لوکس و متفاوت برای کافه رستوران آمبر",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <CartProvider>
          <div className="grain" />
          <SiteHeader />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
