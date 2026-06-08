import { useState } from 'react';
import { Star, Sparkles, CheckCircle, SlidersHorizontal, MessageCircle } from 'lucide-react';
import { useSiteProducts, formatRupiah } from '../hooks/useSiteProducts';
import type { SiteProduct } from '../hooks/useSiteProducts';
import ProductModal from '../components/ProductModal';

type FilterType = 'all' | 'best_seller' | 'new' | 'available';

const labelConfig = {
  best_seller: { text: 'Best Seller', bg: 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#fff' },
  new: { text: 'Baru', bg: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff' },
  none: null,
};

export default function Collections() {
  const { products, loading } = useSiteProducts();
  const [error] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<SiteProduct | null>(null);

  const ITEMS_PER_PAGE = 12;

  const filtered = products
    .filter(p => {
      if (filter === 'all') return true;
      if (filter === 'best_seller') return p.label === 'best_seller';
      if (filter === 'new') return p.label === 'new';
      if (filter === 'available') return p.stock_status === 'available';
      return true;
    })
    .sort((a, b) => {
      if (sort === 'price_asc') return Number(a.price) - Number(b.price);
      if (sort === 'price_desc') return Number(b.price) - Number(a.price);
      return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
    });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const filters: { key: FilterType; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'Semua', icon: <SlidersHorizontal size={13} /> },
    { key: 'best_seller', label: 'Best Seller', icon: <Star size={13} /> },
    { key: 'new', label: 'Terbaru', icon: <Sparkles size={13} /> },
    { key: 'available', label: 'Tersedia', icon: <CheckCircle size={13} /> },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* ─── Hero Header ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-surface-container to-surface-container-high py-16 px-gutter text-center">
        <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-secondary-container text-on-secondary-container">
          Koleksi Bouquet
        </span>
        <h1 className="font-headline-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
          Temukan Bouquet Impian Anda
        </h1>
        <p className="font-body-lg text-body-md text-text-muted max-w-xl mx-auto">
          Rangkaian bunga segar, buah premium, dan hadiah spesial yang disesuaikan dengan selera & budget Anda.
        </p>
      </div>

      <div className="max-w-container-max mx-auto px-gutter py-12">
        {/* ─── Filter & Sort Bar ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-outline-variant/30">
          {/* Filter pills */}
          <nav className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => { setFilter(f.key); setCurrentPage(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  filter === f.key
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container'
                }`}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </nav>

          {/* Sort dropdown */}
          <select
            value={sort}
            onChange={e => { setSort(e.target.value as typeof sort); setCurrentPage(1); }}
            className="text-sm border border-outline-variant rounded-full px-4 py-2 bg-surface text-on-surface-variant focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="newest">Terbaru</option>
            <option value="price_asc">Harga: Terendah</option>
            <option value="price_desc">Harga: Tertinggi</option>
          </select>
        </div>

        {/* ─── Loading State ─────────────────────────────────────── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-surface-white/40 border border-outline-variant/10 rounded-[2rem] p-4 flex flex-col">
                <div className="w-full aspect-[4/5] rounded-xl bg-surface-container mb-5" />
                <div className="h-4 bg-surface-container rounded w-3/4 mx-auto mb-2" />
                <div className="h-3 bg-surface-container rounded w-1/2 mx-auto mb-3" />
              </div>
            ))}
          </div>
        )}

        {/* ─── Error State ───────────────────────────────────────── */}
        {error && !loading && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal size={28} className="text-on-surface-variant" />
            </div>
            <p className="text-on-surface-variant font-body-md">{error}</p>
          </div>
        )}

        {/* ─── Empty State ───────────────────────────────────────── */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-4">
              <Star size={28} className="text-on-surface-variant" />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">
              {products.length === 0 ? 'Belum Ada Produk' : 'Tidak Ada Produk'}
            </h3>
            <p className="text-on-surface-variant text-sm">
              {products.length === 0
                ? 'Admin belum menambahkan produk. Tambahkan melalui halaman admin.'
                : 'Coba pilih filter yang lain.'}
            </p>
          </div>
        )}

        {/* ─── Product Grid ──────────────────────────────────────── */}
        {!loading && !error && filtered.length > 0 && (
          <>
            <p className="text-sm text-on-surface-variant mb-6">
              Menampilkan <strong>{filtered.length}</strong> produk
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-8">
              {paginated.map((product, index) => {
                const primaryImage = product.images.find(i => i.is_primary) ?? product.images[0];
                const label = labelConfig[product.label];
                const isOOS = product.stock_status === 'out_of_stock';

                return (
                  <article
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="group cursor-pointer bg-surface-white/30 hover:bg-surface-white/80 backdrop-blur-sm border border-outline-variant/20 rounded-[2rem] p-4 hover:shadow-[0_16px_40px_rgba(95,57,40,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
                    data-aos="fade-up"
                    data-aos-delay={(index % 3) * 100}
                  >
                    <div>
                      {/* Image */}
                      <div
                        className="relative w-full aspect-[4/5] mb-5 overflow-hidden rounded-xl bg-surface-container-low shadow-sm"
                      >
                        {primaryImage ? (
                          <img
                            src={primaryImage.url}
                            alt={product.name}
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${isOOS ? 'grayscale opacity-70' : ''}`}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-surface-container text-4xl">
                            🌸
                          </div>
                        )}

                        {/* Label badge */}
                        {label && (
                          <div
                            className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold shadow-md whitespace-nowrap"
                            style={{ background: label.bg, color: label.color }}
                          >
                            {label.text}
                          </div>
                        )}

                        {/* Out of stock overlay */}
                        {isOOS && (
                          <div className="absolute inset-0 flex items-end justify-center pb-6">
                            <span className="bg-on-surface/70 text-surface px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm">
                              Stok Habis
                            </span>
                          </div>
                        )}

                        {/* Photo count badge */}
                        {product.images.length > 1 && (
                          <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] text-primary font-semibold border border-outline-variant/20">
                            📸 {product.images.length}
                          </div>
                        )}

                        {/* Order button (hover) */}
                        <a
                          href={`https://wa.me/6281554107944?text=Halo%20Indy%20Bucket%2C%20saya%20tertarik%20dengan%20*${encodeURIComponent(product.name)}*%20seharga%20${encodeURIComponent(formatRupiah(product.price))}.%20Apakah%20masih%20tersedia%3F`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className={`absolute bottom-4 right-4 w-12 h-12 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm hover:bg-primary hover:text-on-primary ${isOOS ? 'pointer-events-none opacity-0!' : ''}`}
                          title="Pesan via WhatsApp"
                        >
                          <MessageCircle size={18} />
                        </a>
                      </div>

                      {/* Info */}
                      <div className="text-center px-2">
                        <h3 className="font-headline-sm text-lg text-primary mb-1 group-hover:text-primary-container transition-colors truncate w-full">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-xs text-on-surface-variant mb-2 line-clamp-2 leading-relaxed h-8">
                            {product.description}
                          </p>
                        )}
                        <p className="font-price text-sm text-secondary font-semibold">
                          {formatRupiah(product.price)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className={`inline-flex items-center justify-center text-[11px] font-semibold transition-all duration-300 gap-1 pb-0.5 ${isOOS ? 'text-text-muted opacity-50' : 'text-primary-container border-b border-primary-container/0 group-hover:border-primary-container/80'}`}
                      >
                        Lihat Detail <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* ─── Pagination Controls ───────────────────────────────── */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16 pb-4" data-aos="fade-up">
                <button
                  onClick={() => {
                    setCurrentPage(prev => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 350, behavior: "smooth" });
                  }}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/30 text-primary bg-surface-white/20 hover:bg-surface-white/80 transition-all shadow-sm ${
                    currentPage === 1 ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
                  }`}
                  aria-label="Previous Page"
                >
                  ←
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 350, behavior: "smooth" });
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all shadow-sm font-semibold text-sm ${
                        currentPage === pageNum
                          ? 'bg-primary text-on-primary border-primary'
                          : 'border-outline-variant/30 text-primary bg-surface-white/20 hover:bg-surface-white/80'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    setCurrentPage(prev => Math.min(prev + 1, totalPages));
                    window.scrollTo({ top: 350, behavior: "smooth" });
                  }}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/30 text-primary bg-surface-white/20 hover:bg-surface-white/80 transition-all shadow-sm ${
                    currentPage === totalPages ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
                  }`}
                  aria-label="Next Page"
                >
                  →
                </button>
              </div>
            )}
          </>
        )}

        {/* ─── CTA WhatsApp ──────────────────────────────────────── */}
        <div className="mt-24 text-center bg-gradient-to-br from-secondary-container to-surface-container-high rounded-3xl p-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container text-on-surface-variant text-sm font-medium mb-8">
            <MessageCircle size={16} />
            <span>Ingin Pesanan Custom?</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            Buat Bouquet Sesuai Selera
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md mb-8 max-w-md mx-auto">
            Kami siap membuatkan bouquet sesuai tema, warna, dan budget Anda. Hubungi kami langsung!
          </p>
          <a
            href="https://wa.me/6281554107944?text=Halo%20Indy%20Bucket%2C%20saya%20ingin%20custom%20bouquet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-on-primary rounded-full font-semibold text-sm uppercase tracking-widest hover:bg-primary-container transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
          >
            <MessageCircle size={18} />
            Chat WhatsApp Sekarang
          </a>
        </div>
      </div>

      {/* ─── Product Detail Modal ──────────────────────────────────── */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
