export default function Hero() {
  return (
    <section className="max-w-container-max mx-auto px-gutter py-section-gap-md md:py-section-gap-lg grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center">
      <div className="flex flex-col gap-stack-md order-2 md:order-1" data-aos="fade-right" data-aos-delay="100">
        <h1 className="font-display-lg text-display-lg text-primary max-w-lg" data-aos="fade-up" data-aos-delay="200">
          Redefine the Art of Gifting.
        </h1>
        <p className="font-body-lg text-body-lg text-text-muted max-w-md leading-relaxed" data-aos="fade-up" data-aos-delay="300">
          Experience our signature bucket presentations combining premium flowers, thoughtful surprises, and unforgettable moments. Each bucket is a curated masterpiece designed to make every occasion extraordinary.
        </p>
        <div className="mt-stack-sm" data-aos="fade-up" data-aos-delay="400">
          <a
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-container text-surface-white rounded-full font-label-lg text-label-lg hover:bg-primary-container/90 transition-colors duration-200 shadow-sm"
            href="https://wa.me/6281554107944?text=Halo%20Indy%20Bucket,%20saya%20tertarik%20dengan%20produk%20Anda"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubungi Kami di WhatsApp
          </a>
        </div>
      </div>

      <div className="relative h-[600px] w-full flex justify-end items-center order-1 md:order-2" data-aos="fade-left" data-aos-delay="100">
        {/* Arch Mask Images */}
        <div
          className="absolute right-0 top-0 w-2/3 h-4/5 rounded-t-full overflow-hidden shadow-lg border-4 border-surface z-10"
          style={{ borderRadius: '9999px 9999px 0 0' }}
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <img
            alt="Luxury gift bucket with flowers and premium surprises"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80"
          />
        </div>
        <div
          className="absolute left-10 bottom-0 w-1/2 h-2/3 rounded-t-full overflow-hidden shadow-lg border-4 border-surface z-20"
          style={{ borderRadius: '9999px 9999px 0 0' }}
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          <img
            alt="Elegant bucket arrangement with roses and thoughtful gifts"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80"
          />
        </div>
        {/* Decorative Element */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-secondary-container rounded-full opacity-50 z-0" data-aos="fade" data-aos-delay="700"></div>
      </div>
    </section>
  );
}
