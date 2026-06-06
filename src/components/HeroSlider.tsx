import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";

// ─── Letakkan file-file ini di folder public/img/ ───────────────────────────
// hero-fruit.png   → foto bouquet buah (PNG transparan, background dihapus)
// hero-satin.png   → foto bouquet mawar satin
// hero-money.png   → foto bouquet uang & bear
// float-strawberry.png → elemen dekoratif stroberi PNG transparan
// float-petal.png      → elemen dekoratif kelopak bunga PNG transparan
// float-money.png      → elemen dekoratif uang PNG transparan
// ────────────────────────────────────────────────────────────────────────────

type Slide = {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  desc: string;
  bg: string;
  accent: string;
  ink: string;
  bouquet: string;
  floats: string[];
};

const slides: Slide[] = [
  {
    id: "fruit",
    kicker: "01 — Fruit Edition",
    title: "Buah Segar,\nDirangkai Mewah",
    subtitle: "Fruit Bouquet",
    desc: "Stroberi, anggur, dan nanas pilihan disusun layaknya mahkota bunga — segar, manis, tak terlupakan.",
    bg: "linear-gradient(135deg, oklch(0.94 0.04 80) 0%, oklch(0.88 0.07 60) 100%)",
    accent: "oklch(0.55 0.18 30)",
    ink: "oklch(0.22 0.08 30)",
    bouquet: "/img/hero-fruit.png",
    floats: ["/img/float-strawberry.png", "/img/float-strawberry.png", "/img/float-strawberry.png"],
  },
  {
    id: "satin",
    kicker: "02 — Satin Edition",
    title: "Mawar Satin,\nAbadi Selamanya",
    subtitle: "Satin Rose Bouquet",
    desc: "Setiap kelopak dijahit tangan dari satin sutra premium — kenangan yang tak pernah layu.",
    bg: "linear-gradient(135deg, oklch(0.92 0.05 15) 0%, oklch(0.82 0.1 10) 100%)",
    accent: "oklch(0.4 0.18 15)",
    ink: "oklch(0.2 0.1 15)",
    bouquet: "/img/hero-satin.png",
    floats: ["/img/float-petal.png", "/img/float-petal.png", "/img/float-petal.png"],
  },
  {
    id: "money",
    kicker: "03 — Celebration Edition",
    title: "Uang & Bear,\nKado Penuh Cinta",
    subtitle: "Money & Bear Bouquet",
    desc: "Buket dari lembaran uang asli & teddy bear pelukan — hadiah yang berbicara dua bahasa: cinta & kemewahan.",
    bg: "linear-gradient(135deg, oklch(0.93 0.04 130) 0%, oklch(0.85 0.08 140) 100%)",
    accent: "oklch(0.35 0.1 140)",
    ink: "oklch(0.22 0.08 140)",
    bouquet: "/img/hero-money.png",
    floats: ["/img/float-money.png", "/img/float-money.png", "/img/float-money.png"],
  },
];

