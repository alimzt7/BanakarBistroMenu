import Link from "next/link";
import { BookingForm } from "../../components/booking-form";
import { Icon } from "../../components/icons";
import Footer from "../../components/footer";

export default function ReservePage() {
  return (
    <main className="reserve-stage">
      <div className="mx-auto grid max-w-[1480px] gap-6 px-5 py-8 md:px-10 md:py-12 lg:grid-cols-[.86fr_1.14fr]">
        <section className="reserve-hero relative flex min-h-[620px] flex-col justify-between overflow-hidden p-7 md:p-12">
          <div className="absolute -left-20 top-28 h-80 w-80 rounded-full border border-paper/25" />
          <div className="absolute -left-5 top-[170px] h-56 w-56 rounded-full border border-paper/20" />
          <div className="relative z-10 flex items-center justify-between">
            <span className="eyebrow text-paper/65">رزرو · یک شب خاص</span>
            <Icon name="calendar" size={22} />
          </div>
          <div className="relative z-10">
            <h1 className="display text-[clamp(2rem,9vw,5rem)] ">رزرو میز</h1>
            <p className="mt-10 max-w-[320px] text-sm leading-8 text-paper/72">
              برای گفتگوهای طولانی، جشن‌های کوچک و شب‌های به یاد ماندنی که ارزش
              نگه داشتن دارند.
            </p>
          </div>
          <div className="relative z-10 flex items-end justify-between gap-5 border-t border-paper/30 pt-5 text-[10px] text-paper/65">
            <span>
              شنبه — جمعه
              <br />
              از ۹:۰۰ صبح
            </span>
            <span className="text-left">
              اصفهان
              <br />
              خیابان حکیم نظامی
            </span>
          </div>
        </section>
        <section className="flex flex-col justify-between bg-paper p-0 text-ink">
          <div className="px-1 pb-8 md:px-8 md:pt-3">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[.14em] text-ink/50 hover:text-copper"
            >
              <Icon name="arrow-right" size={15} /> خانه
            </Link>
            <h2 className="display mt-12 text-[clamp(2rem,9vw,3.2rem)] leading-[1]">
              جزئیات مهم‌اند.
            </h2>
            <p className="mt-8 max-w-[380px] text-sm leading-7 text-ink/55">
              فرم زیر را پر کن تا میز مناسب حال‌وهوایت را برایت نگه داریم.
              درخواست‌ها تا ۲ ساعت قبل از زمان انتخابی بررسی می‌شوند.
            </p>
          </div>
          <BookingForm />
          <div className="mt-8 flex items-center justify-between border-t border-ink/15 px-1 pt-5 font-sans text-[9px] uppercase tracking-[.13em] text-ink/42 md:mx-8">
            <span className="flex items-center gap-2">
              <Icon name="clock" size={13} /> پاسخ‌گویی تا ۳۰ دقیقه بعد از ثبت
              درخواست شما
            </span>
            <span className=" flex items-center gap-2">
              <Icon name="phone" size={13} /> 0000 000 0313
            </span>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
