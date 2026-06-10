import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Otomatis scroll ke atas setiap kali user berpindah halaman,
 * sehingga animasi page transition selalu terlihat dari awal.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
