import React from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { menuItems } from "../lib/menu";

function DailySuggest() {
  const signature = menuItems[0];

  return (
    <section className="section-paper overflow-hidden" id="today">
      <div className="mx-auto flex max-w-[1480px] flex-col md:flex-row items-center justify-around gap-8 px-5 py-8 md:px-10">
        <div className="flex flex-col justify-around self-stretch">
          <div>
            <p className="section-kicker text-copper">پیشنهاد روز</p>
            <h2 className="display mt-4 text-[clamp(1.8rem,5vw,2.6rem)] leading-[1.1]">
              چیزی که
              <br />
              امروز به شما پیشنهاد میدیم.
            </h2>
          </div>

          <div className="mt-6 max-w-[315px] text-sm leading-7 text-ink/55">
            <p>
              تمرکز ما بر ارائه بهترین و ماندگارترین طعم ها با استفاده از بهترین
              مواد اولیه می باشد.
            </p>
            <Link
              href="/menu"
              className="mt-5 inline-flex items-center gap-3 text-[10px] font-bold tracking-[.14em] text-ink transition-transform hover:-translate-x-1"
            >
              مشاهده کل منو
              <Icon name="arrow-up-left" size={14} />
            </Link>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <Link href={"/menu/" + signature.slug} className="block">
            <div className="feature-image h-[360px] w-full md:w-[420px] rounded-lg">
              <img
                src={signature.image}
                alt={signature.nameFa}
                className="h-full w-full object-cover"
              />
              <span className="feature-number">{signature.id}</span>
              <div className="feature-callout">
                <p className="eyebrow text-paper/65">{signature.tag}</p>
                <h3 className="display mt-2 text-3xl font-bold md:text-4xl">
                  {signature.nameFa}
                </h3>
                <p className="mt-2 max-w-[280px] text-xs leading-5 text-paper/65 line-clamp-2">
                  {signature.description}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DailySuggest;
