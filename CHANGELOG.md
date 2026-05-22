# Changelog - Adorya Bouquet Website

## Update Terbaru

### Navbar
- ✅ Logo dipindahkan ke kiri (menggunakan logo dari `/public/img/`)
- ✅ Navigation links dipindahkan ke tengah
- ✅ Hanya 3 menu: **Home**, **About Us**, **Collections**
- ✅ Cart icon dihapus
- ✅ Konsisten di semua halaman

### Halaman Home
Dibuat ulang berdasarkan design HTML dengan komponen:

1. **Hero Section**
   - Judul: "Elevate Every Occasion. Gift with Heart."
   - Layout 2 kolom dengan gambar arch-shaped
   - CTA button "Explore Collections"

2. **Discover Section**
   - Horizontal scroll cards (pill-shaped)
   - 4 produk: The Velvet Rose, Golden Harvest, Pure Serenity, Exotic Whisper
   - Responsive untuk mobile dan desktop

3. **Fresh Blooms Section**
   - 3 style cards: Classic Romance, Modern Minimalist, Bohemian Wild
   - Grid layout dengan hover effects
   - Card tengah offset ke atas di desktop

4. **Best Sellers Section**
   - 4 produk dalam grid
   - Square cards dengan shadow effects
   - Badge "Signature Pieces"

5. **CTA Section**
   - Simple call-to-action
   - "Ready to Find the Perfect Petals?"
   - Shop Now button

6. **Footer**
   - 6 kolom grid layout
   - Links: Company, Collection, Service, Legal
   - Copyright notice

### Design System
- **Fonts**: Playfair Display (headings) + DM Sans (body)
- **Colors**: Material Design 3 inspired palette
- **Spacing**: Consistent dengan design tokens
- **Typography**: Semantic font classes (display-lg, headline-md, body-lg, dll)

### File Structure
```
src/
├── components/
│   ├── Navbar.tsx (updated)
│   ├── Hero.tsx (new)
│   ├── Discover.tsx (new)
│   ├── FreshBlooms.tsx (new)
│   ├── BestSellers.tsx (new)
│   ├── CTA.tsx (new)
│   ├── Footer.tsx (new)
│   └── Layout.tsx (existing)
├── pages/
│   └── Home.tsx (updated)
└── index.css (updated)
```

### Next Steps
- [ ] Tambahkan mobile menu functionality
- [ ] Implementasi routing untuk About Us dan Collections
- [ ] Tambahkan animasi dan transitions
- [ ] Optimasi gambar (ganti placeholder dengan gambar asli)
- [ ] Tambahkan dark mode toggle
