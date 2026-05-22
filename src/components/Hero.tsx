export default function Hero() {
  return (
    <section className="max-w-container-max mx-auto px-gutter py-12 md:py-section-gap-lg grid grid-cols-2 gap-4 md:gap-stack-lg items-center min-h-[400px] md:min-h-0">
      <div className="flex flex-col gap-3 md:gap-stack-md order-1" data-aos="fade-right" data-aos-delay="100">
        <h1 className="font-display-lg text-2xl md:text-display-lg text-primary leading-tight" data-aos="fade-up" data-aos-delay="200">
          Redefine the Art of Gifting.
        </h1>
        <p className="font-body-lg text-xs md:text-body-lg text-text-muted leading-relaxed" data-aos="fade-up" data-aos-delay="300">
          Experience our signature bucket presentations combining premium flowers, thoughtful surprises, and unforgettable moments.
        </p>
        <div className="mt-2 md:mt-stack-sm" data-aos="fade-up" data-aos-delay="400">
          <a
            className="inline-flex items-center justify-center px-4 py-2 md:px-8 md:py-4 bg-primary-container text-surface-white rounded-full text-xs md:font-label-lg md:text-label-lg hover:bg-primary-container/90 transition-colors duration-200 shadow-sm"
            href="https://wa.me/6281554107944?text=Halo%20Indy%20Bucket,%20saya%20tertarik%20dengan%20produk%20Anda"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubungi Kami
          </a>
        </div>
      </div>

      <div className="relative h-[350px] md:h-[600px] w-full flex justify-end items-center order-2" data-aos="fade-left" data-aos-delay="100">
        {/* Arch Mask Images */}
        <div
          className="absolute right-0 top-0 w-2/3 h-4/5 rounded-t-full overflow-hidden shadow-lg border-2 md:border-4 border-surface z-10"
          style={{ borderRadius: '9999px 9999px 0 0' }}
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <img
            alt="Luxury gift bucket with flowers and premium surprises"
            className="w-full h-full object-cover"
            src="/img/Buket uang & cokelat🍫💝Free kartu ucapan💌Bisa request sesuai budgetTanya pricelist atau info .webp"
          />
        </div>
        <div
          className="absolute left-2 md:left-10 bottom-0 w-1/2 h-2/3 rounded-t-full overflow-hidden shadow-lg border-2 md:border-4 border-surface z-20"
          style={{ borderRadius: '9999px 9999px 0 0' }}
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          <img
            alt="Elegant bucket arrangement with roses and thoughtful gifts"
            className="w-full h-full object-cover"
            src="/img/Gold and blue peacock bouquet🦚💫Free kartu ucapan💌Bisa request sesuai budgetTanya pricelist a.webp"
          />
        </div>
        {/* Decorative Element */}
        <div className="absolute -right-4 md:-right-8 -bottom-4 md:-bottom-8 w-16 md:w-32 h-16 md:h-32 bg-secondary-container rounded-full opacity-50 z-0" data-aos="fade" data-aos-delay="700"></div>
      </div>
    </section>
  );
}
