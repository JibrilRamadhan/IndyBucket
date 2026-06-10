import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  Package, Plus, ArrowLeft, Pencil, Trash2, ImageOff,
  Images, CheckCircle, XCircle, Star, Sparkles, Loader2, AlertTriangle
} from 'lucide-react';
import { useToast } from '../../components/Toast';

interface ProductImage {
  id: number;
  url: string;
  is_primary: boolean;
  sort_order: number;
}

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string;
  stock_status: 'available' | 'out_of_stock';
  label: 'none' | 'best_seller' | 'new';
  images: ProductImage[];
  created_at: string;
}

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{id: number, name: string} | null>(null);
  const { loading: toastLoading, update } = useToast();

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Gagal memuat produk:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const confirmDeleteAction = async () => {
    if (!itemToDelete) return;
    const { id, name } = itemToDelete;
    
    setItemToDelete(null);
    setDeleting(id);

    const tid = toastLoading('Menghapus produk...', name);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/login'); return; }

      const product = products.find(p => p.id === id);
      if (product && product.images.length > 0) {
        const filePaths = product.images.map(img => {
          const parts = img.url.split('/public/products/');
          return parts.length > 1 ? parts[1] : null;
        }).filter(Boolean) as string[];
        if (filePaths.length > 0) {
          await supabase.storage.from('products').remove(filePaths);
        }
      }

      const res = await fetch(`${API_BASE}/admin/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });

      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
        update(tid, { type: 'success', title: 'Produk dihapus', message: `"${name}" berhasil dihapus.` });
      } else {
        update(tid, { type: 'error', title: 'Gagal menghapus', message: 'Terjadi kesalahan pada server.' });
      }
    } catch (err) {
      update(tid, { type: 'error', title: 'Gagal menghapus', message: 'Tidak dapat terhubung ke server.' });
    } finally {
      setDeleting(null);
    }
  };

  const formatRupiah = (price: string) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(price));

  const getLabelBadge = (label: string) => {
    if (label === 'best_seller') return (
      <span style={{ ...s.badge, background: 'linear-gradient(135deg,#f59e0b,#d97706)', boxShadow: '0 2px 8px rgba(245,158,11,0.4)' }}>
        <Star size={10} strokeWidth={2.5} /> Best Seller
      </span>
    );
    if (label === 'new') return (
      <span style={{ ...s.badge, background: 'linear-gradient(135deg,#10b981,#059669)', boxShadow: '0 2px 8px rgba(16,185,129,0.4)' }}>
        <Sparkles size={10} strokeWidth={2.5} /> Baru
      </span>
    );
    return null;
  };

  const getStockBadge = (status: string) =>
    status === 'available'
      ? <span style={{ ...s.stockBadge, background: '#ecfdf5', color: '#059669' }}><CheckCircle size={11} /> Tersedia</span>
      : <span style={{ ...s.stockBadge, background: '#fef2f2', color: '#dc2626' }}><XCircle size={11} /> Habis</span>;

  if (loading) return (
    <div style={s.container}>
      <div style={{ textAlign: 'center', padding: '80px 0', color: '#6b7280', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: '#ec4899' }} />
        <span>Memuat produk...</span>
      </div>
    </div>
  );

  return (
    <div style={s.container}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>
            <Package size={24} style={{ marginRight: '10px', verticalAlign: 'middle', color: '#ec4899' }} />
            Manajemen Produk
          </h1>
          <p style={s.subtitle}>{products.length} produk terdaftar</p>
        </div>
        <div style={s.headerActions}>
          <button style={s.btnBack} onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft size={15} /> Dashboard
          </button>
          <button style={s.btnAdd} onClick={() => navigate('/admin/products/create')}>
            <Plus size={15} /> Tambah Produk
          </button>
        </div>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div style={s.emptyState}>
          <Package size={48} style={{ color: '#d1d5db', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '8px', color: '#374151', fontWeight: '600' }}>Belum ada produk</h3>
          <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px' }}>Mulai tambahkan produk bouquet pertama Anda!</p>
          <button style={s.btnAdd} onClick={() => navigate('/admin/products/create')}>
            <Plus size={14} /> Tambah Produk Pertama
          </button>
        </div>
      ) : (
        <div style={s.grid}>
          {products.map(product => (
            <div key={product.id} style={s.card}>
              {/* Image */}
              <div style={s.cardImage}>
                {product.images.length > 0 ? (
                  <img
                    src={product.images.find(i => i.is_primary)?.url || product.images[0]?.url}
                    alt={product.name}
                    style={s.image}
                  />
                ) : (
                  <div style={s.noImage}>
                    <ImageOff size={28} style={{ color: '#d1d5db' }} />
                    <span style={{ fontSize: '12px', color: '#9ca3af', marginTop: '6px' }}>Belum ada gambar</span>
                  </div>
                )}
                {product.images.length > 1 && (
                  <span style={s.imageCount}>
                    <Images size={11} /> {product.images.length}
                  </span>
                )}
                {getLabelBadge(product.label)}
              </div>

              {/* Info */}
              <div style={s.cardBody}>
                <h3 style={s.productName}>{product.name}</h3>
                <p style={s.productPrice}>{formatRupiah(product.price)}</p>
                <div style={s.badgeRow}>{getStockBadge(product.stock_status)}</div>
                {product.description && (
                  <p style={s.productDesc}>
                    {product.description.length > 80 ? product.description.substring(0, 80) + '…' : product.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div style={s.cardActions}>
                <button style={s.btnEdit} onClick={() => navigate(`/admin/products/${product.id}/edit`)}>
                  <Pencil size={13} /> Edit
                </button>
                <button style={s.btnDelete} onClick={() => setItemToDelete({ id: product.id, name: product.name })} disabled={deleting === product.id}>
                  {deleting === product.id
                    ? <><Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> Menghapus</>
                    : <><Trash2 size={13} /> Hapus</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', animation: 'modalFadeIn 0.2s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '50%', color: '#ef4444' }}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: '#111827' }}>Hapus Produk?</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>
                  Apakah Anda yakin ingin menghapus <strong>"{itemToDelete.name}"</strong>? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={() => setItemToDelete(null)}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#fff', color: '#374151', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                Batal
              </button>
              <button 
                onClick={confirmDeleteAction}
                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.2)' }}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

const s: Record<string, React.CSSProperties> = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '32px 24px', fontFamily: "'Inter','Segoe UI',sans-serif", minHeight: '100vh', background: 'linear-gradient(135deg,#fdf2f8 0%,#fce7f3 50%,#f3e8ff 100%)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap' as const, gap: '16px' },
  title: { fontSize: '26px', fontWeight: '700', color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center' },
  subtitle: { fontSize: '14px', color: '#6b7280', marginTop: '4px' },
  headerActions: { display: 'flex', gap: '12px' },
  btnBack: { padding: '9px 18px', background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: '10px', cursor: 'pointer', fontWeight: '500', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' },
  btnAdd: { padding: '9px 20px', background: 'linear-gradient(135deg,#ec4899,#8b5cf6)', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 14px rgba(236,72,153,0.4)', display: 'flex', alignItems: 'center', gap: '6px' },
  emptyState: { textAlign: 'center' as const, padding: '80px 24px', background: '#fff', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '24px' },
  card: { background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08),0 4px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' as const },
  cardImage: { position: 'relative' as const, width: '100%', height: '220px', background: '#f9fafb', overflow: 'hidden' },
  image: { width: '100%', height: '100%', objectFit: 'cover' as const },
  noImage: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' },
  imageCount: { position: 'absolute' as const, bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' },
  badge: { position: 'absolute' as const, top: '8px', left: '8px', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' },
  stockBadge: { padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' },
  cardBody: { padding: '16px 20px', flex: '1' },
  productName: { fontSize: '17px', fontWeight: '600', color: '#1f2937', margin: '0 0 6px 0' },
  productPrice: { fontSize: '20px', fontWeight: '700', color: '#ec4899', margin: '0 0 10px 0' },
  badgeRow: { display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '8px' },
  productDesc: { fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: 0 },
  cardActions: { display: 'flex', gap: '8px', padding: '12px 20px 16px', borderTop: '1px solid #f3f4f6' },
  btnEdit: { flex: '1', padding: '8px 0', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' },
  btnDelete: { flex: '1', padding: '8px 0', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' },
};

export default ProductList;
