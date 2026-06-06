import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  ArrowLeft, FileText, Image as ImageIcon, UploadCloud,
  Save, Plus, X, Loader2, AlertCircle, CheckCircle
} from 'lucide-react';
import { useToast } from '../../components/Toast';

interface ExistingImage {
  id: number;
  url: string;
  is_primary: boolean;
  sort_order: number;
}

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

const compressImage = (file: File, maxWidth = 1920, maxHeight = 1920, quality = 0.82): Promise<File> => {
  return new Promise((resolve) => {
    // Jika ukuran file kurang dari atau sama dengan 3MB, tidak perlu dikompres
    if (file.size <= 3 * 1024 * 1024) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Proporsi mengecil jika melebihi batas maksimum
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Kompresi ke format JPEG (atau WEBP jika asalnya WEBP)
        const outputType = file.type === 'image/webp' ? 'image/webp' : 'image/jpeg';
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.'));
            const ext = outputType === 'image/webp' ? 'webp' : 'jpg';
            const compressedFile = new File([blob], `${nameWithoutExt}-compressed.${ext}`, {
              type: outputType,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          outputType,
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = event.target?.result as string;
    };
    reader.onerror = () => resolve(file);
  });
};

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { success, error: toastError, loading: toastLoading, update } = useToast();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockStatus, setStockStatus] = useState<'available' | 'out_of_stock'>('available');
  const [label, setLabel] = useState<'none' | 'best_seller' | 'new'>('none');
  const [homeSection, setHomeSection] = useState<'discover' | 'fresh' | 'bestseller' | ''>('');

  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      fetch(`${API_BASE}/products/${id}`)
        .then(res => res.json())
        .then(data => {
          const p = data.product;
          setName(p.name);
          setDescription(p.description || '');
          setPrice(String(p.price));
          setStockStatus(p.stock_status);
          setLabel(p.label);
          setHomeSection(p.home_section ?? '');
          setExistingImages(p.images || []);
        })
        .catch(() => setError('Gagal memuat data produk.'))
        .finally(() => setLoading(false));
    }
  }, [isEdit, id]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter(f =>
      ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(f.type)
    );
    setNewFiles(prev => [...prev, ...valid]);
    valid.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => setNewPreviews(prev => [...prev, e.target?.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeNewFile = (index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const deleteExistingImage = async (imageId: number) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/login'); return; }
      const img = existingImages.find(i => i.id === imageId);
      if (img) {
        const parts = img.url.split('/public/products/');
        const filePath = parts.length > 1 ? parts[1] : null;
        if (filePath) await supabase.storage.from('products').remove([filePath]);
      }
      const res = await fetch(`${API_BASE}/admin/product-images/${imageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });
      if (res.ok) {
        setExistingImages(prev => prev.filter(img => img.id !== imageId));
        success('Gambar dihapus', 'Gambar berhasil dihapus dari produk.');
      } else {
        toastError('Gagal menghapus', 'Terjadi kesalahan saat menghapus gambar.');
      }
    } catch (err) {
      toastError('Gagal menghapus', 'Tidak dapat terhubung ke server.');
    }
  };

  const uploadToSupabase = async (files: File[], toastId?: string): Promise<string[]> => {
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      
      // Auto compress jika ukuran file melebihi 3MB
      if (file.size > 3 * 1024 * 1024) {
        if (toastId) {
          update(toastId, { 
            title: `Mengompres gambar ${i + 1}/${files.length}...`, 
            message: `${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)` 
          });
        }
        try {
          const originalSize = file.size;
          file = await compressImage(file);
          console.log(`Compressed: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        } catch (err) {
          console.error("Gagal kompresi:", err);
        }
      }

      if (toastId) {
        update(toastId, { title: `Mengupload gambar ${i + 1}/${files.length}...`, message: file.name });
      }
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from('products').upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (error) throw new Error(`Gagal upload ${file.name}: ${error.message}`);
      const { data } = supabase.storage.from('products').getPublicUrl(fileName);
      urls.push(data.publicUrl);
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    // Toast loading — akan diupdate jadi success/error
    const tid = toastLoading(
      newFiles.length > 0 ? `Mengupload ${newFiles.length} gambar...` : isEdit ? 'Menyimpan perubahan...' : 'Menambah produk...',
      'Mohon tunggu sebentar'
    );

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/login'); return; }

      let uploadedImageUrls: string[] = [];
      if (newFiles.length > 0) uploadedImageUrls = await uploadToSupabase(newFiles, tid);

      if (uploadedImageUrls.length > 0 || newFiles.length === 0) {
        update(tid, { type: 'loading', title: isEdit ? 'Menyimpan perubahan...' : 'Menambah produk...' });
      }

      const payload = { name, description: description || null, price: Number(price), stock_status: stockStatus, label, home_section: homeSection || null, image_urls: uploadedImageUrls };

      if (isEdit && id) {
        const res = await fetch(`${API_BASE}/admin/products/${id}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${session.access_token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.errors ? Object.values(err.errors).flat().join(', ') : 'Gagal memperbarui produk.');
        }
        if (uploadedImageUrls.length > 0) {
          await fetch(`${API_BASE}/admin/products/${id}/images`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${session.access_token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ image_urls: uploadedImageUrls }),
          });
        }
        update(tid, { type: 'success', title: 'Perubahan tersimpan!', message: `${name} berhasil diperbarui.` });
      } else {
        const res = await fetch(`${API_BASE}/admin/products`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${session.access_token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.errors ? Object.values(err.errors).flat().join(', ') : 'Gagal menambahkan produk.');
        }
        update(tid, { type: 'success', title: 'Produk ditambahkan!', message: `${name} berhasil disimpan.` });
      }

      setTimeout(() => navigate('/admin/products'), 1200);
    } catch (err: any) {
      const msg = err.message || 'Terjadi kesalahan.';
      setError(msg);
      update(tid, { type: 'error', title: 'Gagal menyimpan', message: msg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div style={s.container}>
      <div style={{ textAlign: 'center', padding: '80px 0', color: '#6b7280', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: '#ec4899' }} />
        <span>Memuat data produk...</span>
      </div>
    </div>
  );

  return (
    <div style={s.container}>
      {/* Header */}
      <div style={s.header}>
        <h1 style={s.title}>
          {isEdit
            ? <><Pencil size={22} style={{ color: '#8b5cf6' }} /> Edit Produk</>
            : <><Plus size={22} style={{ color: '#ec4899' }} /> Tambah Produk Baru</>}
        </h1>
        <button style={s.btnBack} onClick={() => navigate('/admin/products')}>
          <ArrowLeft size={15} /> Kembali
        </button>
      </div>

      <form onSubmit={handleSubmit} style={s.form}>
        {error && (
          <div style={s.errorBox}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Info Produk */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>
            <FileText size={17} style={{ color: '#6b7280' }} /> Informasi Produk
          </h2>

          <div style={s.field}>
            <label style={s.label}>Nama Produk *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Contoh: Bouquet Mawar Merah Premium" style={s.input} required />
          </div>

          <div style={s.field}>
            <label style={s.label}>Deskripsi</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Deskripsikan produk bouquet Anda secara detail..." style={s.textarea} rows={4} />
          </div>

          <div style={s.fieldRow}>
            <div style={{ ...s.field, flex: 1 }}>
              <label style={s.label}>Harga (Rp) *</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)}
                placeholder="150000" style={s.input} min="0" required />
            </div>

            <div style={{ ...s.field, flex: 1 }}>
              <label style={s.label}>Status Stok *</label>
              <select value={stockStatus} onChange={e => setStockStatus(e.target.value as any)} style={s.select}>
                <option value="available">Tersedia</option>
                <option value="out_of_stock">Habis</option>
              </select>
            </div>

            <div style={{ ...s.field, flex: 1 }}>
              <label style={s.label}>Label</label>
              <select value={label} onChange={e => setLabel(e.target.value as any)} style={s.select}>
                <option value="none">Tidak Ada</option>
                <option value="best_seller">Best Seller</option>
                <option value="new">Baru</option>
              </select>
            </div>

            <div style={{ ...s.field, flex: 1 }}>
              <label style={s.label}>Tampil di Section Home</label>
              <select value={homeSection} onChange={e => setHomeSection(e.target.value as any)} style={s.select}>
                <option value="">— Tidak Ditampilkan —</option>
                <option value="discover">Koleksi Signature Kami</option>
                <option value="fresh">Hadiah untuk Setiap Gaya</option>
                <option value="bestseller">Produk Terlaris Kami</option>
              </select>
            </div>
          </div>
        </div>

        {/* Upload Gambar */}
        <div style={s.section}>
          <h2 style={s.sectionTitle}>
            <ImageIcon size={17} style={{ color: '#6b7280' }} /> Gambar Produk
          </h2>

          {/* Existing images */}
          {existingImages.length > 0 && (
            <div style={s.imageGrid}>
              {existingImages.map(img => (
                <div key={img.id} style={s.imagePreview}>
                  <img src={img.url} alt="" style={s.previewImg} />
                  {img.is_primary && (
                    <span style={{ ...s.imgBadge, background: '#ec4899' }}>
                      <CheckCircle size={9} /> Utama
                    </span>
                  )}
                  <button type="button" style={s.removeImgBtn} onClick={() => deleteExistingImage(img.id)}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* New previews */}
          {newPreviews.length > 0 && (
            <div style={s.imageGrid}>
              {newPreviews.map((preview, index) => (
                <div key={`new-${index}`} style={s.imagePreview}>
                  <img src={preview} alt="" style={s.previewImg} />
                  <span style={{ ...s.imgBadge, background: '#10b981' }}>
                    <Plus size={9} /> Baru
                  </span>
                  <button type="button" style={s.removeImgBtn} onClick={() => removeNewFile(index)}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Drop zone */}
          <div
            style={{ ...s.dropZone, ...(dragOver ? s.dropZoneActive : {}) }}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input ref={fileInputRef} type="file" multiple accept="image/jpeg,image/png,image/jpg,image/webp"
              style={{ display: 'none' }} onChange={e => handleFileSelect(e.target.files)} />
            <UploadCloud size={36} style={{ color: dragOver ? '#ec4899' : '#9ca3af', marginBottom: '10px' }} />
            <p style={{ fontWeight: '600', color: '#374151', margin: '0 0 4px 0', fontSize: '14px' }}>
              Seret & lepas gambar di sini
            </p>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
              atau klik untuk memilih file (JPEG, PNG, WebP, maks 5MB)
            </p>
          </div>
        </div>

        {/* Submit */}
        <div style={s.submitRow}>
          <button type="button" style={s.btnCancel} onClick={() => navigate('/admin/products')}>
            Batal
          </button>
          <button type="submit" style={s.btnSubmit} disabled={saving}>
            {saving
              ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Menyimpan...</>
              : isEdit
              ? <><Save size={15} /> Simpan Perubahan</>
              : <><Plus size={15} /> Tambah Produk</>}
          </button>
        </div>
      </form>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// Tambahkan Pencil yang lupa di-import
const Pencil = ({ size, style }: { size: number; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" />
  </svg>
);

const s: Record<string, React.CSSProperties> = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '32px 24px', fontFamily: "'Inter','Segoe UI',sans-serif", minHeight: '100vh', background: 'linear-gradient(135deg,#fdf2f8 0%,#fce7f3 50%,#f3e8ff 100%)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  title: { fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' },
  btnBack: { padding: '9px 18px', background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: '10px', cursor: 'pointer', fontWeight: '500', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' },
  form: { display: 'flex', flexDirection: 'column' as const, gap: '24px' },
  errorBox: { background: '#fef2f2', color: '#dc2626', padding: '12px 16px', borderRadius: '10px', border: '1px solid #fecaca', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' },
  section: { background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  sectionTitle: { fontSize: '16px', fontWeight: '600', color: '#374151', margin: '0 0 20px 0', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' },
  field: { marginBottom: '16px' },
  fieldRow: { display: 'flex', gap: '16px', flexWrap: 'wrap' as const },
  label: { display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const },
  textarea: { width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'vertical' as const, fontFamily: 'inherit', boxSizing: 'border-box' as const },
  select: { width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '14px', outline: 'none', background: '#fff', cursor: 'pointer', boxSizing: 'border-box' as const },
  imageGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: '12px', marginBottom: '16px' },
  imagePreview: { position: 'relative' as const, borderRadius: '10px', overflow: 'hidden', aspectRatio: '1', border: '2px solid #e5e7eb' },
  previewImg: { width: '100%', height: '100%', objectFit: 'cover' as const },
  imgBadge: { position: 'absolute' as const, top: '4px', left: '4px', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' },
  removeImgBtn: { position: 'absolute' as const, top: '4px', right: '4px', width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(220,38,38,0.85)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  dropZone: { border: '2px dashed #d1d5db', borderRadius: '12px', padding: '36px', textAlign: 'center' as const, cursor: 'pointer', transition: 'all 0.2s', background: '#fafafa', display: 'flex', flexDirection: 'column' as const, alignItems: 'center' },
  dropZoneActive: { borderColor: '#ec4899', background: '#fdf2f8' },
  submitRow: { display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px' },
  btnCancel: { padding: '11px 24px', background: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: '10px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' },
  btnSubmit: { padding: '11px 28px', background: 'linear-gradient(135deg,#ec4899,#8b5cf6)', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 14px rgba(236,72,153,0.4)', display: 'flex', alignItems: 'center', gap: '8px' },
};

export default ProductForm;
