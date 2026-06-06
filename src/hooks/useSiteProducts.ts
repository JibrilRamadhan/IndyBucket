/**
 * useSiteProducts – shared hook untuk mengambil produk dari API.
 * Mendukung filter ?section=discover|fresh|bestseller untuk
 * komponen home page.
 */
import { useEffect, useState } from 'react';

export interface ProductImage {
  id: number;
  url: string;
  is_primary: boolean;
}

export interface SiteProduct {
  id: number;
  name: string;
  description: string | null;
  price: string;
  stock_status: 'available' | 'out_of_stock';
  label: 'none' | 'best_seller' | 'new';
  home_section: 'discover' | 'fresh' | 'bestseller' | null;
  images: ProductImage[];
  created_at?: string;
}

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

/** Semua produk (untuk Collections page) */
export function useSiteProducts() {
  const [products, setProducts] = useState<SiteProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then(r => r.json())
      .then(d => setProducts(d.products ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}

/** Produk untuk section tertentu di home page */
export function useSectionProducts(section: 'discover' | 'fresh' | 'bestseller') {
  const [products, setProducts] = useState<SiteProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/products?section=${section}`)
      .then(r => r.json())
      .then(d => setProducts(d.products ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [section]);

  return { products, loading };
}

export function primaryImage(product: SiteProduct): string | null {
  const p = product.images.find(i => i.is_primary) ?? product.images[0];
  return p?.url ?? null;
}

export function formatRupiah(price: string | number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(Number(price));
}
