export default function AboutUs() {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            alt="Atmospheric flower field"
            className="w-full h-full object-cover object-center"
            src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1600&q=80"
          />
          <div className="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-gutter max-w-4xl mx-auto">
          <h1 className="font-display-lg text-headline-lg md:text-display-lg text-surface-white mb-6 drop-shadow-lg">
            Rooted in Creativity,<br />Crafted with Heart
          </h1>
          <p className="font-body-lg text-body-lg text-surface-white/90 drop-shadow-md max-w-2xl mx-auto">
            Creating unforgettable gift experiences through our signature bucket presentations.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-section-gap-md md:py-section-gap-lg px-gutter max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1" data-aos="fade-right">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Our Story</h2>
            <div className="space-y-6 text-on-surface-variant font-body-md text-body-md">
              <p data-aos="fade-up" data-aos-delay="100">
                Indy Bucket began with a vision to transform traditional gifting into an art form. We believe that every gift should tell a story, evoke emotion, and create lasting memories.
              </p>
              <p data-aos="fade-up" data-aos-delay="200">
                Our signature bucket presentations combine premium flowers, creative money arrangements, and gourmet treats into cohesive, stunning displays. Each bucket is meticulously curated to ensure every element works in harmony.
              </p>
              <p data-aos="fade-up" data-aos-delay="300">
                What started as a small boutique has grown into a premier gift destination, trusted by those who seek something truly special for their loved ones.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2" data-aos="fade-left" data-aos-delay="100">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
              <img
                alt="Artisan crafting gift bucket"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-surface-container-low py-section-gap-md md:py-section-gap-lg px-gutter">
        <div className="max-w-container-max mx-auto text-center">
          <h2 
            className="font-headline-lg text-headline-lg text-primary mb-4"
            data-aos="fade-up"
          >
            Our Values
          </h2>
          <p 
            className="font-body-md text-body-md text-text-muted mb-12 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Every bucket we create is guided by these core principles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Value 1 */}
            <div 
              className="bg-surface p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
              data-aos="flip-left"
              data-aos-delay="100"
            >
              <div className="w-16 h-16 bg-secondary-container text-primary rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">auto_awesome</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Premium Quality</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                We source only the finest materials, from fresh blooms to gourmet treats, ensuring every bucket exceeds expectations.
              </p>
            </div>
            {/* Value 2 */}
            <div 
              className="bg-surface p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
              data-aos="flip-left"
              data-aos-delay="200"
            >
              <div className="w-16 h-16 bg-secondary-container text-primary rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">palette</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Creative Design</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Our expert designers craft each bucket with artistic vision, balancing color, texture, and composition.
              </p>
            </div>
            {/* Value 3 */}
            <div 
              className="bg-surface p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
              data-aos="flip-left"
              data-aos-delay="300"
            >
              <div className="w-16 h-16 bg-secondary-container text-primary rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">favorite</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Personal Touch</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Every bucket is customizable to reflect your unique sentiment and the recipient's personality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-gap-lg px-gutter text-center max-w-4xl mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Experience Indy Bucket</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
          Hubungi kami untuk konsultasi dan pemesanan bucket spesial Anda. Kami siap membantu mewujudkan hadiah impian Anda!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary-container text-surface-white rounded-full font-label-lg text-label-lg hover:bg-primary-container/90 transition-colors duration-200 shadow-md hover:shadow-lg"
            href="https://wa.me/6281554107944?text=Halo%20Indy%20Bucket,%20saya%20ingin%20konsultasi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined">chat</span>
            Chat WhatsApp
          </a>
          <a
            className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-primary-container text-primary-container rounded-full font-label-lg text-label-lg hover:bg-primary-container/10 transition-colors duration-200"
            href="https://www.instagram.com/indy_buket"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined">photo_camera</span>
            Lihat Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
