export type MenuCategory =
  | "همه"
  | "صبحانه"
  | "ساندویچ"
  | "پاستا"
  | "دسر"
  | "نوشیدنی";

export type MenuItem = {
  id: string;
  slug: string;
  nameFa: string;
  nameEn: string;
  description: string;
  price: number;
  category: Exclude<MenuCategory, "همه">;
  image: string;
  tag: string;
  time: string;
  ingredients: string[];
  note: string;
};

export const categories: MenuCategory[] = [
  "همه",
  "صبحانه",
  "ساندویچ",
  "پاستا",
  "دسر",
  "نوشیدنی",
];

export const menuItems: MenuItem[] = [
  {
    id: "01",
    slug: "peanut-smoky-pasta",
    nameFa: "پاستا پینات اسموکی",
    nameEn: "Peanut Smoky Pasta",
    description:
      "پنه ریگاته، سس پینات‌ اسموکی برپایه بادمجان‌‌ کبابی، قارچ، بادام زمینی، گوجه خشک مزه دارشده، پنیر پارمسان ( این آیتم به صورت ساده و یا به همراه پروتئین انتخابی سرو میشود‌)",
    price: 537000,
    category: "پاستا",
    image:
      "https://img01.live-app.ir/Files/394/Product/202412240254058613355.jpg",
    tag: "امضای ما",
    time: "۱۲ دقیقه",
    ingredients: ["پاستا ریگاته", "بادام زمینی", "بادمجان کبابی"],
    note: "شروعی آرام برای میزهای طولانی.",
  },
  {
    id: "02",
    slug: "pomodoro-pasta",
    nameFa: "پاستا پومودورو",
    nameEn: "Pomodoro Pasta",
    description:
      "پنه‌ ریگاته، سس پومودورو برپایه گوجه رست شده، ریحان ایتالیایی، پنیر تازه، گوجه خشک مزه دارشده (این آیتم به صورت ساده و یا به همراه پروتئین انتخابی سرو میشود‌)",
    price: 527000,
    category: "پاستا",
    image:
      "https://img01.live-app.ir/Files/394/Product/202412240254330804605.jpg",
    tag: "",
    time: "15 دقیقه",
    ingredients: ["پاستا ریگاته", "گوجه"],
    note: "برای روزهایی که عجله، انتخاب خوبی نیست.",
  },
  {
    id: "03",
    slug: "steak-baguette",
    nameFa: "استیک باگت",
    nameEn: "Steak Baguette",
    description:
      "نان باگت فرانسوی، فیله گوساله مزه دار شده، قارچ کاراملایز، کاهو فرانسوی، گوجه خشک مزه دارشده‌، پنیر گودا، زیتون، سس مایوچیز",
    price: 900000,
    category: "ساندویچ",
    image:
      "https://img01.live-app.ir/Files/394/Product/202501041502317698798.jpg",
    tag: "باگت پیشنهادی",
    time: "15 دقیقه",
    ingredients: ["استیک", "قارچ"],
    note: "سرد، روشن و به اندازه‌ی یک نفس عمیق.",
  },
  {
    id: "04",
    slug: "chicken-baguette",
    nameFa: "باگت مرغ",
    nameEn: "Chicken Baguette",
    description:
      "نان باگت فرانسوی، میکس سینه مرغ مزه دارشده و بیبی اسفناج، کاهو فرانسوی، گوجه خشک مزه دارشده‌، پنیر گودا، زیتون، سس مایوچیز",
    price: 600000,
    category: "ساندویچ",
    image:
      "https://img01.live-app.ir/Files/394/Product/202501041505162343816.jpg",
    tag: "پرطرفدارترین",
    time: "۱۰ دقیقه",
    ingredients: ["مرغ", "اسفناج"],
    note: "سرد، روشن و به اندازه‌ی یک نفس عمیق.",
  },
  {
    id: "05",
    slug: "sausage-baguette",
    nameFa: "باگت سوسیس",
    nameEn: "Sausage Baguette",
    description:
      "نان باگت فرانسوی، سوسیس دستساز‌ انجوی‌، کاهو فرانسوی، گوجه خشک مزه دارشده‌، پنیر گودا، زیتون، سس مایوچیز",
    price: 550000,
    category: "ساندویچ",
    image:
      "https://img01.live-app.ir/Files/394/Product/202501041506043466877.jpg",
    tag: "ساده و سریع",
    time: "۱۰ دقیقه",
    ingredients: ["سوسیس دستساز"],
    note: "سرد، روشن و به اندازه‌ی یک نفس عمیق.",
  },
  {
    id: "06",
    slug: "fry-up",
    nameFa: "فرای آپ",
    nameEn: "Fry Up",
    description:
      "سوسیس انجوی دست ساز، دو عدد نیمرو، بیکن فیله گوشت، قارچ گریل، گوجه چری، نان تست خمیر ترش، لوبیا",
    price: 650000,
    category: "صبحانه",
    image:
      "https://img01.live-app.ir/Files/394/Product/202511041000515041821.jpeg",
    tag: "پیشنهاد امروز",
    time: "۱۰ دقیقه",
    ingredients: ["سوسیس دستساز", "بیکن"],
    note: "سرد، روشن و به اندازه‌ی یک نفس عمیق.",
  },
  {
    id: "07",
    slug: "oliva-omelette",
    nameFa: "املت زیتون",
    nameEn: "Oliva Omelette",
    description:
      "تخم مرغ، زیتون اسلایس شده، سس پومودورو، رب انار، گردو، گوجه خشک مزه دارشده",
    price: 500000,
    category: "صبحانه",
    image:
      "https://img01.live-app.ir/Files/394/Product/202412240241420546189.jpg",
    tag: "املت ویژه",
    time: "۱۰ دقیقه",
    ingredients: ["تخم مرغ", "زیتون", "رب انار"],
    note: "سرد، روشن و به اندازه‌ی یک نفس عمیق.",
  },
  {
    id: "08",
    slug: "emerald",
    nameFa: "امرالد",
    nameEn: "Emerald",
    description: "ترکیب میوه های ملس و تابستانه با پس طعم تلخی پرتقال",
    price: 350000,
    category: "نوشیدنی",
    image:
      "https://img01.live-app.ir/Files/394/Product/202408062254361029494.jpg",
    tag: "نوشیدنی خاص",
    time: "۱۰ دقیقه",
    ingredients: ["ملس و تلخ"],
    note: "سرد، روشن و به اندازه‌ی یک نفس عمیق.",
  },
  {
    id: "09",
    slug: "vin-de-miel",
    nameFa: "وین د میل",
    nameEn: "Vin De Miel",
    description: "ترکیب مرکبات و انگور با پس طعم شهد عسل و چای ترش دستساز",
    price: 400000,
    category: "نوشیدنی",
    image:
      "https://img01.live-app.ir/Files/394/Product/202308261911484044616.jpg",
    tag: "شراب انگور",
    time: "۱۰ دقیقه",
    ingredients: ["شراب", "انگور قرمز"],
    note: "سرد، روشن و به اندازه‌ی یک نفس عمیق.",
  },
  {
    id: "10",
    slug: "passion-lime",
    nameFa: "پشن لایم",
    nameEn: "Passion Lime",
    description: "ترکیب لیمو و زردآلو با پشن فروت گازدار",
    price: 590000,
    category: "نوشیدنی",
    image:
      "https://img01.live-app.ir/Files/394/Product/202505250216541855669.JPG",
    tag: "گازدار",
    time: "۱۰ دقیقه",
    ingredients: ["پشن فروت"],
    note: "سرد، روشن و به اندازه‌ی یک نفس عمیق.",
  },
];

export function getMenuItem(slug: string) {
  return menuItems.find((item) => item.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("fa-IR").format(price);
}