const floatPositions = [
  { top: "18%", left: "12%", size: 90, rot: -15, delay: 0 },
  { top: "60%", left: "8%", size: 70, rot: 20, delay: 0.2 },
  { top: "28%", right: "10%", size: 110, rot: 25, delay: 0.4 },
] as const;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const [isInside, setIsInside] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinates normalized: from -0.5 to 0.5 (relative to center of screen/container)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse coordinates
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Smooth spring for cursor absolute position (custom cursor tracking)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothCursorX = useSpring(cursorX, { damping: 40, stiffness: 400 });
  const smoothCursorY = useSpring(cursorY, { damping: 40, stiffness: 400 });

  // 3D rotation and translation parameters based on cursor coordinates
  const tiltX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const bgTextX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const bgTextY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const normX = (e.clientX - rect.left) / width - 0.5;
    const normY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);

    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsInside(true);
  };

  const handleMouseLeave = () => {
    setIsInside(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative h-[100svh] min-h-[700px] w-full overflow-hidden md:cursor-none"
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      {/* Background layer */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${slide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
          style={{ background: slide.bg }}
        />
      </AnimatePresence>

      {/* 3D Scene Wrapper */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden" 
        style={{ perspective: "1200px" }}
      >
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Decorative ring */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`ring-${slide.id}`}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
              style={{
                width: "min(85vh, 85vw)",
                height: "min(85vh, 85vw)",
                borderColor: slide.accent,
                borderWidth: 1,
                translateZ: "-50px",
              }}
            />
          </AnimatePresence>

          {/* Giant rotating wordmark */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`mark-${slide.id}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.08, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[20vw] font-black uppercase leading-none select-none"
              style={{ 
                color: slide.ink, 
                fontFamily: "'Playfair Display', serif",
                x: bgTextX,
                y: bgTextY,
                translateZ: "-120px",
              }}
            >
              {slide.subtitle} · {slide.subtitle} ·
            </motion.div>
          </AnimatePresence>

          {/* Bouquet image */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <AnimatePresence mode="sync">
              <motion.img
                key={`bouquet-${slide.id}`}
                src={slide.bouquet}
                alt={slide.subtitle}
                initial={{ opacity: 0, scale: 0.7, y: 80, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -60, rotate: 6 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute h-[70vh] max-h-[720px] w-auto object-contain drop-shadow-2xl"
                style={{
                  translateZ: "50px",
                }}
              />
            </AnimatePresence>
          </div>

          {/* Floating elements */}
          <AnimatePresence mode="sync">
            {slide.floats.map((src, i) => {
              const p = floatPositions[i];
              return (
                <motion.img
                  key={`float-${slide.id}-${i}`}
                  src={src}
                  alt=""
                  initial={{ opacity: 0, scale: 0, rotate: p.rot - 40 }}
                  animate={{ opacity: 1, scale: 1, rotate: p.rot }}
                  exit={{ opacity: 0, scale: 0, rotate: p.rot + 40 }}
                  transition={{ duration: 0.9, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute hidden md:block"
                  style={{
                    top: p.top,
                    left: "left" in p ? p.left : undefined,
                    right: "right" in p ? (p as any).right : undefined,
                    width: p.size,
                    height: p.size,
                    filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.2))",
                    translateZ: `${120 + i * 20}px`,
                  }}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dark scrim bawah — teks judul selalu terbaca */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{ height: "360px", background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.06) 60%, transparent 100%)" }}
      />

      {/* Bottom copy + controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30 mx-auto max-w-7xl px-6 pb-12 md:px-12 md:pb-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          {/* Judul + deskripsi */}
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${slide.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="whitespace-pre-line text-5xl font-light leading-[0.95] md:text-7xl"
                style={{ color: slide.ink, fontFamily: "'Playfair Display', serif" }}
              >
                {slide.title}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${slide.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-5 max-w-md text-sm leading-relaxed md:text-base"
                style={{ color: slide.ink, opacity: 0.78 }}
              >
                {slide.desc}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CTA + progress dots */}
          <div className="flex flex-col items-start gap-6 md:items-end">
            <a
              href="/collections"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-widest transition-transform hover:scale-[1.03] text-white"
              style={{ backgroundColor: slide.ink }}
            >
              Lihat Koleksi
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>

            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setIndex(i)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative h-1 overflow-hidden rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? 60 : 24,
                    backgroundColor: `${slide.ink}33`,
                  }}
                  aria-label={`Slide ${i + 1}`}
                >
                  {i === index && (
                    <motion.span
                      key={`bar-${slide.id}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6, ease: "linear" }}
                      className="absolute inset-y-0 left-0 block"
                      style={{ backgroundColor: slide.ink }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 3D Glassmorphic Cursor */}
      {isInside && (
        <motion.div
          className="pointer-events-none absolute z-50 hidden md:block"
          style={{
            x: smoothCursorX,
            y: smoothCursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          {/* Main 3D glass bubble */}
          <motion.div
            animate={{
              scale: isHovered ? 1.6 : 1,
              backgroundColor: isHovered ? `${slide.accent}22` : "rgba(255, 255, 255, 0.12)",
              borderColor: isHovered ? slide.accent : "rgba(255, 255, 255, 0.35)",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-10 h-10 rounded-full border backdrop-blur-[4px] flex items-center justify-center transition-colors duration-300"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.05) 60%, rgba(0, 0, 0, 0.15) 100%)",
              boxShadow: isHovered 
                ? `inset -3px -3px 8px rgba(0, 0, 0, 0.15), inset 3px 3px 8px rgba(255, 255, 255, 0.4), 0 0 25px ${slide.accent}55`
                : "inset -3px -3px 8px rgba(0, 0, 0, 0.15), inset 3px 3px 8px rgba(255, 255, 255, 0.45), 0 8px 16px rgba(0, 0, 0, 0.12)",
            }}
          >
            {/* Center dot inside cursor */}
            <motion.div 
              animate={{
                scale: isHovered ? 0.6 : 1,
                backgroundColor: isHovered ? slide.accent : "rgba(255, 255, 255, 0.8)",
              }}
              className="w-1.5 h-1.5 rounded-full transition-colors duration-300" 
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
