export default function Discover() {
  const products = [
    {
      name: 'Premium Roses',
      price: 'From $85.00',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
      badge: 'New',
    },
    {
      name: 'Luxury Money Buckets',
      price: 'From $150.00',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
      badge: null,
    },
    {
      name: 'Gourmet Snack Boxes',
      price: 'From $75.00',
      image: 'https://images.unsplash.com/photo-1514995669114-6081e934b693?w=800&q=80',
      badge: 'Limited',
    },
    {
      name: 'Eternal Dried Flowers',
      price: 'From $65.00',
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80',
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </section>
  );
}
