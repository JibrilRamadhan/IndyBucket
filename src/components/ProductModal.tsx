import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import type { SiteProduct } from '../hooks/useSiteProducts';
import { formatRupiah } from '../hooks/useSiteProducts';

interface ProductModalProps {
  product: SiteProduct | null;
  onClose: () => void;
}

const labelConfig = {
  best_seller: 'Bestseller',
  new: 'Fresh',
  none: null,
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  // Derivasi gambar
  const sortedImages = useMemo(() => {
    if (!product) return [];
    const images = product.images;
    return [
      ...images.filter(i => i.is_primary),
      ...images.filter(i => !i.is_primary),
    ];
  }, [product]);

  // Reset state ketika produk berganti
  useEffect(() => {
    setActiveImg(0);
    setLightbox(false);
    setLbIndex(0);
  }, [product?.id]);

  // Event Listener untuk Keyboard Navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox) {
          setLightbox(false);
        } else {
          onClose();
        }
      }
      
      if (sortedImages.length > 1) {
        if (e.key === 'ArrowRight') {
          if (lightbox) setLbIndex(i => (i + 1) % sortedImages.length);
          else setActiveImg(i => (i + 1) % sortedImages.length);
        }
        if (e.key === 'ArrowLeft') {
          if (lightbox) setLbIndex(i => (i - 1 + sortedImages.length) % sortedImages.length);
          else setActiveImg(i => (i - 1 + sortedImages.length) % sortedImages.length);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, onClose, sortedImages.length]);

  // Kunci scroll body saat modal terbuka
  useEffect(() => {
    document.body.style.overflow = product || lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [product, lightbox]);

  if (!product) return null;

  const currentImage = sortedImages[activeImg] ?? sortedImages[0];
  const label = labelConfig[product.label];
  const isOOS = product.stock_status === 'out_of_stock';

  const waMessage = encodeURIComponent(
    `Halo Indy Buket! Saya tertarik dengan "${product.name}" (${formatRupiah(product.price)}). Boleh info lebih lanjut?`
  );
  const waUrl = `https://wa.me/6281554107944?text=${waMessage}`;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImg(i => (i - 1 + sortedImages.length) % sortedImages.length);
  }
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImg(i => (i + 1) % sortedImages.length);
  }

  // Description dan features langsung dari field API
  const descriptionText = product.description || 'Rangkaian premium dengan sentuhan penuh kasih, cocok sebagai hadiah istimewa untuk momen yang tak terlupakan.';
  const features = product.features ?? [];

  return (
    <>
      <AnimatePresence>
        {product && (
          <>
            {/* Backdrop */}
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[200] bg-black/80"
              onClick={onClose}
            />

            {/* Panel Container */}
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, y: 20, scale: 0.98, x: '-50%', translateY: '-50%' }}
              animate={{ opacity: 1, y: 0, scale: 1, x: '-50%', translateY: '-50%' }}
              exit={{ opacity: 0, y: 20, scale: 0.98, x: '-50%', translateY: '-50%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-[50%] top-[50%] z-[201] grid w-full max-h-[92vh] max-w-5xl overflow-y-auto scrollbar-hide rounded-3xl border-0 bg-[#FCFBF8] p-0 shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* ── Left: Image Gallery ── */}
                <div className="relative bg-[#f0e8e2]">
                  <div className="relative w-full aspect-[4/5] md:h-full md:aspect-auto overflow-hidden group">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImage?.url}
                        src={currentImage?.url}
                        alt={product.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isOOS ? 'grayscale opacity-70' : ''}`}
                      />
                    </AnimatePresence>

                    {/* Expand Button (Lightbox) */}
                    <button
                      onClick={() => {
                        setLbIndex(activeImg);
                        setLightbox(true);
                      }}
                      className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/80 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 text-[#5f3928] z-10 hover:bg-white"
                      title="Perbesar Gambar"
                    >
                      <Expand className="h-4 w-4" />
                    </button>

                    {/* Label badge */}
                    {label && (
                      <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-[#5f3928] backdrop-blur">
                        {label}
                      </div>
                    )}

                    {/* OOS overlay */}
                    {isOOS && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <span className="bg-black/70 text-white px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                          Stok Habis
                        </span>
                      </div>
                    )}

                    {/* Carousel Dots Indicators */}
                    {sortedImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                        {sortedImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                            aria-label={`Ke gambar ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all ${
                              activeImg === i ? "w-8 bg-[#6A1428]" : "w-1.5 bg-white/70"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Prev / Next */}
                  {sortedImages.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#5f3928] shadow-sm backdrop-blur hover:bg-white transition-colors z-10"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#5f3928] shadow-sm backdrop-blur hover:bg-white transition-colors z-10"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}
                </div>

                {/* ── Right: Info ── */}
                <div className="flex flex-col p-8 md:p-10">
                  <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#8a6552]">
                    Detail Koleksi
                  </span>
                  
                  <h2
                    className="mt-3 text-3xl font-light leading-tight tracking-tight text-[#1a1514] md:text-4xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {product.name}
                  </h2>
                  
                  <div className="mt-2 text-lg font-medium text-[#6A1428]">
                    {formatRupiah(product.price)}
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-[#5c4a43]">
                    {descriptionText}
                  </p>

                  {/* Features / Inclusions */}
                  {features.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#5c4a43]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6A1428]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA Buttons */}
                  <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-4 text-xs font-medium uppercase tracking-widest transition-transform hover:scale-[1.02] ${
                        isOOS
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                          : 'bg-[#6A1428] text-white'
                      }`}
                      onClick={isOOS ? (e) => e.preventDefault() : undefined}
                    >
                      Pesan Cepat via WA &rarr;
                    </a>
                  </div>
                </div>

                {/* Close Button X (Top Right of Panel) */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-sm opacity-50 transition-opacity hover:opacity-100 text-[#1a1514] z-10"
                  aria-label="Tutup"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && sortedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              aria-label="Tutup Lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {sortedImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLbIndex((i) => (i - 1 + sortedImages.length) % sortedImages.length);
                  }}
                  className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLbIndex((i) => (i + 1) % sortedImages.length);
                  }}
                  className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                  aria-label="Berikutnya"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={lbIndex}
                src={sortedImages[lbIndex]?.url}
                alt={`${product.name} ${lbIndex + 1}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
            </AnimatePresence>

            {sortedImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/70">
                {lbIndex + 1} / {sortedImages.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
