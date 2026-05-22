# Contact Integration - Indy Bucket

## 📱 **KONTAK INFORMASI**

### WhatsApp
- **Nomor:** (+62) 815 5410 7944
- **Link:** `https://wa.me/6281554107944`
- **Format Pesan:** Pre-filled dengan greeting message

### Instagram
- **Username:** @indy_buket
- **Link:** `https://www.instagram.com/indy_buket`

### Informasi Bisnis
```
Bouquet, Hampers, Gift & Hantaran
⏳ Max Order H-3
📍 Surabaya
💸 Melayani CBD & COD
☎️ DM / WA (+62) 815 5410 7944
```

---

## 🔗 **INTEGRASI CTA BUTTONS**

### 1. Hero Section (Home Page)
**Button:** "Hubungi Kami di WhatsApp"
- Link: WhatsApp dengan pre-filled message
- Message: "Halo Indy Bucket, saya tertarik dengan produk Anda"

### 2. CTA Section (Home Page)
**Dual Buttons:**
1. **Primary:** "WhatsApp Kami"
   - Icon: chat
   - Link: WhatsApp
   - Message: "Halo Indy Bucket, saya ingin memesan bucket"
   
2. **Secondary:** "Instagram"
   - Icon: photo_camera
   - Link: Instagram profile
   - Style: Outline button

**Description:**
"Pesan bucket spesial Anda sekarang! Hubungi kami via WhatsApp atau Instagram untuk konsultasi dan pemesanan."

### 3. About Us Page
**Dual Buttons:**
1. **Primary:** "Chat WhatsApp"
   - Icon: chat
   - Message: "Halo Indy Bucket, saya ingin konsultasi"
   
2. **Secondary:** "Lihat Instagram"
   - Icon: photo_camera

**Description:**
"Hubungi kami untuk konsultasi dan pemesanan bucket spesial Anda. Kami siap membantu mewujudkan hadiah impian Anda!"

### 4. Discover Section
**Button:** "Lihat Koleksi di Instagram"
- Style: Outline button
- Direct link to Instagram

### 5. Fresh Blooms Section
**Link:** "Lihat Galeri"
- Text link with arrow icon
- Links to Instagram

---

## 🎨 **BUTTON STYLES**

### Primary Button (WhatsApp)
```css
bg-primary-container
text-surface-white
rounded-full
px-10 py-5
hover:bg-primary-container/90
shadow-md hover:shadow-lg
```

### Secondary Button (Instagram)
```css
border-2 border-primary-container
text-primary-container
rounded-full
px-10 py-5
hover:bg-primary-container/10
```

### Outline Button
```css
border border-secondary
text-secondary
rounded-full
px-6 py-3
hover:bg-secondary hover:text-on-secondary
```

---

## 📦 **FOOTER INTEGRATION**

### Contact Column
**Title:** "Hubungi Kami"

**Links:**
1. **WhatsApp**
   - Icon: chat
   - Link: `https://wa.me/6281554107944`
   - Target: _blank

2. **Instagram**
   - Icon: photo_camera
   - Link: `https://www.instagram.com/indy_buket`
   - Target: _blank

3. **Phone Number**
   - Display: (+62) 815 5410 7944
   - No link (display only)

### Brand Info Column
**Content:**
- Logo + Brand name
- "Bouquet, Hampers, Gift & Hantaran"
- ⏳ Max Order H-3
- 📍 Surabaya
- 💸 Melayani CBD & COD

### Other Columns
1. **Indy Collections**
   - Money Buckets
   - Flower Buckets
   - Snack Buckets

2. **Customize**
   - Build Your Bucket
   - Gift Packages
   - Corporate Gifts

3. **Informasi**
   - Cara Pemesanan
   - Metode Pembayaran
   - Area Pengiriman

---

## 🔧 **TECHNICAL IMPLEMENTATION**

### WhatsApp Link Format
```javascript
href="https://wa.me/6281554107944?text=MESSAGE"
target="_blank"
rel="noopener noreferrer"
```

**Pre-filled Messages:**
- Hero: "Halo Indy Bucket, saya tertarik dengan produk Anda"
- CTA: "Halo Indy Bucket, saya ingin memesan bucket"
- About: "Halo Indy Bucket, saya ingin konsultasi"

### Instagram Link Format
```javascript
href="https://www.instagram.com/indy_buket"
target="_blank"
rel="noopener noreferrer"
```

### Material Icons Used
- `chat` - WhatsApp button
- `photo_camera` - Instagram button
- `arrow_forward` - Gallery link

---

## ✅ **UPDATED COMPONENTS**

```
✅ Hero.tsx - WhatsApp CTA
✅ CTA.tsx - Dual buttons (WA + IG)
✅ AboutUs.tsx - Dual buttons (WA + IG)
✅ Discover.tsx - Instagram link
✅ FreshBlooms.tsx - Instagram gallery link
✅ Footer.tsx - Complete contact info
```

---

## 📱 **USER FLOW**

### Pemesanan via WhatsApp
1. User klik button "WhatsApp Kami"
2. Opens WhatsApp with pre-filled message
3. User dapat langsung chat untuk konsultasi
4. Order via chat WA

### Lihat Koleksi via Instagram
1. User klik "Instagram" atau "Lihat Koleksi"
2. Opens Instagram profile @indy_buket
3. User dapat lihat portfolio dan produk
4. DM via Instagram untuk order

---

## 🎯 **CONVERSION POINTS**

### High Priority (Primary CTA)
1. ✅ Hero Section - First impression
2. ✅ CTA Section - Main conversion point
3. ✅ About Us - After learning about brand

### Medium Priority (Secondary CTA)
4. ✅ Discover Section - After browsing products
5. ✅ Fresh Blooms - After seeing styles
6. ✅ Footer - Always accessible

---

## 📊 **TRACKING RECOMMENDATIONS**

### WhatsApp Links
- Add UTM parameters for tracking
- Example: `?text=...&utm_source=website&utm_medium=cta&utm_campaign=hero`

### Instagram Links
- Track clicks with analytics
- Monitor conversion from IG profile visits

---

**Status:** ✅ All Contact Links Integrated  
**Build:** ✅ Production Ready  
**Testing:** ✅ All Links Working
