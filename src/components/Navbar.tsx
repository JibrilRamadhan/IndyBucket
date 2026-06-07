import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Transparan di halaman Home ("/") dan About ("/about")
  const isHome = location.pathname === '/' || location.pathname === '/about';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    // Set state awal (misal saat navigasi ke halaman dengan scroll posisi di bawah)
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reset scroll position saat ganti halaman
  useEffect(() => {
    setScrolled(window.scrollY > 40);
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Mode transparan: hanya di Home & belum di-scroll
  const isTransparent = isHome && !scrolled;

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;

    if (isTransparent) {
      return `font-label-lg text-label-lg font-semibold transition-colors duration-200 text-white hover:text-white/80
        [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]
        ${isActive ? 'border-b-2 border-white/70 pb-0.5' : ''}`;
    }

    return `font-label-lg text-label-lg transition-colors duration-200
      ${isActive
        ? 'text-primary font-bold border-b-2 border-primary pb-0.5'
        : 'text-on-surface-variant hover:text-primary'
      }`;
  };

  const getMobileLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return isActive
      ? 'text-primary font-bold text-2xl py-4 border-b border-primary/20 transition-colors duration-200'
      : 'text-on-surface-variant text-2xl py-4 border-b border-on-surface-variant/10 hover:text-primary transition-colors duration-200';
  };

  return (
    <>
      <header
        className={`
          w-full fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-in-out
          ${isTransparent
            ? 'bg-transparent'
            : 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-outline-variant/20'
          }
        `}
      >
        <div className="flex flex-col items-center w-full px-gutter py-stack-md max-w-container-max mx-auto">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full bg-primary flex items-center justify-center p-1.5 shadow-md">
                <img
                  src="/img/Logo.png"
                  alt="Indy Bucket Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span
                className="font-headline-md text-headline-md tracking-tight transition-all duration-500"
                style={isTransparent
                  ? { color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,0.5)', fontWeight: 700 }
                  : { color: undefined }
                }
              >
                Indy Bucket
              </span>
            </Link>

            {/* Nav Links - Desktop */}
            <nav className="hidden md:flex gap-8 items-center">
              <Link className={getLinkClass('/')} to="/">Home</Link>
              <Link className={getLinkClass('/about')} to="/about">About Us</Link>
              <Link className={getLinkClass('/collections')} to="/collections">Collections</Link>
            </nav>

            {/* CTA Button - Desktop */}
            <a
              href="https://wa.me/6281554107944?text=Halo%20Indy%20Bucket"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                ${isTransparent
                  ? 'bg-white/20 text-white border border-white/40 hover:bg-white/30 backdrop-blur-sm'
                  : 'bg-primary-container text-surface-white hover:bg-primary-container/90 shadow-sm'
                }
              `}
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              Pesan Sekarang
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden flex items-center transition-colors duration-200 p-2 z-[100] ${
                isTransparent ? 'text-white' : 'text-primary hover:text-primary/80'
              }`}
              style={isTransparent ? { filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' } : {}}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer agar konten tidak tertutup navbar — hanya di halaman NON-Home & NON-About */}
      {location.pathname !== '/' && location.pathname !== '/about' && <div className="h-[72px]" />}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-[60] top-[72px]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed right-0 top-[72px] bottom-0 w-full bg-surface-white shadow-2xl z-[70] transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col px-gutter py-8 min-h-full">
          <Link className={getMobileLinkClass('/')} to="/">Home</Link>
          <Link className={getMobileLinkClass('/about')} to="/about">About Us</Link>
          <Link className={getMobileLinkClass('/collections')} to="/collections">Collections</Link>

          <div className="mt-8 flex flex-col gap-4">
            <a
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary-container text-surface-white rounded-full text-lg hover:bg-primary-container/90 transition-colors duration-200 shadow-md"
              href="https://wa.me/6281554107944?text=Halo%20Indy%20Bucket,%20saya%20tertarik%20dengan%20produk%20Anda"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined">chat</span>
              WhatsApp
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-primary-container text-primary-container rounded-full text-lg hover:bg-primary-container/10 transition-colors duration-200"
              href="https://www.instagram.com/indy_buket"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined">photo_camera</span>
              Instagram
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
