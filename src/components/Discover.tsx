// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
// @ts-ignore
import '@splidejs/react-splide/css';
import { useSectionProducts, primaryImage, formatRupiah } from '../hooks/useSiteProducts';
import type { SiteProduct } from '../hooks/useSiteProducts';
import { Sparkles } from 'lucide-react';

// Skeleton card
function SkeletonCard() {
  return (
    <div className="animate-pulse bg-surface-white/40 backdrop-blur-sm border border-outline-variant/10 rounded-[2rem] p-4 flex flex-col">
      <div className="w-full aspect-[3/4] rounded-t-[10rem] rounded-b-[1rem] bg-surface-container mb-5" />
      <div className="h-4 bg-surface-container rounded w-2/3 mx-auto mb-2" />
      <div className="h-3 bg-surface-container rounded w-1/3 mx-auto mb-3" />
    </div>
  );
}

interface DiscoverProps {
  onSelectProduct?: (product: SiteProduct) => void;
}

export default function Discover({ onSelectProduct }: DiscoverProps) {
  const { products, loading } = useSectionProducts('discover');

  // Tampilkan maks 4 produk dari section 'discover'
  const displayed = loading ? [] : products.slice(0, 4);

  const labelBadge = (label: string) => {
    if (label === 'new') return 'Baru';
    if (label === 'best_seller') return 'Best Seller';
    return null;
  };

  return (
    <section className="bg-surface py-20 px-gutter" id="discover">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6" data-aos="fade-up">
          <div className="max-w-md">
            <span className="text-[10px] md:text-label-md font-bold uppercase tracking-[0.25em] text-text-muted mb-2 block">
              Signature Selection
            </span>
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              Koleksi Signature Kami
            </h2>
            <p className="text-on-surface-variant font-body-md text-body-md">
              Pilihan bouquet terpopuler yang dirangkai dengan penuh cinta untuk setiap momen spesial.
            </p>
          </div>
          <a
            className="inline-flex items-center justify-center px-6 py-3 border border-secondary text-secondary rounded-full font-label-md text-label-md hover:bg-secondary hover:text-on-secondary transition-all hover:-translate-y-0.5 duration-200 whitespace-nowrap"
            href="/collections"
          >
            Lihat Semua Koleksi →
          </a>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {loading
            ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            : displayed.length === 0
            ? (
              <div className="col-span-4 text-center py-16 text-on-surface-variant">
                <Sparkles className="mx-auto mb-3 opacity-30" size={40} />
                <p>Belum ada produk yang ditampilkan.</p>
              </div>
            )
            : displayed.map((product, index) => {
                const img = primaryImage(product);
                const badge = labelBadge(product.label);
                return (
                  <button
                    key={product.id}
                    onClick={() => onSelectProduct?.(product)}
                    className="text-left w-full group cursor-pointer bg-surface-white/30 hover:bg-surface-white/80 backdrop-blur-sm border border-outline-variant/20 rounded-[2rem] p-4 hover:shadow-[0_16px_40px_rgba(95,57,40,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div>
                      <div className="relative w-full aspect-[3/4] rounded-t-[10rem] rounded-b-[1rem] overflow-hidden bg-surface-container mb-5 shadow-sm">
                        {img
                          ? <img alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" src={img} />
                          : <div className="w-full h-full flex items-center justify-center bg-surface-container text-on-surface-variant text-sm">Tidak ada gambar</div>
                        }
                        {badge && (
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-surface-white/90 backdrop-blur-md px-3 py-1 rounded-full font-label-md text-[10px] text-primary shadow-sm border border-outline-variant/20 whitespace-nowrap">
                            {badge}
                          </div>
                        )}
                      </div>
                      <div className="text-center px-2">
                        <h3 className="font-headline-sm text-lg text-primary mb-1 group-hover:text-primary-container transition-colors truncate w-full">{product.name}</h3>
                        <p className="font-price text-sm text-secondary font-semibold">{formatRupiah(product.price)}</p>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <span className="inline-flex items-center justify-center text-[11px] font-semibold text-primary-container border-b border-primary-container/0 group-hover:border-primary-container/80 transition-all duration-300 gap-1 pb-0.5">
                        Pesan Sekarang <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </button>
                );
              })}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden" data-aos="fade-up">
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <Splide options={{ type: 'loop', perPage: 2, perMove: 1, gap: '1rem', padding: { left: '1rem', right: '1rem' }, arrows: false, pagination: true, autoplay: false, breakpoints: { 640: { perPage: 1.5, gap: '0.75rem' } } }}>
              {displayed.map((product) => {
                const img = primaryImage(product);
                const badge = labelBadge(product.label);
                return (
                  <SplideSlide key={product.id}>
                    <button onClick={() => onSelectProduct?.(product)} className="text-left w-full group cursor-pointer block bg-surface-white/40 border border-outline-variant/20 rounded-[1.5rem] p-3 flex flex-col h-full justify-between">
                      <div>
                        <div className="relative w-full aspect-[3/4] rounded-t-[8rem] rounded-b-[0.75rem] overflow-hidden bg-surface-container mb-3 shadow-sm">
                          {img
                            ? <img alt={product.name} className="w-full h-full object-cover" src={img} />
                            : <div className="w-full h-full flex items-center justify-center bg-surface-container text-xs text-on-surface-variant">No image</div>
                          }
                          {badge && (
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-surface-white/90 backdrop-blur-md px-2 py-0.5 rounded-full font-label-md text-[9px] text-primary shadow-sm whitespace-nowrap">
                              {badge}
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <h3 className="font-headline-sm text-sm text-primary mb-0.5 truncate px-1">{product.name}</h3>
                          <p className="font-price text-xs text-secondary font-semibold">{formatRupiah(product.price)}</p>
                        </div>
                      </div>
                    </button>
                  </SplideSlide>
                );
              })}
            </Splide>
          )}
        </div>
      </div>
    </section>
  );
}
