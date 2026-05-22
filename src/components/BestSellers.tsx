export default function BestSellers() {
  const products = [
    {
      name: 'Classic Money Presentation',
      price: '$110',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    },
    {
      name: 'Luxury Rose Bucket',
      price: '$135',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
    },
    {
      name: 'Premium Gift Bucket',
      price: '$150',
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80',
    },
    {
      name: 'Deluxe Snack Collection',
      price: '$125',
      image: 'https://images.unsplash.com/photo-1514995669114-6081e934b693?w=800&q=80',
    },
  ];

  return (
    <section className="bg-surface-container-low py-section-gap-md md:py-section-gap-lg">
      <div className="max-w-container-max mx-auto px-gutter text-center flex flex-col items-center">
        <span 
          className="px-4 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-md text-label-md mb-stack-sm inline-block"
          data-aos="fade-down"
        >
          Premium Selections
        </span>
        <h2 
          className="font-headline-lg text-headline-lg text-primary mb-stack-lg md:mb-section-gap-md"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Our Bestselling Buckets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack-md w-full">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-surface-white rounded-2xl p-4 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(122,80,61,0.05)] hover:shadow-[0_8px_30px_rgba(122,80,61,0.08)] transition-shadow duration-300"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 relative">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover"
                  src={product.image}
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">{product.name}</h3>
              <p className="font-label-lg text-label-lg text-primary-container">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
