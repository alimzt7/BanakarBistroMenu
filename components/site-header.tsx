"use client";

import Image from "next/image";
import SideBar from "./side-bar";
import { useState } from "react";

export function SiteHeader() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

  return (
    <>
      <header className="site-header">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-6 px-5 py-3 md:px-10 md:py-5">
          <button
            type="button"
            onClick={() => setIsSideBarOpen(true)}
            className="brand-mark group flex items-center gap-3 px-5 py-1 text-right focus:outline-none transition-transform active:scale-95"
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
            <span className="text-right">
              <span className="brand-name block font-sans text-[20px] font-normal tracking-[0.10em] text-black">
                بناکار بیسترو
              </span>
              <span className=" mt-1 block font-sans text-[9px] font-bold tracking-[0.22em] text-coal/45">
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
