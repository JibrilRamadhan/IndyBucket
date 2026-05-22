export default function BestSellers() {
  const products = [
    {
      name: 'Classic Money Presentation',
      price: '$110',
      image: '/img/Buket uang💝Free kartu ucapan💌Bisa request sesuai budgetTanya pricelist atau info lainnya Chat.webp',
    },
    {
      name: 'Luxury Rose Bucket',
      price: '$135',
      image: '/img/Blackpink bouquet🖤💗Free kartu ucapan💌Bisa request sesuai budgetTanya pricelist atau info lai.webp',
    },
    {
      name: 'Premium Gift Bucket',
      price: '$150',
      image: '/img/Buket perhiasan (cincin+gelang) 🍫💝Free kartu ucapan💌Bisa request sesuai budgetTanya pricelis.webp',
    },
    {
      name: 'Deluxe Snack Collection',
      price: '$125',
      image: '/img/Buket snack 🍫💝Free kartu ucapan💌Bisa request sesuai budgetTanya pricelist atau info lainnya .webp',
    },
  ];

  return (
    <section className="bg-surface-container-low py-12 md:py-section-gap-lg">
      <div className="max-w-container-max mx-auto px-gutter text-center flex flex-col items-center">
        <span 
          className="px-3 py-1 md:px-4 md:py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] md:font-label-md md:text-label-md mb-2 md:mb-stack-sm inline-block"
          data-aos="fade-down"
        >
          Premium Selections
        </span>
        <h2 
          className="font-headline-lg text-xl md:text-headline-lg text-primary mb-6 md:mb-section-gap-md"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Our Bestselling Buckets
        </h2>

        <div className="grid grid-cols-4 gap-2 md:gap-stack-md w-full">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-surface-white rounded-lg md:rounded-2xl p-2 md:p-4 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(122,80,61,0.05)] hover:shadow-[0_8px_30px_rgba(122,80,61,0.08)] transition-shadow duration-300"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="w-full aspect-square rounded-md md:rounded-xl overflow-hidden mb-2 md:mb-4 relative">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover"
                  src={product.image}
                />
              </div>
              <h3 className="font-headline-sm text-[10px] md:text-headline-sm text-on-surface mb-0.5 md:mb-1 line-clamp-2">{product.name}</h3>
              <p className="font-label-lg text-[9px] md:text-label-lg text-primary-container">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
