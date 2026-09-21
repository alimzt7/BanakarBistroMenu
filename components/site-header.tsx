"use client";

import Image from "next/image";
import SideBar from "./side-bar";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header className="site-header">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-6 px-5 py-3 md:px-10 md:py-5">
          <button
            type="button"
            onClick={() => setIsSideBarOpen(true)}
            className="brand-mark flex items-center gap-4 px-8 py-1 focus:outline-none transition-transform active:scale-95"
            aria-label="باز کردن منو"
          >
            <span className="brand-symbol">
              <Image
                src="/icons/icon-128x128.png"
                alt="Banakar Icon"
                width={50}
                height={50}
                className="transition-transform group-hover:rotate-6 duration-300"
              />
            </span>
            <span className="">
              <span className="brand-name block font-sans text-[20px] font-normal tracking-[0.10em] text-black text-center">
                بناکار بیسترو
              </span>
              <span className=" mt-1 block font-sans text-[9px] font-bold tracking-[0.22em] text-coal/45 text-center">
                Café x Pastry
              </span>
            </span>
          </button>
        </div>
      </header>

      <SideBar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
    </>
  );
}
