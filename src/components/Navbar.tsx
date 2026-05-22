import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return "text-primary font-bold border-b-2 border-primary pb-1 font-label-lg text-label-lg hover:text-primary transition-colors duration-200";
    }
    return "text-on-surface-variant font-body-md font-label-lg text-label-lg hover:text-primary transition-colors duration-200";
  };

  return (
    <header
      className={`bg-surface dark:bg-surface-dim backdrop-blur-md w-full sticky top-0 z-50 ${
        isScrolled ? 'bg-surface/95 dark:bg-surface-dim/95' : ''
      }`}
    >
      <div className="flex flex-col items-center w-full px-gutter py-stack-md max-w-container-max mx-auto">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* Floral Line Art Logo Icon */}
            <svg className="h-10 w-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="8" stroke="#7A503D" strokeWidth="2.5" fill="none"/>
              <path d="M50 42 Q40 30 35 25 Q30 20 28 22 Q26 24 30 28 Q35 33 42 40" stroke="#7A503D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M50 42 Q60 30 65 25 Q70 20 72 22 Q74 24 70 28 Q65 33 58 40" stroke="#7A503D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M42 50 Q30 40 25 35 Q20 30 22 28 Q24 26 28 30 Q33 35 40 42" stroke="#7A503D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M58 50 Q70 40 75 35 Q80 30 78 28 Q76 26 72 30 Q67 35 60 42" stroke="#7A503D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M50 58 Q40 70 35 75 Q30 80 28 78 Q26 76 30 72 Q35 67 42 60" stroke="#7A503D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M50 58 Q60 70 65 75 Q70 80 72 78 Q74 76 70 72 Q65 67 58 60" stroke="#7A503D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M42 50 Q30 60 25 65 Q20 70 22 72 Q24 74 28 70 Q33 65 40 58" stroke="#7A503D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M58 50 Q70 60 75 65 Q80 70 78 72 Q76 74 72 70 Q67 65 60 58" stroke="#7A503D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="font-headline-md text-headline-md text-primary dark:text-inverse-primary tracking-tight">
              Indy Bucket
            </span>
          </div>

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
          <div className="md:hidden flex items-center">
            <button className="text-primary hover:text-primary/80 transition-colors duration-200">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                menu
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
