import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "motion/react";

// ─── Animated Counter ────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, started: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return value;
}

function StatItem({
  value,
  suffix,
  label,
  started,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
  delay: number;
}) {
  const count = useCountUp(value, 1600, started);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center md:items-start gap-1"
    >
      <div
        className="font-headline-lg text-[2.6rem] md:text-[3.5rem] leading-none text-white tabular-nums"
        style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300 }}
      >
        {count}
        <span className="text-[#EFC9C0]">{suffix}</span>
      </div>
      <div className="text-[0.65rem] uppercase tracking-[0.28em] text-[#EFC9C0] font-semibold">
        {label}
      </div>
    </motion.div>
  );
}

// ─── Value Card ───────────────────────────────────────────────────────────────
const values = [
  {
    icon: "auto_awesome",
    title: "Premium Quality",
    desc: "Kami hanya memilih bahan terbaik — dari buah segar pagi hari hingga satin sutra premium — karena setiap detail yang terasa mewah, dimulai dari bahan baku.",
    color: "from-[#F5D9D2] to-[#EFC9C0]",
  },
  {
    icon: "palette",
    title: "Handcrafted Design",
    desc: "Setiap kelopak mawar dijahit tangan, setiap buah disusun dengan presisi artistik. Tidak ada mesin, tidak ada pintasan — hanya kesabaran dan cinta.",
    color: "from-[#EAD9CF] to-[#DFC4B6]",
  },
  {
    icon: "favorite",
    title: "Personal Touch",
    desc: "Setiap buket adalah surat cinta yang bisa dipegang. Kami mendengar ceritamu dan merangkai perasaanmu menjadi hadiah yang paling berkesan.",
    color: "from-[#FBEEE7] to-[#F5D9D2]",
  },
];

