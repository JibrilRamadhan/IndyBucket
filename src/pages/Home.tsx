import { useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import Discover from '../components/Discover';
import FreshBlooms from '../components/FreshBlooms';
import BestSellers from '../components/BestSellers';
import CTA from '../components/CTA';
import ProductModal from '../components/ProductModal';
import type { SiteProduct } from '../hooks/useSiteProducts';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<SiteProduct | null>(null);

  return (
    <>
      <HeroSlider />
      <Discover onSelectProduct={setSelectedProduct} />
      <FreshBlooms onSelectProduct={setSelectedProduct} />
      <BestSellers onSelectProduct={setSelectedProduct} />
      <CTA />

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
}
