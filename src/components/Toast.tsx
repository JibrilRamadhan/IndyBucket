import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2, X } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'warning' | 'loading';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number; // ms, 0 = permanent (for loading)
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (opts: Omit<Toast, 'id'>) => string;
  success: (title: string, message?: string) => string;
  error: (title: string, message?: string) => string;
  warning: (title: string, message?: string) => string;
  loading: (title: string, message?: string) => string;
  dismiss: (id: string) => void;
  update: (id: string, opts: Partial<Omit<Toast, 'id'>>) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────
const ToastCtx = createContext<ToastContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    clearTimeout(timers.current[id]);
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((opts: Omit<Toast, 'id'>): string => {
    const id = Math.random().toString(36).slice(2);
    const duration = opts.type === 'loading' ? 0 : (opts.duration ?? 3500);

    setToasts(prev => [...prev, { ...opts, id }]);

    if (duration > 0) {
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [dismiss]);

  const success = useCallback((title: string, message?: string) =>
    toast({ type: 'success', title, message }), [toast]);

  const error = useCallback((title: string, message?: string) =>
    toast({ type: 'error', title, message, duration: 5000 }), [toast]);

  const warning = useCallback((title: string, message?: string) =>
    toast({ type: 'warning', title, message, duration: 4500 }), [toast]);

  const loading = useCallback((title: string, message?: string) =>
    toast({ type: 'loading', title, message, duration: 0 }), [toast]);

  const update = useCallback((id: string, opts: Partial<Omit<Toast, 'id'>>) => {
    clearTimeout(timers.current[id]);
    setToasts(prev => prev.map(t => t.id === id ? { ...t, ...opts } : t));

    if (opts.type && opts.type !== 'loading') {
      const duration = opts.duration ?? 3500;
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    }
  }, [dismiss]);

  // Cleanup on unmount
  useEffect(() => () => Object.values(timers.current).forEach(clearTimeout), []);

  return (
    <ToastCtx.Provider value={{ toasts, toast, success, error, warning, loading, dismiss, update }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastCtx.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

// ─── Toast config ─────────────────────────────────────────────────────────────
const config: Record<ToastType, { icon: React.ReactNode; accent: string; bg: string; border: string }> = {
  success: {
    icon: <CheckCircle size={18} style={{ color: '#16a34a', flexShrink: 0 }} />,
    accent: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
  },
  error: {
    icon: <XCircle size={18} style={{ color: '#dc2626', flexShrink: 0 }} />,
    accent: '#dc2626',
    bg: '#fef2f2',
    border: '#fecaca',
  },
  warning: {
    icon: <AlertCircle size={18} style={{ color: '#d97706', flexShrink: 0 }} />,
    accent: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
  },
  loading: {
    icon: <Loader2 size={18} style={{ color: '#2563eb', flexShrink: 0, animation: 'toast-spin 1s linear infinite' }} />,
    accent: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
  },
};

// ─── Container ────────────────────────────────────────────────────────────────
function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  return (
    <>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(110%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes toast-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100vw - 48px)',
        pointerEvents: 'none',
      }}>
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
        ))}
      </div>
    </>
  );
}

// ─── Item ────────────────────────────────────────────────────────────────────
function ToastItem({ toast: t, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const c = config[t.type];

  return (
    <div
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderLeft: `4px solid ${c.accent}`,
        borderRadius: '12px',
        padding: '14px 16px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        animation: 'toast-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        fontFamily: "'Inter','Segoe UI',sans-serif",
        pointerEvents: 'all',
      }}
    >
      <div style={{ paddingTop: '1px' }}>{c.icon}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827', lineHeight: 1.4 }}>
          {t.title}
        </p>
        {t.message && (
          <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#6b7280', lineHeight: 1.4 }}>
            {t.message}
          </p>
        )}
      </div>

      {t.type !== 'loading' && (
        <button
          onClick={() => onDismiss(t.id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '1px', color: '#9ca3af', flexShrink: 0, display: 'flex' }}
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
