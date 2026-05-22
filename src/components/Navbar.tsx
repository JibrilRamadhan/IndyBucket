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
