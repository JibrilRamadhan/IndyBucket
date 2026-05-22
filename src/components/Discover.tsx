// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
// @ts-ignore
import '@splidejs/react-splide/css';

export default function Discover() {
  const products = [
    {
      name: 'Premium Roses',
      price: 'From $85.00',
      image: '/img/Blackpink bouquet🖤💗Free kartu ucapan💌Bisa request sesuai budgetTanya pricelist atau info lai.webp',
      badge: 'New',
    },
    {
      name: 'Luxury Money Buckets',
      price: 'From $150.00',
      image: '/img/Buket uang 🍫💝Free kartu ucapan💌Bisa request sesuai budgetTanya pricelist atau info lainnya C.webp',
      badge: null,
    },
    {
      name: 'Gourmet Snack Boxes',
      price: 'From $75.00',
      image: '/img/Buket snack 🍫💝Free kartu ucapan💌Bisa request sesuai budgetTanya pricelist atau info lainnya .webp',
      badge: 'Limited',
    },
    {
      name: 'Eternal Dried Flowers',
      price: 'From $65.00',
      image: '/img/Cute butterfly bouquet😍🦋Free kartu ucapan💌Bisa request sesuai budgetTanya pricelist atau inf.webp',
      badge: null,
    },
  ];

  return (
    <section className="bg-surface py-20 px-gutter" id="discover">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6" data-aos="fade-up">
          <div className="max-w-md">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              Discover Our Signature Buckets
            </h2>
            <p className="text-on-surface-variant font-body-md text-body-md">
              A curated collection of our most beloved arrangements and unique gifts, perfect for any occasion.
            </p>
          </div>
          <a
            className="inline-flex items-center justify-center px-6 py-3 border border-secondary text-secondary rounded-full font-label-md text-label-md hover:bg-secondary hover:text-on-secondary transition-colors whitespace-nowrap"
            href="https://www.instagram.com/indy_buket"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lihat Koleksi di Instagram
          </a>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div 
              key={index} 
              className="group cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative w-full aspect-[3/4] rounded-t-[12rem] rounded-b-[1rem] overflow-hidden bg-surface-container mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={product.image}
                />
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-sm px-3 py-1 rounded-full font-label-md text-label-md text-primary">
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-headline-sm text-headline-sm text-primary mb-2">{product.name}</h3>
                <p className="font-price text-price text-secondary">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden" data-aos="fade-up">
          <Splide
            options={{
              type: 'loop',
              perPage: 2,
              perMove: 1,
              gap: '1rem',
              padding: { left: '1rem', right: '1rem' },
              arrows: false,
              pagination: true,
              autoplay: false,
              breakpoints: {
                640: {
                  perPage: 1.5,
                  gap: '0.75rem',
                },
              },
            }}
          >
            {products.map((product, index) => (
              <SplideSlide key={index}>
                <div className="group cursor-pointer">
                  <div className="relative w-full aspect-[3/4] rounded-t-[12rem] rounded-b-[1rem] overflow-hidden bg-surface-container mb-4 shadow-sm">
                    <img
                      alt={product.name}
                      className="w-full h-full object-cover"
                      src={product.image}
                    />
                    {product.badge && (
                      <div className="absolute top-3 right-3 bg-surface/80 backdrop-blur-sm px-2 py-1 rounded-full font-label-md text-label-md text-primary text-xs">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-headline-sm text-base text-primary mb-1">{product.name}</h3>
                    <p className="font-price text-sm text-secondary">{product.price}</p>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
}
