import type { Metadata } from "next";
import "./globals.css";
import { CartDrawer } from "../components/cart-drawer";
import { CartProvider } from "../components/cart-context";
import { SiteHeader } from "../components/site-header";
import SideBar from "../components/side-bar";

export const metadata: Metadata = {
  title: "Banakar Bistro · Cafe x Pastry",
  description: "منوی دیجیتال برای کافه بیسترو بناکار",
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
          <div className="flex min-h-[calc(100vh-80px)]">
            <SideBar />
            <main className="flex-1 min-w-0">{children}</main>
          </div>

          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
