import { useSectionProducts, primaryImage, formatRupiah } from '../hooks/useSiteProducts';
import { ArrowRight } from 'lucide-react';

export default function FreshBlooms() {
  const { products, loading } = useSectionProducts('fresh');
  const displayed = loading ? [] : products.filter(p => p.images.length > 0).slice(0, 3);

  return (
    <section className="max-w-container-max mx-auto px-gutter py-12 md:py-24">
      <div className="grid grid-cols-4 gap-4 md:gap-12">
        {/* Left copy */}
        <div className="col-span-4 md:col-span-1 flex flex-col justify-center mb-4 md:mb-0" data-aos="fade-right">
          <h2 className="font-headline-md text-lg md:text-headline-md text-primary mb-2 md:mb-6">
            Hadiah untuk Setiap Gaya
          </h2>
          <p className="font-body-md text-xs md:text-body-md text-on-surface-variant mb-3 md:mb-8">
            Dari rangkaian bunga modern hingga hadiah kreatif yang penuh keunikan.
          </p>
          <a
            className="inline-flex items-center gap-2 text-primary text-xs md:font-label-md md:text-label-md hover:text-primary-container transition-colors w-fit group"
            href="/collections"
          >
            Lihat Koleksi
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Image columns */}
        <div className="col-span-4 md:col-span-3 grid grid-cols-3 gap-3 md:gap-6">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className={`relative w-full aspect-[0.55] rounded-lg md:rounded-xl overflow-hidden animate-pulse bg-surface-container ${i === 1 ? 'md:translate-y-8' : ''}`} />
              ))
            : displayed.length === 0
            ? [...Array(3)].map((_, i) => (
                <div key={i} className={`relative w-full aspect-[0.55] rounded-lg md:rounded-xl overflow-hidden bg-surface-container flex items-center justify-center ${i === 1 ? 'md:translate-y-8' : ''}`}>
                  <span className="text-xs text-on-surface-variant opacity-50">Belum ada produk</span>
                </div>
              ))
            : displayed.map((product, index) => {
                const img = primaryImage(product);
                return (
                  <a
                    key={product.id}
                    href="/collections"
                    className={`relative w-full aspect-[0.55] rounded-lg md:rounded-xl overflow-hidden group ${index === 1 ? 'md:translate-y-8' : ''}`}
                    data-aos="fade-up"
                    data-aos-delay={index * 150}
                  >
                    {img
                      ? <img alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" src={img} />
                      : <div className="w-full h-full bg-surface-container" />
                    }
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors" />
                    {/* Hover card */}
                    <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 bg-surface-white/95 backdrop-blur-md px-2 md:px-5 py-1.5 md:py-3 rounded-full flex flex-col items-center shadow-md w-[88%] md:w-[82%] border border-outline-variant/30 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300">
                      <span className="font-label-md text-[10px] md:text-label-md text-primary truncate w-full text-center font-semibold">{product.name}</span>
                      <span className="font-price text-[9px] md:text-price text-secondary mt-0.5 font-semibold">{formatRupiah(product.price)}</span>
                    </div>
                  </a>
                );
              })
          }
        </div>
      </div>
    </section>
  );
}
