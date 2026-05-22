import Hero from '../components/Hero';
import Discover from '../components/Discover';
import FreshBlooms from '../components/FreshBlooms';
import BestSellers from '../components/BestSellers';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Discover />
      <FreshBlooms />
      <BestSellers />
      <CTA />
    </>
  );
}
