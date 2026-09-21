import { Icon } from "./icons";

function Footer() {
  return (
    <footer className="section-dark border-t-2 border-copper/50">
      <div className="mx-auto grid max-w-[1480px] gap-10 px-5 py-12 md:grid-cols-[1.1fr_.9fr_.7fr] md:px-10 md:py-16 ">
        <div>
          <p className="font-sans text-[12px] font-bold uppercase tracking-[.23em]">
            <span className="text-[var(--banakar)]">BANAKAR</span> BISTRO
          </p>
          <p className="display mt-5 max-w-[290px] text-2xl leading-[1]">
            منتظر دیدارتان هستیم.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="eyebrow text-paper/38">ساعت</p>
            <p className="mt-4 text-xs leading-7 text-paper/65">
              همه روزه :
              <br />
              ۸:۰۰ — ۲۳:۰۰
              <br />
            </p>
          </div>
          <div>
            <p className="eyebrow text-paper/38">آدرس</p>
            <p className="mt-4 text-xs leading-7 text-paper/65">
              ایران، اصفهان،
              <br />
              خیابان حکیم نظامی،
              <br />
              جنب مجتمع ارکیده
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex gap-3">
            <a
              className="icon-button border-paper/20 text-paper"
              href="https://instagram.com/banakar.bistro"
              aria-label="اینستاگرام"
            >
              <Icon name="instagram" size={17} />
            </a>
            <a
              className="icon-button border-paper/20 text-paper"
              href="tel:+983136294469"
              aria-label="تماس"
            >
              <Icon name="phone" size={17} />
            </a>
          </div>
          <p className="font-sans text-[9px] uppercase tracking-[.13em] text-paper/35">
            © 2026 <span className="text-[var(--banakar)]">BANAKAR</span> /
            ساخته‌شده برای ماندن
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