// ─── Timeline / journey ───────────────────────────────────────────────────────
const journey = [
  { year: "2018", event: "Studio kecil di kamar kos — Indy mulai menjahit mawar satin." },
  { year: "2020", event: "Pesanan pertama dari mahasiswa Unair untuk wisuda." },
  { year: "2022", event: "Ekspansi ke fruit bouquet & money bouquet, melayani 500+ pelanggan." },
  { year: "2024", event: "2.400+ buket terkirim. Same-day delivery seluruh Surabaya." },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AboutUs() {
  // Hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "60%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  // Stats
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  // Story image
  const storyImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyScroll } = useScroll({
    target: storyImgRef,
    offset: ["start end", "end start"],
  });
  const storyImgY = useTransform(storyScroll, [0, 1], [40, -40]);

  // Founder image
  const founderImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: founderScroll } = useScroll({
    target: founderImgRef,
    offset: ["start end", "end start"],
  });
  const founderImgY = useTransform(founderScroll, [0, 1], [60, -60]);

  // Journey line progress
  const journeyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: journeyScroll } = useScroll({
    target: journeyRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(journeyScroll, [0, 1], ["0%", "100%"]);

  return (
    <div className="flex-grow overflow-x-hidden bg-[#FDF9F4]">

      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        id="about"
        className="relative h-[100svh] min-h-[700px] flex items-center pt-24 overflow-hidden"
        aria-label="About Indy Buket Hero"
      >
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroBgY }}
        >
          <img
            src="/img/BG-aboutUs.jpg"
            alt=""
            aria-hidden
            className="w-full h-[120%] object-cover object-center"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3a1e12]/80 via-[#3a1e12]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3a1e12]/40 to-transparent" />
        </motion.div>

        {/* Floating decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-12 right-12 h-48 w-48 rounded-full border border-white/10 hidden md:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-24 right-28 h-24 w-24 rounded-full border border-white/8 hidden md:block"
        />

        {/* Scroll indicator */}
        <motion.div
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-20"
          style={{ opacity: heroOpacity }}
        >
          <div
            className="text-white/50 text-[9px] uppercase tracking-[0.3em] -rotate-90"
          >
            Scroll
          </div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1"
          >
            <div className="w-0.5 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Hero text */}
        <motion.div
          className="relative z-10 mx-auto max-w-7xl w-full px-6 md:px-12"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-block text-[0.65rem] uppercase tracking-[0.4em] text-[#EFC9C0] mb-5 font-semibold"
          >
            Tentang Indy Buket · Surabaya
          </motion.span>

          <motion.h1
            id="about-heading"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[0.95]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Dirangkai dengan
            <br />
            <em className="text-[#F5D9D2] italic">cinta</em>, dikirim
            <br />
            dari Surabaya.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="mt-7 text-white/75 text-base md:text-lg max-w-xl leading-relaxed"
          >
            Studio buket premium yang percaya setiap momen layak dirayakan
            dengan rangkaian yang sungguh-sungguh istimewa.
          </motion.p>

          <motion.a
            href="/collections"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 inline-flex items-center gap-3 bg-white text-[#5f3928] px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-shadow"
          >
            Lihat Koleksi
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="bg-[#5f3928] py-14 px-6 md:px-12">
        <div
          ref={statsRef}
          className="mx-auto max-w-5xl grid grid-cols-3 gap-6 md:gap-0 md:divide-x divide-white/20"
        >
          {[
            { value: 2400, suffix: "+", label: "Buket Terkirim" },
            { value: 98, suffix: "%", label: "Kepuasan Klien" },
            { value: 5, suffix: "+ Tahun", label: "Melayani Surabaya" },
          ].map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-0 md:px-12 first:pl-0 last:pr-0">
              <StatItem
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                started={statsInView}
                delay={i * 0.15}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── STORY SECTION ────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden">
        {/* Decorative blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#F5D9D2] opacity-30 blur-[100px]"
        />

        <div className="relative mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="md:col-span-6 order-1">
            <div
              ref={storyImgRef}
              className="relative"
            >
              {/* Decorative frame offset */}
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[2.5rem] border border-[#EAD9CF] -z-10"
              />
              <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_100px_-20px_rgba(95,57,40,0.3)]">
                <motion.img
                  src="/img/Buket kupu( uang + rokok) 🍫💝Free kartu ucapan💌Bisa request sesuai budgetTanya pricelist ata.webp"
                  alt="Rangkaian buket premium Indy Buket"
                  style={{ y: storyImgY }}
                  className="w-full aspect-[4/5] object-cover scale-[1.12]"
                />
              </div>

              {/* Floating pill badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="absolute -bottom-6 left-6 bg-[#FDF9F4] border border-[#EAD9CF] px-6 py-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#5f3928] text-xl">
                    star
                  </span>
                  <div>
                    <div className="font-semibold text-[#5f3928] text-sm leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      5+ tahun merangkai bahagia
                    </div>
                    <div className="text-[#a87559] text-[0.65rem] uppercase tracking-wider mt-0.5">
                      di Surabaya
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-6 order-2 md:pt-6"
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[#a87559]">
              Tentang Indy Buket
            </span>

            <h2
              className="mt-5 text-4xl md:text-5xl lg:text-[3.5rem] font-light leading-[1.05] text-[#5f3928]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Studio kecil yang{" "}
              <em className="italic text-[#a8453a]">percaya besar</em>.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-[#7a5444]">
              Indy Buket lahir di jantung kota Surabaya — sebuah studio yang
              percaya bahwa setiap momen, dari wisuda mahasiswa Unair dan ITS
              hingga ulang tahun keluarga, layak dirayakan dengan rangkaian
              yang sungguh istimewa.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#7a5444]">
              Kami melayani komunitas lokal dan mahasiswa dengan tiga
              signature: buah segar pilihan, mawar satin jahit tangan, dan
              money &amp; bear bouquet untuk hari paling berarti.
            </p>

            {/* Decorative divider */}
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#EAD9CF]" />
              <span className="text-[#EAD9CF] text-lg">✦</span>
              <div className="h-px flex-1 bg-[#EAD9CF]" />
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[#a87559] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              "Lahir dari hobi, tumbuh karena cinta, bertahan karena kepercayaan pelanggan kami."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── JOURNEY / TIMELINE ───────────────────────────────────────────── */}
      {false && (
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#FAF6F1]">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[#a87559]">
              Perjalanan Kami
            </span>
            <h2
              className="mt-4 text-4xl md:text-5xl font-light text-[#5f3928]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Dari hobi menjadi{" "}
              <em className="italic text-[#a8453a]">panggilan</em>.
            </h2>
          </motion.div>

          {/* Timeline */}
          <div ref={journeyRef} className="relative">
            {/* Animated line */}
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-[#EAD9CF] -translate-x-1/2">
              <motion.div
                className="absolute top-0 left-0 w-full bg-[#a8453a] origin-top"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="space-y-12 md:space-y-0">
              {journey.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  } md:mb-12`}
                >
                  {/* Content box */}
                  <div
                    className={`pl-12 md:pl-0 md:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    }`}
                  >
                    <div
                      className="text-[#a8453a] text-xs font-bold uppercase tracking-[0.3em] mb-2"
                    >
                      {item.year}
                    </div>
                    <p className="text-[#7a5444] text-sm md:text-base leading-relaxed">
                      {item.event}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-0 md:left-1/2 top-1 -translate-x-1/2 w-9 h-9 rounded-full bg-[#FDF9F4] border-2 border-[#a8453a] flex items-center justify-center z-10 shadow-md">
                    <div className="w-2 h-2 rounded-full bg-[#a8453a]" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ─── VALUES SECTION ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-12 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#EFC9C0] opacity-25 blur-[120px]"
        />
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[#a87559]">
              Nilai Kami
            </span>
            <h2
              className="mt-4 text-4xl md:text-5xl font-light text-[#5f3928]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Prinsip yang memandu{" "}
              <em className="italic text-[#a8453a]">setiap rangkaian</em>.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-[2rem] p-8 md:p-10 border border-[#EAD9CF] shadow-[0_8px_40px_-12px_rgba(95,57,40,0.12)] hover:shadow-[0_24px_60px_-12px_rgba(95,57,40,0.22)] transition-shadow duration-500 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-[2rem]`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -12, 12, -6, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-2xl bg-[#FDF9F4] border border-[#EAD9CF] flex items-center justify-center mb-6 shadow-sm group-hover:border-[#a8453a]/30 transition-colors duration-300"
                  >
                    <span className="material-symbols-outlined text-[#a8453a] text-2xl">
                      {v.icon}
                    </span>
                  </motion.div>

                  <h3
                    className="text-xl font-semibold text-[#5f3928] mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-[#7a5444] text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUNDER SECTION ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-[#FAF6F1] overflow-hidden">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-6 order-2 md:order-1"
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[#a87559]">
              Meet the Founder
            </span>

            <h2
              className="mt-5 text-4xl md:text-5xl font-light leading-tight text-[#5f3928]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Indy — tangan di balik
              <br />
              setiap{" "}
              <em className="italic text-[#a8453a]">kelopak</em>.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-[#7a5444]">
              Berawal dari hobi menjahit mawar satin di sela kuliah, Indy
              memutuskan menjadikan setiap rangkaian sebagai surat cinta yang
              bisa dipegang. Ia memilih sendiri buah-buah segar dari pasar
              pagi Surabaya, dan menjahit setiap kelopak satin dengan tangan
              — tanpa mesin, tanpa pintasan.
            </p>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 relative pl-6 border-l-[3px] border-[#a8453a]"
            >
              <p
                className="text-xl font-light italic leading-relaxed text-[#5f3928]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "Setiap mawar satin yang aku jahit membawa doa kecil — semoga
                yang menerimanya merasa benar-benar dicintai."
              </p>
              <footer className="mt-3 text-[0.65rem] uppercase tracking-[0.3em] text-[#a87559] font-semibold">
                — Indy, Founder &amp; Lead Florist
              </footer>
            </motion.blockquote>

            {/* Social links */}
            <div className="mt-10 flex items-center gap-4">
              <a
                href="https://www.instagram.com/indy_buket"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#5f3928] border border-[#EAD9CF] px-5 py-2.5 rounded-full hover:border-[#5f3928] hover:bg-[#5f3928] hover:text-white transition-all duration-300"
              >
                <span className="material-symbols-outlined text-base">photo_camera</span>
                Instagram
              </a>
              <a
                href="https://wa.me/6281554107944?text=Halo%20Indy%20Buket%2C%20saya%20ingin%20konsultasi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#5f3928] border border-[#EAD9CF] px-5 py-2.5 rounded-full hover:border-[#5f3928] hover:bg-[#5f3928] hover:text-white transition-all duration-300"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Founder image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-6 order-1 md:order-2"
          >
            <div ref={founderImgRef} className="relative">
              {/* Glow backdrop */}
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-[#F5D9D2] to-[#EFC9C0] blur-3xl opacity-60"
              />
              <div className="overflow-hidden rounded-[2rem] border border-[#EAD9CF] shadow-[0_60px_120px_-30px_rgba(95,57,40,0.4)]">
                <motion.img
                  src="/img/tes.jpeg"
                  alt="Pendiri Indy Buket merangkai buket premium di studio Surabaya"
                  style={{ y: founderImgY }}
                  className="w-full aspect-[4/5] object-cover scale-[1.12]"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#5f3928] text-white text-xs px-6 py-3 rounded-full shadow-xl font-semibold tracking-wide"
              >
                ✦ Hand-crafted with love in Surabaya ✦
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden bg-[#5f3928]">
        {/* Background pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#a8453a] opacity-20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#3a1e12] opacity-40 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-[#EFC9C0] mb-5 inline-block">
            Pesan Sekarang
          </span>
          <h2
            className="text-4xl md:text-6xl font-light leading-tight text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Siap merangkai{" "}
            <em className="italic text-[#F5D9D2]">momen spesial</em> Anda?
          </h2>
          <p className="mt-6 text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Konsultasi gratis, pengiriman same-day ke seluruh Surabaya. Hubungi
            kami dan wujudkan hadiah impian Anda.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/6281554107944?text=Halo%20Indy%20Buket%2C%20saya%20ingin%20konsultasi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#5f3928] px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl transition-shadow"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              Chat WhatsApp
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="https://www.instagram.com/indy_buket"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-widest hover:border-white/70 hover:bg-white/10 transition-all"
            >
              <span className="material-symbols-outlined text-lg">photo_camera</span>
              Lihat Instagram
            </motion.a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
