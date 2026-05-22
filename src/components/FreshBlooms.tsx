export default function FreshBlooms() {
  const styles = [
    {
      name: 'Money Buckets',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    },
    {
      name: 'Flower Buckets',
      image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80',
      offset: true,
    },
    {
      name: 'Snack Buckets',
      image: 'https://images.unsplash.com/photo-1514995669114-6081e934b693?w=800&q=80',
    },
  ];

  return (
    <section className="max-w-container-max mx-auto px-gutter py-24">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1 flex flex-col justify-center" data-aos="fade-right">
          <h2 className="font-headline-md text-headline-md text-primary mb-6">
            Gifts for Every Style
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            From modern floral arrangements to creative currency crafts and sweet treats, find the perfect aesthetic to delight your loved ones.
          </p>
          <a
            className="inline-flex items-center gap-2 text-primary font-label-md text-label-md hover:text-primary-container transition-colors w-fit group"
            href="https://www.instagram.com/indy_buket"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lihat Galeri{' '}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {styles.map((style, index) => (
            <div
              key={index}
              className={`relative w-full aspect-[0.55] rounded-xl overflow-hidden group ${
                style.offset ? 'sm:translate-y-8' : ''
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <img
                alt={style.name}
                className="w-full h-full object-cover"
                src={style.image}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface/95 backdrop-blur-md px-6 py-3 rounded-full flex flex-col items-center shadow-sm w-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-label-md text-label-md text-primary">{style.name}</span>
                <span className="font-price text-price text-secondary mt-1">Explore</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
