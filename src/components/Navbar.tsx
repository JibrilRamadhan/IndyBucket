import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return "text-primary font-bold border-b-2 border-primary pb-1 font-label-lg text-label-lg hover:text-primary transition-colors duration-200";
    }
    return "text-on-surface-variant font-body-md font-label-lg text-label-lg hover:text-primary transition-colors duration-200";
  };

  const getMobileLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return "text-primary font-bold text-2xl py-4 border-b border-primary/20 transition-colors duration-200";
    }
    return "text-on-surface-variant text-2xl py-4 border-b border-on-surface-variant/10 hover:text-primary transition-colors duration-200";
  };

  return (
    <>
      <header
        className={`bg-surface dark:bg-surface-dim backdrop-blur-md w-full sticky top-0 z-50 ${
          isScrolled ? 'bg-surface/95 dark:bg-surface-dim/95' : ''
        }`}
      >
        <div className="flex flex-col items-center w-full px-gutter py-stack-md max-w-container-max mx-auto">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full bg-primary flex items-center justify-center p-1.5">
                <img
                  src="/img/Logo.png"
                  alt="Indy Bucket Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-headline-md text-headline-md text-primary dark:text-inverse-primary tracking-tight">
                Indy Bucket
              </span>
            </Link>

            {/* Nav Links - Desktop */}
            <nav className="hidden md:flex gap-8 items-center">
              <Link className={getLinkClass('/')} to="/">
                Home
              </Link>
              <Link className={getLinkClass('/about')} to="/about">
                About Us
              </Link>
              <Link className={getLinkClass('/collections')} to="/collections">
                Collections
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden flex items-center text-primary hover:text-primary/80 transition-colors duration-200 p-2 z-[100]"
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

      {/* Mobile Menu Overlay - Behind */}
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
          <Link className={getMobileLinkClass('/')} to="/">
            Home
          </Link>
          <Link className={getMobileLinkClass('/about')} to="/about">
            About Us
          </Link>
          <Link className={getMobileLinkClass('/collections')} to="/collections">
            Collections
          </Link>
          
          {/* Contact Buttons in Mobile Menu */}
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
