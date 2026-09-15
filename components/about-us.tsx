import React from "react";

function About() {
  return (
    <section className="section-dark" id="story">
      <div className="mx-auto max-w-[1480px] px-5 py-10 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[.82fr_1.18fr] md:items-center">
          <div>
            <p className="section-kicker text-copper">درباره ما · ۰۲</p>
            <h2 className="display mt-6 text-[clamp(2rem,9vw,3.2rem)] leading-[1]">
              خانه تاریخی بناکار
            </h2>
            <div className="mt-12 flex items-start gap-4 text-paper/45">
              <span className="vertical-note eyebrow">
                <span className="text-[var(--banakar)]">BANAKAR</span> CAFE
              </span>
              <p className="text-border max-w-[280px] text-sm leading-7 pr-2">
                <span className="text-paper text-base">آغاز؛</span>
                <br />
                همه چیز از یک خانه شروع شد...
                <br />
                منتظرت هستیم تا تو هم با داستانی منحصر به فرد، عضوی از این خانه
                شوی.
                <br />
                <span className="text-[var(--banakar)] text-base">
                  بناکار بیسترو
                </span>
                <br />
                دلیل انتخاب نام "بیسترو" برای این عمارت، استفاده از واژه‌ای است
                که تداعی گر کافه‌ای کوچک و پرانرژی به همراه نوشیدنی و دسر‌های
                منحصر به فرد می‌باشد.
              </p>
            </div>
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
  );
}

export default About;
