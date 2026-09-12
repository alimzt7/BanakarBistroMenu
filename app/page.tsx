import Link from "next/link";
import { Icon } from "../components/icons";
import { menuItems } from "../lib/menu";
import Footer from "../components/footer";

export default function HomePage() {
  const signature = menuItems[0];

  return (
    <main>
      <section className="hero">
        <div className="mx-auto max-w-[1480px] px-5 py-5 md:px-10 md:pt-8">
          <div className="hero-panel">
            <div className="hero-copy">
              <div className="flex items-center gap-3 text-copper">
                <Icon name="spark" size={14} filled />
                <span className="eyebrow">یک میز برای لحظه‌های خوب</span>
              </div>
              <h1 className="display hero-title mt-12">
                <span>لذت</span>ببر...
              </h1>
              <p className="mt-12 max-w-[360px] text-sm leading-8 text-ink/60 md:mr-[6%]">
                غذا این‌جا فقط برای سیر شدن نیست. مجموعه‌ای است از نور عصر، صدای
                بشقاب‌ها و طعم‌هایی که فرصت می‌خواهند.
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
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6IdhyXmzmM0FYfKV8E1bVmE4nMWEnuOqCrknH9PtdV8F9Kr8ycz4tWok&s=10"
                alt="محیط کافه"
              />
            </div>
            <div className="hero-stamp">
              <Link
                href="/reserve"
                className="relative z-10 display text-center text-xl leading-[.8]"
              >
                رزرو
                <br />
                میز
              </Link>
            </div>
            <div className="hero-orbit">
              <span className="hero-orbit-dot" />
            </div>
            <span className="hero-side-note">ایران / اصفهان</span>
          </div>
        </div>
      </section>

      <section className="section-paper" id="today">
        <div className="mx-auto max-w-[1480px] px-5 py-20 md:px-10 ">
          <div className="grid gap-10 md:grid-cols-[1.05fr_.95fr] md:items-end">
            <div>
              <p className="section-kicker text-copper">پیشنهاد روز</p>
              <h2 className="display mt-6 text-[clamp(2rem,9vw,3.2rem)] leading-[1]">
                چیزی که
                <br />
                امروز به شما پیشنهاد میدهیم.
              </h2>
            </div>
            <div className="max-w-[315px] text-sm leading-7 text-ink/55">
              <p>
                تمرکز ما بر ارائه بهترین و ماندگارترین طعم ها با استفاده از
                بهترین مواد اولیه می باشد.
              </p>
              <Link
                href="/menu"
                className="mt-7 inline-flex items-center gap-3 text-[10px] font-bold  tracking-[.14em] text-ink"
              >
                مشاهده کل منو
                <Icon name="arrow-up-left" size={14} />
              </Link>
            </div>
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-[1.08fr_.92fr]">
            <Link href={"/menu/" + signature.slug}>
              <div className="feature-image">
                <img src={signature.image} alt={signature.nameFa} />
                <span className="feature-number">{signature.id}</span>
                <div className="feature-callout">
                  <p className="eyebrow text-paper/65">{signature.tag}</p>
                  <h3 className="display mt-3 text-6xl leading-[.75] md:text-6xl">
                    {signature.nameFa}
                  </h3>
                  <p className="mt-3 max-w-[300px] text-xs leading-6 text-paper/65">
                    {signature.description}
                  </p>
                </div>
              </div>
            </Link>
            <div className="feature-copy">
              <div className="flex items-start justify-between">
                <span className="eyebrow text-paper/60">یادداشت آشپزخانه</span>
                <Icon name="spark" size={20} />
              </div>
              <div>
                <p className="display">هر بشقاب = یک مکث</p>
                <div className="mt-8 border-t border-paper/35 pt-5">
                  <p className="text-xs leading-6 text-paper/72">
                    «طعم خوب، بلند حرف نمی‌زند؛ می‌ماند.»
                  </p>
                  <p className="mt-4 font-sans text-[9px] uppercase tracking-[.16em] text-paper/50">
                    — سرآشپز
                  </p>
                </div>
              </div>
              <Link
                href={"/menu/" + signature.slug}
                className="mt-10 inline-flex items-center gap-3 text-[10px] font-bold tracking-[.14em] text-paper"
              >
                جزئیات این بشقاب <Icon name="arrow-up-left" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark" id="story">
        <div className="mx-auto max-w-[1480px] px-5 py-10 md:px-10 md:py-20">
          <div className="grid gap-12 md:grid-cols-[.82fr_1.18fr] md:items-center">
            <div>
              <p className="section-kicker text-copper">داستان ما · ۰۲</p>
              <h2 className="display mt-6 text-[clamp(2rem,9vw,3.2rem)] leading-[1]">
                به وقت با هم بودن.
              </h2>
              <div className="mt-12 flex items-start gap-4 text-paper/45">
                <span className="vertical-note eyebrow">
                  THE <span className="text-copper">AMBRE</span> MOOD
                </span>
                <span className="h-28 w-px bg-paper/20" />
                <p className="max-w-[240px] text-xs leading-7">
                  ما به میزهایی باور داریم که آدم‌ها را کمی بیشتر نگه می‌دارند؛
                  برای یک بشقاب دیگر، یک داستان دیگر.
                </p>
              </div>
              <Link href="/reserve" className="outline-button mt-10 rounded-xl">
                میزت را نگه دار <Icon name="arrow-up-left" size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="story-photo story-photo-tall h-5">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbooTcgeMj1Qox5ZTm1mvtCTV1JEddooGV_m7apRNAiw&s=10"
                  alt="فضای گرم کافه آمبر"
                />
              </div>
              <div className="story-photo story-photo-small h-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFevq_rioBAbpCL5r_ui9uP_i8faJuWUtLzQgin_dj3YDnacX1VmBW7czk&s=10"
                  alt="میز رستوران با نور عصر"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
