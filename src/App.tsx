import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ToastProvider } from './components/Toast';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for optimized initial bundle size
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Collections = lazy(() => import('./pages/Collections'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ProductList = lazy(() => import('./pages/admin/ProductList'));
const ProductForm = lazy(() => import('./pages/admin/ProductForm'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Sleek glassmorphic loader matching premium branding
const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface-white/60 backdrop-blur-md">
    <div className="relative w-14 h-14 flex items-center justify-center">
      {/* Outer spinning ring */}
      <div className="absolute inset-0 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
      {/* Inner glowing pulse */}
      <div className="w-4 h-4 rounded-full bg-secondary-container animate-pulse shadow-md" />
    </div>
    <span className="mt-5 text-xs font-semibold tracking-[0.2em] text-primary uppercase animate-pulse">
      Memuat Halaman...
    </span>
  </div>
);

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="collections" element={<Collections />} />
            </Route>

            {/* Admin Routes (No Layout) */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/products/create" element={<ProductForm />} />
            <Route path="/admin/products/:id/edit" element={<ProductForm />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;

