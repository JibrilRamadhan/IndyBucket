export default function CTA() {
  return (
    <section className="max-w-container-max mx-auto px-gutter py-12 md:py-section-gap-lg text-center flex flex-col items-center">
      <h2 
        className="font-display-lg text-xl md:text-display-lg text-primary mb-4 md:mb-stack-lg max-w-2xl leading-tight"
        data-aos="fade-up"
      >
        Ready to Create Unforgettable Moments?
      </h2>
      <p 
        className="font-body-lg text-xs md:text-body-lg text-text-muted mb-4 md:mb-8 max-w-xl"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Pesan bucket spesial Anda sekarang! Hubungi kami via WhatsApp atau Instagram.
      </p>
      <div 
        className="flex flex-wrap gap-2 md:gap-4 justify-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <a
          className="inline-flex items-center justify-center gap-1 md:gap-2 px-4 py-2 md:px-10 md:py-5 bg-primary-container text-surface-white rounded-full text-xs md:font-label-lg md:text-label-lg hover:bg-primary-container/90 transition-colors duration-200 shadow-md hover:shadow-lg"
          href="https://wa.me/6281554107944?text=Halo%20Indy%20Bucket,%20saya%20ingin%20memesan%20bucket"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="material-symbols-outlined text-sm md:text-base">chat</span>
          WhatsApp
        </a>
        <a
          className="inline-flex items-center justify-center gap-1 md:gap-2 px-4 py-2 md:px-10 md:py-5 border-2 border-primary-container text-primary-container rounded-full text-xs md:font-label-lg md:text-label-lg hover:bg-primary-container/10 transition-colors duration-200"
          href="https://www.instagram.com/indy_buket"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="material-symbols-outlined text-sm md:text-base">photo_camera</span>
          Instagram
        </a>
      </div>
    </section>
  );
}
