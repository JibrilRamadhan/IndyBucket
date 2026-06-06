import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  Package, LayoutDashboard, Eye, CheckCircle, XCircle,
  Server, Database, Cloud, LogOut, Loader2, ChevronRight
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState<'ok' | 'error' | 'loading'>('loading');
  const [productCount, setProductCount] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/login'); return; }
      setUser(session.user);

      try {
        const res = await fetch('http://127.0.0.1:8000/api/admin/dashboard', {
          headers: { 'Authorization': `Bearer ${session.access_token}` }
        });
        setBackendStatus(res.ok ? 'ok' : 'error');
      } catch {
        setBackendStatus('error');
      }

      try {
        const res = await fetch('http://127.0.0.1:8000/api/products');
        if (res.ok) {
          const data = await res.json();
          setProductCount(data.products?.length ?? 0);
        }
      } catch { /* silent */ }

      setLoading(false);
    };
    init();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#fdf2f8 0%,#f3e8ff 100%)', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <div style={{ textAlign: 'center', color: '#6b7280', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: '#ec4899' }} />
        <p style={{ margin: 0 }}>Memuat dashboard...</p>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const statusCards = [
    {
      icon: <Server size={18} style={{ color: backendStatus === 'ok' ? '#15803d' : '#dc2626' }} />,
      label: 'Backend Laravel',
      value: backendStatus === 'loading' ? '...' : backendStatus === 'ok' ? 'Terhubung' : 'Offline',
      valueColor: backendStatus === 'ok' ? '#15803d' : '#dc2626',
      bg: backendStatus === 'ok' ? '#f0fdf4' : '#fef2f2',
      border: backendStatus === 'ok' ? '#86efac' : '#fecaca',
      indicator: backendStatus === 'ok'
        ? <CheckCircle size={14} style={{ color: '#15803d' }} />
        : <XCircle size={14} style={{ color: '#dc2626' }} />,
    },
    {
      icon: <Database size={18} style={{ color: '#be185d' }} />,
      label: 'Total Produk',
      value: productCount ?? '—',
      valueColor: '#be185d',
      bg: '#fdf2f8',
      border: '#f9a8d4',
      indicator: null,
    },
    {
      icon: <Cloud size={18} style={{ color: '#7c3aed' }} />,
      label: 'Supabase Storage',
      value: 'Aktif',
      valueColor: '#7c3aed',
      bg: '#f5f3ff',
      border: '#c4b5fd',
      indicator: <CheckCircle size={14} style={{ color: '#7c3aed' }} />,
    },
  ];

  const menuItems = [
    {
      icon: <Package size={28} style={{ color: '#be185d' }} />,
      title: 'Manajemen Produk',
      desc: 'Tambah, edit, hapus produk. Upload foto ke Supabase Storage.',
      path: '/admin/products',
      gradient: 'linear-gradient(135deg,#fdf2f8,#fce7f3)',
      border: '#f9a8d4',
      titleColor: '#be185d',
      stat: productCount !== null ? `${productCount} produk` : null,
    },
    {
      icon: <Eye size={28} style={{ color: '#15803d' }} />,
      title: 'Pratinjau Koleksi',
      desc: 'Lihat tampilan halaman koleksi seperti yang dilihat pelanggan.',
      path: '/collections',
      gradient: 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
      border: '#86efac',
      titleColor: '#15803d',
      stat: null,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#fdf2f8 0%,#fce7f3 30%,#f3e8ff 100%)', fontFamily: "'Inter','Segoe UI',sans-serif", padding: '32px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg,#ec4899,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutDashboard size={22} style={{ color: '#fff' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Admin Dashboard</h1>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{ padding: '9px 18px', background: '#fff', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <LogOut size={15} /> Keluar
          </button>
        </div>

        {/* Status Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '16px', marginBottom: '32px' }}>
          {statusCards.map((card, i) => (
            <div key={i} style={{ background: card.bg, border: `1px solid ${card.border}`, borderRadius: '12px', padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                {card.icon}
                {card.indicator}
              </div>
              <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {card.label}
              </p>
              <p style={{ fontSize: typeof card.value === 'number' ? '28px' : '16px', fontWeight: '700', color: card.valueColor, margin: 0 }}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Menu */}
        <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#374151', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Menu Admin
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '16px' }}>
          {menuItems.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{ background: item.gradient, border: `1px solid ${item.border}`, borderRadius: '16px', padding: '24px', cursor: 'pointer', textAlign: 'left', transition: 'box-shadow 0.2s', width: '100%' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                {item.icon}
                <ChevronRight size={16} style={{ color: item.titleColor, opacity: 0.6 }} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: item.titleColor, margin: '0 0 6px 0' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 12px 0', lineHeight: '1.5' }}>
                {item.desc}
              </p>
              {item.stat && (
                <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '20px', background: '#fff', fontSize: '12px', fontWeight: '500', color: item.titleColor }}>
                  {item.stat}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default AdminDashboard;
