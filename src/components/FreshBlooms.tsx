export default function FreshBlooms() {
  const styles = [
    {
      name: 'Money Buckets',
      image: '/img/Buket Uang 💸✨Free kartu ucapan💌Bisa request sesuai budgetTanya pricelist atau info lainnya Ch.webp',
    },
    {
      name: 'Flower Buckets',
      image: '/img/Gold and blue peacock bouquet🦚💫Free kartu ucapan💌Bisa request sesuai budgetTanya pricelist a.webp',
      offset: true,
    },
    {
      name: 'Snack Buckets',
      image: '/img/Buket snack 🍫💝Free kartu ucapan💌Bisa request sesuai budgetTanya pricelist atau info lainnya .webp',
    },
  ];

  return (
    <section className="max-w-container-max mx-auto px-gutter py-12 md:py-24">
      <div className="grid grid-cols-4 gap-4 md:gap-12">
        <div className="col-span-4 md:col-span-1 flex flex-col justify-center mb-4 md:mb-0" data-aos="fade-right">
          <h2 className="font-headline-md text-lg md:text-headline-md text-primary mb-2 md:mb-6">
            Gifts for Every Style
          </h2>
          <p className="font-body-md text-xs md:text-body-md text-on-surface-variant mb-3 md:mb-8">
            From modern floral arrangements to creative currency crafts and sweet treats.
          </p>
          <a
            className="inline-flex items-center gap-2 text-primary text-xs md:font-label-md md:text-label-md hover:text-primary-container transition-colors w-fit group"
            href="https://www.instagram.com/indy_buket"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lihat Galeri{' '}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm md:text-base">
              arrow_forward
            </span>
          </a>
        </div>

        <div className="col-span-4 md:col-span-3 grid grid-cols-3 gap-3 md:gap-6">
          {styles.map((style, index) => (
            <div
              key={index}
              className={`relative w-full aspect-[0.55] rounded-lg md:rounded-xl overflow-hidden group ${
                style.offset ? 'md:translate-y-8' : ''
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
              <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 bg-surface/95 backdrop-blur-md px-2 md:px-6 py-1 md:py-3 rounded-full flex flex-col items-center shadow-sm w-[85%] md:w-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-label-md text-[10px] md:text-label-md text-primary">{style.name}</span>
                <span className="font-price text-[9px] md:text-price text-secondary mt-0 md:mt-1">Explore</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
