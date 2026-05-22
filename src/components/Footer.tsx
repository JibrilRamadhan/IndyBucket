export default function Footer() {
  return (
    <footer className="bg-primary-container dark:bg-primary-container text-on-primary-container dark:text-on-primary-container w-full">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-stack-lg px-gutter py-section-gap-md w-full max-w-container-max mx-auto">
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <svg className="h-8 w-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="8" stroke="#FDF9F4" strokeWidth="2.5" fill="none"/>
              <path d="M50 42 Q40 30 35 25 Q30 20 28 22 Q26 24 30 28 Q35 33 42 40" stroke="#FDF9F4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M50 42 Q60 30 65 25 Q70 20 72 22 Q74 24 70 28 Q65 33 58 40" stroke="#FDF9F4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M42 50 Q30 40 25 35 Q20 30 22 28 Q24 26 28 30 Q33 35 40 42" stroke="#FDF9F4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M58 50 Q70 40 75 35 Q80 30 78 28 Q76 26 72 30 Q67 35 60 42" stroke="#FDF9F4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M50 58 Q40 70 35 75 Q30 80 28 78 Q26 76 30 72 Q35 67 42 60" stroke="#FDF9F4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M50 58 Q60 70 65 75 Q70 80 72 78 Q74 76 70 72 Q65 67 58 60" stroke="#FDF9F4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M42 50 Q30 60 25 65 Q20 70 22 72 Q24 74 28 70 Q33 65 40 58" stroke="#FDF9F4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M58 50 Q70 60 75 65 Q80 70 78 72 Q76 74 72 70 Q67 65 60 58" stroke="#FDF9F4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="font-headline-sm text-headline-sm text-on-primary-container">
              Indy Bucket
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-primary-container/80 max-w-xs">
            Bouquet, Hampers, Gift & Hantaran
          </p>
          <div className="flex flex-col gap-2 text-on-primary-container/80 font-body-sm text-body-sm">
            <p>⏳ Max Order H-3</p>
            <p>📍 Surabaya</p>
            <p>💸 Melayani CBD & COD</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-on-primary-container font-label-lg text-label-lg font-semibold">
            Indy Collections
          </span>
          <a
            className="text-on-primary-container/80 hover:text-white transition-colors duration-200 font-label-md text-label-md"
            href="#"
          >
            Money Buckets
          </a>
          <a
            className="text-on-primary-container/80 hover:text-white transition-colors duration-200 font-label-md text-label-md"
            href="#"
          >
            Flower Buckets
          </a>
          <a
            className="text-on-primary-container/80 hover:text-white transition-colors duration-200 font-label-md text-label-md"
            href="#"
          >
            Snack Buckets
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-on-primary-container font-label-lg text-label-lg font-semibold">
            Customize
          </span>
          <a
            className="text-on-primary-container/80 hover:text-white transition-colors duration-200 font-label-md text-label-md"
            href="#"
          >
            Build Your Bucket
          </a>
          <a
            className="text-on-primary-container/80 hover:text-white transition-colors duration-200 font-label-md text-label-md"
            href="#"
          >
            Gift Packages
          </a>
          <a
            className="text-on-primary-container/80 hover:text-white transition-colors duration-200 font-label-md text-label-md"
            href="#"
          >
            Corporate Gifts
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-on-primary-container font-label-lg text-label-lg font-semibold">
            Hubungi Kami
          </span>
          <a
            className="text-on-primary-container/80 hover:text-white transition-colors duration-200 font-label-md text-label-md flex items-center gap-2"
            href="https://wa.me/6281554107944"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            WhatsApp
          </a>
          <a
            className="text-on-primary-container/80 hover:text-white transition-colors duration-200 font-label-md text-label-md flex items-center gap-2"
            href="https://www.instagram.com/indy_buket"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-sm">photo_camera</span>
            Instagram
          </a>
          <p className="text-on-primary-container/80 font-label-md text-label-md">
            (+62) 815 5410 7944
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-on-primary-container font-label-lg text-label-lg font-semibold">
            Informasi
          </span>
          <a
            className="text-on-primary-container/80 hover:text-white transition-colors duration-200 font-label-md text-label-md"
            href="#"
          >
            Cara Pemesanan
          </a>
          <a
            className="text-on-primary-container/80 hover:text-white transition-colors duration-200 font-label-md text-label-md"
            href="#"
          >
            Metode Pembayaran
          </a>
          <a
            className="text-on-primary-container/80 hover:text-white transition-colors duration-200 font-label-md text-label-md"
            href="#"
          >
            Area Pengiriman
          </a>
        </div>

        <div className="md:col-span-6 mt-stack-lg pt-stack-md border-t border-on-primary-container/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-body-sm text-body-sm text-on-primary-container/80">
            © 2024 Indy Bucket. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
