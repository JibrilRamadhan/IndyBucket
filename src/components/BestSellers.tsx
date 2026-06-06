import { useSectionProducts, primaryImage, formatRupiah } from '../hooks/useSiteProducts';
import { Star } from 'lucide-react';

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-surface-white/40 backdrop-blur-sm border border-outline-variant/10 rounded-[2rem] p-4 flex flex-col items-center">
      <div className="w-full aspect-square rounded-xl bg-surface-container mb-4" />
      <div className="h-4 bg-surface-container rounded w-3/4 mb-2" />
      <div className="h-3 bg-surface-container rounded w-1/2" />
    </div>
  );
}

export default function BestSellers() {
  const { products, loading } = useSectionProducts('bestseller');
  const displayed = loading ? [] : products.slice(0, 4);

  return (
    <section className="bg-surface-container-low py-16 md:py-24">
      <div className="max-w-container-max mx-auto px-gutter text-center flex flex-col items-center">
        <span
          className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] md:font-label-md md:text-label-md mb-3 inline-flex items-center gap-1.5 font-semibold tracking-wider"
          data-aos="fade-down"
        >
          <Star size={11} />
          Premium Selections
        </span>
        <h2
          className="font-headline-lg text-2xl md:text-headline-lg text-primary mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Produk Terlaris Kami
        </h2>

        <div className="grid grid-cols-4 gap-6 w-full">
          {loading
            ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            : displayed.length === 0
            ? (
              <div className="col-span-4 text-center py-16 text-on-surface-variant">
                <Star className="mx-auto mb-3 opacity-30" size={36} />
                <p className="text-sm">Belum ada produk best seller.</p>
              </div>
            )
            : displayed.map((product, index) => {
                const img = primaryImage(product);
                return (
                  <a
                    key={product.id}
                    href="/collections"
                    className="group bg-surface-white/30 hover:bg-surface-white/80 backdrop-blur-sm border border-outline-variant/20 rounded-[2rem] p-4 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(122,80,61,0.03)] hover:shadow-[0_16px_40px_rgba(95,57,40,0.08)] hover:-translate-y-1.5 transition-all duration-500 w-full"
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                  >
                    <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 relative bg-surface-container shadow-sm">
                      {img
                        ? <img alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" src={img} />
                        : <div className="w-full h-full flex items-center justify-center text-on-surface-variant"><Star size={24} opacity={0.3} /></div>
                      }
                      {product.label === 'best_seller' && (
                        <div className="absolute top-2 left-2 bg-surface-white/95 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-outline-variant/20">
                          <Star size={12} fill="#f59e0b" stroke="#f59e0b" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-headline-sm text-base text-primary mb-1 line-clamp-2 w-full group-hover:text-primary-container transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-price text-sm text-secondary font-semibold">
                      {formatRupiah(product.price)}
                    </p>
                  </a>
                );
              })
          }
        </div>
      </div>
    </section>
  );
}
