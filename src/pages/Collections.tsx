export default function Collections() {
  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-container-margin py-section-gap-mobile md:py-section-gap-desktop">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">Browse Our Collections</h1>
        <p className="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto">Explore our curated selection of seasonal blooms, timeless classics, and unique arrangements designed to bring natural elegance to any space.</p>
      </header>

      {/* Filtering and Sorting Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-outline-variant/30 pb-6 gap-6">
        {/* Category Filter Links */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4">
          <button className="font-label-md text-label-md text-primary border-b-2 border-primary pb-1">All</button>
          <button className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary/50">Bouquets</button>
          <button className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary/50">Dried Flowers</button>
          <button className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary/50">Wedding</button>
          <button className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary/50">Gifts</button>
        </nav>
        {/* Sorting Dropdown (Visual only for UI) */}
        <div className="relative group">
          <button className="flex items-center space-x-2 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors px-4 py-2 rounded-full border border-outline-variant/50 bg-surface">
            <span>Sort by: Newest</span>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-16">
        {/* Product Card 1 */}
        <article className="group cursor-pointer flex flex-col">
          <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden rounded-t-full rounded-b-xl bg-surface-container-low transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-lg shadow-outline/10">
            <img
              alt="Autumn Whisper Bouquet"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFbPqiokpu3ZU48QxxN55bnZpVRbKbXKk5X-4uIf8ES6eqa1-nxcC_0VuU2XguJbfhC_jLfrxmrhQkIf12HbSkrKZ-Hp8E_dGSyk0YKm5-RSXJPIV0zJxCDv_tmvV7vw6xvb1Ch3s7yYijEgXxoCKko4zE2GZ4_UQR1ZLq2GO7zdviBYgGwvGMfBFQJN2mlj4yhydjMcf8c-iE2mI9-Up4LWIxKqAs5yD2qtmOQky-PcLu9okANEAndZB810UeM5cgQPrvD__zgnk"
            />
            <div className="absolute top-4 left-4">
              <span className="px-4 py-1.5 bg-surface/90 backdrop-blur-sm rounded-full font-label-md text-[12px] text-primary shadow-sm uppercase tracking-wider">Best Seller</span>
            </div>
            <button className="absolute bottom-4 right-4 w-12 h-12 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm hover:bg-primary hover:text-on-primary">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div className="text-center px-4">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Autumn Whisper</h3>
            <p className="font-price text-price text-secondary">$85.00</p>
          </div>
        </article>

        {/* Product Card 2 */}
        <article className="group cursor-pointer flex flex-col">
          <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden rounded-t-[4rem] rounded-b-xl bg-surface-container-low transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-lg shadow-outline/10">
            <img
              alt="Midnight Peony Arrangement"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7irjYweEw0QqIqcleNFj1C8urCmW6Puv4WH04Svkx54CC5hPYsM4YgZUlq6tGJLYd1VAj9kuTmrt2_TgGh-6jsK5EKuJMjvNT3Cx_hHtvKYVqj5ne-2RTjDmBCB1lSFO9q77I-bpFaSoObuvu6Up8cUqiY7WCkOQKEtDcp6sJnM-tYZEuhF8VbdpEyGcVV22FmJC9SzG_174AD8CmhqVvp29kUvfXuQY4sH8WNPBOr-h7ATo50HvWQ4FjGNKqoKO0ee8h3ICsLDs"
            />
            <button className="absolute bottom-4 right-4 w-12 h-12 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm hover:bg-primary hover:text-on-primary">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div className="text-center px-4">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Midnight Peony</h3>
            <p className="font-price text-price text-secondary">$120.00</p>
          </div>
        </article>

        {/* Product Card 3 */}
        <article className="group cursor-pointer flex flex-col">
          <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden rounded-xl bg-surface-container-low transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-lg shadow-outline/10">
            <img
              alt="Wildflower Meadow"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdx8xBrOh44-QgBna8xYa3Na-R9px4DLvrX2veIaIcE2QuCE3HZ0V0d-rc4_-YgCJOZi81j5frxJqcpPOIsZXPheR10zD_MM4-Y1tzr7TXKoZMpE-q1Lc1KT03ACGdiELkfbRaj4qXAP8ZSoEloc-bTLhXWT3_qvb6zVetZyvQHb0egTGNpedhgKdbkfTtQgI4YbAr8oirwrkC6lSygfIyXqkXK2cWylileYdGqiN8HKFWFP7Q7dYOCt38FNBl9HSrVQTRd6jJ6D4"
            />
            <div className="absolute top-4 left-4">
              <span className="px-4 py-1.5 bg-surface/90 backdrop-blur-sm rounded-full font-label-md text-[12px] text-primary shadow-sm uppercase tracking-wider">New</span>
            </div>
            <button className="absolute bottom-4 right-4 w-12 h-12 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm hover:bg-primary hover:text-on-primary">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div className="text-center px-4">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Wildflower Meadow</h3>
            <p className="font-price text-price text-secondary">$65.00</p>
          </div>
        </article>

        {/* Product Card 4 */}
        <article className="group cursor-pointer flex flex-col">
          <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden rounded-tl-xl rounded-tr-full rounded-b-xl bg-surface-container-low transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-lg shadow-outline/10">
            <img
              alt="Rustic Dried Pampas"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDudj6KV461R1VDH_XIsKJzj-q4IGaDloJWBH910TQK-fCPCbR8WIe0q8T6TyshhxGuCrgE5gDc5dk91G9DdXleClCTJQDTiNLgCYpV5Fa6YKSyxkuEzBCAuY9JN4UNrZWBRSttiY14wssyB0BeK2iv7VFLjqvPW5kpiFRdCXcPtkHvgxAKTDGXiQxhtQsgPCQkvtmwt14H3RYCE-usyon2ODOFidyzCl-743Y8PeAXMBIlbV14Vb-ZY4wB-8Ua1uYMOey6fHlJUiU"
            />
            <button className="absolute bottom-4 right-4 w-12 h-12 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm hover:bg-primary hover:text-on-primary">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div className="text-center px-4">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Rustic Pampas</h3>
            <p className="font-price text-price text-secondary">$45.00</p>
          </div>
        </article>

        {/* Product Card 5 */}
        <article className="group cursor-pointer flex flex-col">
          <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden rounded-t-xl rounded-bl-full rounded-br-xl bg-surface-container-low transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-lg shadow-outline/10">
            <img
              alt="Blush Rose Classic"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfoRJEbu3G8igwOrUYPtUIl01V1mkz8Hb95eIYRLxHYBJoeA8qJgK7s75-krIzRYacTekEP1yVGRST6Kz8BS6BCbHGTBpHjCGIOhzjfKuAy78DfXQgdXUXVyAEI0hiswRciRILqjehzRHoln5dTkh7nldWPnsunM0KTlrLEvog9tuKLza1_wdUE5gHOdUpb5M6VytZdA3CPiCq3NhLBJyoslAngTNdRNV45AdZBndx7CX2u1d2zQ2pE66DKYiYAlctAr1XNZXuSQ0"
            />
            <button className="absolute bottom-4 right-4 w-12 h-12 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm hover:bg-primary hover:text-on-primary">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div className="text-center px-4">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Blush Classic</h3>
            <p className="font-price text-price text-secondary">$110.00</p>
          </div>
        </article>

        {/* Product Card 6 */}
        <article className="group cursor-pointer flex flex-col">
          <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden rounded-[3rem] bg-surface-container-low transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-lg shadow-outline/10">
            <img
              alt="Eucalyptus Bundle"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaBnoUAg9XvVclEZ9qrcIspv8r0CvycoeF-2b1U47q5x_FYpG4f4CeYzbbmWx3iN1FbGsmvvyQ81kmssMWpI43X9TQ6UiR2VtFNo08ZbYTYirBhbXrn9Gp6Hwh5vv8qovsJO5sxvOvRLK3wD2lJaYV2YzSr0cZrIQGGfSEGAxg2g0AvA9VzDjSmPRKVXd9FMs4lx3HcSmqmuqCjPQYKTvKNethLOhA-P8fzYrnlKicO91UmndD0jaejYEE54CMuSD3dAFBbAx7Mjs"
            />
            <div className="absolute top-4 left-4">
              <span className="px-4 py-1.5 bg-surface/90 backdrop-blur-sm rounded-full font-label-md text-[12px] text-primary shadow-sm uppercase tracking-wider">Seasonal</span>
            </div>
            <button className="absolute bottom-4 right-4 w-12 h-12 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm hover:bg-primary hover:text-on-primary">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div className="text-center px-4">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Fresh Eucalyptus</h3>
            <p className="font-price text-price text-secondary">$35.00</p>
          </div>
        </article>
      </div>

      {/* Load More Button */}
      <div className="mt-16 text-center">
        <button className="px-8 py-4 border-2 border-secondary rounded-full font-label-md text-label-md text-primary hover:bg-secondary hover:text-on-secondary transition-colors duration-300">
          View More Collections
        </button>
      </div>
    </div>
  );
}
