import Link from "next/link";
import { Icon } from "../components/icons";
import Image from "next/image";

function Hero() {
  return (
    <section className="hero">
      <div className="mx-auto max-w-[1480px] px-5 py-5 md:px-10 md:py-4">
        <div className="hero-panel">
          <div className="hero-copy">
            <div className="flex items-center gap-3 text-[var(--saffron)]">
              <Icon name="spark" size={14} filled />
              <span className="eyebrow">یک میز برای لحظه‌های خوب</span>
            </div>
            <h1 className="hero-title mt-12">
              <span>تجربه‌ای</span>جدید...
            </h1>
            <p className="mt-12 max-w-[320px] text-sm leading-8 text-ink/60 md:mr-[6%]">
              منتظرت هستیم تا تو هم با داستانی منحصر به فرد، عضوی از این خانه
              شوی.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5 md:mr-[9%]">
              <Link href="/menu" className="primary-button rounded-xl">
                دیدن منو <Icon name="arrow-up-left" size={14} />
              </Link>
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-ink/45">
                هرروز از ساعت 8 الی 23
              </span>
            </div>
          </div>
          <div className="hero-photo">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6IdhyXmzmM0FYfKV8E1bVmE4nMWEnuOqCrknH9PtdV8F9Kr8ycz4tWok&s=10"
              fill
              loading="eager"
              sizes="(max-width: 768px) 55vw, 43vw"
              className="object-cover"
              alt="محیط کافه"
            />
          </div>

          <div className="hero-orbit">
            <span className="hero-orbit-dot" />
          </div>
          <span className="hero-side-note">ایران / اصفهان</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
