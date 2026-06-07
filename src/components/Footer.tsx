export default function Footer() {
  return (
    <footer className="bg-primary-container dark:bg-primary-container text-on-primary-container dark:text-on-primary-container w-full">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-stack-lg px-gutter py-section-gap-md w-full max-w-container-max mx-auto">
<div className="md:col-span-2 flex flex-col gap-5">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 flex items-center justify-center">
              <img
                src="/img/Logo.png"
                alt="Indy Bucket Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-headline-sm text-headline-sm text-on-primary-container">
              Indy Bucket
            </span>
          </div>
          
          <p className="font-body-sm text-body-sm text-on-primary-container/90 max-w-xs leading-relaxed">
            Menghadirkan kreasi buket, hampers, dan hantaran premium yang dirangkai khusus untuk menyempurnakan setiap momen berharga Anda.
          </p>
          
          <div className="flex flex-col gap-1.5 text-on-primary-container/80 font-body-sm text-body-sm mt-2">
            <p className="flex items-center gap-2">
               <span className="w-1 h-1 rounded-full bg-on-primary-container/50"></span>
               Pemesanan maksimal H-3
            </p>
            <p className="flex items-center gap-2">
               <span className="w-1 h-1 rounded-full bg-on-primary-container/50"></span>
               Berbasis di Surabaya
            </p>
            <p className="flex items-center gap-2">
               <span className="w-1 h-1 rounded-full bg-on-primary-container/50"></span>
               Melayani CBD & COD
            </p>
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
